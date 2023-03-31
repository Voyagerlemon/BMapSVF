/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-30 20:20:59
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 20:36:22
 * @FilePath: \BMapSVF-Client\postcss.config.cjs
 * @Description: postcss配置文件
 */
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 19.2,
      minPixelValue: 3, // < 3 的不转换
      propList: ["*"],
      unitPrecision: 2,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
