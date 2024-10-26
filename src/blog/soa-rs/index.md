---
title: SOA, Safety, and Macros
description: Drawing squircles with superellipses and canvas.
date: 2024-10-23
layout: blog
---

# SOA, Safety, and Macros

## Intro

## Macros

Procedural macros are tedious to write. Even with the aid of `rust-analyzer` and `cargo-expand`, it's difficult to diagnose generated code that fails to compile. Crucially, while the compiler will report a missing comma or lifetime violation, it won't point out the offending code. We love Rust for its error messages being helpful, friendly, and specific. In contrast, macro errors are vague and frustrating, forcing you to wade through the generated code for syntactic and semantic mistakes.

Worse still is code that compiles but runs incorrectly. Ordinarily you might reach for a debugger to step through the code, but macro code offers no such affordance. Unless you can step through assembly and somehow deduce the macro code it comes from, `println!` is your only option. 

Complex proc macro authorship would benefit massively from better compiler diagnostics and macro sourcemaps. A line of generated code represents easily an order of magnitude greater maintenance burden than as much regular code, but tooling could go a long way to bringing them in line. 

## Safety

Before writing `soa-rs`, I believed that `unsafe` is difficult largely for the same reasons as C code. `malloc`, `free`, manual lifetime management, and so on. That is false. Unsafe Rust is *much* harder. 

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

### Type system

#### repr(transparent) for dyn sized (okay to do?)

### Unknown unknowns

#### steffahn

##### WithRef

##### Inner mutability

### Requirements and motivation

#### Miri

#### Best practices are not consolidated

## Challenges

### Unstable types

#### Pointer metadata

#### try_fold

### Deref

Type system has trouble with multiple generic parameters?

### Implementing Eq, Ord, etc for SoaVec based on T

### DynSized

### Index/IndexMut

### Slices are special (borrowing)

#### Implementing Eq against other types

### Array in const context

## Papercuts

### Type system deadends

### Macro debugging

### ZST special casing

### Crate setup

Generated code has no knowledge of its context. It doesn't know what crate it's in, what symbols are imported, or whether you `use std as cursed;`. Therefore, you typically refer to symbols by their absolute path, such as `::std::vec::Vec`. There is just one wrinkle: you cannot refer to the current crate this way. That is, you can't say `::my_crate::symbol` from within `my_crate`. In macros by example you can use `$crate`, in proc macros you cannot. Therefore, you are unable to invoke your macro in `my_crate` if the macro itself uses `::my_crate::symbol`. That means you need a separate crate for just for tests, on top of the ones for your macro and your library. This isn't the biggest deal, but it's one of those annoying administrative things that's foisted upon anyone learning proc macros for the first time. 

## Tricks

### compile_fail

### doc = include_str!
