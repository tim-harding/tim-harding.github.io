<script setup>
import { ref } from "vue";
import { path, points } from "./shared.mjs";
import InputRange from "~/components/InputRange.vue";

const n = ref(4);
</script>

<template>
  <div :class="s.root">
    <svg
      :class="s.superellipse"
      viewBox="-1 -1 2 2"
      preserveAspectRatio="xMinYMin"
    >
      <path :d="path(points(n))"></path>
    </svg>

    <InputRange :class="s.input" v-model="n" min="0" max="6" step="any">
      n: {{ n.toFixed(2) }}
    </InputRange>
  </div>
</template>

<style module="s">
.root {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 8rem) 1rem minmax(0rem, 8rem) 1fr;
  grid-template-rows: 1fr max-content 1fr;
  grid-template-areas:
    ". superellipse . .     ."
    ". superellipse . input ."
    ". superellipse . .     .";
  margin: 1.5rem 0rem 2rem 0rem;
}

.superellipse {
  grid-area: superellipse;
  fill: var(--surface-2);
  width: 100%;
  aspect-ratio: 1 / 1;
}

.input {
  grid-area: input;
}
</style>
