/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-05 18:45:32
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:42:05
 * @Description: widget
 */

import store from "@/store";
import { SET_ACTIVE_MAP, DELETE_ACTIVE_WIDGET } from "@/store/types";
import { createApp, defineComponent, getCurrentInstance } from "vue";
import FuncPanel from "../../components/global/FuncPanel.vue";

const createPanel = () => {
  const Panel = defineComponent(FuncPanel);
  const panelWidget = createApp(Panel);
  return panelWidget;
};

const createWidget = async (widgetInfo, mixinProps = {}) => {
  const { meta, component } = widgetInfo;
  let widget = null;
  if (meta.hasPanel) {
    store.dispatch("widget/getHasPanelWidget", widgetInfo);
    widget = createPanel(widgetInfo, mixinProps);
    Object.assign(widget, mixinProps);
  } else {
    const compConfig = await component();
    const Comp = defineComponent(compConfig.default);
    widget = createApp(Comp, { props: mixinProps });
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
  widget.mount(container);
  if (meta.doOnce) {
    closeWidget(widget);
  } else {
    store.commit(`widget/${SET_ACTIVE_MAP}`, { name, widget });
  }
  return true;
};
export const closeWidget = async widget => {
  if (widget && widget._instance.vnode.el) {
    store.commit(`widget/${DELETE_ACTIVE_WIDGET}`, widget.widgetName);
    widget._instance.vnode.el.parentElement.removeChild(
      widget._instance.vnode.el
    );
    widget.unmount();
  }
};

export const closeMutexWidget = activeMap => {
  const { meta } = activeMap;
  if (activeMap && meta.isMutex) {
    closeWidget(activeMap);
  }
};
