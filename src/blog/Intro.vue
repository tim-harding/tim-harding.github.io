<script setup>
import { path } from "superellipse-squircle";
</script>

<template>
  <div :class="s.squirclesIntro">
    <input
      class="sr"
      id="squircle-intro-checkbox"
      type="checkbox"
      checked="checked"
    />
    <label :class="s.squirclesIntroLabel" for="squircle-intro-checkbox">
      <div :class="s.squirclesIntroToggleButton"></div>
      Squircle
    </label>

    <svg :class="s.squirclesIntroRoundedRect" viewBox="0 0 162 100">
      <rect width="162" height="100" rx="16" ry="16"></rect>
    </svg>
    <svg :class="s.squirclesIntroSquircle" viewBox="0 0 162 100">
      <path :d="path(0, 0, 162, 100, 16)"></path>
    </svg>
  </div>
</template>

<style module="s">
.squirclesIntro {
  display: grid;
  grid-template-columns: 1fr minmax(0rem, 16rem) 1fr;
  grid-template-rows: 1fr max-content;
  grid-template-areas: ". full ." ". button. ";
  gap: 0.5rem;
}

.squirclesIntroToggleButton {
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

.squirclesIntroSquircle,
.squirclesIntroRoundedRect {
  display: grid;
  grid-area: full;
  fill: var(--surface-2);
}

.squirclesIntroRoundedRect {
  opacity: 1;
  transition: opacity 125ms;
}

.squirclesIntroLabel {
  grid-area: button;
  font-weight: 400;
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem;
  align-items: center;
  justify-self: center;

  &:hover > .squirclesIntroToggleButton {
    background-color: var(--sapphire);
  }
}

input:checked {
  & + .squirclesIntroLabel > .squirclesIntroToggleButton::before {
    transform: translateX(calc(0.5rem + 1px));
  }

  & ~ .squirclesIntroRoundedRect {
    opacity: 0;
  }
}
</style>
