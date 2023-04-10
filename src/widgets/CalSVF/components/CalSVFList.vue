<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-09 20:03:35
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 10:59:14
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\components\CalSVFList.vue
 * @Description: SVF计算方式
-->
<template>
  <div class="flex flex-col">
    <div class="font-bold text-sm mr-1">Calculate Step by Step</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base">Click on the map</Button>
      </div>
      <div class="mr-2">
        <Button class="text-base">Real-time Semantic Segmentation</Button>
      </div>
      <div class="mr-2">
        <Button class="text-base">Convert Fisheye Images</Button>
      </div>
      <Tooltip content="Clear with One Click" placement="right" transfer>
        <SvgIcon
          className="w-5 h-5 cursor-pointer ml-2 mr-0"
          iconName="clear"
        />
      </Tooltip>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Button, Tooltip } from "view-ui-plus";
import VueSocketIO from "vue-socket.io";
import { createApp, getCurrentInstance } from "vue";
/* const CalSVFList = createApp(getCurrentInstance());

const socket = new VueSocketIO({
  debug: true,
  connection: "http://127.0.0.1:5000"
});
CalSVFList.use(socket);
console.log(CalSVFList); */
</script>
