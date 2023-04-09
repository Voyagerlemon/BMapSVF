<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-08 17:20:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-09 11:29:00
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\CalSVF.vue
 * @Description: 计算SVF组件
-->
<template>
  <div class="distance-measure">
    <div
      class="flex h-12 items-center bg-neutral-5 border pl-3 border-neutral-5 rounded-sm"
    >
      <div class="w-1/3">总距离:</div>
      <div class="flex items-center justify-center">
        <div class="text-lg text-primary">5</div>
        <div class="text-xs pl-1 mt-1">m</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Message } from "view-ui-plus";
Message.success({
  background: true,
  content: "资源中不存在地图组件",
  duration: 3
});
</script>
