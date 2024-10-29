<script setup>
import ThemeButton from "./ThemeButton.vue";
import { ref } from "vue";

const isOpen = ref(false);
const close = () => (isOpen.value = false);
</script>

<template>
  <header :class="s.header" id="header">
    <div :class="s.headerInner">
      <nav :class="s.nav">
        <ul :class="s.list">
          <li :class="s.siteTitle">
            <a :class="s.link" href="/" @click="close">
              Harding
              <span class="sr">home page</span>
            </a>
          </li>
          <li :class="s.resume">
            <a :class="s.link" href="/resume" @click="close">Resumé</a>
          </li>
          <li :class="s.github">
            <a
              :class="s.link"
              href="https://github.com/tim-harding/"
              target="_blank"
              >GitHub</a
            >
          </li>
        </ul>
      </nav>

      <button
        :class="['icon-button', s.disclosure]"
        :aria-pressed="isOpen"
        aria-controls="header"
        @click="isOpen = !isOpen"
      >
        <svg
          :class="s.icon"
          viewBox="0 -960 960 960"
          height="24px"
          width="24px"
        >
          <path
            d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
          />
        </svg>
      </button>
      <ThemeButton :class="s.themeButton" />
    </div>
  </header>
</template>

<style module="s">
.header {
  display: grid;
  grid-template-columns:
    1fr var(--page-margin) minmax(0rem, var(--content-width))
    var(--page-margin) 1fr;
  grid-template-areas: ". . center . .";
  background-color: var(--mantle);
  border-bottom: 1px solid var(--crust);
  overflow: hidden;
}

.headerInner {
  grid-area: center;
  display: grid;
  grid-template-columns: 1fr repeat(3, max-content);
  grid-template-rows: 4rem;
  grid-template-areas: "site-title resume github theme-button";
  align-items: center;
  gap: 1rem;
}

.siteTitle {
  grid-area: site-title;

  & > .link {
    font-size: 2rem;
    font-weight: 800;
  }
}

.resume {
  grid-area: resume;
}

.github {
  grid-area: github;
}

.nav,
.list {
  display: contents;
}

.link {
  color: inherit;
  font-weight: 500;

  &:hover {
    color: var(--blue);
  }

  &:active {
    color: var(--sky);
  }
}

.themeButton {
  grid-area: theme-button;
  margin-right: -0.5rem;
}

.icon {
  fill: var(--text);
}

button.disclosure {
  display: none;
}

@media (max-width: 460px) {
  button.disclosure {
    display: grid;
  }

  .headerInner {
    grid-template-columns: 1fr max-content;
    grid-template-rows: 4rem repeat(2, 0rem);
    grid-template-areas:
      "site-title collapse"
      "resume theme-button"
      "github theme-button";
    gap: 0rem;
    transition-property: grid-template-rows;

    &:has(.disclosure[aria-pressed="true"]) {
      grid-template-rows: 4rem repeat(2, 2rem);
    }
  }

  .resume,
  .github,
  .themeButton {
    align-self: start;
  }
}
</style>
