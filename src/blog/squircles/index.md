---
title: Squircles and CSS Houdini
description: Drawing squircles with superellipses and canvas.
date: 2024-10-23
layout: blog
---

<script setup>
import Intro from "./Intro.vue";
import SuperellipseScaling from "./SuperellipseScaling.vue";
import SuperellipseDetail from "./SuperellipseDetail.vue";
import SuperellipseSymmetry from "./SuperellipseSymmetry.vue";
</script>

# {{ $frontmatter.title }}

This is a squircle, a shape popularized by Jonathan Ive in his design of iPhone and iOS.

<Intro />

A typical rounded rectangle is made by taking a circle, quartering it, and grafting the pieces onto a rectangle. The trouble is, this creates a sudden jump in curvature where the parts are glued together. In contrast, squircles blend gradually between straight and curved surfaces to create a more natural transition. During the design of iOS 7,

> Ive’s design team had obsessed over the rounded corners of the phone and become advocates of Bézier curves, a concept from computer modeling used to eliminate the transition breaks between straight and curved surfaces.... A standard rounded corner consists of a single-radius arch or a quarter circle, whereas their curves were mapped through a dozen points, creating a more gradual and natural transition. <cite>[1](#after-steve)</cite>

Beziér curves are just one option to soften the shape. Figma has a [detailed article](https://www.figma.com/blog/desperately-seeking-squircles/) going over this method, but we'll be looking at another approach that uses a nice mathematical shape.

## Maths

We'll start with the equation for an ellipse.

$$ \left(\frac{x}{a}\right)^2 + \left(\frac{y}{b}\right)^2 = 1 $$

Instead of squaring, we can swap in an arbitrary exponent, $n$.

$$ \left(\frac{x}{a}\right)^n + \left(\frac{y}{b}\right)^n = 1 $$

<SuperellipseScaling />

As the exponent increases, the circle becomes more and more box-shaped, eventually approaching a perfect square. Going the other way, the circle folds in on itself like a star. We can massage this shape into something useable. To start, we can avoid the star effect by limiting the exponent to at least 2.

I don't like the asymmetrical corner shape wide or tall boxes take on. Instead, we'll let $a=b=1$ and insert straight sides on the long edge to complete the rectangle.

$$ x^n + y^n = 1 $$

<SuperellipseSymmetry />

We can draw this shape most easily by approximating it with straight line segments. It's a bit difficult to generate points for our line segments using the implicit equation for a superellipse, but fortunately, there's also a parametric form that makes this super easy.

$$
\begin{align}
x(t) &= \cos^{2/n}(t) \\
y(t) &= \sin^{2/n}(t)
\end{align}
$$

As $t$ ranges from $0$ to $2 \pi$, this gives us coordinates for points all around the superellipse. Next, we can acheive a desired corner radius by replacing $n$ with $1/r$, since the exponent $n$ and the corner radius $r$ are inversely proportional.

$$
\begin{align}
x(t) &= \cos^{2r}(t) \\
y(t) &= \sin^{2r}(t)
\end{align}
$$

In testing, I found that using $4 \sqrt{r}$ line segments per corner gives smooth results without creating unnecessary detail. The angle between line segments decreases for large radii, so using more points yields diminishing returns. Conveniently, the parametric form naturally concentrates points in the corner where curvature is greatest, so detail is not spared in areas that don't contribute visually.

<SuperellipseDetail />

## Implementation

This isn't easy to acheive with the CSS features available today. Using `clip-path` with a `polygon` shape seems viable, but we need the ratio between the corner radius and the rectangle side to find the superellipse exponent, and CSS `calc` has no way of doing that (division does not work, sadly). Our only option is to extend CSS with the Paint API, part of the CSS Houdini suite of APIs that lets us add CSS features with JavaScript. That way, we can write our own shape-drawing functions and use them in CSS.

To start, let's create a new JavaScript file called `worklet.js` and create a class for our drawing code.

```js
class Squircle {}
registerPaint("squircle", Squircle);
```

Before going further, let's create another JavaScript file where we'll register our worklet with the CSS engine. We'll also use the Properties and Values API to prepare a CSS variable for corner radius.

```js
CSS.paintWorklet.addModule("/worklet.js");
CSS.registerProperty({
  name: "--squircle-radius",
  syntax: "<length>",
  inherits: false,
  initialValue: "0px",
});
```

Back in the `Squircle` worklet, we'll ask to be given our corner radius variable and a transparent surface to draw on.

```js
static get inputProperties() {
  return ["--squircle-radius"];
}

static get contextOptions() {
  return { alpha: false };
}
```

Next, we'll define our paint function, which receives the drawing context, the canvas dimensions, and the corner radius variable.

```js
paint(ctx, size, props) {
  const { width, height } = size;
  const squircleRadius = props.get("--squircle-radius").value;
}
```

Inside the paint function, compute the exponent for the superellipse.

```js
// Half the shorter side length
const l = Math.min(width, height) / 2;

// Limit the radius to the available space.
// This guarantees the superellipse exponent is at least 2.
const r = Math.min(squircleRadius, l);

// The superellipse exponent is the ratio
// between the corner radius and the side length.
const exp = r / l;
```

Next, we can figure our how to draw the first corner using the parametric equations.

```js
const segments = Math.ceil(4 * Math.sqrt(r));
for (let i = 0; i < segments + 1; i++) {
  const t = i / Math.PI / 2 / segments;
  const x = Math.cos(t) ** exp * l;
  const y = Math.sin(t) ** exp * l;
  ctx.lineTo(x, y);
}
```

Once we can draw one corner, we can repeat it for each of the four corners with different rotations and translations.

```js
ctx.moveTo(width, height - l);
for (let j = 0; j < 4; j++) {
  const isLeft = j > 0 && j < 3;
  const isTop = j > 1;

  ctx.setTransform(
    // Rotation
    ((j + 1) % 2) * isLeft ? -1 : 1,
    (j % 2) * isLeft ? -1 : 1,
    (j % 2) * isTop ? -1 : 1,
    ((j + 1) % 2) * isTop ? -1 : 1,
    // Translation
    isLeft ? l : width - l,
    isTop ? l : height - l,
  );

  // Snip: corner drawing code
}
ctx.closePath();
ctx.fill();
```

That's all we need to start using squircles in our CSS.

```css
.squircle {
  background: paint(squircle);
  --squircle-radius: 16px;
}
```

To read the full implementation or save yourself the trouble, you can check out my [squircle NPM package](https://github.com/tim-harding/squircle). If you enjoyed this article, consider reaching out by [email](mailto:tim@timharding.co). I'm starting this blog to connect with other developers, so I'd appreciate hearing your thoughts or critique. Cheers!

<footer aria-labelledby="references-heading">
  <h2 id="references-heading">References</h2>
  <ol class="references-list">
    <li id="after-steve">
      Mickle, Tripp (2022). <i>After Steve: How Apple Became a Trillion-Dollar Company and Lost Its Soul</i> (pp. 119). HarperCollins. 
    </li>
  </ol>
</footer>
