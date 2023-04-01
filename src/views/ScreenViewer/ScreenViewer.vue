<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 20:24:11
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-01 21:37:36
 * @FilePath: \BMapSVF-Client\src\views\ScreenViewer\ScreenViewer.vue
 * @Description: 系统界面布局
-->
<template>
  <div id="screenViewer" class="absolute flex flex-col w-full h-full">
    <div class="w-full h-full relative overflow-hidden screen-viewer">
      <div class="flex flex-1 h-full relative">
        <div id="screenWrapper" class="relative h-full w-full"></div>
        <div
          id="screenTool"
          class="absolute pointer-events-none screen-tool"
        ></div>
      </div>
      <div
        id="screenLeft"
        class="absolute top-0 left-0 bottom-0 bg-digit bg-opacity-70 border border-digitline border-opacity-30 border-l-0"
      ></div>
      <div
        id="viewerFull"
        class="absolute top-0 left-0 bottom-0 right-0 pointer-events-none viewer-full"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
</script>
<style lang="scss" scoped>
.screen-viewer {
  .screen-tool {
    top: 0.94rem;
    left: 0.94rem;
    right: 0.94rem;
    bottom: 1rem;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .viewer-full {
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: 0);
    & > div {
      @apply pointer-events-auto;
    }
  }
}
</style>
