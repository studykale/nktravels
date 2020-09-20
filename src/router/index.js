import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: () => import("../views/contactus.vue")
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/gallery.vue")
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/destination_detail.vue")
  },
  {
    path: "/find-trip",
    name: "FindTrip",
    component: () => import("../views/find_trip.vue")
  },
  {
    path: "/admin/auth/signin",
    name: "SignIn",
    component: () => import("../views/signin.vue")
  },
  {
    path: "/admin/auth/signup",
    name: "SignUp",
    component: () => import("../views/signup.vue")
  },
  {
    path: "/admin/auth/pass-change-req",
    name: "ResetPass",
    component: () => import("../views/reset_pass.vue")
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
