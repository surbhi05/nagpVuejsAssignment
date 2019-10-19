<template>
  <div class="article-preview">
    <ArticleMeta isPreview :article="article" />
    <router-link :to="`/articles/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <TagList :tags="article.tagList" />
    </router-link>
  </div>
</template>

<script>
import ArticleMeta from "./ArticleMeta";
import TagList from "./TagList";

export default {
  components: {
    ArticleMeta,
    TagList
  },
  props: ["article"]
};
</script>
