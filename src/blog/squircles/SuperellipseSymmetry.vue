<script setup>
import { computed, ref } from "vue";
import InputRange from "~/components/InputRange.vue";

const aspectInput = ref(0.732051);
const aspect = computed(() => (aspectInput.value + 1) ** 2 * 0.5 + 0.5);
const aspectPrecision = computed(() => aspect.value.toFixed(2));
const xOff = computed(() => Math.max(0, aspect.value - 1));
const yOff = computed(() => 1 / (1 + Math.min(0, aspect.value - 1)) - 1);

const COUNT = 128;
function* points() {
  const exp = 0.5;
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const cosSign = Math.sign(cos);
    const sinSign = Math.sign(sin);
    const x = cosSign * (cosSign * cos) ** exp + xOff.value * cosSign;
    const y = sinSign * (sinSign * sin) ** exp + yOff.value * sinSign;
    yield { x, y };
  }
}

const path = computed(() => {
  const iter = points();
  const { x: xInit, y: yInit } = iter.next()?.value ?? { x: 0, y: 0 };
  let out = `M ${xInit} ${yInit}`;

  for (const { x, y } of iter) {
    out += ` L ${x} ${y}`;
  }

  out += " Z";
  return out;
});
</script>

<template>
  <div :class="s.root">
    <svg
      :class="s.superellipse"
      viewBox="-2.5 -2.5 5 5"
      preserveAspectRatio="xMinYMin"
    >
      <mask id="superellipse-symmetry-mask">
        <rect x="-2.5" y="-2.5" width="5" height="5" fill="black"></rect>
        <path :d="path" fill="white"></path>
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
      :class="s.aspect"
      v-model="aspectInput"
      min="-1"
      max="1"
      step="any"
    >
      Aspect ratio: {{ aspectPrecision }}
    </InputRange>
  </div>
</template>

<style module="s">
.root {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 9rem) minmax(0rem, 9rem) 1fr;
  grid-template-rows: repeat(1, 1fr);
  grid-template-areas: ". superellipse aspect .";
  gap: 1rem;
  margin: 2rem 0rem 2rem 0rem;
}

.upperLeft {
  fill: var(--overlay-0);
}

.upperRight {
  fill: var(--overlay-1);
}

.lowerLeft {
  fill: var(--overlay-1);
}

.lowerRight {
  fill: var(--overlay-0);
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
  aspect-ratio: 1 / 1;
}

.aspect {
  grid-area: aspect;
}

.label {
  font-weight: 600;
}
</style>
