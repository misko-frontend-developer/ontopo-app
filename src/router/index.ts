import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SearchPage from "@/views/SearchPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
