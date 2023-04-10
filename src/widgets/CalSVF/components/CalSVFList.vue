<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-09 20:03:35
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 16:11:40
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
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Message } from "view-ui-plus";
let socket = ref(null);
// 封装socket.io连接事件
const socketInstance = () => {
  socket.value = window.io.connect("http://127.0.0.1:5000");
  socket.value.on("connect", () => {
    Message.success({
      background: true,
      content: "BMapSVF server is connected successfully!",
      duration: 3
    });
  });
  socket.value.on("disconnect", () => {
    Message.info();
    ({
      background: true,
      content: "BMapSVF server is connected unsuccessfully!",
      duration: 3
    });
  });
  socket.value.on("reconnect", () => {
    Message.info();
    ({
      background: true,
      content: "BMapSVF server is trying to connect!",
      duration: 3
    });
  });
  socket.value.on("error", error => {
    Message.error();
    ({
      background: true,
      content: error,
      duration: 3
    });
  });
};
const loginForm = reactive({
  username: "admin",
  password: "gis5566"
});

onMounted(() => {
  socketInstance();
  socket.value.emit("login", loginForm);
  socket.value.on("loginSuccess", data => {
    console.log(data);
  });
});
onUnmounted(() => {
  socket.value.close();
});
</script>
