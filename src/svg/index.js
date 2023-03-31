/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2022-11-24 15:13:49
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 14:24:34
 * @FilePath: \ce-map3d\src\svg\index.js
 * @Description: 导入所有svg文件
 */

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./", false, /\.svg$/);
requireAll(req);
