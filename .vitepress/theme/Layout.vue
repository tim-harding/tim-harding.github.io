<script setup>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="layout">
    <Header class="header" />
    <Main class="main" />
    <Footer class="footer" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas: "header" "main" "footer";
  min-height: 100vh;
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
  padding-top: 3rem;
}

.footer {
  grid-area: footer;
}
</style>

<style>
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
  font-family: "Concourse", sans-serif;
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

:root {
  --page-width: 36rem;
  font-size: 20px;
  scrollbar-color: var(--surface-2) var(--crust);
}

::selection {
  background-color: var(--blue);
  color: var(--base);
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

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 2 Tab");
  font-weight: 200;
}

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 3 Tab");
  font-weight: 300;
}

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 4 Tab");
  font-weight: 400;
}

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 6 Tab");
  font-weight: 600;
}

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 7 Tab");
  font-weight: 700;
}

@font-face {
  font-family: "Concourse Tab";
  src: local("Concourse 8 Tab");
  font-weight: 800;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 2 Caps");
  font-weight: 200;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 3 Caps");
  font-weight: 300;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 4 Caps");
  font-weight: 400;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 6 Caps");
  font-weight: 600;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 7 Caps");
  font-weight: 700;
}

@font-face {
  font-family: "Concourse Caps";
  src: local("Concourse 8 Caps");
  font-weight: 800;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 2");
  font-weight: 200;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 3");
  font-weight: 300;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 4");
  font-weight: 400;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 6");
  font-weight: 600;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 7");
  font-weight: 700;
}

@font-face {
  font-family: "Concourse";
  src: local("Concourse 8");
  font-weight: 800;
}

h1 {
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.5rem;
}

div[class*="language-"] {
  & > .copy {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3C/svg%3E")
      no-repeat;
    width: 2rem;
    height: 2rem;
  }

  & > .lang {
    display: none;
  }

  & > code {
    display: grid;

    & > .line {
      & > span {
        color: var(--shiki-light);
        font-style: var(--shiki-light-font-style);
      }
    }
  }
}

.dark code > .line > span {
  color: var(--shiki-dark);
  font-style: var(--shiki-dark-font-style);
}
</style>
