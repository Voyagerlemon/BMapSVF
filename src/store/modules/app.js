/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-02 13:08:44
 * @LastEditTime: 2023-12-14 21:39:58
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @Description: Application state management
 */
import {
  SET_CONFIG,
  SET_MAIN_APP_PROP,
  SET_SITE_INFO,
  SET_USER_ORG_LIST,
  SET_APP_ID
} from "@/store/types";

const app = {
  namespaced: true,

  state: {
    config: null,
    mainAppProp: null,
    siteInfo: null,
    userOrgList: [],
    appId: ""
  },

  mutations: {
    [SET_CONFIG](state, data) {
      state.config = data;
    },
    [SET_MAIN_APP_PROP](state, data) {
      state.mainAppProp = data;
    },
    [SET_SITE_INFO](state, data) {
      state.siteInfo = data;
    },
    [SET_USER_ORG_LIST](state, data) {
      state.userOrgList = data;
    },
    [SET_APP_ID](state, data) {
      state.appId = data;
    }
  },

  actions: {
    setConfig({ commit }, data) {
      commit(SET_CONFIG, data);
    },
    setMainAppProp({ commit }, data) {
      commit(SET_MAIN_APP_PROP, data);
    },
    setAppId({ commit }, data) {
      commit(SET_APP_ID, data);
    },
    setSite({ commit }, data) {
      commit(SET_SITE_INFO, data);
    },
    setUserOrgList({ commit }, data) {
      commit(SET_USER_ORG_LIST, data);
    }
  },

  getters: {
    config: state => state.config,
    mainAppProp: state => state.mainAppProp,
    siteInfo: state => state.siteInfo,
    userOrgList: state => state.userOrgList,
    appId: state => state.appId
  }
};

export default app;
