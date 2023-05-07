<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-05-07 16:20:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-07 18:00:25
 * @FilePath: \BMapSVF-Client\src\widgets\SVFDistribution\SVFDistribution.vue
 * @Description: the spatial distribution of svf
-->
<template>
  <div class="flex flex-col">
    <div class="font-bold text-sm mr-1">Test cases</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-6 mt-2 mb-2">
        <Button class="text-base" @click="FSVFDistribution">Fuhua Rd.</Button>
      </div>
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base" @click="QSVFDistribution">
          Qinhuai District
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Button, Message } from "view-ui-plus";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import store from "@/store";
let socket = ref(null);
const panoramaResults = reactive([]);
const panoramaCsvResults = reactive([]);
let map = window.map;
let BMap = window.BMap;
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
const svfColors = reactive([
  "#FDE725",
  "#B6DE2B",
  "#6DCD59",
  "#35B779",
  "#1F9E89",
  "#26838F",
  "#31678E",
  "#3F4A8A",
  "#482777",
  "#440154"
]);
// 根据SVF值给定标记点的颜色
function getColor(val) {
  let opts = Math.floor(val * 10);
  if (opts < 0) opts = 0;
  if (opts > 9) opts = 9;
  return svfColors[opts];
}
// 创建地图信息窗口的DOM结点
//#region
const div = document.createElement("div");
div.style.float = "left";
div.style.borderRadius = "border-radius: 0.36rem;";
const panResultFishEye = document.createElement("img");
panResultFishEye.style.width = "256px";
panResultFishEye.style.height = "256px";
panResultFishEye.style.float = "left";

const panResultFisheyeSeg = document.createElement("img");
panResultFisheyeSeg.style.width = "256px";
panResultFisheyeSeg.style.height = "256px";
panResultFisheyeSeg.style.float = "left";

div.appendChild(panResultFisheyeSeg);
div.appendChild(panResultFishEye);
const infoWindow = new BMap.InfoWindow(div, {
  width: 512,
  offset: new BMap.Size(0, 0)
});
//#endregion
const FSVFDistribution = () => {
  socket.value.emit("getPanoramaResults", "获取福华路案例");
  socket.value.on("postPanoramaResults", res => {
    panoramaResults.splice(0, panoramaResults.length, res.panoramaResults);
    if (panoramaResults[0].length === 0) {
      map.clearOverlays();
      return;
    }
    map.clearOverlays();
    if (document.createElement("canvas").getContext) {
      for (let i = 0; i < panoramaResults[0].length; i++) {
        const locationPoint = new BMap.Point(
          panoramaResults[0][i].lng,
          panoramaResults[0][i].lat
        );
        const markerFishEye = new BMap.Marker(locationPoint, {
          icon: new BMap.Symbol(window.BMap_Symbol_SHAPE_CIRCLE, {
            fillColor: getColor(panoramaResults[0][i].svf),
            fillOpacity: 0.95,
            strokeColor: getColor(panoramaResults[0][i].svf),
            strokeWeight: 1,
            scale: 7
          }),

          title:
            "SVF=" + String(panoramaResults[0][i].svf.toFixed(2)) + " (sky)"
        });
        markerFishEye.addEventListener("mouseover", () => {
          panResultFishEye.setAttribute(
            "src",
            "data:image/jpeg;base64," + panoramaResults[0][i].fisheye
          );
          panResultFisheyeSeg.setAttribute(
            "src",
            "data:image/jpeg;base64," + panoramaResults[0][i].fisheye_seg
          );
          map.openInfoWindow(infoWindow, locationPoint);
        });
        markerFishEye.addEventListener("mouseout", () => {
          infoWindow.close();
        });
        map.addOverlay(markerFishEye);
      }
      store.dispatch("map/setSVFPointsLoaded", true);
      const centerPoint = new BMap.Point(
        panoramaResults[0][0].lng,
        panoramaResults[0][0].lat
      );
      map.centerAndZoom(centerPoint, 18);
    } else {
      alert("Please run it in chrome, safari, Internet Explorer 8+ or above!");
    }
  });
};
const QSVFDistribution = () => {
  socket.value.emit("getCsvPanoramaResults", "获取秦淮区案例");
  Message.info({
    background: true,
    content: "The data is loading!",
    duration: 5
  });
  socket.value.on("postCsvPanoramaResults", res => {
    panoramaCsvResults.splice(
      0,
      panoramaCsvResults.length,
      res.panoramaResults
    );
    if (panoramaCsvResults[0].length === 0) {
      map.clearOverlays();
      return;
    }
    map.clearOverlays();
    if (document.createElement("canvas").getContext) {
      for (let i = 0; i < panoramaCsvResults[0].length; i++) {
        const locationPoint = new BMap.Point(
          panoramaCsvResults[0][i].lng,
          panoramaCsvResults[0][i].lat
        );
        const markerFishEye = new BMap.Marker(locationPoint, {
          icon: new BMap.Symbol(window.BMap_Symbol_SHAPE_CIRCLE, {
            fillColor: getColor(panoramaCsvResults[0][i].svf),
            fillOpacity: 0.95,
            strokeColor: getColor(panoramaCsvResults[0][i].svf),
            strokeWeight: 1,
            scale: 7
          }),
          title: "SVF=" + String(panoramaCsvResults[0][i].svf.toFixed(2))
        });
        markerFishEye.addEventListener("mouseover", () => {
          panResultFishEye.setAttribute(
            "src",
            "data:image/jpeg;base64," + panoramaCsvResults[0][i].fisheye
          );
          panResultFisheyeSeg.setAttribute(
            "src",
            "data:image/jpeg;base64," + panoramaCsvResults[0][i].fisheye_seg
          );
          map.openInfoWindow(infoWindow, locationPoint);
        });
        markerFishEye.addEventListener("mouseout", () => {
          infoWindow.close();
        });
        map.addOverlay(markerFishEye);
      }
      //store.dispatch("map/setSVFPointsLoaded", true);
      const centerPoint = new BMap.Point(
        panoramaCsvResults[0][0].lng,
        panoramaCsvResults[0][0].lat
      );
      map.centerAndZoom(centerPoint, 15);
    } else {
      alert("Please run it in chrome, safari, Internet Explorer 8+ or above!");
    }
  });
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
  map.clearOverlays();
  store.dispatch("map/setSVFPointsLoaded", false);
});
</script>
