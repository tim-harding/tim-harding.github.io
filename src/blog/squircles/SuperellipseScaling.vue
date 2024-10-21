<script setup>
import { computed, ref } from "vue";
import InputRange from "~/components/InputRange.vue";

const n = ref(6);
const a = ref(3);
const b = ref(1);

const COUNT = 128;
function* points() {
  const aVal = a.value;
  const bVal = b.value;
  const exp = 2 / n.value;
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const cosSign = Math.sign(cos);
    const sinSign = Math.sign(sin);
    const x = aVal * cosSign * (cosSign * cos) ** exp;
    const y = bVal * sinSign * (sinSign * sin) ** exp;
    yield { x, y };
  }
}

const path = computed(() => {
  const iter = points();
  const { x: xInit, y: yInit } = iter.next().value;
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
      viewBox="-3 -3 6 6"
      preserveAspectRatio="xMinYMin"
    >
      <path :d="path"></path>
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
