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

Tiling means that we break the image into smaller pieces and only load the ones the user is currently zoomed in on. Each tile is 1,024×1,024. At the smallest mipmap level this is a single tile, and at the largest it comes to 1,960. 

Taken together, mipmapping and tiling greatly reduce the data being sent down on initial load. At first we only send down a few tiles for the fully zoomed-out viewport. As the user zooms and pans around, we request more tiles based on what's onscreen. 

Since the user will inspect individual ISBNs, using a lossy image format for the biggest mipmap level wasn't an option, so I serve PNGs instead. Still, since each ISBN is a boolean value of whether it's present or not, I was able to use single-bit color channels in PNG to serve essentially just compressed 2D bitmaps. How well this compresses varies, with the sparsest tiles taking just 220 bytes and most fitting under 5 kilobytes, which isn't bad for relatively high-entropy data. 

## Space-filling curves

One of requested visualization features was to offer multiple spatial layouts for the ISBNs. One would lay them out line-by-line, while another would arrange them for spatial locality of related ISBN ranges using something like a [Hilbert curve](https://youtu.be/3s7h2MHQtxc?si=Ws_UxVacn_s3AkrV&t=237). 

Hilbert curves are straightforward, but they wouldn't quite work in this case since the ISBN range can't be factored into a perfect square. Instead, I implemented an alternative curve that works for any dimensions, using a [pen and paper sketch](https://lutanho.net/pic2html/draw_sfc.html) as my guide. Dear reader, this absolutely broke my brain and took me the better part of three days to get working. 

I _should_ have just padded the data and used a Hilbert curve. I was concerned that handling different viewport shapes and sizes would make the rendering and data loading more complex. In hindsight, it would have been much, much simpler, but I certainly didn't anticipate the difficulty of the route I actually took. The linked illustation I went off offers virtually no explanation of how the pieces fit together or why it works the way it does. I wound up having to reverse-engineer the technique from first principles after tying my brain into knots over all the edge cases. 

As I learned from other submissions after the fact, [Gilbert Curves](https://github.com/jakubcerveny/gilbert?tab=readme-ov-file) would have been better-looking and easier. This algorithm builds on the one I used, greatly reducing the amount of cases to handle and choosing more aesthetic paths as a result. Although I'm kicking myself for the amount of time I spent on this, I'm glad to know about this alternative for future projects. 

## Tile loading

## WebGL rendering

## Vue and Svelte

One of my subgoals for this project was to try [Svelte](https://svelte.dev/), having seen so many people rave about it. I ended up switching back to [Vue](https://vuejs.org/) about halfway through the project out of disappointment. 

The first and biggest issue I couldn't get around was the tooling. LSPs in Neovim can be a bit fiddly to set up so this could just be skill issues, but after checking and re-checking the [lspconfig](https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#svelte) instructions multiple times, I could not get completions working in Svelte files. Auto-formatting and syntax highlighting were also broken. I dealt with this for a while before giving up on a solution. 

Granted, tooling for Vue isn't perfect either. Volar doesn't complete component imports in templates, for example, and renaming Vue files doesn't trigger automatic import updates. I had a difficult time getting Volar working with TypeScript properly as well, and it took multiple sessions of attempts to fully resolve. Part of my reticence to get Svelte working properly comes from knowing how long it already took for Vue. I'm disinclined to go through that hassle twice. 

Both frameworks are very similar overall, with single-file templates and proxy-based reactivity. However, everything that Svelte does, Vue does equally well or better. In particular, Vue reactive primitives greatly outshine Svelte runes. `$state`, `$derived`, and `$effect` simply don't offer the kind of control and flexibility that Vue does. While you can get by with the equivalent `ref`, `computed`, and `watchEffect`, I regularly find uses for `reactive`, `watch`, and `shallowRef`, with the rest coming in handy for niche situations. Vue also automatically proxys types like `Map` and `Set` that I often use, while Svelte supports a much more limited set of types for deep reactivity. 

I ultimately abandoned Svelte because its reactivity wasn't picking up changes to a sparse array I was using for my image cache. Without the `{ deep: true }` option of `watch` to listen to the whole array or a way to bail out with a manual `triggerRef`, I didn't see how to handle my case. I guess you could have a `$state(false)` and toggle it to force updates, but why deal with kludgy things like that? Vue already has great APIs for all kinds of situations. Debugging flakey reactivity isn't worth whatever simplicity Svelte purportedly has. 

I'll be sticking with Vue for the foreseeable future. The documentation is great, and tooling is too, aside from the Volar and TypeScript LSPs. It isn't perfect, but it's a sure sight better than React or any other framework I've tried. 

## Signing off

Ye who have read this far, thanks! I'll be trying to write and blog more in the coming months during my time at the [Recurse Center](https://www.recurse.com/). Stay tuned. 
