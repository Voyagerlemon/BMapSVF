<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-09 20:03:35
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 11:20:42
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
    <div class="font-bold text-sm mr-1">Overall Calculation</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base">Calculate SVF</Button>
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
import { io } from "socket.io-client";
import { ref, onMounted } from "vue";
let socket = ref(null);

onMounted(() => {
  socket.value = io("http://127.0.0.1:5000");
  // 建立连接的事件
  socket.value.on("connect", () =>
    console.log("connect: websocket 连接成功！")
  );
});
</script>
