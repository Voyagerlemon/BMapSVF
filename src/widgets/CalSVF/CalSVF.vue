<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-08 17:20:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 11:04:52
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\CalSVF.vue
 * @Description: 计算SVF组件
-->
<template>
  <div class="distance-measure">
    <div>
      <CalSVFList></CalSVFList>
    </div>
    <div
      class="flex h-12 items-center bg-neutral-5 border pl-3 border-neutral-5 rounded-sm"
    >
      <div class="w-1/4 font-semibold font-sans">SVF :</div>
      <div class="flex items-center justify-center">
        <div class="text-xl text-primary">1</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalSVFList from "./components/CalSVFList.vue";
import { Message } from "view-ui-plus";
</script>
