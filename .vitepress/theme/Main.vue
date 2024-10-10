<script setup>
import NotFound from "./NotFound.vue";
import { useData } from "vitepress";

const { page } = useData();
</script>

<template>
  <main class="main">
    <div class="inner">
      <NotFound v-if="page.isNotFound" />
      <Content v-else />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr 1rem minmax(0rem, var(--page-width)) 1rem 1fr;
  grid-template-areas: ". . center . .";
}

.inner {
  grid-area: center;
}
</style>
