<script setup>
import { computed } from "vue";

const n = 8;
const COUNT = 32;

function* points() {
  const exp = 2 / n;
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const cosSign = Math.sign(cos);
    const sinSign = Math.sign(sin);
    const x = cosSign * (cosSign * cos) ** exp;
    const y = sinSign * (sinSign * sin) ** exp;
    yield { x, y };
  }
}

const path = computed(() => {
  let out = "M 1 0";

  for (const { x, y } of points()) {
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
      viewBox="-1.04 -1.04 2.08 2.08"
      preserveAspectRatio="xMinYMin"
    >
      <path :d="path" />
      <template v-for="{ x, y } in points()">
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
