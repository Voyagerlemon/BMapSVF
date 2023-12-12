/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-02 11:09:40
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-04-03 11:08:04
 * @FilePath: \BMapSVF-Client\src\api\public.js
 * @Description: API
 */
import { DGET } from "./index";

export const getAppInfo = () => {
    return { icon: "", name: "BMapSVF", needTitle: "1" };
};
export const getWidgetConfig = widgetName => {
  return DGET(`static/widgets/${widgetName}.hjson`, `Get the widgets configuration file`);
};
export const getResourceTree = appId => {
  return DGET(`static/mockdata/${appId}.hjson`, `Get data resource`);
};
