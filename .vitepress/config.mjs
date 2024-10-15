import { defineConfig } from "vitepress";
import mk from "markdown-it-mathjax3";

export default defineConfig({
  title: "Tim Harding",
  description: "Blag",
  srcDir: "src",
  appearance: false,
  head: [
    [
      "script",
      { id: "check-dark-mode" },
      `(() => {
switch (localStorage.getItem("theme")) {
  case "auto":
  case null:
    if (window.matchMedia("(prefers-color-scheme: light)").matches) break;
  case "dark":
    document.documentElement.classList.add("dark");
}})()`,
    ],
  ],
  themeConfig: {},
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config: (md) => {
      md.use(mk);
    },
  },
  vite: {},
});
