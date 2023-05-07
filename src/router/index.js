/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 20:15:52
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-07 15:52:36
 * @FilePath: \BMapSVF-Client\src\router\index.js
 * @Description: 路由相关配置
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
