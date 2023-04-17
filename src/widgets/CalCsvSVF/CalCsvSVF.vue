<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-08 17:20:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-16 16:52:51
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\CalSVF.vue
 * @Description: 计算SVF组件
-->
<template>
  <div class="distance-measure">
    <div>
      <CalCsvSVFList @getSVFValue="getCalSVF" />
    </div>
    <div
      class="flex  mt-2 h-12 items-center bg-neutral-5 border pl-3 border-neutral-5 rounded-sm"
    >
      <div class="w-1/4 font-semibold font-sans">SVF :</div>
      <div class="flex items-center justify-center">
        <div class="text-xl text-primary">{{ svfResult }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalCsvSVFList from "./components/CalCsvSVFList.vue";
import { ref } from "vue";
const svfResult = ref(-1);
const getCalSVF = res => {
  svfResult.value = res;
};
</script>
