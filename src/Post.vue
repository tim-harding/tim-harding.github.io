<script setup>
const { post } = defineProps(["post"]);
const { frontmatter } = post;
const { title, description } = frontmatter;
const date = new Date(frontmatter.date);
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augest",
  "September",
  "October",
  "November",
  "December",
][date.getMonth()];
</script>

<template>
  <div :class="s.post">
    <a :class="s.title" :href="post.url">
      {{ title }}
    </a>
    <time :class="s.time" :datetime="date.toUTCString()">
      {{ date.getDate() + 1 }} {{ month }} {{ date.getFullYear() }}
    </time>
    <p :class="s.description">
      {{ description }}
    </p>
  </div>
</template>

<style module="s">
.post {
}

.title {
  font-weight: 600;
}

.time {
  font-weight: 400;

  &::before {
    content: " | ";
  }
}

.description {
  margin: 0rem;
}
</style>
