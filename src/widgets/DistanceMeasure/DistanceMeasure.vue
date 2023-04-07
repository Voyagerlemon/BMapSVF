<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-07 16:49:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-07 16:52:37
 * @FilePath: \BMapSVF-Client\src\widgets\DistanceMeasure\DistanceMeasure.vue
 * @Description: 距离测量
-->
<template>
  <div class="distance-measure">
    <div
      class="flex h-12 items-center bg-neutral-5 border pl-3 border-neutral-5 rounded-sm"
    >
      <div class="w-1/3">总距离:</div>
      <div class="flex items-center justify-center">
        <div class="text-lg text-primary">{{ distanceResult }}</div>
        <div class="text-xs pl-1 mt-1">{{ distanceUnits }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const distanceResult = ref(0);
const distanceUnits = ref("m");
</script>
