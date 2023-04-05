/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-02 11:09:40
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-03 11:08:04
 * @FilePath: \BMapSVF-Client\src\api\public.js
 * @Description: api接口
 */
import { DGET } from "./index";

export const getAppInfo = () => {
    return { icon: "", name: "BMapSVF", needTitle: "1" };
};
export const getWidgetConfig = widgetName => {
  return DGET(`static/widgets/${widgetName}.hjson`, `获取widgets配置文件`);
};
export const getResourceTree = appId => {
  return DGET(`static/mockdata/${appId}.hjson`, `获取数据资源`);
};
