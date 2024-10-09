<script setup lang="ts">
import { useData } from "vitepress";
import NotFound from "./NotFound.vue";

const { page } = useData();
</script>

<template>
  <header></header>
  <main>
    <NotFound v-if="page.isNotFound" />
    <Content v-else />
  </main>
  <footer></footer>
</template>

<style lang="postcss" module></style>
