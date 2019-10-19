import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import home from "./home.module";
import auth from "./auth.module";
import article from "./article.module";
import profile from "./profile.module";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ token: state.auth.user.token })
})

export default new Vuex.Store({
  modules: {
    home,
    auth,
    article,
    profile
  },
  plugins: [vuexLocal.plugin]
});
