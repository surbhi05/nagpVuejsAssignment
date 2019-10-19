<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" exact to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" active-class="active" exact to="/login">
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" active-class="active" exact to="/register">
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" active-class="active" :to="{ name: 'article-edit' }">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" active-class="active" exact to="/settings">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated && currentUser.username">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="`/@${currentUser.username}`"
          >{{ currentUser.username }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.getters["currentUser"];
    },
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    }
  }
};
</script>
