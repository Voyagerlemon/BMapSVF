/*
 * @Author: xuhy
 * @Date: 2023-04-02 13:20:44
 * @LastEditTime: 2023-04-08 10:19:20
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 三维状态管理
 */

import { SET_MAP_MODE, SET_MAP_LOADED, SET_BASE_LAYER } from "@/store/types";
const map = {
  namespaced: true,
  state: {
    mapLoaded: false,
    mapMode: "2D", // 地图展示模式
    nowBaseLayer: {}
  },
  mutations: {
    [SET_MAP_MODE](state, data) {
      state.sceneMode = data;
    },
    [SET_MAP_LOADED](state, data) {
      state.mapLoaded = data;
    },
    [SET_BASE_LAYER](state, data) {
      state.nowBaseLayer = data;
    }
  },

  actions: {
    setMapLoaded({ commit }, data) {
      commit(SET_MAP_LOADED, data);
    },
    setSceneMode({ commit }, data) {
      commit(SET_MAP_MODE, data);
    },
    setNowBaseLayer({ commit }, data) {
      commit(SET_BASE_LAYER, data);
    }
  },

  getters: {
    mapLoaded: state => state.mapLoaded,
    mapMode: state => state.mapMode,
    nowBaseLayer: state => state.nowBaseLayer
  }
};

export default map;
