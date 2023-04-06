/*
 * @Author: xuhy
 * @Date: 2023-04-03 13:05:44
 * @LastEditTime: 2023-04-06 14:13:42
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 微件状态管理
 */

import {
  SET_WIDGETS,
  SET_WIDGET_MAP,
  SET_ACTIVE_MAP,
  CLEAR_ACTIVE_MAP,
  DELETE_ACTIVE_WIDGET,
  SET_RESOURCE_MAP,
  SET_SHOW_TOPIC
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
    showTopic: true
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
    [SET_SHOW_TOPIC](state, data) {
      state.showTopic = data;
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
    async openWidget({ state }, { name, prop }) {
      const widgetInfo = state.widgetMap[name];
      if (!widgetInfo) {
        console.error(`Widget:${name}不存在`);
        return;
      }
      const widget = state.activeMap[name];
      if (widget) {
        console.info(`Widget:${name}已运行`);
        return;
      }
      let config = {};
      if (widgetInfo.meta.hasConfig) {
        const res = await getWidgetConfig(name);
        config = res.config ? res.config : res;
      }
      if (widgetInfo.meta.isMutex) {
        closeMutexWidget(state.activeMap);
      }
      await openWidget(widgetInfo, { ...prop, config });
      return true;
    },
    closeWidget({ state }, name) {
      const widget = state.activeMap[name];
      if (!widget) {
        console.error(`Widget:${name}没运行`);
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
    destoryAllWidget({ state }) {
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
    setShowTopic({ commit }, data) {
      commit(SET_SHOW_TOPIC, data);
    }
  },

  getters: {
    widgetMap: state => state.widgetMap,
    activeMap: state => state.activeMap,
    resourceMap: state => state.resourceMap,
    showTopic: state => state.showTopic
  }
};

export default widget;
