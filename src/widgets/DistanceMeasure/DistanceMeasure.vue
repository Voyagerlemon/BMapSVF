<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-07 16:49:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-08 17:21:14
 * @FilePath: \BMapSVF-Client\src\widgets\DistanceMeasure\DistanceMeasure.vue
 * @Description: 距离测量
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
