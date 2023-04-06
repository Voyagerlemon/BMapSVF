/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-03 10:27:04
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-06 14:05:14
 * @FilePath: \BMapSVF-Client\src\store\types.js
 * @Description: mutation的类型名称常量
 */
// 公共
export const SET_CONFIG = "SET_CONFIG"; // 设置全局配置内容
export const SET_MAIN_APP_PROP = "SET_MAIN_APP_PROP"; // 设置系统名
export const SET_SITE_INFO = "SET_SITE_INFO"; // 设置站点信息
export const SET_USER_ORG_LIST = "SET_USER_ORG_LIST"; // 用户组织信息
export const SET_APP_ID = "SET_APP_ID";
export const SET_SHOW_TOPIC = "SET_SHOW_TOPIC";

// MAP
export const SET_MAP_LOADED = "SET_MAP_LOADED"; // 设置地图是否加载
export const SET_MAP_MODE ="SET_MAP_MODE" // 设置地图模式
// SCENE
export const SET_SCENE_LOADED = "SET_SCENE_LOADED"; // 设置场景是否加载
export const SET_SCENEMODE = "SET_SCENEMODE"; // 设置场景模式
export const SET_FILLVIEW = "SET_FILLVIEW"; // 场景全图范围
export const SET_CAMARA = "SET_CAMARA"; // 设置相机范围
export const SET_BASE_LAYER_STATE = "SET_BASE_LAYER_STATE";
export const SET_ANNOTATION_LAYER_STATE = "SET_ANNOTATION_LAYER_STATE";
export const SET_GRAY_STATE = "SET_GRAY_STATE";
export const SET_BASELAYER = "SET_BASELAYER"; // 当前底图
export const SET_CUR_CAMARA = "SET_CUR_CAMARA"; // 实时的3D相机范围
export const SET_CUR_2D_CAMARA = "SET_CUR_2D_CAMARA"; // 实时二维相机范围
export const SET_ANNOTATION_LAYER = "SET_ANNOTATION_LAYER"; //设置注记图层

export const SET_WIDGETS = "SET_WIDGETS"; // widgets
export const SET_WIDGET_MAP = "SET_WIDGET_MAP"; // widget映射
export const CLEAR_ACTIVE_MAP = "CLEAR_ACTIVE_MAP"; // 清除激活的widget
export const SET_ACTIVE_MAP = "SET_ACTIVE_MAP"; // 激活的widget
export const DELETE_ACTIVE_WIDGET = "DELETE_ACTIVE_WIDGET"; //关闭widget

export const SET_TOPIC = "SET_TOPIC"; // 专题
export const SET_ACTIVE_TOPIC = "SET_ACTIVE_TOPIC"; // 打开专题
export const DELETE_ACTIVE_TOPIC = "DELETE_ACTIVE_TOPIC"; // 关闭激活专题
export const SET_TOPIC_OPACITY = "SET_TOPIC_OPACITY"; // 专题透明度
export const CLEAR_ACTIVE_TOPIC = "CLEAR_ACTIVE_TOPIC"; // 清除激活专题
export const CLEAR_TOPIC_OPACITY = "CLEAR_TOPIC_OPACITY"; // 清除专题透明度
export const SET_TOPIC_VISIBILITY = "SET_TOPIC_VISIBILITY"; // 设置专题显隐
export const SET_ACTIVE_TOPICS = "SET_ACTIVE_TOPICS"; // 设置激活的专题
export const DEFAULT_LAYERS = "DEFAULT_LAYERS"; // 默认的图层

export const SET_RESOURCE_MAP = "SET_RESOURCE_MAP"; //应用资源映射表

// 图例
export const SET_LEGEND_INFO = "SET_LEGEND_INFO"; // 设置图例
export const ADD_OPEN_LEGEND = "ADD_OPEN_LEGEND"; // 添加图例
export const DELETE_OPEN_LEGEND = "DELETE_OPEN_LEGEND"; // 删除图例


