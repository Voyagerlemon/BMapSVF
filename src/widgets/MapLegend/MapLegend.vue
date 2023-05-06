<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-28 09:37:29
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-06 17:04:43
 * @FilePath: \BMapSVF-Client\src\widgets\ScreenExport\ScreenExport.vue
 * @Description: 系统截图
-->
<template>
  <div>
    <Tooltip
      content="SVF legend"
      placement="left"
      class="absolute bottom-24 right-1"
    >
      <div
        class="screen shadow-default cursor-pointer flex items-center justify-center border border-gray-200"
      >
        <SvgIcon
          iconName="legend-black"
          className="screen-icon"
          @click="clickToLegend"
        />
      </div>
    </Tooltip>
    <div
      v-show="showLegend"
      class="flex flex-col items-center bg-gray-200 bg-opacity-80 screen-legend absolute right-1 border rounded shadow-lg border-gray-200"
    >
      <h3 class="screen-legend-title text-xxl text-neutral-1 font-semibold">
        SVF
      </h3>
      <div class="flex flex-row items-center justify-center w-24">
        <div class="screen-draw1 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.0-0.1</div>
      </div>
      <div class="flex flex-row items-center justify-center py-1 w-24">
        <div class="screen-draw2 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.1-0.2</div>
      </div>
      <div class="flex flex-row items-center justify-center py-1 w-24">
        <div class="screen-draw3 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.2-0.3</div>
      </div>
      <div class="flex flex-row items-center justify-center py-1 w-24">
        <div class="screen-draw4 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.3-0.4</div>
      </div>
      <div class="flex flex-row items-center justify-center py-1 w-24">
        <div class="screen-draw5 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.4-0.5</div>
      </div>
      <div class="flex flex-row items-center justify-center py-1 w-24">
        <div class="screen-draw6 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.5-0.6</div>
      </div>
      <div class="flex flex-row items-center justify-center w-24 py-1">
        <div class="screen-draw7 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.6-0.7</div>
      </div>
      <div class="flex flex-row items-center justify-center w-24 py-1">
        <div class="screen-draw8 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.7-0.8</div>
      </div>
      <div class="flex flex-row items-center justify-center w-24 py-1">
        <div class="screen-draw9 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.8-0.9</div>
      </div>
      <div class="flex flex-row items-center justify-center w-24 py-1">
        <div class="screen-draw10 w-4 h-4 rounded-full mr-2"></div>
        <div class="text-lg text-neutral-2 font-medium">0.9-1.0</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Message, Tooltip } from "view-ui-plus";

import store from "@/store";
const showLegend = ref(false);
watchEffect(() => {
  const isPointsLoaded = store.getters["map/svfPointsLoaded"];
  if (!isPointsLoaded) showLegend.value = false;
});
const clickToLegend = () => {
  const isPointsLoaded = store.getters["map/svfPointsLoaded"];
  if (!isPointsLoaded) {
    Message.info({
      background: true,
      content: "Please loading points of svf firstly!",
      duration: 5
    });
  } else {
    showLegend.value = !showLegend.value;
  }
};
</script>
<style lang="scss" scoped>
.screen {
  width: 2.48rem;
  height: 2.48rem;
  border-radius: 0.26rem;
  background-color: #f8f8f8;
  &-icon {
    width: 1.6rem;
    height: 1.6rem;
    margin-top: auto 0;
    fill: #727272;
  }
  &-legend {
    bottom: 12rem;

    .screen-draw1 {
      background-color: #fde725;
    }
    .screen-draw2 {
      background-color: #b6de2b;
    }
    .screen-draw3 {
      background-color: #6dcd59;
    }
    .screen-draw4 {
      background-color: #35b779;
    }
    .screen-draw5 {
      background-color: #1f9e89;
    }
    .screen-draw6 {
      background-color: #26838f;
    }
    .screen-draw7 {
      background-color: #31678e;
    }
    .screen-draw8 {
      background-color: #3f4a8a;
    }
    .screen-draw9 {
      background-color: #482777;
    }
    .screen-draw10 {
      background-color: #440154;
    }
  }
}
</style>
