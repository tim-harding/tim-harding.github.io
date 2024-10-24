<script setup>
import { ref } from "vue";
import { path, points } from "./shared.mjs";
import ToggleButton from "~/components/ToggleButton.vue";

const isSquircle = ref(true);
</script>

<template>
  <div :class="s.intro">
    <ToggleButton :class="s.button" v-model="isSquircle">Squircle</ToggleButton>

    <svg
      :class="{ [s.roundedRect]: true, [s.show]: !isSquircle }"
      viewBox="0 0 162 100"
      preserveAspectRatio="xMinYMin meet"
    >
      <rect width="162" height="100" rx="16" ry="16"></rect>
    </svg>

    <svg :class="s.squircle" viewBox="-1.618 -1 3.236 2">
      <path :d="path(points(6, { xOff: 0.618 }))"></path>
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
  width: 100%;
}

.roundedRect {
  opacity: 0;
  transition: opacity 125ms;
}

.show {
  opacity: 1;
}
</style>
