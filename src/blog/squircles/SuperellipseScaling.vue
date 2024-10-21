<script setup>
import { ref } from "vue";
import { path, points } from "./shared.mjs";
import InputRange from "~/components/InputRange.vue";

const n = ref(6);
const a = ref(3);
const b = ref(1);
</script>

<template>
  <div :class="s.root">
    <svg :class="s.superellipse" viewBox="-3 -3 6 6">
      <path :d="path(points(n, { a, b }))"></path>
    </svg>

    <InputRange :class="s.n" v-model="n" min="2" max="8" step="any">
      n: {{ n.toFixed(2) }}
    </InputRange>

    <InputRange :class="s.a" v-model="a" min="0" max="3" step="any">
      a: {{ a.toFixed(2) }}
    </InputRange>

    <InputRange :class="s.b" v-model="b" min="0" max="3" step="any">
      b: {{ b.toFixed(2) }}
    </InputRange>
  </div>
</template>

<style module="s">
.root {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 9rem) minmax(0rem, 9rem) 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    ". superellipse input-n ."
    ". superellipse input-a ."
    ". superellipse input-b .";
  gap: 1rem;
  margin: 2rem 0rem 2rem 0rem;
}

.superellipse {
  grid-area: superellipse;
  fill: var(--surface-2);
  width: 100%;
  aspect-ratio: 1 / 1;
}

.n {
  grid-area: input-n;
}

.a {
  grid-area: input-a;
}

.b {
  grid-area: input-b;
}

.label {
  font-weight: 600;
}
</style>
