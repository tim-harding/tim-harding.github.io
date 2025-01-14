<script setup>
import Post from "./Post.vue";
import { data as posts } from "./posts.data.js";
</script>

<style module="s">
.posts {
  display: grid;
  row-gap: 1rem;
}

.subscribe {
  margin-bottom: 1.25rem;
}

.link {
  font-weight: 500;
}
</style>

<div :class="s.subscribe">
  Subscribe with
  <a href="/blog.rss.xml" :class="s.link">RSS</a>
  or
  <a href="/blog.atom.xml" :class="s.link">Atom</a>
</div>

<ul :class="s.posts">
  <li v-for="post of posts">
    <Post :post="post" />
  </li>
</ul>
