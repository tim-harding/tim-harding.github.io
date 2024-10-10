<script setup>
import ThemeButton from "./ThemeButton.vue";
</script>

<template>
  <header class="header">
    <div class="header-contents">
      <nav>
        <ul class="list">
          <li>
            <a class="site-title link" href="/">Harding</a>
          </li>
          <li>
            <a class="link" href="/blog">Blog</a>
          </li>
          <li>
            <a class="link" href="/resume">Resumé</a>
          </li>
        </ul>
      </nav>
      <ThemeButton class="theme-button" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1rem minmax(0rem, var(--page-width)) 1rem 1fr;
  grid-template-rows: 4rem;
  grid-template-areas: ". . center . .";
  background-color: var(--mantle);
}

.header-contents {
  grid-area: center;
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-areas: "nav theme-button";
  align-items: center;
  gap: 2rem;
}

.list {
  grid-area: nav;
  display: grid;
  grid-template-columns: 1fr max-content max-content;
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

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
  }
}

.site-title {
  font-size: 2rem;
  font-weight: 900;
}

.theme-button {
  grid-area: theme-button;
}
</style>
