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
    path: "/restaurants/:restaurantName/:restaurantRange/:latitude/:longitude",
    name: "RestaurantList",
    component: () => import("../views/RestaurantList.vue")
  },

  {
    path: "/restaurants/:restaurantId",
    name: "RestaurantDetail",
    component: () => import("../views/RestaurantDetail.vue")
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/errors/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
