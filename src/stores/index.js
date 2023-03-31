/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-30 21:49:14
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 21:54:22
 * @FilePath: \BMapSVF-Client\src\stores\index.js
 * @Description: Store相关定义
 */
import { defineStore } from "pinia";
export const useStore = defineStore("storeId", {
  // store的数据
  state: () => {
    return {
      num: 0,
      name: "张三"
    };
  },
  // store的计算属性
  getters: {},
  // 方法
  actions: {}
});
