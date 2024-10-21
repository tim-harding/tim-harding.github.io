<script setup>
import { computed, ref } from "vue";
import InputRange from "~/components/InputRange.vue";

const n = ref(2);
const COUNT = 128;

function* points() {
  const exp = 2 / n.value;
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
      viewBox="-1 -1 2 2"
      preserveAspectRatio="xMinYMin"
    >
      <path :d="path"></path>
    </svg>

    <InputRange :class="s.input" v-model="n" min="0" max="6" step="any">
      n: {{ n.toFixed(2) }}
    </InputRange>
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
  fill: var(--surface-2);
  width: 100%;
  aspect-ratio: 1 / 1;
}

.input {
  grid-area: input;
}
</style>
