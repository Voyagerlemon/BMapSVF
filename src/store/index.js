/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-03 10:24:15
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:39:28
 * @FilePath: \BMapSVF-Client\src\store\index.js
 * @Description: store
 */
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
// asynchronous mode
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
    // reset state
    resetStore({ state, dispatch }) {
      const _state = JSON.parse(resetData);
      const widgets = state.widget.widgets;
      const mainAppProp = state.app.mainAppProp;
      const config = state.app.config;
      store.replaceState(_state);
      dispatch("widget/setWidgets", widgets);
      dispatch("app/setMainAppProp", mainAppProp);
      dispatch("app/setConfig", config);
    }
  },
  plugins: [
    createPersistedState({
      key: "vuex-local", // A key that stores persistent state(default: vuex)
      paths: ["index"]
    })
  ]
});
const resetData = JSON.stringify(store.state);
export default store;
