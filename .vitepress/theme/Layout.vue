<script setup>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div :class="s.layout">
    <Header :class="s.header" />
    <Main :class="s.main" />
    <Footer :class="s.footer" />
  </div>
</template>

<style lang="scss" module="s">
.layout {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas: "header" "main" "footer";
  min-height: 100vh;
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
  padding-top: 3rem;
}

.footer {
  grid-area: footer;
}
</style>
