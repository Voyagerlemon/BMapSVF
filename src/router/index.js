/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 20:15:52
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-01 11:27:48
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
    component: () => import("@/views/ScreenViewer")
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
