/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-29 16:00:53
 * @LastEditors: Voyagerlemon xuhaiyangw@163.com
 * @LastEditTime: 2024-03-01 16:43:51
 * @FilePath: \BMapSVF-Client\src\main.js
 * @Description: Configure import files
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import SvgIcon from "./views/SvgViewer/components";
// Register SVG icon
import "virtual:svg-icons-register";
// Import the View UI Plus icon
import ViewUIPlus from "view-ui-plus";
import "view-ui-plus/dist/styles/viewuiplus.css";
// Import global style
import "@/styles/index.scss";
import "@/styles/tailwind.scss";
import store from "@/store";
// Introducing microelement
import widgets from "@/widgets";
store.dispatch("widget/setWidgets", widgets);
// Register global components
import components from "./components/index";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.use(store);
app.use(router);
app.use(ViewUIPlus);
app.use(components);
app.mount("#app");
