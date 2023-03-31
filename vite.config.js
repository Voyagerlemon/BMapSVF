/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 16:00:53
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 11:14:52
 * @FilePath: \BMapSVF-Client\vite.config.js
 * @Description: vite配置文件
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import alias from "@rollup/plugin-alias";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 解析svg图标地址
      iconDirs: [resolve(process.cwd(), "src/svg")],
      // 解析svg图标名字
      symbolId: "icon-[name]",
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 8088,
    open: true,
   /*  proxy: {
      //设置代理，前端跨域
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }, */
  },
});
