/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-08 17:35:52
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-12 20:40:18
 * @FilePath: \BMapSVF-Client\src\components\AutoPanel\index.js
 * @Description: Automatically register global components
 */
import { defineAsyncComponent } from "vue";

const components = import.meta.glob("./global/*.vue"); // async
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    const name = key.split("/")[1];
    app.component(name, defineAsyncComponent(value));
  }
}
