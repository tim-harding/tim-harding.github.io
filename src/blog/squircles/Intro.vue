<script setup>
import ToggleButton from "~/components/ToggleButton.vue";
import { ref } from "vue";

const COUNT = 128;
function* points() {
  const xOff = 0.618;
  const yOff = 0;
  const exp = 0.333;
  for (let i = 0; i < COUNT; i++) {
    const t = (i / COUNT) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const cosSign = Math.sign(cos);
    const sinSign = Math.sign(sin);
    const x = cosSign * (cosSign * cos) ** exp + xOff * cosSign;
    const y = sinSign * (sinSign * sin) ** exp + yOff * sinSign;
    yield { x, y };
  }
}

function path() {
  const iter = points();
  const { x: xInit, y: yInit } = iter.next().value ?? { x: 0, y: 0 };
  let out = `M ${xInit} ${yInit}`;
  for (const { x, y } of iter) {
    out += ` L ${x} ${y}`;
  }
  out += " Z";
  return out;
}

const isSquircle = ref(true);
</script>

<template>
  <div :class="s.intro">
    <ToggleButton :class="s.button" v-model="isSquircle">Squircle</ToggleButton>

    <svg
      :class="{ [s.roundedRect]: true, [s.show]: !isSquircle }"
      viewBox="0 0 162 100"
    >
      <rect width="162" height="100" rx="16" ry="16"></rect>
    </svg>

    <svg :class="s.squircle" viewBox="-1.618 -1 3.236 2">
      <path :d="path()"></path>
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
}

.roundedRect {
  opacity: 0;
  transition: opacity 125ms;
}

.show {
  opacity: 1;
}
</style>
