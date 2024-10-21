<script setup>
import ToggleButton from "~/components/ToggleButton.vue";
import { path } from "superellipse-squircle";
import { ref } from "vue";

const isSquircle = ref(true);
</script>

<template>
  <div :class="s.intro">
    <ToggleButton :class="s.button" v-model="isSquircle">Squircle</ToggleButton>

    <svg
      :class="{ [s.roundedRect]: true, [s.show]: !isSquircle }"
      viewBox="0 0 162 100"
    >
      <rect width="162" height="100" rx="16" ry="16"></rect>
    </svg>

    <svg :class="s.squircle" viewBox="0 0 162 100">
      <path :d="path(0, 0, 162, 100, 16)"></path>
    </svg>
  </div>
</template>

<style module="s">
.intro {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 16rem) 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: ". full ." ". button .";
  gap: 0.5rem;
}

.button {
  grid-area: button;
  justify-self: center;
}

.squircle,
.roundedRect {
  display: grid;
  grid-area: full;
  fill: var(--surface-2);
}

.roundedRect {
  opacity: 0;
  transition: opacity 125ms;
}

.show {
  opacity: 1;
}
</style>
