import { defineConfig, createContentLoader } from "vitepress";
import mk from "markdown-it-mathjax3";
import { Feed } from "feed";
import { writeFileSync } from "fs";
import path from "path";

export default defineConfig({
  title: "Tim Harding",
  description: "Blag",
  srcDir: "src",
  appearance: false,
  themeConfig: {},

  vite: {
    server: {
      watch: {
        // For <style module> hot module reloading
        usePolling: true,
      },
    },
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return [
            // From superellipse-squircle
            "th-squircle",
            // From MathJax
            "mjx-assistive-mml",
            "mjx-container",
          ].includes(tag);
        },
      },
    },
  },

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.svg",
      },
    ],
    [
      "script",
      { id: "check-dark-mode" },
      `(() => {
const meta = document.createElement('meta');
meta.setAttribute('name', 'theme-color');
meta.setAttribute('theme-color', '#eff1f5');
document.head.appendChild(meta);
switch (localStorage.getItem("theme")) {
  case "auto":
  case null:
    if (window.matchMedia("(prefers-color-scheme: light)").matches) break;
  case "dark":
    document.documentElement.classList.add("dark");
    meta.setAttribute('content', '#303446');
}})()`,
    ],
  ],

  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
    config: (md) => {
      md.use(mk);
    },
  },

  buildEnd: async (config) => {
    const baseUrl = "https://tim-harding.github.io";

    const feed = new Feed({
      title: "Tim Harding",
      description: "Personal website and blog",
      id: baseUrl,
      link: baseUrl,
      language: "en",
      copyright: "Copyright © 2024, Timothy Harding",
    });

    const posts = await createContentLoader("blog/**/*.md", {}).load();

    posts.sort(
      (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
    );

    for (const { url, frontmatter, html } of posts) {
      feed.addItem({
        title: frontmatter.title,
        id: `${baseUrl}${url}`,
        link: `${baseUrl}${url}`,
        description: frontmatter.description,
        content: html,
        date: frontmatter.date,
        author: [
          {
            name: "Tim Harding",
            email: "tim@timharding.co",
            link: "https://tim-harding.github.io",
          },
        ],
      });
    }

    writeFileSync(path.join(config.outDir, "feed.rss"), feed.rss2());
    writeFileSync(path.join(config.outDir, "feed.atom"), feed.atom1());
  },
});
