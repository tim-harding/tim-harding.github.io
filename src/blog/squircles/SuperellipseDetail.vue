<script setup>
import { path, points } from "./shared.mjs";
</script>

<template>
  <div :class="s.root">
    <svg
      :class="s.superellipse"
      viewBox="-1.04 -1.04 2.08 2.08"
      preserveAspectRatio="xMinYMin"
    >
      <path :d="path(points(8, { count: 32 }))" />
      <template v-for="{ x, y } in points(8, { count: 32 })">
        <circle :class="s.point" r="0.02" :cx="x" :cy="y" />
      </template>
    </svg>
  </div>
</template>

<style module="s">
.root {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 9rem) 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: ". superellipse ." ". input .";
  gap: 1rem;
  margin: 2rem 0rem 2rem 0rem;
}

.superellipse {
  grid-area: superellipse;
  fill: var(--surface-0);
  width: 100%;
  aspect-ratio: 1 / 1;
}

.point {
  fill: var(--overlay-2);
}

.inputContainer {
  grid-area: input;
  display: grid;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
}
</style>
