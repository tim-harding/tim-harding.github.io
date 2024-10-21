<script setup>
import { useId, useAttrs, computed } from "vue";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({ default: 0 });
const attributes = useAttrs();
const id = useId();

const klass = computed(() => {
  const { class: klass } = attributes;
  return klass;
});

const inputAttributes = computed(() => {
  const { class: _, ...inputAttributes } = attributes;
  return inputAttributes;
});
</script>

<template>
  <div :class="[s.inputRange, klass]">
    <label :class="s.label" :for="id">
      <slot></slot>
    </label>
    <input
      :class="s.input"
      :id
      type="range"
      v-bind="inputAttributes"
      v-model.number="model"
      @touchstart="(event) => event.stopPropagation()"
      @touchmove="(event) => event.stopPropagation()"
    />
  </div>
</template>

<style module="s">
.inputRange {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, max-content);
  grid-template-areas: "label" "slider";
  gap: 0.5rem;
}

.label {
  grid-area: label;
  font-weight: 400;
}

.input {
  grid-area: slider;
  all: unset;
  width: 100%;
  height: 1rem;

  &::-moz-range-track {
    box-sizing: border-box;
    background-color: var(--surface-1);
    border-radius: 0.125rem;
    border: 1px solid var(--surface-2);
    height: 0.25rem;
  }

  &::-moz-range-thumb {
    border: none;
    background-color: var(--rosewater);
    width: 1rem;
    height: 1rem;
  }
}
</style>
