---
title: Anna's Archive Bounty
description: Making an ISBN map explorer with Vue and Rust
date: 2025-02-10
layout: blog
---

# {{ $frontmatter.title }}

On January 15, one of my friends pointed me to a [bounty posting](https://annas-archive.org/blog/all-isbns.html) I might be interested in. It comes from Anna's Archive, an open-source digital library that aims to catalog every book in existence. To guide their archival efforts, they were offering tiered compensation up to \$6,000 for improvements to their ISBN visualizer that shows the distribution of books in various collections. That's a sure sight more than I'm currently making as an #opentowork #newgrad, so I gave it a shot. 

Now that it's done, you can check out the [finished product](https://isbn.timharding.co/) and the [source code](https://github.com/tim-harding/all-isbns). What you'll find is a WebGL-rendered, Google Maps-style map of ISBNs you can zoom, pan, and explore around in. Let's dive into the process of making it. 

## Data processing

The ISBN data to visualize is a [bencode](https://en.wikipedia.org/wiki/Bencode)-encoded file compressed with [ZST](https://en.wikipedia.org/wiki/Zstd). This needs to be converted into image data for the client. Since I'm using Rust, the first issue is the lack of an existing, functioning bencode crate to work with, so I ended up [writing one](https://github.com/tim-harding/bencode-rs) myself using [nom](https://github.com/rust-bakery/nom). Fortunately, the format is pretty easy to parse, so this only took a few hours. 

The decoded file contains a dictionary that maps each book collection to a compressed list of ISBNs. The compression takes advantage of ISBNs being generally clustered, with a bunch of adjacent titles interleaved with swaths of unused ISNBs. The format that uses this is a series of numbers that each indicate a consecutive range, alternating between occupied and empty regions. 
