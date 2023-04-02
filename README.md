# 三维空间数字化系统

## feature

- 符合规范的组织结构
- 提供常用工具的配置
- 配置文件读取
- axios
- rem
- iview
- svg 图标
- yarn commit
- ie 11

## 目录组织规范

```
├── public
│ ├── favicon.ico
│ ├── index.html
│ └── static ---------------------------- 统一放置相关 hjson 文件
├── src
│ ├── App.vue --------------------------- Root 组件
│ ├── api ------------------------------- 接口管理
│ ├── assets ---------------------------- 静态文件，一般用来放图片
│ ├── components ------------------------ 全局组件
│ │ ├── FuncPanel ---------------------------- 全局功能组件
│ ├── svg ------------------------------  icon 管理
│ ├── initAppConfig.js --------------------- 初始化系统配置信息
│ ├── layout ---------------------------- layout 层管理
│ ├── main.js --------------------------- app 入口
│ ├── router ---------------------------  路由表管理
│ ├── store ----------------------------  Pinia
│ ├── styles ---------------------------- 全局 css 和 scss 函数变量
│ ├── utils ----------------------------- 工具函数管理
│ ├── views ----------------------------- 子系统页面模块
│ └── widgets ---------------------------- 全局widgets组件
├── vue.config.js
├── babel.config.js
├── jsconfig.json
├── package.json
├── postcss.config.js
├── prettier.config.js
├── yarn.lock
```

## 代码提交规范

**使用`yarn commit`**

- feat: 新特性，新功能
- fix: 修复bug
- merge: 合并
- perf: 性能优化
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- chore: 其他修改, 比如构建流程, 依赖管理
- test: 测试
- version: 版本发布
- scope: commit 影响的范围, 比如: route, component, utils, build...


## 安装包说明
### svg图标处理
- `yarn add vite-plugin-svg-icons` ---在vite构建工具中处理svg图标
- `yarn add fast-glob` --- 快速进行文件遍历, 解析完成后缓存处理
- 在vite.config.js里进行配置相关svg图标
```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

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
  ],
});
```

- 封装svg图标组件

```vue
<template>
  <svg :class="className" aria-hidden="true">
    <use :href="'#icon-' + iconName"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  // svg图标文件名
  iconName: String,
  className: {
    type: String,
    default: () => "svg-icon",
  },
});
</script>

<style scoped>
.svg-icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

- 全局注册svg图标组件

```javascript
import SvgIcon from "./views/SvgViewer/components";
// 注册svg图标
import "virtual:svg-icons-register";
app.component("SvgIcon", SvgIcon);
```

- svg图标组件使用

```vue
// className类名可以根据需要调整svg图标的style属性
<SvgIcon className="map-icon" iconName="404" />
.map-icon {
  width: 200px;
  height: 200px;
}
```

### 路由安装
- `yarn add vue-router -S`
### View UI Plus
- `npm install view-ui-plus --save`
### clipboard
- `yarn add clipboard -S` ---用于将文本复制到剪贴板(项目中暂时弃用)
### alias插件
- `yarn add -D @rollup/plugin-alias`
- `yarn add / npm install --save-dev @babel/plugin-proposal-optional-chaining`-->可选链操作符 ?. 可以按照操作符之前的属性是否有效
### postcss-pxtorem
- `yarn add postcss-pxtorem -D`---将px转换为rem
### Tailwind CSS
- `yarn add tailwindcss@2.2.16 postcss@latest autoprefixer@latest -D`---https://www.tailwindcss.cn/docs/installation
### eslint与prettier
- `yarn add  eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-plugin-html prettier -D`
### Pinia---Vue的专属状态管理库
- `yarn add pinia` ---https://pinia.vuejs.org/zh/getting-started.html
### yarn commit
https://yarnpkg.com/package/commitizen
- `yarn add commitizen -D`--- 局部安装commitizen, 辅助填写提交信息
- `yarn add cz-conventional-changelog -D` --- 基于conventional-changelog 规范的适配器
- `yarn add cz-customizable -D` --- 支持自定义的适配器
- `yarn add @@commitlint/cli @commitlint/config-conventional husky lint-staged`