<!-- 
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-06 14:49:50
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-06 16:48:59
 * @FilePath: \BMapSVF-Client\src\widgets\MapToggle\MapToggle.vue
 * @Description: 底图切换组件
-->
<template>
  <Dropdown class="map-toggle" placement="left">
    <div class="bg-gray-200 cursor-pointer shadow map-layer">
      <div class="map-layer-inner">
        <div class="bg-neutral-0">
          <SvgIcon className="opacity-80 w-14 h-14" iconName="img" />
        </div>
      </div>
    </div>
    <template #list>
      <DropdownMenu transfer>
        <div class="flex flex-row-reverse">
          <div
            class="relative layer"
            v-for="(item, index) in baseMapLayers"
            :key="index"
          >
            <div class="overflow-hidden cursor-pointer layer-item bg-gray-200">
              <div
                class="h-full overflow-hidden border-2 border-solid"
                :class="
                  isNodeLayer(item) ? `border-primary` : `border-neutral-5`
                "
              >
                <SvgIcon :iconName="item.icon" className="w-14 h-14" />
                <div
                  class="w-full sticky bottom-0 bg-primary bg-opacity-50 text-default text-xs text-center layer-name"
                >
                  {{ isNodeLayer(item) ? isNodeLayer(item).name : item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </template>
  </Dropdown>
</template>
<script setup>
import { Dropdown, DropdownMenu } from "view-ui-plus";
import { ref, reactive } from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";

const baseMapLayers = reactive([
  { name: "电子地图", icon: "vec" },
  { name: "卫星地图", icon: "img" },
  { name: "混合地图", icon: "img" }
]);
let nowBaseLayer = ref(
  { name: "电子地图", icon: "vec" },
  { name: "卫星地图", icon: "img" },
  { name: "混合地图", icon: "img" }
);

const isNodeLayer = curBaseLayer => {
  let layer = null;

  if (curBaseLayer.name === nowBaseLayer.value.name) {
    layer = curBaseLayer;
  }

  return layer;
};
</script>
<style lang="scss" scoped>
$distance: 0.13rem;
$border-radius: 0.26rem;
.map-toggle {
  .map-layer {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: $border-radius;
    &-inner {
      padding: 0.3rem;
    }
  }

  .layer-item {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: $border-radius;
    padding: $distance;
    .layer-name {
      padding: 0.21rem 0;
    }
  }
}
</style>
