/*
 * @Author: xuhy
 * @Date: 2023-04-05 18:45:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-09 17:13:27
 * @Description: widget
 */

import store from "@/store";
import { SET_ACTIVE_MAP, DELETE_ACTIVE_WIDGET } from "@/store/types";
import { createApp, defineComponent } from "vue";
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
export const closeWidget = widget => {
  if (widget && widget.$el) {
    store.commit(
      `widget/${DELETE_ACTIVE_WIDGET}`,
      widget.widgetName.replace(/\d+/g, "")
    );
    widget.$el.parentElement.removeChild(widget.$el);
    widget.unmount();
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
export const closePanelWidget = () => {
  const Panel = createPanel();
  Panel.mount("#mapTopRight");
  Panel.unmount();
};
