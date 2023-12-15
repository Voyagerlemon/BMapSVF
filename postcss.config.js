/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-30 20:20:59
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 19:05:42
 * @FilePath: \BMapSVF-Client\postcss.config.cjs
 * @Description: postcss configuration file
 */
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 19.2,
      minPixelValue: 3, // < 3 does not convert
      propList: ["*"],
      unitPrecision: 2,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
