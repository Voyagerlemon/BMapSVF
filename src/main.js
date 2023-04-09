/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 16:00:53
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-08 22:43:31
 * @FilePath: \BMapSVF-Client\src\main.js
 * @Description: 入口文件相关配置
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import SvgIcon from "./views/SvgViewer/components";
// 注册svg图标
import "virtual:svg-icons-register";
// 导入View UI Plus图标
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
// 导入全局样式
import "@/styles/index.scss";
// 导入Tailwind CSS
import "@/styles/tailwind.scss";
// 导入store
import store from "@/store";
// 引入微件
import widgets from "@/widgets";
store.dispatch("widget/setWidgets", widgets);

// 注册全局组件
import components from "./components/index";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.use(store);
app.use(router);
app.use(ViewUIPlus);
app.use(components);
app.mount("#app");
