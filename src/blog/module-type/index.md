---
title: Module Type Pattern
description: Adapting an Ocaml pattern for use with Vue.js
date: 2025-01-13
layout: blog
---

# {{ $frontmatter.title }}

Recently, I've been working on a web app for training Go, an abstract strategy board game. This is the largest frontend project I've worked on using Vue. Along the way, I've learned a valuable lesson: classes don't play nice with reactivity. 

In case you haven't experienced this, here's why. Reactivity in Vue works by wrapping values and types in JavaScript [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects, like so:

```typescript
import { reactive } from 'vue';
const foo = reactive({ hello: '' });
foo.hello = 'world'; // Triggers reactive update
```

Although it looks like normal property assignment, `foo` intercepts property access, tracking reads and writes before forwarding them to the underlying object. Instead of a plain-old-data object, let's see what happens if it's a class instead. 

```typescript
class Foo {
  constructor() {
    this.hello = '';
  }

  greet(name) {
    this.hello = name;
  }
}

const foo = reactive(new Foo());
foo.greet('world'); // No reactive update
```

In the class methods, `this` refers to the original object underlying the reactive proxy. By calling `greet`, we reassign the field behind the proxy's back, so reactivity doesn't work. What to do? I'm not sure what the idiomatic answer is, but there seem to be a few common suggestions in the community:

- Just don't use classes. Use plain-old-data objects and operate on them with freestanding functions.
- Use Vue composables to build up logic instead. 
- Use [`ref`](https://vuejs.org/api/reactivity-core.html#ref) or [`shallowRef`](https://vuejs.org/api/reactivity-advanced.html#shallowref) instead of `reactive` and always reassign through `foo.value` instead of relying on proxies to handle reactivity automagically. 
- Use reactive proxies as class fields instead of plain JavaScript values. 

I am personally most attracted to the first option, as it limits the amount of coupling between my code and the framework. It also prevents mixing framework or presentation concerns with business logic. But even if I can't use classes or prototypes, I still want to think in terms of types and methods. 

To do this, I ended up adapting a pattern from the functional language OCaml for use in TypeScript. Each code module contains one primary type, which we call `T`, along with methods that operate on it. For example:

```typescript
// Point.ts

export interface T {
  x: number;
  y: number;
  z: number;
}

export function make(x: number, y: number, z: number): T {
  return { x, y, z };
}

export function length(t: T): number {
  const { x, y, z } = t;
  return Math.sqrt(x*x + y*y + z*z);
}

export function normalize(t: T) {
  const l = length(t);
  t.x /= l;
  t.y /= l;
  t.z /= l;
}
```

Using this module looks like this:

```typescript
import * as Point from "./Point";

function randomSpherePoint(): Point.T {
  const p = Point.make(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
  );
  Point.normalize(p);
  return p;
}
```

To avoid having to manually glob import each module, I use barrel files to reexport modules:

```typescript
// index.ts

export * as Point from "./Point";
export * as Shape from "./Shape";
// etc
```

This way, I can just start typing `Point` elsewhere in my codebase and the LSP will auto-suggest the import for me. I understand that there are some [concerned](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/) [citizens](https://tkdodo.eu/blog/please-stop-using-barrel-files) cautioning against this practice, but I think it's well-justified to use alongside this pattern. Maybe this is just a smol-time dev practice. You'll have to decide for yourself. 

Overall, I've quite enjoyed programming this way. Since it works with plain-old-data objects, it's totally compatible with Vue's reactivity system. Compared to objects, it also works better for tree-shaking. [Valibot](https://valibot.dev/guides/comparison/) does something quite similar to provide an API comparable to [Zod](https://zod.dev/) while greatly reducing the amount of code that gets shipped. 

Compared to OCaml, there are a few downsides to this appoach that I've encountered:

- LSP hover windows show types as `T` instead of `Point.T`, making it slightly less convenient to get quick info about your types. 
- TypeScript interfaces don't do data hiding, so you have less control over the interface boundary. This could be a larger issue if you're working with others and there isn't enough discipline around directly accessing `T` fields. 
- You likely still want to manually glob import sibling modules instead of auto-importing by name from `index.ts`. Otherwise, you can end up with circular import warnings from the bundler. Vite says there could be issues with execution order from circular imports, although I've never encountered this for myself. 
- Nuxt auto-imports are largely incompatible with this style. I ended up removing Nuxt from my project as a result. 

If you know a better solution, please consider sending me an [email](mailto:tim@timharding.co). I am curious how other devs in the community are approaching this issue. 
