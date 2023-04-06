/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-30 21:09:41
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-06 11:22:40
 * @FilePath: \BMapSVF-Client\src\widgets\index.js
 * @Description: 微件相关配置
 **/

/*
 * label: （必选）名称
 * container: （必选）挂在dom节点的id
 * icon: 图标
 * toggleLabel: toggle状态，名称 （可选）
 * toggleIcon: toggle状态，图标 （可选）
 * hasConfig: 有配置文件
 * doOnce: 执行一次，打开就关闭
 * doLast: 只打开一次，永久运行
 * isMutex: 是否与其他功能互斥，其他功能打开则关闭互斥功能
 * escOff: 点击ESC，关闭功能
 * hasPanel: 运行在panel中
 * collapsAble: 是否可以最小化(前提是hasPanel为true)
 * isScene: 是否是三维功能
 * defaultHidden: 默认隐藏
 * top: 初始化上偏移
 * bottom: 初始化下偏移
 * left: 初始化左偏移
 * right: 初始化右偏移
 */
const widgets = [
  {
    name: "Map",
    meta: {
      label: "地图组件",
      container: "sceneWrapper",
      doLast: true
    },
    component: () => import("@/widgets/Map")
  },
  {
    name: "MapTool",
    meta: {
      label: "地图工具",
      container: "sceneTool",
      doLast: true
    },
    component: () => import("@/widgets/MapTool")
  },
  {
    name: "ToolBox",
    meta: {
      label: "工具箱",
      container: "sceneTopRight",
      doLast: true
    },
    component: () => import("@/widgets/ToolBox")
  }
];
export default widgets;
