/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-08 17:35:52
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-08 22:42:42
 * @FilePath: \BMapSVF-Client\src\components\AutoPanel\index.js
 * @Description: 自动注册全局组件
 */
import { defineAsyncComponent } from "vue";

const components = import.meta.glob("./global/*.vue"); // 异步方式
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.split("/")[1];
    app.component(name, defineAsyncComponent(value));
  }
}
