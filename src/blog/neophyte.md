---
title: How to Draw a Neovim GUI
description: Reflecting on Neophyte and plans for the future
date: 2024-10-30
layout: blog
---

# {{ $frontmatter.title }}

## Shared language

You can interact with Neovim via API in two main ways. The most common and familiar is Lua, but the same interface is also available using Remote Procedure Calls, or RPC. The latter is language-agnostic, so you can use it from Rust or any other programming language. I had never used RPC before this project, but it turned out to be pretty approachable. Neovim RPC is based on [MessagePack](https://msgpack.org/index.html), which is a serialization format. You can think of it as a more efficient JSON. On top of serialization you have [MessagePack RPC](https://github.com/msgpack-rpc/msgpack-rpc/blob/master/spec.md), which is a standard for encoding commands. It offers three kinds of commands you can send:

- *Request* instructs your peer to call a certain function with some arguments.
- *Response* encodes the return value or error response to a prior request.
- *Notification* is an event. It has a method and arguments like a request, but no way to send a response. 

To talk with Neovim over RPC, launch the program with the `--embed` flag. Now, you write your function calls to `stdin` and read return values by reading `stdout`. Alternatively, you can write and read from a socket instead by launching Neovim with `--listen`, useful if you want to connect to an editor running on a remote machine. 

In Rust, [`rmpv`](https://docs.rs/rmpv/latest/rmpv/) is pretty handy for deserializing the RPC commands. Ordinarily I would reach for something like [`serde`](https://serde.rs/), but I have found it unweildy to migrate the existing implementation. The current approach of teasing MessagePack structures into more organized structs is in keeping with the [`nvim-rs`](https://github.com/KillTheMule/nvim-rs) library and [Neovide](https://neovide.dev/), so I expect they encountered similar roadblocks as I did. Also, shoutout to Neovide, which I referenced often to help me understand some underdocumented parts of Neovim's UI API. I should probably contribute back some clarifications to the user manual before too long. 

## Getting notified

After Neovim starts, you need to request UI events by making an RPC call for [`nvim_ui_attach`](https://neovim.io/doc/user/api.html#nvim_ui_attach()). After this point, Neovim will send RPC notifications to update you about changes to the visual application state, which you use to update your own data structures for drawing. At its most basic, Neovim sets up a grid of characters and tells you which ones changed since the last update, which is enough to recreate the built-in terminal experience. 

As part of the `nvim_ui_attach` arguments, you can specify additional UI extensions to gain more control over rendering. Enabling `linegrid` is a recommended baseline to use an updated grid update format, and is a prerequisite for most other extensions. Most GUIs will also want `multigrid`, which creates a separate grid for each UI window, rather than a single global one. This extension is also a prerequisite for many others, but on its own, it can be used to support smooth scrolling, transparency effects, or multiple OS-level windows.

With `multigrid`, Neovim will create separate windows for different parts of the UI, such as the commandline, the tabline, the popupmenu, and messages. However, you can further customize rendering by enabling extensions for these as well. This is how [Noice](https://github.com/folke/noice.nvim) implements its fancy floating commandline and notification bubbles. You could also draw the tabline using a native UI tabs, for example. In my experience, externalizing the commandline has been important to fix visual bugs with animated cursors. For example, when navigating between searches, the cursor has a jarring habit of leaping to the commandline for an instant. Externalizing the commandline gives you a dedicated cursor for commands, so the main one isn't jumping around the screen constantly. 
