<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-04 15:55:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-07 19:12:38
 * @FilePath: \BMapSVF-Client\src\widgets\MapTool\MapTool.vue
 * @Description: 地图工具容器
-->
<template>
  <div class="map-tool">
    <div
      id="mapTopLeft"
      class="absolute flex items-start max-w-full pointer-events-auto left-0 top-0"
    >
      <!--  -->
    </div>
    <div
      id="mapTopRight"
      class="absolute flex items-start flex-row-reverse max-w-full pointer-events-auto top-0 right-2"
    >
      <!-- <ToolBox></ToolBox> -->
      <!--  -->
    </div>
    <div
      id="mapBottomLeft"
      class="absolute flex items-start max-w-full pointer-events-auto bottom-0 left-0"
    >
      <!--  -->
    </div>
    <div
      id="mapBottomRight"
      class="absolute flex items-end flex-col-reverse max-w-full pointer-events-auto bottom-0 right-0"
    >
      <!--  -->
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import store from "@/store";

const initTool = async () => {
  const resource = store.getters["widget/resourceMap"]["MapTool"];
  const tools = resource.children || [];
  loadTool(tools);
};
const loadTool = async tools => {
  for (const tool of tools) {
    await store.dispatch("widget/openWidget", {
      name: tool.name,
      prop: {
        widgetName: tool.name,
        store
      }
    });
  }
};
onMounted(() => {
  initTool();
});
</script>
<style lang="scss" scoped>
.map-tool {
  #mapTopRight {
    > div {
      margin-left: 0.83rem;
    }
  }
  #mapTopLeft {
    margin-left: 1.5rem;
    > div {
      margin-right: 0.83rem;
    }
  }
  #mapBottomLeft {
    > div {
      margin-right: 0.83rem;
    }
  }
  #mapBottomRight {
    > div {
      margin-top: 0.83rem;
    }
  }
}
</style>
