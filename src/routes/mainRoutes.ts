import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import StudentsManagementView from "../views/StudentsManagementView.vue";
import PrintView from "../views/PrintView.vue";

const routes = [
  {
    path: "/print",
    name: "print",
    component: () => import("@/views/PrintView.vue"),
  },
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
    component: () => import("@/views/AboutView.vue"), //lazy loading
  },
];

export default routes;
