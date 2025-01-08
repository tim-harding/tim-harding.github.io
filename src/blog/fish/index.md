---
title: Make Fish Yours
description: How to personalize Fish shell for your workflow
date: 2025-01-07
layout: blog
---

# {{ $frontmatter.title }}

I've been using [Fish](https://fishshell.com/) for about six years, ever since watching Jon Gjengset's [editor setup video](https://www.youtube.com/watch?v=ycMiMDHopNc). It immediately felt like home compared to Bash, with terrific out-of-box completions and shell history. The default experience is so good that only in the last few years have I started customizing the experience more heavily. 

For a long time, I felt about the shell the way I did about CSS: for an ostensibly simple language, it's surprisingly difficult to grok at a deep level, riddled as it is with surprising, unintuitive, and difficult to debug behaviors. My home turf is static languages with strong type systems, such as Rust. My footing is less sure in dynamic languages where I can't rely on the compiler for refactoring quite as well, *especially* when the APIs are stringly typed. Shell is a worst-case scenario in this sense. Not only are strings the *only* type, but the programming model involves inserting them into your running program to control its execution. Strings are the lingua franca of shell scripting. String interpolation is the Rosetta stone. 
