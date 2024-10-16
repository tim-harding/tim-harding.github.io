---
title: Squircles
description: Drawing squircles with superellipses and canvas
date: 2024-10-15
---

<script setup>
import { path } from 'superellipse-squircle';
</script>

<style module="s">
.squirclesIntro {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 16rem) 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: ". full ." ". button. ";
  gap: 0.5rem;
}

.squirclesIntroToggleButton {
  display: grid;
  height: calc(1rem + 4px);
  width: 2rem;
  border-radius: calc(0.5rem + 2px);
  background-color: var(--crust);
  box-shadow: 0px 0px 1px 1px var(--surface-0);
  padding: 2px;

  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: var(--lavender);
    border-radius: 50%;
    transition: background-color 125ms, transform 125ms;
  }
}

.squirclesIntroSquircle,
.squirclesIntroRoundedRect {
  display: grid;
  grid-area: full;
  fill: var(--surface-2);
}

.squirclesIntroLabel {
  grid-area: button;
  font-weight: 400;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem;
  align-items: center;
  justify-self: center;

  &:hover > .squirclesIntroToggleButton::before {
    background-color: var(--mauve);
  }
}

input:checked {
  & + .squirclesIntroLabel > .squirclesIntroToggleButton::before {
    transform: translateX(calc(0.75rem + 1px));
  }


  & ~ .squirclesIntroRoundedRect {
    display: none;
  }
}

input:not(:checked) {
  & ~ .squirclesIntroSquircle {
      display: none;
  }
}
</style>

# Squircles

This is a squircle, a shape popularized by Jonathan Ive during his redesign of iOS 7.

<div :class="s.squirclesIntro">
  <input class="sr" id="squircle-intro-checkbox" type="checkbox" checked="checked">
  <label :class="s.squirclesIntroLabel" for="squircle-intro-checkbox">
    <div :class="s.squirclesIntroToggleButton"></div>
    Squircle
  </label>

  <svg :class="s.squirclesIntroRoundedRect" viewBox="0 0 162 100">
    <rect width="162" height="100" rx="16" ry="16"></rect>
  </svg>
  <svg :class="s.squirclesIntroSquircle" viewBox="0 0 162 100">
    <path :d="path(0, 0, 162, 100, 16)"></path>
  </svg>
</div>

Unlike the typical rounded rectangle found on most websites, squircles blend gradually between straight and curved surfaces to create a more natural transition. To make a typical rounded rectangle, you take a circle, quarter it, and graft the pieces onto a rectangle.

<!--
TODO
-->

The trouble is, this creates a sudden jump in curvature where the parts are glued together. We can do better. Let's go back to the equation of a circle:

$$ x^2 + y^2 = 1 $$

Instead of squaring $x$ and $y$, we can swap in an arbitrary exponent.

$$ x^n + y^n = 1 $$

As the exponent increases, the circle becomes more and more box-shaped, and eventually approaches a perfect square. Going the other way and lowering the exponent below two, the circle starts to pucker and fold in on itself.

This family of shapes is called a superellipse, and unlike a rounded rectangle, its curvature is continuous everywhere. With this as a starting point, we need to massage it into something we can use. It should adapt to all kinds of box shapes while preserving the corner radius, and it needs to be something we can draw with web technology. Superellipses require arbitrarily large exponents, so we won't be able to match it perfectly with bezier curves, since they are limited to cubic shapes. The simplest approach is to approximate the superellipse with straight line segments, and this turns out to work pretty well. It's a bit difficult to generate points for our line segments using the implicit equation for a superellipse, but fortunately, there's also a parametric form that makes this super easy.

$$
\begin{align}
x(t) &= \cos^\frac{2}{n}(t) \\
y(t) &= \sin^\frac{2}{n}(t)
\end{align}
$$

As $t$ ranges from $0$ to $pi/2$, this gives us the coordinates for points within the first quartile. Mirroring these points across $x$ and $y$ to completes the shape. Next, the exponent $n$ and the corner radius $r$ are inversely proportional, so by replacing $n$ with $1/r$, we get the superellipse for a given corner radius.

