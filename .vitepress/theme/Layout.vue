<script setup lang="ts">
import { useData } from 'vitepress'
// See https://vitepress.dev/reference/runtime-api
const { page, frontmatter } = useData()
</script>

<template>
    <div v-if="page.isNotFound">
        404
    </div>
    <div v-if="frontmatter.layout === 'home'">
        Custom homepage
    </div>
    <div v-else>
        <h1>Hello</h1>
        <Content />
    </div>
</template>

<style lang="postcss" module></style>
