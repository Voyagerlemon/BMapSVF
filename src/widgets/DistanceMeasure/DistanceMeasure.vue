<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-07 16:49:32
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:36:33
 * @FilePath: \BMapSVF-Client\src\widgets\DistanceMeasure\DistanceMeasure.vue
 * @Description: range measurement
-->
<template></template>
<script setup>
import { onMounted, onUnmounted } from "vue";
import DistanceTool from "bmaplib.distancetool";
const distanceTool = new DistanceTool(window.map, { lineStroke: 2 });
console.log("tool", distanceTool);
const openDistanceTool = e => {
  distanceTool && distanceTool.open();
};

onMounted(() => {
  openDistanceTool();
  window.global = window.global || window;
});

onUnmounted(() => {
  distanceTool && distanceTool.close();
});
</script>
