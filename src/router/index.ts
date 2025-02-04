import { createRouter, createWebHistory } from "vue-router";
import routes from "../routes/mainRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
