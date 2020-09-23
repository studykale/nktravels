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
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/admin/layout/admin_layout.vue"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/admin/home.vue")
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/admin/settings")
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/admin/profile.vue")
      },
      {
        path: "create-company",
        name: "CreateCompany",
        component: () => import("@/views/admin/create_company.vue")
      },
      {
        path: "manage-destinations",
        name: "ManageDestinations",
        component: () => import("@/views/admin/manage_destinations.vue")
      },
      {
        path: "add-trip",
        name: "AddTrip",
        component: () => import("@/views/admin/add_trip.vue")
      },
      {
        path: "search",
        name: "Search",
        component: () => import("@/views/admin/search.vue")
      },
      {
        path: "archives",
        name: "Archive",
        component: () => import("@/views/admin/archives.vue")
      },
      {
        path: "manage-companies",
        name: "ManageCompanies",
        component: () => import("@/views/admin/manage_companies.vue")
      },
      {
        path: "*",
        redirect: "/admin/dashboard"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
