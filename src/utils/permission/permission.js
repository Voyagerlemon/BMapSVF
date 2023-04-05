/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-03 11:27:30
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-03 11:28:43
 * @FilePath: \BMapSVF-Client\src\utils\permission\permission.js
 * @Description: 授权访问
 */
import store from "@/store";
/**
 * @description 格式化资源信息，将array转为hash
 * @param {Array} resources [资源信息]
 * @param {Object} resourceMap [转换后资源对象]
 */
const formatResource = (resources, resourceMap = {}) => {
  if (Array.isArray(resources)) {
    resources.forEach(item => {
      if (item.name) {
        const widget =
          store.getters[`widget/widgetMap`][item.name.replace(/\d+/g, "")];
        if (widget) {
          widget.meta.label = item.label;
          resourceMap[item.name] = item;
        }
      }
      if (item.children && Array.isArray(item.children)) {
        formatResource(item.children, resourceMap);
      }
    });
  }
  return resourceMap;
};

export const handleResource = (name, resources, resourceMap = {}) => {
  const resourceObj = {
    name,
    children: resources
  };
  resourceMap[name] = resourceObj;
  return formatResource(resources, resourceMap);
};