<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-05-06 10:44:41
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-06 16:14:39
 * @FilePath: \BMapSVF-Client\src\widgets\ExportResult\ExportResult.vue
 * @Description: 导出数据库中的数据
-->
<template>
  <div class="flex flex-col">
    <div class="font-bold text-sm mr-1">Test cases</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-6 mt-2 mb-2">
        <Button class="text-base">Fuhua Rd.</Button>
      </div>
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base" @click="ExportDistrictResults">
          Qinhuai District
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button, Message } from "view-ui-plus";
import { ref, onMounted, onUnmounted } from "vue";

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
    Message.info({
      background: true,
      content: "BMapSVF server is connected unsuccessfully!",
      duration: 3
    });
  });
  socket.value.on("reconnect", () => {
    Message.info({
      background: true,
      content: "BMapSVF server is trying to connect!",
      duration: 3
    });
  });
  socket.value.on("error", error => {
    Message.error({
      background: true,
      content: error,
      duration: 3
    });
  });
};

const ExportDistrictResults = () => {
  socket.value.emit("getAllPanoramaResults", "获取数据库中的数据");
  socket.value.on("postAllPanoramaResults", res => {
    if (res.status === 200) {
      Message.success({
        background: true,
        content: res.msg,
        duration: 3
      });
    } else {
      Message.error({
        background: true,
        content: "All data is saved unsuccessfully!",
        duration: 3
      });
    }
  });
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
});
</script>
<style lang="scss"></style>
