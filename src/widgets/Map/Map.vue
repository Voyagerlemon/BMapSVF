<!--
 * @Author: Lauxb
 * @Date: 2021-02-26 14:16:48
 * @LastEditTime: 2023-04-06 11:05:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 百度地图组件
-->
<template>
  <BaiduMap :longitude="118.792611" :latitude="32.047962" :zoom="18"></BaiduMap>
</template>

<script setup>
import { onMounted } from "vue";
import store from "@/store";
import BaiduMap from "../../components/BaiduMap.vue";
const initApp = () => {
  console.log("map has already!");
  store.dispatch("map/setMapLoaded", true);
};
onMounted(() => {
  initApp();
});
</script>
