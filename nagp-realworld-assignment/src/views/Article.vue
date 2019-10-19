<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <Tag :name="tag" class="tag-default tag-pill tag-outline"></Tag>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor v-if="isAuthenticated" :slug="slug" :userImage="currentUser.image"></CommentEditor>
          <p v-else>
            <router-link to="/login">Sign in</router-link> or
            <router-link to="/register"> sign up</router-link> to add comments on this article.
          </p>
          <Comment
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
          ></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import store from "@/store";
import ArticleMeta from "@/components/ArticleMeta";
import Comment from "@/components/Comment";
import CommentEditor from "@/components/CommentEditor";
import Tag from "@/components/VTag";
import { FETCH_ARTICLE, FETCH_COMMENTS } from "@/store/actions.type";

export default {
  props: ["slug"],
  components: {
    ArticleMeta,
    Comment,
    CommentEditor,
    Tag
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_ARTICLE, to.params.slug),
      store.dispatch(FETCH_COMMENTS, to.params.slug)
    ]).then(() => {
      next();
    });
  },
  computed: {
    article() {
      return this.$store.getters["article"];
    },
    currentUser() {
      return this.$store.getters["currentUser"];
    },
    comments() {
      return this.$store.getters["comments"];
    },
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    }
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
