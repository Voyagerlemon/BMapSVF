/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-03 13:05:44
 * @LastEditTime: 2023-12-12 21:26:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: Micro device status management
 */

import {
  SET_WIDGETS,
  SET_WIDGET_MAP,
  SET_ACTIVE_MAP,
  CLEAR_ACTIVE_MAP,
  DELETE_ACTIVE_WIDGET,
  SET_RESOURCE_MAP,
  SET_WIDGET_CONFIG,
  GET_HAS_PANEL_WIDGET
} from "@/store/types";
import {
  openWidget,
  closeWidget,
  closeMutexWidget
} from "@/utils/widget/widget";
import { getWidgetConfig } from "@/api/public";

const widget = {
  namespaced: true,
  state: {
    widgets: [],
    widgetMap: {},
    activeMap: {},
    resourceMap: {},
    widgetConfig: {},
    showTopic: true,
    hasPanelWidget: {}
  },

  mutations: {
    [SET_WIDGETS](state, data) {
      state.widgets = data;
    },
    [SET_WIDGET_MAP](state, data) {
      state.widgetMap = data;
    },
    [SET_ACTIVE_MAP](state, widget) {
      state.activeMap.name = widget;
    },
    [DELETE_ACTIVE_WIDGET](state) {
      state.activeMap.name = null;
    },
    [CLEAR_ACTIVE_MAP](state) {
      state.activeMap = {};
    },
    [SET_RESOURCE_MAP](state, data) {
      state.resourceMap = data;
    },
    [SET_WIDGET_CONFIG](state, data) {
      state.widgetConfig = data;
    },
    [GET_HAS_PANEL_WIDGET](state, data) {
      state.hasPanelWidget = data;
    }
  },

  actions: {
    setWidgets({ commit }, data) {
      const dataMap = {};
      data.forEach(item => {
        dataMap[item.name] = item;
      });
      commit(SET_WIDGETS, data);
      commit(SET_WIDGET_MAP, dataMap);
    },
    async openWidget({ state, commit }, { name, prop }) {
      const widgetInfo = state.widgetMap[name];
      if (!widgetInfo) {
        console.error(`Widget:${name} inexistence`);
        return;
      }
      const widget = state.activeMap[name];
      if (widget) {
        console.info(`Widget:${name} has run`);
        return;
      }
      let config = {};
      if (widgetInfo.meta.hasConfig) {
        const res = await getWidgetConfig(name);
        config = res.config ? res.config : res;
        commit(SET_WIDGET_CONFIG, config);
      }
      if (widgetInfo.meta.isMutex) {
        closeMutexWidget(widgetInfo);
      }
      await openWidget(widgetInfo, { ...prop });
      return true;
    },
    closeWidget({ state }, name) {
      const widget = state.activeMap[name];
      if (!widget) {
        console.error(`Widget:${name} has not run`);
        return;
      }
      closeWidget(widget);
    },
    closeAllWidget({ state }) {
      const keys = Object.keys(state.activeMap);
      for (const key of keys) {
        const widget = state.activeMap[key];
        if (widget && !widget.meta.doLast) {
          closeWidget(widget);
        }
      }
      return true;
    },
    destroyAllWidget({ state }) {
      const keys = Object.keys(state.activeMap);
      for (const key of keys) {
        const widget = state.activeMap[key];
        if (widget) {
          closeWidget(widget);
        }
      }
    },
    escCloseWidget({ state }) {
      const keys = Object.keys(state.activeMap);
      for (const key of keys) {
        const widget = state.activeMap[key];
        if (widget && widget.meta.escOff) {
          closeWidget(widget);
        }
      }
    },
    setResourceMap({ commit }, data) {
      commit(SET_RESOURCE_MAP, data);
    },
    getHasPanelWidget({ commit }, data) {
      commit(GET_HAS_PANEL_WIDGET, data);
    }
  },

  getters: {
    widgetMap: state => state.widgetMap,
    activeMap: state => state.activeMap,
    resourceMap: state => state.resourceMap,
    widgetConfig: state => state.widgetConfig,
    hasPanelWidget: state => state.hasPanelWidget
  }
};

export default widget;
