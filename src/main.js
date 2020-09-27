import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import VueMoment from "vue-moment";
import VueMasonry from "vue-masonry-css";
import CKEditor from "@ckeditor/ckeditor5-vue";
import VueCookies from "vue-cookies";

Vue.use(VueMoment);
Vue.use(VueMasonry);
Vue.use(CKEditor);
Vue.use(VueCookies);

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

import "./plugins/buefy";
import { auth } from "./db";

auth.onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
    mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
  }).$mount("#app");
});
