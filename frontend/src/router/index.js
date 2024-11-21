import { createWebHistory, createRouter } from "vue-router";
import ListBook from "@/views/book/listbook.vue";
import ListReader from "@/views/readers/listreader.vue";
import Brbook from "@/views/qlmts/listbrbook.vue";
import ListStaff from "@/views/staff/liststaff.vue";
import ListNXB from "@/views/nxb/listnxb.vue";
import Login from "@/views/login/login.vue";
const routes = [
  {
    path: "/book",
    name: "listbook",
    component: ListBook,
  },
  {
    path: "/reader",
    name: "listreader",
    component: ListReader,
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/qlmts",
    name: "brbook",
    component: Brbook,
  },
  {
    path: "/staff",
    name: "liststaff",
    component: ListStaff,
  },
  {
    path: "/nxbs",
    name: "listnxb",
    component: ListNXB,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
