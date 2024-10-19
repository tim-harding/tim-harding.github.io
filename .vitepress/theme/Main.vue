<script setup>
import NotFound from "./NotFound.vue";
import { useData } from "vitepress";

const { page } = useData();
</script>

<template>
  <main :class="s.main">
    <div :class="s.inner">
      <NotFound v-if="page.isNotFound" />
      <Content v-else />
    </div>
  </main>
</template>

<style module="s">
.main {
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr var(--page-margin) minmax(
      0rem,
      var(--content-width)
    ) var(--page-margin) 1fr;
  grid-template-areas: ". . center . .";
}

.inner {
  grid-area: center;
}
</style>
