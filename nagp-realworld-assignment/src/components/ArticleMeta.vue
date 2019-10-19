<template>
  <div class="article-meta">
    <router-link :to="`/@${article.author.username}`">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link :to="`/@${article.author.username}`" class="author">{{ article.author.username }}</router-link>
      <span class="date">{{ article.createdAt | date }}</span>
    </div>
    <template v-if="actions">
      <ArticleActions :article="article" :canModify="isCurrentUser()"></ArticleActions>
    </template>
    <template v-else>
      <button
        class="btn btn-sm pull-xs-right"
        v-if="!actions"
        @click="toggleFavorite"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>
  </div>
</template>

<script>
import ArticleActions from "@/components/ArticleActions";
import { FAVORITE_ADD, FAVORITE_REMOVE } from "@/store/actions.type";

export default {
  components: {
    ArticleActions
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters["currentUser"];
    },
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    }
  },
  methods: {
    isCurrentUser() {
      if (this.currentUser.username && this.article.author.username) {
        return this.currentUser.username === this.article.author.username;
      }
      return false;
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push("/login");
        return;
      }
      const action = this.article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD;
      this.$store.dispatch(action, this.article.slug);
    }
  }
};
</script>
