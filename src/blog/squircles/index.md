---
title: Squircles
description: Drawing squircles with superellipses and canvas.
date: 2024-10-15
layout: blog
---

<script setup>
import Intro from "./Intro.vue";
</script>

# Squircles

This is a squircle, a shape popularized by Jonathan Ive in his design of iPhone and iOS.

<Intro />

A typical rounded rectangle is made by taking a circle, quartering it, and grafting the pieces onto a rectangle. The trouble is, this creates a sudden jump in curvature where the parts are glued together. In contrast, squircles blend gradually between straight and curved surfaces to create a more natural transition. During the design of iOS 7,

> Ive’s design team had obsessed over the rounded corners of the phone and become advocates of Bézier curves, a concept from computer modeling used to eliminate the transition breaks between straight and curved surfaces.... A standard rounded corner consists of a single-radius arch or a quarter circle, whereas their curves were mapped through a dozen points, creating a more gradual and natural transition. <cite>[1](#after-steve)</cite>

Beziér curves are just one option to soften the shape. Another is to repurpose an attractive shape from mathematics, the superellipse. We'll start with the equation for a circle:

$$ x^2 + y^2 = 1 $$

Instead of squaring $x$ and $y$, we can swap in an arbitrary exponent, $n$.

$$ x^n + y^n = 1 $$

<!--
TODO
-->

As the exponent increases, the circle becomes more and more box-shaped, and eventually approaching a perfect square. Going the other way, the circle starts to pucker and fold in on itself. The puckering isn't so nice, but we can massage this shape into something useable.

Currently, this formula only supports square boxes. The more general form can be scaled on both axes.

$$ \left(\frac{x}{a}\right)^n + \left(\frac{y}{b}\right)^n = 1 $$

<!--
TODO
-->

Personally, I don't like the asymmetrical corner shape for wide and tall boxes. Instead, we'll use the square version of the formula and insert straight sides on the long edge.

<!--
TODO
-->

To maintain a consistent corner radius when we scale our box by a factor $l$, we also need to scale the exponent by the inverse amount.

$$
\begin{align}
x(t) &= \cos^{2r/l}(t) \\
y(t) &= \sin^{2r/l}(t)
\end{align}
$$

Since superellipses pucker when their exponent goes below 2, we'll also limit the corner radius at most half the shorter side length. This lets us fall back to a regular rounded rectangle when the box is too thin or narrow to support the desired radius.

Next, we need a way to draw the shape programmatically. It's a bit difficult to generate points for our line segments using the implicit equation for a superellipse, but fortunately, there's also a parametric form that makes this super easy.

$$
\begin{align}
x(t) &= \cos^{2/n}(t) \\
y(t) &= \sin^{2/n}(t)
\end{align}
$$

As $t$ ranges from $0$ to $2 \pi$, this gives us the coordinates for points around the superellipse. Next, we need to adjust the equation to acheive a given corner radius. Since the exponent $n$ and the corner radius $r$ are inversely proportional, we can do so by replacing $n$ with $1/r$.

$$
\begin{align}
x(t) &= \cos^{2r}(t) \\
y(t) &= \sin^{2r}(t)
\end{align}
$$

From there, we can approximate the superellipse by calculating points and drawing straight line segments between them. In testing, I found that for a corner radius $r$, using $4 \sqrt{r}$ line segments per corner gives smooth results without creating unnecessary detail. The angle between line segments decreases for large radii, so using more points yields diminishing returns. Conveniently, the parametric form naturally concentrates points in the corner where curvature is greatest, so detail is not spared in areas that don't contribute visually.

<!--
TODO
-->

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

From here we could add support for borders and colors, but for that, I'll point you to my package on GitHub where you can find the complete code to use in your own projects.

<footer aria-labelledby="references-heading">
  <h2 id="references-heading">References</h2>
  <ol class="references-list">
    <li id="after-steve">
      Mickle, Tripp (2022). <i>After Steve: How Apple Became a Trillion-Dollar Company and Lost Its Soul</i> (pp. 119). HarperCollins. 
    </li>
  </ol>
</footer>
