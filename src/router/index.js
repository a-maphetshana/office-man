import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import OfficeView from "../views/OfficeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/office/:officeId",
    name: "Office",
    component: OfficeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
