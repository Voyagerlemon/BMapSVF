<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-04 15:55:32
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:42:58
 * @FilePath: \BMapSVF-Client\src\widgets\MapTool\MapTool.vue
 * @Description: Map tool container
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
      class="absolute flex items-start flex-row-reverse max-w-full pointer-events-auto top-0 right-0"
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
