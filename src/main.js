import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import VueMoment from "vue-moment";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMoment);
Vue.use(VueMasonry);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

import "./plugins/buefy";

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");
