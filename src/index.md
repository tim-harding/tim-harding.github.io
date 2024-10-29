<script setup>
import Post from "./Post.vue";
import { data as posts } from "./posts.data.js";
</script>

<style module="s">
.posts {
  display: grid;
  row-gap: 1rem;
}
</style>

<ul :class="s.posts">
  <li v-for="post of posts">
    <Post :post="post" />
  </li>
</ul>
