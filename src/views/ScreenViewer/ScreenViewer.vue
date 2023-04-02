<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 20:24:11
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-02 11:36:39
 * @FilePath: \BMapSVF-Client\src\views\ScreenViewer\ScreenViewer.vue
 * @Description: 系统界面布局
-->
<template>
  <div id="screenViewer" class="absolute flex flex-col w-full h-full">
    <top-header :logoUrl="logoUrl" :appTitle="appTitle"></top-header>
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
import { ref, reactive, onMounted } from "vue";
import TopHeader from "./components/Header.vue";
import { getWidgetConfig } from "@/api/public";
const logoUrl = reactive({
  name: "system icon",
  path: "/fisheye.png"
});
const appTitle = ref("BMapSVF");
const getDataSource = async () => {
  const res = await getWidgetConfig("DataResource");
  console.log(res);
};
onMounted(() => {
  getDataSource();
});
/* async function initApp() {
  const { appId } = this.$route.params;
  this.$store.dispatch("app/setAppId", appId);
  this.setAppInfo(appId);
  const resources = await getResourceTree(appId);
  const resourceMap = handleResource("app", resources);
  this.$store.dispatch("widget/setResourceMap", resourceMap);
  const sceneInfo = resourceMap["Scene"];
  if (!sceneInfo) {
    this.$Message.info("资源中不存在场景组件");
    return;
  }
  this.initSceneWidget();
} */
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
