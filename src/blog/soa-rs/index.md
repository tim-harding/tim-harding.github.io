---
title: SOA, Safety, and Macros
description: Drawing squircles with superellipses and canvas.
date: 2024-10-23
layout: blog
---

# {{ $frontmatter.title }}

## Intro

### Minimal surface area macro

## Macros

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
