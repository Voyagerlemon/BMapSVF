<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-08 17:20:17
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 13:26:13
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\CalSVF.vue
 * @Description: Calculate SVF components
-->
<template>
  <div class="distance-measure">
    <div>
      <CalSVFList @getSVFValue="getCalSVF"></CalSVFList>
    </div>
    <div
      class="flex h-12 items-center bg-neutral-5 border pl-3 border-neutral-5 rounded-sm"
    >
      <div class="w-1/4 font-semibold font-sans">SVF :</div>
      <div class="flex items-center justify-center">
        <div class="text-xl text-primary">{{ svfResult }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalSVFList from "./components/CalSVFList.vue";
import { ref } from "vue";
const svfResult = ref(-1);
const getCalSVF = res => {
  svfResult.value = res;
};
</script>
