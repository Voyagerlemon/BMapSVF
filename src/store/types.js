/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-03 10:27:04
 * @LastEditors: Voyagerlemon xuhaiyangw@163.com
 * @LastEditTime: 2024-03-24 10:44:54
 * @FilePath: \BMapSVF-Client\src\store\types.js
 * @Description: The type name constant of mutation
 */
// PUBLIC
export const SET_CONFIG = "SET_CONFIG"; // Set the global configuration content
export const SET_MAIN_APP_PROP = "SET_MAIN_APP_PROP"; // Set system name
export const SET_SITE_INFO = "SET_SITE_INFO"; // Setting Site Information
export const SET_USER_ORG_LIST = "SET_USER_ORG_LIST"; // User organization information
export const SET_APP_ID = "SET_APP_ID";
export const SET_SHOW_TOPIC = "SET_SHOW_TOPIC";

// MAP
export const SET_MAP_LOADED = "SET_MAP_LOADED"; // Sets whether the map loads
export const SET_MAP_MODE = "SET_MAP_MODE"; // Set map mode
export const SET_BASE_LAYER = "SET_BASE_LAYER"; // Current base map
export const SET_WIDGET_CONFIG = " SET_WIDGET_CONFIG"; // Widget configuration file
export const GET_HAS_PANEL_WIDGET = " GET_HAS_PANEL_WIDGET"; // Gets a widget with a Panel
export const SET_SVF_POINTS_LOADED = "SET_SVF_POINTS_LOADED"; // Check whether the SVF sampling point is loaded
// SCENE
export const SET_SCENE_LOADED = "SET_SCENE_LOADED"; // Set whether the scene is loaded
export const SET_SCENEMODE = "SET_SCENEMODE"; // Set scene mode
export const SET_FILLVIEW = "SET_FILLVIEW"; // Scene full scope
export const SET_CAMARA = "SET_CAMARA"; // Set camera range
export const SET_BASE_LAYER_STATE = "SET_BASE_LAYER_STATE";
export const SET_ANNOTATION_LAYER_STATE = "SET_ANNOTATION_LAYER_STATE";
export const SET_GRAY_STATE = "SET_GRAY_STATE";
export const SET_BASELAYER = "SET_BASELAYER"; // Current base map
export const SET_CUR_CAMARA = "SET_CUR_CAMARA"; // Real-time 3D camera range
export const SET_CUR_2D_CAMARA = "SET_CUR_2D_CAMARA"; // Real-time 2D camera range
export const SET_ANNOTATION_LAYER = "SET_ANNOTATION_LAYER"; // Set the note layer

export const SET_WIDGETS = "SET_WIDGETS"; // widgets
export const SET_WIDGET_MAP = "SET_WIDGET_MAP"; // widget mapping
export const CLEAR_ACTIVE_MAP = "CLEAR_ACTIVE_MAP"; // Clear the active widget
export const SET_ACTIVE_MAP = "SET_ACTIVE_MAP"; // Active widget
export const DELETE_ACTIVE_WIDGET = "DELETE_ACTIVE_WIDGET"; // Close widget

export const SET_TOPIC = "SET_TOPIC"; // Topic
export const SET_ACTIVE_TOPIC = "SET_ACTIVE_TOPIC"; // Open topic
export const DELETE_ACTIVE_TOPIC = "DELETE_ACTIVE_TOPIC"; // Close activation topics
export const SET_TOPIC_OPACITY = "SET_TOPIC_OPACITY"; // Thematic transparency
export const CLEAR_ACTIVE_TOPIC = "CLEAR_ACTIVE_TOPIC"; // Clear activation topics
export const CLEAR_TOPIC_OPACITY = "CLEAR_TOPIC_OPACITY"; // Clear thematic transparency
export const SET_TOPIC_VISIBILITY = "SET_TOPIC_VISIBILITY"; // Set topic implicit
export const SET_ACTIVE_TOPICS = "SET_ACTIVE_TOPICS"; // Set the active topic
export const DEFAULT_LAYERS = "DEFAULT_LAYERS"; // Default layer

export const SET_RESOURCE_MAP = "SET_RESOURCE_MAP"; // Apply the resource mapping table

// legend
export const SET_LEGEND_INFO = "SET_LEGEND_INFO"; // Set legend
export const ADD_OPEN_LEGEND = "ADD_OPEN_LEGEND"; // Add legend
export const DELETE_OPEN_LEGEND = "DELETE_OPEN_LEGEND"; // Delete legend
