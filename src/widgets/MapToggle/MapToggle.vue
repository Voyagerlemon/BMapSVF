<!-- 
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-06 14:49:50
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-07 14:10:36
 * @FilePath: \BMapSVF-Client\src\widgets\MapToggle\MapToggle.vue
 * @Description: 底图切换组件
-->
<template>
  <Dropdown class="map-toggle" placement="left">
    <div class="bg-gray-200 cursor-pointer shadow map-layer">
      <div class="map-layer-inner">
        <div class="">
          <SvgIcon
            v-if="nowBaseLayer"
            className="opacity-80 w-14 h-14"
            :iconName="nowBaseLayer.icon"
          />
        </div>
      </div>
    </div>
    <template #list>
      <DropdownMenu transfer>
        <div class="flex justify-evenly flex-row-reverse w-60">
          <div
            class="relative layer"
            v-for="(item, index) in baseMapLayers"
            :key="index"
          >
            <div
              class="overflow-hidden cursor-pointer layer-item bg-gray-200"
              @click="changeBaseMap(item)"
            >
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
import store from '@/store'
// 配置文件 ---> MapToggle.hjson
const baseMapLayers = reactive([
  { name: "电子地图", icon: "vec", id: 1 },
  { name: "卫星地图", icon: "img", id: 2 },
  { name: "混合地图", icon: "img", id: 3 }
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
const changeBaseMap = node => {
  if (node.id === 1) {
    window.map.setMapType(window.BMAP_NORMAL_MAP);
    nowBaseLayer.value.icon = "vec";
  }
  if (node.id === 2) {
    window.map.setMapType(window.BMAP_SATELLITE_MAP);
    nowBaseLayer.value.icon = "img";
  }
  if (node.id === 3) {
    window.map.setMapType(window.BMAP_HYBRID_MAP);
    nowBaseLayer.value.icon = "img";
  }
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
