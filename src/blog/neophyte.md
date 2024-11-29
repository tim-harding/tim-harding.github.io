---
title: How to Draw a Neovim GUI
description: Reflecting on Neophyte and plans for the future
date: 2024-10-30
layout: blog
---

# {{ $frontmatter.title }}

## Neovim

### Shared language

You can interact with Neovim via API in two main ways. The most common and familiar is Lua, but the same interface is also available using Remote Procedure Calls, or RPC. The latter is language-agnostic, so you can use it from Rust or any other programming language. I had never used RPC before this project, but it turned out to be pretty approachable. Neovim RPC is based on [MessagePack](https://msgpack.org/index.html), which is a serialization format. You can think of it as a more efficient JSON. On top of serialization you have [MessagePack RPC](https://github.com/msgpack-rpc/msgpack-rpc/blob/master/spec.md), which is a standard for encoding commands. It offers three kinds of commands you can send:

- *Request* instructs your peer to call a certain function with some arguments.
- *Response* encodes the return value or error response to a prior request.
- *Notification* is an event. It has a method and arguments like a request, but no way to send a response. 

To talk with Neovim over RPC, launch the program with the `--embed` flag. Now, you write your function calls to `stdin` and read return values by reading `stdout`. Alternatively, you can write and read from a socket instead by launching Neovim with `--listen`, useful if you want to connect to an editor running on a remote machine. 

In Rust, [`rmpv`](https://docs.rs/rmpv/latest/rmpv/) is pretty handy for deserializing the RPC commands. Ordinarily I would reach for something like [`serde`](https://serde.rs/), but I have found it unweildy to migrate the existing implementation. The current approach of teasing MessagePack structures into more organized structs is in keeping with the [`nvim-rs`](https://github.com/KillTheMule/nvim-rs) library and [Neovide](https://neovide.dev/), so I expect they encountered similar roadblocks as I did. Also, shoutout to Neovide, which I referenced often to help me understand some underdocumented parts of Neovim's UI API. I should probably contribute back some clarifications to the user manual before too long. 

Alternatively, there are client libraries such as [`nvim-rs`](https://github.com/KillTheMule/nvim-rs) and [`pynvim`](https://github.com/neovim/pynvim) you can use instead of using RPC directly. Since I am sensitive to compile times, I chose not to use the `nvim-rs`, which requires pulling in [`tokio`](https://github.com/tokio-rs/tokio). This is a compromise; I can't get return values from API calls without blocking, so I throw them away instead. This hasn't been a problem, but it does somewhat limit my ability to get information from Neovim. 

### Getting notified

After Neovim starts, you need to request UI events by making an RPC call for [`nvim_ui_attach`](https://neovim.io/doc/user/api.html#nvim_ui_attach()). After this point, Neovim will send RPC notifications to update you about changes to the visual application state, which you use to update your own data structures for drawing. At its most basic, Neovim sets up a grid of characters and tells you which ones changed since the last update, which is enough to recreate the built-in terminal experience. 

As part of the `nvim_ui_attach` arguments, you can specify additional UI extensions to gain more control over rendering. Enabling `linegrid` is a recommended baseline to use an updated grid update format, and is a prerequisite for most other extensions. Most GUIs will also want `multigrid`, which creates a separate grid for each UI window, rather than a single global one. This extension is also a prerequisite for many others, but on its own, it can be used to support smooth scrolling, transparency effects, or multiple OS-level windows.

With `multigrid`, Neovim will create separate windows for different parts of the UI, such as the commandline, the tabline, the popupmenu, and messages. However, you can further customize rendering by enabling extensions for these as well. This is how [Noice](https://github.com/folke/noice.nvim) implements its fancy floating commandline and notification bubbles. You could also draw the tabline using a native UI tabs, for example. In my experience, externalizing the commandline has been important to fix visual bugs with animated cursors. For example, when navigating between searches, the cursor has a jarring habit of leaping to the commandline for an instant. Externalizing the commandline gives you a dedicated cursor for commands, so the main one isn't jumping around the screen constantly. 

## Talking back

The most important RPC commands you'll send to Neovim are for user input. This is done with [`nvim_input`](https://neovim.io/doc/user/api.html#nvim_input()) and [`nvim_input_mouse`](https://neovim.io/doc/user/api.html#nvim_input_mouse()). Since you control the window and font size, you'll also need to tell Neovim how large of a grid to use with [`nvim_ui_try_resize_grid`](https://neovim.io/doc/user/api.html#nvim_ui_try_resize_grid()). It's also good to pass along focus and blur events with [`nvim_ui_set_focus`](https://neovim.io/doc/user/api.html#nvim_ui_set_focus()). 

For anything more involved than fire-and-forget calls like these, I like using [`nvim_exec_lua`](https://neovim.io/doc/user/api.html#nvim_exec_lua()), which you can use to run arbitrary Lua code. Neophyte includes a Lua module that users can use to script the GUI, and some of the APIs include callbacks for Neophyte-specific events. To trigger these, I can just `require` my module in a Lua snippet and call a function to trigger the callbacks. Most of the GUI functions in this module send namespaced RPC notifications that Neophyte handles alongside native Neovim notifications. 

## Font handling 

## WebGPU

## Future plans

Neophyte hasn't seen widespread adoption, and that's fine. There are more mature projects like Neovide that offer the same features and more. I still daily drive Neophyte on my desktop, so now and again I do basic maintenance, but I don't always answer GitHub issues, especially Windows-related ones. It was a good project to learn more about text handling and low-level rendering. 

One of my biggest difficulties with Neophyte today is its laptop battery consumption. I haven't figured out how to time frames properly on MacOS. Neither vsync nor tearing seems to work well. With vsync, I have to continuously rerender the application, even when nothing is changing, or else animations have noticable jank when I start rendering again. Without, I have to deal with tearing and figure out how to rate limit redraws and render at the right time, which I haven't figured out. 

I hindsight, I like the way ghostty is doing things, using a cross-platform core with native drawing per-platform. This is the direction I want to take Neophyte, and I think it's the best path to making the project more generally useful. At the moment, each GUI shares a common core of functionality to manage state synchronization with Neovim, and I think that part can be abstracted out into a library for other GUIs to use.

Platform-specific frontends that make better use of native text and rendering toolkits is one possible extension that I think MacOS in particular would benefit from. If I ever get my hands on a Vision Pro, I would love to adapt Neophyte for VR and experiment with whether eye-based navigation and selection has any utility. Another use case would be a screen sharing utility in the spirit of asciinema to cast editor sessions without video compression. I have a few other niche ideas for personal use. Neophyte was pretty high-lift because of how involved WebGPU was, but being able to easily spin up simpler frontends could have lots of interesting uses. 

I'm still wrapping up some other projects, but eventually, I hope to get back to Neophyte with a focus on factoring it into smaller crates for others to use. I'll happily keep hacking in my editor until I get another chance to hack on it. 
