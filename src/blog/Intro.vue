<script setup>
import { path } from "superellipse-squircle";
</script>

<template>
  <div :class="s.intro">
    <input
      class="sr"
      id="squircle-intro-checkbox"
      type="checkbox"
      checked="checked"
    />
    <label :class="s.label" for="squircle-intro-checkbox">
      <div :class="s.toggleButton"></div>
      Squircle
    </label>

    <svg :class="s.roundedRect" viewBox="0 0 162 100">
      <rect width="162" height="100" rx="16" ry="16"></rect>
    </svg>
    <svg :class="s.squircle" viewBox="0 0 162 100">
      <path :d="path(0, 0, 162, 100, 16)"></path>
    </svg>
  </div>
</template>

<style module="s">
.intro {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 16rem) 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: ". full ." ". button. ";
  gap: 0.5rem;
}

.toggleButton {
  display: grid;
  height: calc(1rem + 4px);
  width: 1.75rem;
  border-radius: calc(0.5rem + 2px);
  background-color: var(--lavender);
  padding: 2px;
  transition: background-color 125ms;

  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: var(--base);
    border-radius: 50%;
    transition: transform 125ms;
  }
}

.squircle,
.roundedRect {
  display: grid;
  grid-area: full;
  fill: var(--surface-2);
}

.roundedRect {
  opacity: 1;
  transition: opacity 125ms;
}

.label {
  grid-area: button;
  font-weight: 400;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem;
  align-items: center;
  justify-self: center;

  &:hover > .toggleButton {
    background-color: var(--sapphire);
  }
}

input:checked {
  & + .label > .toggleButton::before {
    transform: translateX(calc(0.5rem + 1px));
  }

  & ~ .roundedRect {
    opacity: 0;
  }
}
</style>
