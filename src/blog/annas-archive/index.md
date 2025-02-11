---
title: Anna's Archive Bounty
description: Making an ISBN map explorer with Vue and Rust
date: 2025-02-10
layout: blog
---

# {{ $frontmatter.title }}

On January 15, one of my friends pointed me to a [bounty posting](https://annas-archive.org/blog/all-isbns.html) I might be interested in. It comes from Anna's Archive, an open-source digital library that aims to catalog every book in existence. To guide their archival efforts, they were offering tiered compensation up to \$6,000 for improvements to their ISBN visualizer that shows the distribution of books in various collections. That's a sure sight more than I'm currently making as an #opentowork #newgrad, so I gave it a shot. 

Now that it's done, you can check out the [finished product](https://isbn.timharding.co/) and the [source code](https://github.com/tim-harding/all-isbns). What you'll find is a Google Maps-style map of ISBNs you can zoom, pan, and explore around in. Let's dive into the process of making it. 

## Data processing

The ISBN data to visualize is a [bencode](https://en.wikipedia.org/wiki/Bencode) file that contains the list of ISBNs from each book collection. This needs to be converted into image data for the client. Since I'm using Rust, the first issue is the lack of an existing, functioning bencode crate to work with, so I ended up [writing one](https://github.com/tim-harding/bencode-rs) myself using [nom](https://github.com/rust-bakery/nom). Fortunately, the format is pretty easy to parse, so this only took a few hours. 

After decoding the file, I extract the ISBNs into bitsets covering the two billion ISBN range. In this form, the full dataset consumes a little under 4 gigabytes. Clearly we can't be constantly schlepping that much data to the client on page load, so we need to process the data for on-demand streaming. This has two parts: mipmapping and tiling. 

Mipmapping means storing the image as progressively smaller resolutions and only loading in higher resolutions when zoomed in close enough to see more detail. In this case, we render 7 levels of detail, each at half the resolution of the previous, from 50,000×40,000 down to 781×625. 

Tiling means that we break the image into smaller pieces and only load the ones the user is currently zoomed in on. 
