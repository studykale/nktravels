import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import VueMoment from "vue-moment";
import VueMasonry from "vue-masonry-css";
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.use(VueMoment);
Vue.use(VueMasonry);
Vue.use(CKEditor);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

import "./plugins/buefy";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
