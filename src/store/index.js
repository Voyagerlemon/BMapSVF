/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-03 10:24:15
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-03 22:45:37
 * @FilePath: \BMapSVF-Client\src\store\index.js
 * @Description: store核心文件
 */
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
//异步方式
const modulesFiles = import.meta.glob("./modules/*.js", { eager: true });

let modules = {};
for (const [key, value] of Object.entries(modulesFiles)) {
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, "$1");
  const name = moduleName.split("/")[1];
  modules[name] = value.default;
}
const store = createStore({
  modules,
  actions: {
    // 重置state
    resetStore({ state }) {
      const _state = JSON.parse(resetData);
      const widgets = state.widget.widgets;
      const mainAppProp = state.app.mainAppProp;
      const config = state.app.config;
      this.replaceState(_state);
      this.dispatch("widget/setWidgets", widgets);
      this.dispatch("app/setMainAppProp", mainAppProp);
      this.dispatch("app/setConfig", config);
    }
  },
  plugins: [
    createPersistedState({
      key: "vuex-local", //存储持久状态的键。（默认：vuex）
      paths: ["index"]
    })
  ]
});

export default store;
