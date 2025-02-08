<script setup>
import Post from "./Post.vue";
import Scout from "./Scout.vue";
import { data as posts } from "./posts.data.js";
</script>

<style module="s">
.posts {
  display: grid;
  row-gap: 1rem;
}

.subscribe {
}

.scout {
  margin-bottom: 1.25rem;
}

.link {
  font-weight: 500;
}

.item {
  &::before {
    display: none;
  }
}
</style>

<div :class="s.subscribe">
  Subscribe with
  <a href="/blog.rss.xml" :class="s.link">RSS</a>
  or
  <a href="/blog.atom.xml" :class="s.link">Atom</a>
</div>

<Scout :class="s.scout"></Scout>

<ul :class="s.posts">
  <li v-for="post of posts" :class="s.item">
    <Post :post="post" />
  </li>
</ul>
