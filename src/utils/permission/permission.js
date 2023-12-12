/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-03 11:27:30
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-12-12 21:34:09
 * @FilePath: \BMapSVF-Client\src\utils\permission\permission.js
 * @Description: authorized visit
 */
import store from "@/store";
/**
 * @description Format the resource information and convert the array into a hash
 * @param {Array} resources [resource information]
 * @param {Object} resourceMap [Converted resource object]
 */
const formatResource = (resources, resourceMap = {}) => {
  if (Array.isArray(resources)) {
    resources.forEach(item => {
      if (item.name) {
        const widget =
          store.getters[`widget/widgetMap`][item.name];
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