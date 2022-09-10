import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EditTransaction from "../views/EditTransaction.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    // component: () => import('../views/Home.vue')
    meta: { requiresAuth: true },
  },
  {
    path: "/transactions/:id",
    name: "EditTransaction",
    component: EditTransaction,
    params: true,
    // component: () => import('../views/EditExpense.vue')
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userIsLoggedOut = !window.localStorage.getItem("partnerToken");
//   const routeIsGuarded = !to.meta.noAuth;
//   const routeIsGuestOnly = !!to.meta.guestOnly;

//   window.scrollTo(window.scrollX, 0);

//   if (routeIsGuarded) {
//     if (userIsLoggedOut) {
//       return next({ name: "Login", query: { redirect: to.path } });
//     }

//     return next();
//   } else {
//     if (routeIsGuestOnly && !userIsLoggedOut) {
//       return next({ name: "Dashboard" });
//     }

//     return next();
//   }
//   // if (userIsLoggedOut) {
//   //   return next({ name: "Login", query: { redirect: to.path } });
//   // } else {
//   //   return next({ name: "Dashboard" });
//   // }
// });

router.beforeEach((to, from, next) => {
  const userIsLoggedIn = window.localStorage.getItem("expenseToken");

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (userIsLoggedIn) {
      next();
    } else {
      // Save the route the user requested so we can navigate to it after logging in
      // useToast().createToast('info', 'You must be logged in to access that route')
      // globalStore.mutations.setUrlRequestedAfterLogin(to.fullPath)
      next("/login");
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const userIsLoggedIn = window.localStorage.getItem("expenseToken");

  if (to.matched.some((route) => route.meta.disallowAuthed)) {
    if (userIsLoggedIn) {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
