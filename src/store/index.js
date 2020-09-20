import Vue from "vue";
import Vuex from "vuex";
import modulesCache from "./modules";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  strict: debug,
  modules: modulesCache,
  plugins: [createPersistedState()]
});

export default store;
// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });
