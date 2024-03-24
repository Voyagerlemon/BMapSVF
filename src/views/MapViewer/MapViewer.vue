<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-29 20:24:11
 * @LastEditors: Voyagerlemon xuhaiyangw@163.com
 * @LastEditTime: 2024-03-07 15:37:41
 * @FilePath: \BMapSVF-Client\src\views\ScreenViewer\ScreenViewer.vue
 * @Description: System interface layout
-->
<template>
  <div id="mapViewer" class="absolute flex flex-col w-full h-full">
    <top-header
      :logoUrl="logoUrl"
      :appTitle="appTitle"
      :githubUrl="githubUrl"
    ></top-header>
    <div class="flex flex-row flex-1 w-full overflow-hidden map-viewer">
      <div class="flex flex-1 relative">
        <div id="mapWrapper" class="relative h-full w-full"></div>
        <div id="mapTool" class="absolute pointer-events-none map-tool"></div>
      </div>
      <div
        id="mapFull"
        class="absolute top-0 left-0 bottom-0 right-0 pointer-events-none map-full"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { Message } from "view-ui-plus";
import TopHeader from "./components/Header.vue";
import { useStore } from "vuex";
import { getResourceTree } from "@/api/public";
import { handleResource } from "@/utils/permission/permission";
const logoUrl = reactive({
  name: "system icon",
  icon: "/fisheye.png"
});
const githubUrl = reactive({
  name: "BMapSVF github",
  url: "https://github.com/Voyagerlemon/BMapSVF"
});
const appTitle = ref("BMapSVF");
const store = useStore();
// Listen for changes in store data
watch(
  () => store.state.map.mapLoaded,
  data => {
    if (data) {
      console.log("watch mapLoaded: ", data);
      const resourceMap = store.getters["widget/resourceMap"];
      const layouts = resourceMap["app"]["children"].filter(
        item => item.name !== "Map"
      );
      initWidgets(layouts);
      store.dispatch("map/setMapLoaded", false);
    }
  }
);
const initApp = async () => {
  const resources = await getResourceTree("resourceMap");
  const resourceMap = handleResource("app", resources);
  store.dispatch("widget/setResourceMap", resourceMap);
  const mapInfo = resourceMap["Map"];
  if (!mapInfo) {
    Message.info({
      background: true,
      content: "The map component does not exist in the resource",
      duration: 3
    });
    return;
  }
  initMapWidget();
};
const initMapWidget = () => {
  store.dispatch("widget/openWidget", {
    name: "Map",
    prop: {
      store
    }
  });
};
const initWidgets = async layoutWidgets => {
  for (const widget of layoutWidgets) {
    await store.dispatch("widget/openWidget", {
      name: widget.name,
      prop: {
        widgetName: widget.name,
        store
      }
    });
  }
};
onMounted(() => {
  initApp();
});
</script>
<style lang="scss" scoped>
.map-viewer {
  .map-tool {
    top: 0.94rem;
    left: 0.94rem;
    right: 0.94rem;
    bottom: 1rem;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .map-full {
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: 0);
    & > div {
      @apply pointer-events-auto;
    }
  }
}
</style>
