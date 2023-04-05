<!--
 * @Author: Lauxb
 * @Date: 2021-02-26 14:16:48
 * @LastEditTime: 2023-04-05 10:25:28
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 百度地图组件
-->
<template>
  <baidu-map
    class="h-full w-full"
    :center="center"
    :zoom="zoom"
    :scroll-wheel-zoom="true"
    @ready="handler"
  >
    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    <bm-panorama
      anchor="BMAP_ANCHOR_TOP_right"
      class="absolute top-5 bottom-2"
      :offset="{ width: 10, height: 60 }"
    ></bm-panorama>
    <bm-geolocation
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :showAddressBar="true"
      :autoLocation="true"
    ></bm-geolocation>
  </baidu-map>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isSingle = ref(false);

const center = ref({ lng: 0, lat: 0 });
const zoom = ref(3);

console.log("map has already!");
const handler = ({ BMap, map }) => {
  console.log(BMap, map);
  center.value.lng = 118.792611;
  center.value.lat = 32.047962;
  zoom.value = 18;
};
onMounted(() => {
  if (!isSingle) {
    store.dispatch("map/setMapLoaded", true);
  }
});
</script>
<!-- 
<style lang="scss" scoped>
.scene {
  :deep(.cesium-viewer-bottom) {
    display: none;
  }
  :deep(.cesium-performanceDisplay-defaultContainer) {
    top: 40% !important;
  }
}
</style> -->
