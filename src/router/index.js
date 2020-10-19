import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Meta from "vue-meta";

Vue.use(VueRouter);

Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
      sitemap: {
        lastmod: "October 19, 2020",
        priority: 0.8,
        changefreq: "monthly"
      }
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      requiresAuth: false,
      sitemap: {
        lastmod: "October 19, 2020",
        priority: 0.8,
        changefreq: "monthly"
      }
    }
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: () => import("../views/contactus.vue"),
    meta: {
      requiresAuth: false,
      sitemap: {
        lastmod: "October 19, 2020",
        priority: 0.8,
        changefreq: "monthly"
      }
    }
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () => import("../views/gallery.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/detail/company/:companyId/:tripName/:tripId",
    name: "Detail",
    component: () => import("../views/destination_detail.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/find-trip",
    name: "FindTrip",
    component: () => import("../views/find_trip.vue"),
    meta: {
      requiresAuth: false,
      sitemap: {
        lastmod: "October 19, 2020",
        priority: 0.8,
        changefreq: "monthly"
      }
    }
  },
  {
    path: "/admin/auth/signin",
    name: "SignIn",
    component: () => import("../views/signin.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/admin/auth/signup",
    name: "SignUp",
    component: () => import("../views/signup.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/admin/auth/pass-change-req",
    name: "ResetPass",
    component: () => import("../views/reset_pass.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
    meta: {
      requiresAuth: false
    }
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
        path: "bookings",
        name: "Bookings",
        component: () => import("@/views/admin/bookings.vue")
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
    ],
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    //https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  let isLoggedIn = window.$cookies.isKey("loggedIn");

  //("loggedIn", isLoggedIn)
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // //("currentUser", currentUser)
  if (requiresAuth && !isLoggedIn) {
    next("/admin/auth/signin");
  } else if (!requiresAuth && isLoggedIn) next("/admin/dashboard");
  else next();
});

export default router;
