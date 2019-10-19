<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                  to="/my-feed"
                  class="nav-link"
                  active-class="active"
                >Your Feed</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/"
                  exact
                  class="nav-link"
                  active-class="active"
                >Global Feed</router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link :to="`tag/${tag}`" class="nav-link" active-class="active">
                  <i class="ion-pound"></i>
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <Tag v-for="(tag, index) in tags" :name="tag" :key="index"></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/VTag";
import { FETCH_TAGS } from "@/store/actions.type";

export default {
  components: {
    Tag
  },
  created() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    },
    tags() {
      return this.$store.getters["tags"];
    },
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