$$
\begin{align}
x(t) &= \cos^{2r}(t) \\
y(t) &= \sin^{2r}(t)
\end{align}
$$

If we want to scale our box size by a factor $l$, we also need to scale the exponent by the same amount to maintain a consistent corner radius.

$$
\begin{align}
x(t) &= \cos^\frac{2r}{l}(t) \\
y(t) &= \sin^\frac{2r}{l}(t)
\end{align}
$$

For rectangular boxes, we'll split the superellipse along the shorter axis, move the sides apart, and fill in the space with another rectangle. Finally, since superellipses lose their roundness when their exponent goes below 2, we'll limit the corner radius to be at least half the side length, which falls back to a regular rounded rectangle if the box gets too thin, just like the Figma version.

## Implementation

This isn't easy to acheive with the CSS features available today. We'd like to use `clip-path`, but each basic shape has issues:

- `path` is a string and can't use CSS variables to support different corner radii or box sizes,
- `shape` isn't yet supported by any browsers as of this recording, and
- `polygon` is most viable, but we can't // TODO investigate more

Since none of the basic shapes work, our only choice is to create our own. This choice is made possible by the Paint API, part of the CSS Houdini suite of APIs that gives us the ability to extend CSS from Javascript. With the paint API, we can write our own shape-drawing functions and use them in CSS.

Let's see how this works. Let's create a new JavaScript file called `worklet.js` and create a class for our drawing code.

```js
class Squircle {}
```

First, we'll request to the `--squircle-radius` CSS property and a transparent surface to draw on.

```js
static get inputProperties() {
  return [
    "--squircle-radius",
  ];
}

static get contextOptions() {
  return { alpha: false };
}
```

Next, we'll define our paint function, which takes a Canvas 2D context to draw on, the element dimensions, and the radius property we requested.

```js
paint(ctx, size, props) { }
```

Before going further, let's create another JavaScript file where we'll register our worklet with the CSS engine.

```js
CSS.paintWorklet.addModule("/worklet.js");
```

At the same time, we need to use another Houdini API, the Properties and Values API, to tell CSS what type of values to accept for our custom radius property.

```js
CSS.registerProperty({
  name: "--squircle-radius",
  syntax: "<length>",
  inherits: false,
  initialValue: "0px",
});
```

Back in the worklet, all that's left is to draw. First, set up the variables for width, height, and radius.

```js
const { width: w, height: h } = size;
const radius = props.get("--squircle-radius").value;
const l = Math.min(w, h) / 2;
const r = Math.min(r, l);
```

Next, we can figure our how to draw the first corner from the parametric equations.

```js
const SEGMENTS = 16;
for (let j = 0; j < SEGMENTS + 1; j++) {
  const t = j / Math.PI / 2 / SEGMENTS;
  const x = Math.cos(t) ** (r / l) * l;
  const y = Math.sin(t) ** (r / l) * l;
  ctx.lineTo(x, y);
}
```

Once we can draw one corner, we can repeat it for each of the four corners with different rotations and translations.

```js
ctx.moveTo(w, h - l);
for (let i = 0; i < 4; i++) {
  const isLeft = i > 0 && i < 3;
  const isTop = i > 1;
  ctx.setTransform(
    ((i + 1) % 2) * isLeft ? -1 : 1,
    (i % 2) * isLeft ? -1 : 1,
    (i % 2) * isTop ? -1 : 1,
    ((i + 1) % 2) * isTop ? -1 : 1,
    isLeft ? l : w - l,
    isTop ? l : h - l,
  );
  // snip
}

ctx.closePath();
ctx.fill();
```

From here we could add support for borders and colors, but for that, I'll point you to my package on GitHub where you can find the complete code to use in your own projects. For references and additional details on the math used in this video you can check out the script for this video in the description. Drop a like if you enjoyed this video, let me know in the comments what I could have improved, and I'll catch you in the next one.
