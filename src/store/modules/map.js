/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-02 13:20:44
 * @LastEditTime: 2023-12-14 21:40:21
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @Description: Three-dimensional state management
 */

import {
  SET_MAP_MODE,
  SET_MAP_LOADED,
  SET_BASE_LAYER,
  SET_SVF_POINTS_LOADED
} from "@/store/types";
const map = {
  namespaced: true,
  state: {
    mapLoaded: false,
    svfPointsLoaded: false,
    mapMode: "2D", // Map display mode
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
    },
    [SET_SVF_POINTS_LOADED](state, data) {
      state.svfPointsLoaded = data;
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
    },
    setSVFPointsLoaded({ commit }, data) {
      commit(SET_SVF_POINTS_LOADED, data);
    }
  },

  getters: {
    mapLoaded: state => state.mapLoaded,
    mapMode: state => state.mapMode,
    nowBaseLayer: state => state.nowBaseLayer,
    svfPointsLoaded: state => state.svfPointsLoaded
  }
};

export default map;
