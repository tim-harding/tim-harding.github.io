<script setup>
import { computed } from "vue";
import { ref } from "vue";

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
      <path :d="path"></path>
    </svg>

    <div :class="s.aspect">
      <label :class="s.label" for="superellipse-scaling-b"
        >Aspect ratio: {{ aspectPrecision }}</label
      >
      <input
        id="superellipse-scaling-b"
        type="range"
        min="-1"
        max="1"
        step="any"
        :value="aspectInput"
        @input="(event) => (aspectInput = parseFloat(event.target?.value))"
      />
    </div>
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

.superellipse {
  grid-area: superellipse;
  fill: var(--surface-2);
  width: 100%;
  aspect-ratio: 1 / 1;
}

.aspect {
  grid-area: aspect;
  display: grid;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
}
</style>
