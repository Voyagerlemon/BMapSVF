/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-29 16:00:53
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 19:08:48
 * @FilePath: \BMapSVF-Client\vite.config.js
 * @Description: vite configuration file
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
      // Parse the svg icon address
      iconDirs: [resolve(process.cwd(), "src/svg")],
      // Parse svg icon names
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
      // Set proxy, front end cross-domain
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }, */
  },
});
