/*
 * @Author: xuhy
 * @Date: 2023-04-02 13:05:44
 * @LastEditTime: 2023-04-05 20:20:15
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 三维状态管理
 */
//import Vue from "vue";
import {
  SET_SCENEMODE,
  SET_FILLVIEW,
  SET_CAMARA,
  SET_BASE_LAYER_STATE,
  SET_ANNOTATION_LAYER_STATE,
  SET_GRAY_STATE,
  SET_BASELAYER,
  SET_CUR_CAMARA,
  SET_CUR_2D_CAMARA,
  SET_ANNOTATION_LAYER,
  SET_MAP_LOADED,
  SET_LEGEND_INFO,
  ADD_OPEN_LEGEND,
  DELETE_OPEN_LEGEND,
  DEFAULT_LAYERS
} from "@/store/types";
const map = {
  namespaced: true,
  state: {
    mapLoaded: false,
    sceneMode: "3D", // 场景展示模式
    fullview: {}, // 2D默认场景全图范围
    camara: {}, // 3D默认场景全图范围
    curBaseLayer: {},
    baseLayerState: true,
    annotationLayerState: true,
    grayState: false,
    curcamara: {},
    annotationLayer: {}, // 注记图层
    cur2dcamara: {}, // 记录二维的视图
    legendInfo: {},
    openlegend: [],
    defaultlayers: [] // 默认打开的图层
  },

  mutations: {
    [SET_SCENEMODE](state, data) {
      state.sceneMode = data;
    },
    [SET_FILLVIEW](state, data) {
      state.fullview = data;
    },
    [SET_CAMARA](state, data) {
      state.camara = data;
    },
    [SET_BASELAYER](state, data) {
      state.curBaseLayer = data;
    },
    [SET_BASE_LAYER_STATE](state, data) {
      state.baseLayerState = data;
    },
    [SET_ANNOTATION_LAYER_STATE](state, data) {
      state.annotationLayerState = data;
    },
    [SET_GRAY_STATE](state, data) {
      state.grayState = data;
    },
    [SET_CUR_CAMARA](state, data) {
      state.curcamara = data;
    },
    [SET_CUR_2D_CAMARA](state, data) {
      state.cur2dcamara = data;
    },
    [SET_ANNOTATION_LAYER](state, data) {
      state.annotationLayer = data;
    },
    [SET_MAP_LOADED](state, data) {
      state.mapLoaded = data;
    },
    [SET_LEGEND_INFO](state, data) {
      const id = data.id;
      //Vue.set(state.legendInfo, id, data);
    },
    [ADD_OPEN_LEGEND](state, data) {
      state.openlegend.unshift(data);
    },
    [DELETE_OPEN_LEGEND](state, index) {
      state.openlegend.splice(index, 1);
    },
    [DEFAULT_LAYERS](state, data) {
      state.defaultlayers = data;
    }
  },

  actions: {
    setMapLoaded({ commit }, data) {
      commit(SET_MAP_LOADED, data);
    },
    setSceneMode({ commit }, data) {
      commit(SET_SCENEMODE, data);
    },
    setFullView({ commit }, data) {
      commit(SET_FILLVIEW, data);
    },
    setCamara({ commit }, data) {
      commit(SET_CAMARA, data);
    },
    setBaseLayerState({ commit }, data) {
      commit(SET_BASE_LAYER_STATE, data);
    },
    setAnnotationLayerState({ commit }, data) {
      commit(SET_ANNOTATION_LAYER_STATE, data);
    },
    setGrayState({ commit }, data) {
      commit(SET_GRAY_STATE, data);
    },
    setCurBaseLayer({ commit }, data) {
      commit(SET_BASELAYER, data);
    },
    setCurCamara({ commit }, data) {
      commit(SET_CUR_CAMARA, data);
    },
    setCur2DCamara({ commit }, data) {
      commit(SET_CUR_2D_CAMARA, data);
    },
    setAnnotationLayer({ commit }, data) {
      commit(SET_ANNOTATION_LAYER, data);
    },
    setLegendInfo({ commit, state }, { id, legend, name, layer, subname }) {
      if (!state.legendInfo[id]) {
        commit(SET_LEGEND_INFO, { id, legend, name, subname });
        if (layer.visible) {
          commit(ADD_OPEN_LEGEND, { id, legend, name, layer, subname });
        }
      }
    },
    setdefaultlayers({ commit }, data) {
      commit(DEFAULT_LAYERS, data);
    },
    changeOpenLegend({ commit, state }, { id, visible, layer }) {
      const openlegend = state.openlegend;
      const index = openlegend.findIndex(i => {
        return i.id === id;
      });
      const legend = state.legendInfo[id];
      if (legend) {
        legend.layer = layer;
        if (visible) {
          if (index === -1) commit(ADD_OPEN_LEGEND, legend);
        } else {
          if (index !== -1) commit(DELETE_OPEN_LEGEND, index);
        }
      }
    }
  },

  getters: {
    mapLoaded: state => state.mapLoaded,
    sceneMode: state => state.sceneMode,
    fullview: state => state.fullview,
    camara: state => state.camara,
    baseLayerState: state => state.baseLayerState,
    annotationLayerState: state => state.annotationLayerState,
    grayState: state => state.grayState,
    curBaseLayer: state => state.curBaseLayer,
    curcamara: state => state.curcamara,
    cur2dcamara: state => state.cur2dcamara,
    annotationLayer: state => state.annotationLayer,
    legendInfo: state => state.legendInfo,
    openlegend: state => state.openlegend,
    defaultlayers: state => state.defaultlayers
  }
};

export default map;
