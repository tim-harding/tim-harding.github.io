<script setup>
import { computed, ref } from "vue";
import { path, points } from "./shared.mjs";
import InputRange from "~/components/InputRange.vue";

const aspectInput = ref(0.732051);
const aspect = computed(() => (aspectInput.value + 1) ** 2 * 0.5 + 0.5);
const xOff = computed(() => Math.max(0, aspect.value - 1));
const yOff = computed(() => 1 / (1 + Math.min(0, aspect.value - 1)) - 1);
</script>

<template>
  <div :class="s.root">
    <svg :class="s.superellipse" viewBox="-2.5 -2 5 4">
      <mask id="superellipse-symmetry-mask">
        <rect x="-2.5" y="-2.5" width="5" height="5" fill="black"></rect>
        <path :d="path(points(4, { xOff, yOff }))" fill="white"></path>
      </mask>

      <g mask="url(#superellipse-symmetry-mask)">
        <rect :class="s.rest" x="-2.5" y="-2.5" width="5" height="5"></rect>
        <rect
          :class="s.upperLeft"
          :x="-xOff - 1.1"
          :y="-yOff - 1.1"
          width="1.1"
          height="1.1"
        ></rect>

        <rect
          :class="s.upperRight"
          :x="xOff"
          :y="-yOff - 1.1"
          width="1.1"
          height="1.1"
        ></rect>

        <rect
          :class="s.lowerLeft"
          :x="-xOff - 1.1"
          :y="yOff"
          width="1.1"
          height="1.1"
        ></rect>

        <rect
          :class="s.lowerRight"
          :x="xOff"
          :y="yOff"
          width="1.1"
          height="1.1"
        ></rect>
      </g>
    </svg>

    <InputRange
      :class="s.input"
      v-model="aspectInput"
      min="-1"
      max="1"
      step="any"
    >
      Aspect ratio: {{ aspect.toFixed(2) }}
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
}

.upperLeft,
.upperRight,
.lowerLeft,
.lowerRight {
  stroke-width: 0.025;
  stroke: var(--text);
}

.rest {
  fill: var(--surface-2);
}

.superellipse {
  grid-area: superellipse;
  fill: var(--surface-2);
  width: 100%;
}

.input {
  grid-area: input;
}
</style>
