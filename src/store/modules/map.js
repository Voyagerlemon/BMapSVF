/*
 * @Author: xuhy
 * @Date: 2023-04-02 13:20:44
 * @LastEditTime: 2023-04-06 14:14:18
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 三维状态管理
 */
//import Vue from "vue";
import {
  SET_MAP_MODE,
  SET_MAP_LOADED,
} from "@/store/types";
const map = {
  namespaced: true,
  state: {
    mapLoaded: false,
    mapMode: "3D", // 地图展示模式
  },
  mutations: {
    [SET_MAP_MODE](state, data) {
      state.sceneMode = data;
    },
    [SET_MAP_LOADED](state, data) {
      state.mapLoaded = data;
    },
  
   
  },

  actions: {
    setMapLoaded({ commit }, data) {
      commit(SET_MAP_LOADED, data);
    },
    setSceneMode({ commit }, data) {
      commit(SET_MAP_MODE, data);
    },
  },

  getters: {
    mapLoaded: state => state.mapLoaded,
    mapMode: state => state.mapMode,
  }
};

export default map;
