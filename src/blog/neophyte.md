---
title: How to Draw a Neovim GUI
description: Reflecting on Neophyte and plans for the future
date: 2024-10-30
layout: blog
---

# {{ $frontmatter.title }}

## Calling out to nvim

You can interact with Neovim via API in two main ways. The most common and familiar is Lua, but the same interface is also available using Remote Procedure Calls, or RPC. The latter is language-agnostic, so you can use it from Rust or any other programming language. I had never used RPC before this project, but it turned out to be pretty approachable. Neovim RPC is based on [MessagePack](https://msgpack.org/index.html), which is a serialization format. You can think of it as a more efficient JSON. On top of serialization you have [MessagePack RPC](https://github.com/msgpack-rpc/msgpack-rpc/blob/master/spec.md), which is a standard for encoding commands. It offers three kinds of commands you can send:

- *Request* instructs your peer to call a certain function with some arguments.
- *Response* encodes the return value or error response to a prior request.
- *Notification* is an event. It has a method and arguments like a request, but no way to send a response. 

To talk with Neovim over RPC, launch the program with the `--embed` flag. Now, you write your function calls to `stdin` and get return values by reading `stdout`. In Rust, [`rmpv`](https://docs.rs/rmpv/latest/rmpv/) is pretty handy for deserializing the RPC commands. Ordinarily I would reach for something like [`serde`](https://serde.rs/), but I have found it unweildy to migrate the existing implementation. The current approach of teasing MessagePack structures into more organized structs is in keeping with the [`nvim-rs`](https://github.com/KillTheMule/nvim-rs) library and [Neovide](https://neovide.dev/), so I expect they encountered similar roadblocks as I did. Also, shoutout to Neovide, which I referenced often to help me understand some underdocumented parts of Neovim's UI API. I should probably contribute back some clarifications to the user manual before too long. 
