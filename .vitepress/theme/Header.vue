<script setup>
import ThemeButton from "./ThemeButton.vue";
</script>

<template>
  <header :class="s.header">
    <div :class="s.headerContents">
      <nav>
        <ul :class="s.list">
          <li>
            <a :class="[s.siteTitle, s.link]" href="/">Harding</a>
          </li>
          <li>
            <a :class="s.link" href="/blog">Blog</a>
          </li>
          <li>
            <a :class="s.link" href="/about">About</a>
          </li>
          <li>
            <a
              :class="s.link"
              href="https://github.com/tim-harding/"
              target="_blank"
              >GitHub</a
            >
          </li>
        </ul>
      </nav>
      <ThemeButton :class="s.themeButton" />
    </div>
  </header>
</template>

<style module="s">
.header {
  display: grid;
  grid-template-columns: 1fr 1rem minmax(0rem, var(--page-width)) 1rem 1fr;
  grid-template-rows: 4rem;
  grid-template-areas: ". . center . .";
  background-color: var(--mantle);
  border-bottom: 1px solid var(--crust);
}

.headerContents {
  grid-area: center;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-areas: "nav theme-button";
  align-items: center;
  gap: 1rem;
}

.list {
  grid-area: nav;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  gap: 1.5rem;
  align-items: center;
}

.link {
  font-weight: 500;
  transition: color 125ms;

  &:hover {
    color: var(--blue);
  }

  &:active {
    color: var(--sky);
  }
}

.siteTitle {
  font-size: 2rem;
  font-weight: 800;
}

.themeButton {
  grid-area: theme-button;
}
</style>
