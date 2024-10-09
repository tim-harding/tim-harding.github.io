<script setup>
import ThemeButton from "./ThemeButton.vue";
</script>

<template>
  <header class="header">
    <nav class="nav">
      <ul class="ul">
        <li class="contents">
          <a href="/" class="site-title">Harding</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/resume">Resumé</a>
        </li>
      </ul>
    </nav>
    <ThemeButton class="theme-button" />
  </header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: [nav-start] 1fr max-content [nav-end];
  grid-template-rows: [nav-start] 4rem [nav-end];
  grid-template-areas: ". theme-button";
  background-color: var(--mantle);
}

.nav {
  grid-area: nav;
  display: grid;
  grid-template-columns: 1fr 1rem minmax(0rem, 48rem) 1rem 1fr;
  grid-template-areas: ". . ul . .";
}

.ul {
  grid-area: ul;
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  gap: 1rem;
}

.site-title {
  font-size: 2rem;
  font-weight: 700;
}

.theme-button {
  grid-area: theme-button;
  margin: 1rem 1rem 0rem 0rem;
}
</style>
