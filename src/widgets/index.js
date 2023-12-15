/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-30 21:09:41
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:59:33
 * @FilePath: \BMapSVF-Client\src\widgets\index.js
 * @Description: Configuration related to the micro device
 **/

/*
 * label: (Mandatory) Name
 * container: (Mandatory) id of the dom node to be hung
 * icon: SVG
 * toggleLabel: toggle status, name (optional)
 * toggleIcon: toggle status, icon (optional)
 * hasConfig: Whether there is a configuration file
 * doOnce: Execute once, open and close
 * doLast: Open only once, run permanently
 * isMutex: Whether the function is mutually exclusive with other functions. If other functions are enabled, the function is disabled
 * escOff: Click ESC to turn off the function
 * hasPanel: Run in panel
 * collapsAble: Can be minimized (if hasPanel is true)
 * isScene: 3D function or not
 * defaultHidden: Default hiding
 * top: Initialize the upper offset
 * bottom: Initialize the downshift
 * left: Initialize the left offset
 * right: Initialize the right offset
 */
const widgets = [
  {
    name: "Map",
    meta: {
      label: "Map",
      container: "mapWrapper",
      doLast: true
    },
    component: () => import("@/widgets/Map")
  },
  {
    name: "MapTool",
    meta: {
      label: "MapTool",
      container: "mapTool",
      doLast: true
    },
    component: () => import("@/widgets/MapTool")
  },
  {
    name: "ToolBox",
    meta: {
      label: "ToolBox",
      container: "mapTopRight",
      doLast: true
    },
    component: () => import("@/widgets/ToolBox")
  },
  {
    name: "SearchPanel",
    meta: {
      label: "SearchPanel",
      container: "mapTopLeft",
      doLast: true
    },
    component: () => import("@/widgets/SearchPanel")
  },
  {
    name: "MapToggle",
    meta: {
      label: "MapToggle",
      container: "mapBottomRight",
      doLast: true,
      hasConfig: true
    },
    component: () => import("@/widgets/MapToggle")
  },
  {
    name: "DistanceMeasure",
    meta: {
      label: "DistanceMeasure",
      container: "mapWrapper",
      icon: "measure-distance"
    },
    component: () => import("@/widgets/DistanceMeasure")
  },
  {
    name: "CalSVF",
    meta: {
      label: "CalSVF",
      container: "mapWrapper",
      icon: "point-select1",
      defaultHidden: false,
      hasPanel: true,
      top: 2.86,
      left: 34.66
    },
    component: () => import("@/widgets/CalSVF")
  },
  {
    name: "CalCsvSVF",
    meta: {
      label: "CalCsvSVF",
      container: "mapWrapper",
      icon: "select-cal",
      defaultHidden: false,
      hasPanel: true,
      top: 2.86,
      left: 34.66
    },
    component: () => import("@/widgets/CalCsvSVF")
  },
  {
    name: "CoordinatePositioning",
    meta: {
      label: "CoordinatePositioning",
      container: "mapWrapper",
      icon: "locate",
      defaultHidden: false,
      hasPanel: true,
      top: 2.86,
      left: 34.66
    },
    component: () => import("@/widgets/CoordinatePositioning")
  },
  {
    name: "MapLegend",
    meta: {
      label: "MapLegend",
      container: "mapBottomRight",
      doLast: true
    },
    component: () => import("@/widgets/MapLegend")
  },
  {
    name: "ExportResult",
    meta: {
      label: "ExportResult",
      container: "mapWrapper",
      icon: "export-result",
      defaultHidden: false,
      hasPanel: true,
      top: 2.86,
      left: 34.66
    },
    component: () => import("@/widgets/ExportResult")
  },
  {
    name: "SVFDistribution",
    meta: {
      label: "SVFDistribution",
      container: "mapWrapper",
      icon: "fisheye",
      defaultHidden: false,
      hasPanel: true,
      top: 2.86,
      left: 34.66
    },
    component: () => import("@/widgets/SVFDistribution")
  }
];
export default widgets;
