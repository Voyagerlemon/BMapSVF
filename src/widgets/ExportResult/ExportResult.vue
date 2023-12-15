<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-05-06 10:44:41
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:38:04
 * @FilePath: \BMapSVF-Client\src\widgets\ExportResult\ExportResult.vue
 * @Description: Export data from the database
-->
<template>
  <div class="flex flex-col">
    <div class="font-bold text-sm mr-1">Test cases</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-6 mt-2 mb-2">
        <Button class="text-base" @click="ExportRoadResults">Fuhua Rd.</Button>
      </div>
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base" @click="ExportDistrictResults">
          Qinhuai District
        </Button>
      </div>
    </div>
    <Progress
      v-show="showProgress"
      :percent="progress"
      :status="statusToggle"
      :stroke-width="6"
      class="mt-2"
    />
  </div>
</template>
<script setup>
import { Button, Message, Progress } from "view-ui-plus";
import { ref, onMounted, onUnmounted } from "vue";

let socket = ref(null);
let progress = ref(0);
let statusToggle = ref("active");
let showProgress = ref(false);

// Encapsulate socket.io connection events
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
const ExportRoadResults = () => {
  socket.value.emit("getFuhuaPanoramaResults", "Get Shenzhen Fuhua Road data");
  Message.success({
    background: true,
    content: "The results are being exported...",
    duration: 3
  });
  socket.value.on("postFuhuaPanoramaResults", res => {
    if (res.status === 200) {
      const zipData = res.data;
      const zipBlob = new Blob([zipData], { type: "application/zip" });
      // Create download link
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res.name + ".zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      Message.error({
        background: true,
        content: "The result export failed, please try again later!",
        duration: 3
      });
    }
  });
};
const ExportDistrictResults = () => {
  socket.value.emit("getQinhuaiPanoramaResults", "Obtain Qinhuai district data");
  Message.success({
    background: true,
    content: "The results are being exported...",
    duration: 7
  });
  socket.value.on("postQinhuaiPanoramaResults", res => {
    if (res.status === 200) {
      const zipData = res.data;
      const zipBlob = new Blob([zipData], { type: "application/zip" });
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", res.name + ".zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      Message.error({
        background: true,
        content: "The result export failed, please try again later!",
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
