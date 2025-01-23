import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import StudentsManagementView from "../views/StudentsManagementView.vue";

const routes = [
  {
    path: "/students-management",
    name: "students-management",
    component: StudentsManagementView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"), //lazy loading
  },
];

export default routes;
