<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      <router-link
        class="comment-author"
        :to="`/@${comment.author.username}`"
      >{{ comment.author.username }}</router-link>
      <span class="date-posted">{{ comment.createdAt | date }}</span>
      <span v-if="isCurrentUser" class="mod-options">
        <i class="ion-trash-a" @click="destroy(slug, comment.id)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { COMMENT_DESTROY } from "@/store/actions.type";

export default {
  props: ["slug", "comment"],
  computed: {
    currentUser() {
      return this.$store.getters["currentUser"];
    },
    isCurrentUser() {
      if (this.currentUser.username && this.comment.author.username) {
        return this.comment.author.username === this.currentUser.username;
      }
      return false;
    }
  },
  methods: {
    destroy(slug, commentId) {
      this.$store.dispatch(COMMENT_DESTROY, { slug, commentId });
    }
  }
};
</script>
