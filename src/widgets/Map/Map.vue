<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2021-02-26 14:16:48
 * @LastEditTime: 2023-12-15 18:39:51
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @Description: Baidu map component
-->
<template>
  <BaiduMap :longitude="118.792611" :latitude="32.047962" :zoom="12"></BaiduMap>
</template>

<script setup>
import { onMounted} from "vue";
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
