<!-- 
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-06 14:49:50
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:42:12
 * @FilePath: \BMapSVF-Client\src\widgets\MapToggle\MapToggle.vue
 * @Description: Base map switch component
-->
<template>
  <Dropdown class="map-toggle" placement="left">
    <div class="bg-gray-200 cursor-pointer shadow map-layer">
      <div class="map-layer-inner">
        <div>
          <SvgIcon
            v-if="nowBaseLayer"
            className="opacity-80 w-16 h-16"
            :iconName="nowBaseLayer"
          />
        </div>
      </div>
    </div>
    <template #list>
      <DropdownMenu transfer>
        <div
          class="flex justify-evenly items-center flex-row-reverse w-72 h-24"
        >
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
                class="h-full overflow-hidden border-2 border-solid layer-border"
                :class="
                  isNodeLayer(item) ? `border-primary` : `border-neutral-5`
                "
              >
                <SvgIcon
                  :iconName="item.icon"
                  className="w-16 h-16 map-toggle"
                />
                <div
                  class="w-full sticky bottom-0 bg-primary bg-opacity-50 text-default text-center layer-name"
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
import { Dropdown, DropdownMenu, Message } from "view-ui-plus";
import { ref, reactive, onMounted } from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import store from "@/store";

let layerName = ref("");
let nowBaseLayer = ref("");
const baseMapLayers = reactive([]);
const addBaseMap = () => {
  // Gets the baseLayers in the MapToggle configuration file
  const { baseLayers } = store.getters["widget/widgetConfig"];
  // The current open default base map
  const curBaseLayer = baseLayers.filter(item => {
    return item.visible;
  })[0];
  if (!curBaseLayer) {
    Message.error({
      background: true,
      content: "Default base layer not configured!",
      duration: 3
    });
  }
  nowBaseLayer.value = curBaseLayer.icon;
  layerName.value = curBaseLayer.name;
  baseMapLayers.push(...baseLayers);
};
const isNodeLayer = curBaseLayer => {
  let layer = null;
  if (curBaseLayer.name === layerName.value) {
    layer = curBaseLayer;
  }
  return layer;
};
const changeBaseMap = node => {
  if (node.id === 1) {
    window.map.setMapType(window.BMAP_NORMAL_MAP);
    nowBaseLayer.value = node.icon;
    layerName.value = node.name;
  }
  if (node.id === 2) {
    window.map.setMapType(window.BMAP_SATELLITE_MAP);
    nowBaseLayer.value = node.icon;
    layerName.value = node.name;
  }
  if (node.id === 3) {
    window.map.setMapType(window.BMAP_HYBRID_MAP);
    nowBaseLayer.value = node.icon;
    layerName.value = node.name;
  }
};
onMounted(() => {
  addBaseMap();
});
</script>
<style lang="scss" scoped>
$distance: 0.42rem;
$border-radius: 0.26rem;
.map-toggle {
  .map-layer {
    width: 4.68rem;
    height: 4.68rem;
    border-radius: $border-radius;
    &-inner {
      padding: 0.35rem;
    }
  }

  .layer-item {
    width: 5.25rem;
    height: 5.08rem;
    border-radius: $border-radius;
    padding: $distance;
    .layer-border {
      width: 4.66rem;
      .map-toggle {
        margin: 0 auto;
      }
    }
    .layer-name {
      padding: 0.21rem 0;
    }
  }
}
</style>
