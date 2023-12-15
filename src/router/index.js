/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-29 20:15:52
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:39:07
 * @FilePath: \BMapSVF-Client\src\router\index.js
 * @Description: Routing configuration
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/viewer"
  },
  {
    path: "/viewer",
    name: "viewer",
    component: () => import("@/views/MapViewer")
  },
  {
    path: "/except",
    name: "except",
    component: () => import("@/views/ExceptionViewer")
  },
  {
    path: "/svg",
    name: "svg",
    component: () => import("@/views/SvgViewer")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
