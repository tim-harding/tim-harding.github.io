---
title: SOA, Safety, and Macros
description: Drawing squircles with superellipses and canvas.
date: 2024-10-23
layout: blog
---

# SOA, Safety, and Macros

## Intro

### Minimal surface area macro

## Macros

Procedural macros are tedious to write. Even with the aid of `rust-analyzer` and `cargo-expand`, it's difficult to diagnose generated code that fails to compile. Crucially, while the compiler will report a missing comma or lifetime violation, it won't point out the offending code. We love Rust for its error messages being helpful, friendly, and specific. In contrast, macro errors are vague and frustrating, forcing you to wade through the generated code for syntactic and semantic mistakes.

Worse still is code that compiles but runs incorrectly. Ordinarily you might reach for a debugger to step through the code, but macro code offers no such affordance. Unless you can step through assembly and somehow deduce the macro code it comes from, `println!` is your only option. 

Complex proc macro authorship would benefit massively from better compiler diagnostics and macro sourcemaps. A line of generated code represents easily an order of magnitude greater maintenance burden than as much regular code, but tooling could go a long way to bringing them in line. 

### Crate setup

### Comparison to Zig

## Safety

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

## Tricks

### compile_fail

### doc = include_str!
