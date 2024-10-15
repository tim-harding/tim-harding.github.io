<script setup>
import Header from "./Header.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div class="layout">
    <Header class="header" />
    <Main class="main" />
    <Footer class="footer" />
  </div>
</template>

<style lang="scss" scoped>
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
