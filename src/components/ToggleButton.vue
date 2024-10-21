<script setup>
const model = defineModel({ default: false });
const props = defineProps({
  label: String,
});
</script>

<template>
  <button :class="s.toggleButton" :aria-pressed="model" @click="model = !model">
    <span :class="s.text">{{ label }}</span>
    <div :class="{ [s.toggle]: true, [s.pressed]: model }">
      <div :class="s.toggleInner"></div>
    </div>
  </button>
</template>

<style module="s">
.toggleButton {
  display: grid;
  grid-template-columns: 1fr 1.875rem;
  grid-template-rows: max-content;
  grid-template-areas: "text toggle";
  align-items: center;
}

.text {
  grid-area: text;
}

.toggle {
  grid-area: toggle;
  display: grid;
  grid-template-columns: 0fr 1rem 1fr;
  grid-template-rows: 1rem;
  grid-template-areas: ". center .";
  height: calc(1rem + 4px);
  border-radius: calc(0.5rem + 2px);
  background-color: var(--lavender);
  padding: 2px;
  transition:
    background-color 125ms,
    grid-template-columns 125ms;
}

.toggleInner {
  content: "";
  grid-area: center;
  background-color: var(--base);
  border-radius: 0.5rem;
  transition: transform 125ms;
}

.pressed {
  grid-template-columns: 1fr 1rem 0fr;
}
</style>
