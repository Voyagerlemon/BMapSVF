/*
 * @Author: gaotao
 * @Date: 2020-07-16 16:45:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-03 10:49:10
 * @Description: widget
 */

import store from "@/store";
import { SET_ACTIVE_MAP, DELETE_ACTIVE_WIDGET } from "@/store/types";
const createPanel = (widgetInfo, mixinProps) => {
  //const Panel = Vue.component("FuncPanel");

  const collapsable = widgetInfo.meta && widgetInfo.meta.collapsAble;

  return new Panel({
    propsData: {
      ...widgetInfo,
      collapsable,
      mixinProps,
      closeCallBack: closeWidget
    }
  });
};

const createWidget = async (widgetInfo, mixinProps = {}) => {
  const { name, meta, component } = widgetInfo;
  let widget = null;
  if (meta.hasPanel) {
    widget = createPanel(widgetInfo, mixinProps);
    Object.assign(widget, mixinProps);
  } else {
    const compConfig = await component();
    //const Comp = await Vue.component(name, compConfig.default);
    widget = new Comp({
      propsData: { ...mixinProps }
    });
    Object.assign(widget, mixinProps);
    Object.assign(widget, { meta });
  }
  return widget;
};
export const openWidget = async (widgetInfo, mixinProps = {}) => {
  const { meta, name } = widgetInfo;
  const widget = await createWidget(widgetInfo, mixinProps);
  const container = document.createElement("div");
  const mainAppProp = store.getters["app/mainAppProp"];
  const el = mainAppProp
    ? mainAppProp.container.querySelector(`#${meta.container}`)
    : document.getElementById(meta.container);
  el.appendChild(container);
  widget.$mount(container);
  if (meta.doOnce) {
    closeWidget(widget);
  } else {
    store.commit(`widget/${SET_ACTIVE_MAP}`, { name, widget });
  }
  return true;
};
export const closeWidget = widget => {
  if (widget && widget.$el) {
    store.commit(
      `widget/${DELETE_ACTIVE_WIDGET}`,
      widget.widgetName.replace(/\d+/g, "")
    );
    widget.$el.parentElement.removeChild(widget.$el);
    widget.$destroy();
  }
};

export const closeMutexWidget = activeMap => {
  const keys = Object.keys(activeMap);
  for (const key of keys) {
    const widget = activeMap[key];
    if (widget && widget.meta.isMutex) {
      closeWidget(widget);
    }
  }
};
