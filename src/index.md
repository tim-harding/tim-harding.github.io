<script setup>
import Post from "./Post.vue";
import { data as posts } from "./posts.data.js";
</script>

<ul>
  <li v-for="post of posts">
    <Post :post="post" />
  </li>
</ul>
