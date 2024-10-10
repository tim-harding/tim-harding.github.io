<script setup>
import { useData } from "vitepress";
const { page } = useData();
import NotFound from "./NotFound.vue";
import Header from "./Header.vue";
</script>

<template>
  <div>
    <Header />
    <main>
      <NotFound v-if="page.isNotFound" />
      <Content v-else />
    </main>
    <footer></footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:where(:not(html, iframe, canvas, img, svg, video, audio, svg *, symbol *)) {
  all: unset;
  display: revert;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  line-height: 1.5;
  font-family: "Poppins", sans-serif;
  background-color: var(--base);
  color: var(--text);
}

a,
button {
  cursor: pointer;
}

img {
  max-inline-size: 100%;
  max-block-size: 100%;
}

table {
  border-collapse: collapse;
}

h1,
h2,
h3,
h4,
h5,
h6,
button,
input,
label {
  line-height: 1.1;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

ul,
ol,
menu {
  list-style: none;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.contents {
  display: contents;
}

:root {
  --page-width: 58rem;
}

/* Catppuccin latte */
html {
  --text: #4c4f69;
  --subtext-1: #5c5f77;
  --subtext-0: #6c6f85;
  --overlay-2: #7c7f93;
  --overlay-1: #8c8fa1;
  --overlay-0: #9ca0b0;
  --surface-2: #acb0be;
  --surface-1: #bcc0cc;
  --surface-0: #ccd0da;
  --base: #eff1f5;
  --mantle: #e6e9ef;
  --crust: #dce0e8;
  --rosewater: #dc8a78;
  --flamingo: #dd7878;
  --pink: #ea76cb;
  --mauve: #8839ef;
  --red: #d20f39;
  --maroon: #e64553;
  --peach: #fe640b;
  --yellow: #df8e1d;
  --green: #40a02b;
  --teal: #179299;
  --sky: #04a5e5;
  --sapphire: #209fb5;
  --blue: #1e66f5;
  --lavender: #7287fd;

  transition-property: --text, --subtext-1, --subtext-0, --overlay-2,
    --overlay-1, --overlay-0, --surface-2, --surface-1, --surface-0, --base,
    --mantle, --crust, --rosewater, --flamingo, --pink, --mauve, --red, --maroon,
    --peach, --yellow, --green, --teal, --sky, --sapphire, --blue, --lavender;
  transition-duration: 250ms;
}

/* Catppuccin frappe */
html.dark {
  --text: #c6d0f5;
  --subtext-1: #b5bfe2;
  --subtext-0: #a5adce;
  --overlay-2: #949cbb;
  --overlay-1: #838ba7;
  --overlay-0: #737994;
  --surface-2: #626880;
  --surface-1: #51576d;
  --surface-0: #414559;
  --base: #303446;
  --mantle: #292c3c;
  --crust: #232634;
  --rosewater: #f2d5cf;
  --flamingo: #eebebe;
  --pink: #f4b8e4;
  --mauve: #ca9ee6;
  --red: #e78284;
  --maroon: #ea999c;
  --peach: #ef9f76;
  --yellow: #e5c890;
  --green: #a6d189;
  --teal: #81c8be;
  --sky: #99d1db;
  --sapphire: #85c1dc;
  --blue: #8caaee;
  --lavender: #babbf1;
}

@property --subtext-1 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --subtext-0 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --overlay-2 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --overlay-1 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --overlay-0 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --surface-2 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --surface-1 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --surface-0 {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --base {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --mantle {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --crust {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --rosewater {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --flamingo {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --pink {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --mauve {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --red {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --maroon {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --peach {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --yellow {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --green {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --teal {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --sky {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --sapphire {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --blue {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
@property --lavender {
  syntax: "<color>";
  inherits: true;
  initial-value: transparent;
}
</style>
