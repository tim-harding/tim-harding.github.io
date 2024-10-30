---
title: Macros, Safety, and SOA
description: Reflecting on my challenges implementing soa-rs
date: 2024-10-30
layout: blog
---

# {{ $frontmatter.title }}

About a year ago I wrote [`soa-rs`](https://github.com/tim-harding/soa-rs), a structure-of-arrays (SOA) crate for Rust. It uses proc macros and `unsafe` extensively, and this post reflects on my experience with those tools. Much that I have to say mirrors Chad Austin's recent [Unsafe Rust Is Harder Than C](https://chadaustin.me/2024/10/intrusive-linked-list-in-rust/), which perfectly articulates the `unsafe` experience:

> The result of my pain is a safe, efficient API.

However much I criticize, unsafe Rust is uniquely rewarding. Nowhere else can I wrap a bundle of hairy, low-level, error-prone code behind a zero-cost interface that's impossible to misuse. I'll take it, papercuts and all. 

## Background

SOA is a way of organizing linear data for efficient access on modern computers. Consider this type:

```rust
struct Foo(u8, u64);
let foos = vec![Foo(0, 1), Foo(2, 3)];
```

Because of memory alignment requirements, each `Foo` takes 128 bits of space, leaving 56 bits to waste. Further, suppose you iterate over many elements, but only access the `u8` field. Since RAM serves data by the cache line, 15 of every 16 bytes transferred is thrown out, forcing the CPU to wait for memory.

SOA addresses this by storing each struct field as a separate array. That way, elements are tightly packed. No space is wasted to padding, and during iteration, every cache line byte goes to use. Here's what it looks like using `soa-rs`:

```rust
use soa_rs::{Soa, Soars, soa};

#[derive(Soars)]
struct Foo {
    bar: u8,
    baz: u64,
}

fn main() {
    let soa = soa![
        Foo { bar: 1, baz: 2 },
        Foo { bar: 3, baz: 4 },
    ];

    for mut foo in &mut soa {
        *foo.bar *= 2;
    }

    assert_eq!(foo.bar(), [2, 6]);
}
```

### Design

Several SOA crates existed before `soa-rs`. These crates would generate a unique container type for each SOA struct. Generated code is tedious to develop and maintain; `rust-analyzer` doesn't work in macros, and you can't step through the code in a debugger. You're also creating heaps of duplicate code, slowing down compilation. Trying to match the API surface of `Vec` this way is untenable. Instead, `soa-rs` generates only essential, low-level routines, moving most of the implementation to a generic container type, `Soa`. 

The most popular SOA crate also differs by using a `Vec` for each field, multiplying the overhead of allocation and capacity tracking by the number of fields. `Soa` minimizes overhead by managing one allocation for the collection. `soa-rs` spends most of its `unsafe` in generated code that manages pointers into this allocation for each field array. 

### Comparison to Zig

Zig is the poster child of this data structure. Here's the example from above in Zig:

```zig
const std = @import("std");
const assert = std.debug.assert;

const Foo = struct {
    bar: u8,
    baz: u32,
};

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const alloc = gpa.allocator();

    var soa = std.MultiArrayList(Foo){};
    defer soa.deinit(alloc);

    try soa.append(alloc, .{ .bar = 1, .baz = 2 });
    try soa.append(alloc, .{ .bar = 3, .baz = 4 });

    for (soa.items(.bar)) |*bar| {
        bar.* *= 2;
    }
    assert(std.mem.eql(u8, soa.items(.bar), &[_]u8{ 2, 6 }));
}
```

Unless Rust, Zig doesn't need a macros to do this, using its compile-time reflection system instead. `MultiArrayList` works with all structs, not just those marked with `#[derive(Soars)]`, so you can use it with types from other libraries. Not only that, `MultiArrayList` also supports enums, storing small enum variants in separate arrays from large ones. It includes sorting methods that `soa-rs` currently lacks, and it does all this in just 481 lines, compared to 3498 in `soa-rs`. It's superior by just about any standard of comparison. I have at times looked jealously at the ergonomics of raw pointers by default and the insane leverage of comptime. Neither is coming to Rust any time soon, but boy would they be welcome for some sitations. 

## Macros

Procedural macros are tedious to write. Even with the aid of `rust-analyzer` and `cargo-expand`, it's difficult to diagnose generated code that fails to compile. Crucially, while the compiler will report a missing comma or lifetime violation, it won't point out the offending code. We love Rust for its error messages being helpful, friendly, and specific. In contrast, macro errors are vague and frustrating, forcing you to wade through the generated code for syntactic and semantic mistakes.

Worse still is code that compiles but runs incorrectly. Ordinarily you might reach for a debugger to step through the code, but macro code offers no such affordance. Unless you can step through assembly and somehow deduce the macro code it comes from, `println!` is your only option. 

Complex proc macro authorship would benefit massively from better compiler diagnostics and macro sourcemaps. A line of generated code represents easily an order of magnitude greater maintenance burden than as much regular code, but tooling could go a long way to bringing them in line. 

## Safety

Before writing `soa-rs`, I believed that `unsafe` is difficult largely for the same reasons as C code. `malloc`, `free`, manual lifetime management, and so on. That is false. Unsafe Rust is *much* harder, peppered as it is with myriad requirements and pitfalls. These requirements are scattered between `std` documentation, the [Rustonomicon](https://doc.rust-lang.org/nomicon/), and, more problematically, tribal knowledge. 

It took only about an hour from when I first published `soa-rs` for Steffahn to appear in my GitHub issues with two soundness bugs, each requiring significant API redesign. (I've since learned this is a common experience for unsafe authors.) Even with Miri checking over my work and combing through the code for any issues I knew to look for, I still had major blindspots that an experienced programmer could easily unearth. The biggest problem with unsafe is the unknown unknowns — the fearsome gremlin of undefined behavior dwells in hundred dark corners you might have a blind eye to. 

Rust and I are like Linus and his blanket. In a lesser language I'm on edge, never quite assured that I've covered all my tracks. In Rust I am secure, the type system providing the structure I need to code with confidence. Unsafe Rust is quite the opposite experience. You have to be on your guard at every step. In exchange, you get to share a zero-cost interface that cannot be misused. It's hard, but no other language rewards your efforts quite the same. 

### Beware swap

The original SOA design looked like this:

```rust
pub struct Slice<T: Soars> {
    len: usize,
    raw: T::Raw,
}

pub struct Soa<T: Soars> {
    cap: usize,
    slice: Slice<T>,
}

impl<T> Deref for Soa<T: Soars> {
    type Target = Slice<T>;

    fn deref(&self) -> &Self::Target {
        &self.slice
    }
}
```

In this setup, most of the implementation work goes into `Slice` for any methods that don't require allocation. `Soa` adds allocating methods like `push` and `pop`, but also gets all the methods from `Slice` for free from the `Deref` implementation. This is the same way that `Vec<T>` exposes the methods from `&[T]`. However, this implementation runs into an issue:

```rust
let a = soa![Tuple(0)];
let b = soa![];
std::mem::swap(a.as_mut_slice(), b.as_mut_slice());
a.push(Tuple(0)); // segfault!
```

By exposing a reference to the struct field, it's now possible to exchange the contents of two containers without updating the capacity to match. In the example above, `a` thinks it has capacity to push an element, but contains a slice with no allocated capacity, causing the segfault. `Vec` can get around this because it's deref target, `[T]`, is `?Sized`, meaning that it doesn't have a fixed size and so can't be passed to `mem::swap`. 

Also unlike `Soa`, `Vec` creates slices on-demand using `std::slice::from_raw_parts`, storing the allocation pointer and length as separate fields instead of directly holding a slice (which it couldn't do because of `?Sized`). If `Soa` could do this, then users would only be able to `mem::swap` those on-demand slices, not the actual container internals. However, `&[T]` is special. You can create one with `from_raw_parts` and then return it from a function. Usually you can't return a reference unless it's tied to something that outlives the function, which for us means it has to reference a struct field. We can't create `Slice` in a function and then return a reference to it, because the reference would be to a stack frame that's about to end. If `[T]` were a struct with a length and pointer, it would have the same problem, but it isn't. It has the special priviledge of stashing its length field in the metadata field of a fat pointer, so `&[T]` stands on its own, whereas `&Slice` points to a location with the complete slice information. 

The only option left is to still hold `Slice` inside of `Soa` so we can return references to it, but make `Slice` be `?Sized`. Here's what that looks like:

```rust
pub struct Soa<T: Soars> {
    cap: usize,
    len: usize,
    slice: Slice<T, ()>,
}

pub struct Slice<T: Soars, D: ?Sized = [()]> {
    raw: T::Raw,
    dst: D,
}
```

First, the length field has moved to `Soa`, while `Slice` sports a new generic, `D`. When `D` uses the default generic parameter, `[()]`, the struct becomes `?Sized`. That way, when we hand users an `&mut Slice<T>`, they won't be able to `mem::swap` it. It also makes the struct [dynamically sized](https://doc.rust-lang.org/nomicon/exotic-sizes.html#dynamically-sized-types-dsts), meaning that references to it have the same metadata as `[()]` itself. That lets us use the same trick of storing the slice length as part of the reference. This isn't really needed, but it feels like a neat priviledge to have anyway. 

Since dynamically sized types can't be stored in a sized type, we can also set `D` to `()` when storing it in the `Soa`. This is also handy for `SliceRef`, an owned type that acts like `&Slice`.

```rust
pub struct SliceRef<'a, T: 'a + Soars> {
    len: usize,
    slice: Slice<T, ()>,
    marker: PhantomData<&'a T>,
}
```

Being able to return `&Slice` is great for implementing `Deref` because it can borrow from the container internals. However, to support slicing (as in `&foo[1..5]`), we still need the option to return a newly-created slice from a function. The reference metadata trick isn't quite enough here because we have a pointer for each SOA field, not just the single one that regular slices have. A fat pointer alone doesn't have enough data to fully capture a SOA slice, so we would have to do the impossible by creating the `Slice` on the stack and returning a reference to it. `SliceRef` gives us the semantics of `&Slice` in an owned type by storing a phantom reference, which tells the type system that we're borrowing data without our actually doing so. 

### `WithRef`

Suppose you have this struct:

```rust
struct Struct(u8, u8);
```

Since `soa-rs` stores the fields separately, a reference to a slice element looks like this:

```rust
struct StructRef<'a>(&'a u8, &'a u8);
```

If `Struct` implements a trait, we'd like for `StructRef` to also implement the trait. The first issue Steffahn caught has to do with this clever trait I came up with to solve the issue:

```rust
pub trait WithRef {
    type T;

    fn with_ref<F, R>(&self, f: F) -> R
    where
        F: FnOnce(&Self::T) -> R;
}

```

To implement `with_ref`, the macro would bitwise copy each field from `StructRef` to recreate the `Struct` on the stack. Then, it would call `with_ref` with a reference to the `Struct`. 

```rust
impl WithRef for StructRef {
    type T = Struct;

    fn with_ref<F, R>(&self, f: F) -> R
    where
        F: FnOnce(&Self::T) -> R 
    {
        use std::ptr;
        let t = Struct(
          unsafe { ptr::read(ptr::from_ref(self.0)) },
          unsafe { ptr::read(ptr::from_ref(self.1)) },
        );
        f(&t);
    }
}
```

This way, you could make a SOA slice hashable using `T`'s implentation of `Hash`, for example.

```rust
impl<T> Hash for Slice<T>
where
    T: Soars + Hash,
{
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.len().hash(state);
        for el in self.iter() {
            el.with_ref(|el| el.hash(state))
        }
    }
}
```

This all seemed fine to me, and Miri had no complaints either. Since `WithRef` only calls `f` with an non-`mut` reference to the stack, you couldn't mutate anything, so there's no worry you'll affect the `Soa` contents. Right?

*Right?*

Well, I forgot to consider inner mutability. Here's how to expose the issue:

```rust
#[derive(Soars)]
struct Foo(RefCell<String>);

let soa = soa![Foo(RefCell::new(String::default()))];
// Takes ownership of the Foo that `with_ref` created on the stack,
// but the soa also still owns that memory.
let r = soa.idx(0).with_ref(|x| std::mem::take(x.0.borrow_mut()));
// Double free when r and soa are dropped.
```

In other words, don't forget that a shared reference doesn't always mean an immutable reference, even if it's normally safe to think of them the same. This is the kind of thing that makes unsafe so hard to get right. You have to consider how your code interacts with all of Rust's myriad constructs, and it's easy to overlook some particular case where some errant bit of safe code comes along to ruin your day. 

Sadly, this kills the ability to implement a bunch of traits for SOA slices without some additional effort by the user, since we can't leverage the existing implementations on `T` for equality, ordering, equality, debug printing, or cloning. To help the situation, you can use `#[soa_derive(Clone, Debug, ...)]` to add derive implementations to `T::Ref`, which does make those traits available on `Slice`. I regret having to sacrifice API design to satisfy something of a corner case usage. 

### Pointers

#### Provenance

C pointers are kinda loosy goosy. You can get by understanding them as just an address. Rust expects a bit more from you by adding the notion of provenance. Pointers aren't just a location in memory, they also carry information about the memory region they are allowed to access. For instance, this isn't valid:

```rust
// Stack-allocate some variables.
let a = 0u32;
let b = 0u32;

// Get pointers into the stack. 
// Each pointer has provenance over _only_ that variable.
let a = std::ptr::from_ref(&a);
let b = std::ptr::from_ref(&b);

// Get the difference between the two pointers.
let delta = b.offset_from(a);

// Invalid! 
// b is outside the provenance of a. 
let b = a.offset(delta);
```

Technically, the pointer arithmetic works. You can do this sort of thing in C if you want, but Rust's memory model forbids it. Working with `unsafe`, I've often encountered rules like this, ones I'm happy to follow but whose motivation is opaque. I suppose it's addressing some compiler technicality known to an enlightened few. Still, unsafe is replete with similarly obscure requirements that conspire to depress confidence in your code, as any stone left unturned threatens to unleash the fearsome demon of undefined behavior. 

## Challenges

### Unstable types

#### Pointer metadata

#### try_fold

### Deref

Type system has trouble with multiple generic parameters?

### Index trait

It's a bit unfortunate that certain traits like `Index` return `&Self::Output` instead of just `Self::Output`. I can't implement this type for `Slice` because I need to return an owned type. I assume this constraint is because we didn't have [GAT](https://blog.rust-lang.org/2022/10/28/gats-stabilization.html)s when these traits where being developed. Today we could write

```rust
trait Index {
    type Output<'a>: ?Sized where Self: 'a;
    // instead of
    type Output: ?Sized;
}

impl<T> Index for Vec<T> {
    type Output<'a> = &'a [T] where Self: 'a;
    // instead of
    type Output = [T];
}
```

Because of this, users have to write `soa.idx(i)` instead of `soa[i]`. Not the end of the world, but more flexibility would be nice in a few places. 

### Array in const context

## Papercuts

### Trait methods in const

### Type system deadends

#### Pointer metadata

### Special cases

Tuple structs, unit structs, and named field structs each have slightly different syntax that require special handling in macro code. For example, here's how you 

```rust
match kind {
    FieldKind::Named => quote! {
        #ident { #(#field: #ty),* }
    },
    FieldKind::Unnamed => quote! {
        #ident ( #(#ty),* );
    },
    FieldKind::None => quote! {
        #ident;
    }
}
```

This is inconvenient given how many places these differences need to be accounted for. However, tuple structs have this nicety:

```rust
struct Tuple(u8, u8);
let tuple = Tuple { 0: 42, 1: 7 };
```

You can treat tuple structs like named field structs for the purpose of initialization, so you don't need to handle them differently. I wish this feature were available in more areas of the language. 

### Crate setup

Generated code has no knowledge of its context. It doesn't know what crate it's in, what symbols are imported, or whether you `use std as cursed;`. Therefore, you typically refer to symbols by their absolute path, such as `::std::vec::Vec`. There is just one wrinkle: you cannot refer to the current crate this way. That is, you can't say `::my_crate::symbol` from within `my_crate`. In macros by example you can use `$crate`, in proc macros you cannot. Therefore, you are unable to invoke your macro in `my_crate` if the macro itself uses `::my_crate::symbol`. That means you need a separate crate for just for tests, on top of the ones for your macro and your library. This isn't the biggest deal, but it's one of those annoying administrative things that's foisted upon anyone learning proc macros for the first time. 

## Tricks

### compile_fail

Sometimes you want to test that a piece of code doesn't compile. I do this to ensure that certain types aren't `Send` or `Sync`, for example. The only way to do that is by writing a doctest with the `compile_fail` annotation:

````rust
/// ```compile_fail 
/// let number: u32 = "string";
/// ```
mod compile_fail_tests {}
````

This tests that compilation failed, but not why it failed. I've made the mistake of writing one of these to test one thing, but compilation actually failed because I forgot a semicolon. To make sure you're testing the right thing, compile the failing code and make note of the error code:

```sh
error[E0308]: mismatched types
```

Then, modify the doctest to specify the error code you expect. 

````rust
/// ```compile_fail,E0308
````

### doc = include_str!

If you have a readme with Rust code that you want to ensure compiles, you can do this:

```rust
#[doc = include_str!("../README.md")]
mod readme_tests {}
```

This is equivalent to including the readme as a `///` documentation comment, so Rust will include it with the rest of your doctests. 

## Conclusion

Navigating the difficulties of `unsafe` makes me appreciate the safe subset of Rust all the more. If I'm critical, it's because I love the language and want it to be even better. Safe Rust is more enjoyable and productive for me than any other language, and I hope there's a future where I can say the same for its unsafe counterpart. If you have thoughts about this post, consider [emailing](mailto:tim@timharding.co) them to me. I'm starting this blog with the hope of opening up conversation with other developers, so I appreciate any responses I receive. Happy programming! 🦀
