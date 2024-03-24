<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-05-07 16:20:17
 * @LastEditors: Voyagerlemon xuhaiyangw@163.com
 * @LastEditTime: 2024-03-01 17:01:50
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
    <div class="ml-0 mr-2 mt-2 mb-2">
      <Button class="text-base" @click="getLessVerify">
        Validation of 3D urban building models
      </Button>
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
const fisheyeTest = reactive([]);
let map = window.map;
let BMap = window.BMap;
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
    map.clearOverlays();
    store.dispatch("map/setSVFPointsLoaded", false);
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
// The color of the marker is given based on the SVF value
function getColor(val) {
  let opts = Math.floor(val * 10);
  if (opts < 0) opts = 0;
  if (opts > 9) opts = 9;
  return svfColors[opts];
}
// Create the DOM node of the map information window
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
  socket.value.emit("getPanoramaResults", "Obtain the case of Fuhua Road");
  Message.info({
    background: true,
    content: "The data is loading...",
    duration: 6
  });
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

          title: "SVF=" + String(panoramaResults[0][i].svf.toFixed(2))
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
/* const QSVFDistribution = () => {
  socket.value.emit("getCsvPanoramaResults", "The case of Qinhuai District was obtained");
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
}; */

const QSVFDistribution = () => {
  socket.value.emit("getCsvSVFResults", "The case of Qinhuai District was obtained");
  Message.info({
    background: true,
    content: "The data is loading...",
    duration: 5
  });
  socket.value.on("postCsvSVFResults", res => {
    console.log("@@@", res);
    panoramaCsvResults.splice(0, panoramaCsvResults.length, res.svfResults);
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
            scale: 6
          }),
          title: "SVF=" + String(panoramaCsvResults[0][i].svf.toFixed(2))
        });
        if (i === 422) {
          markerFishEye.addEventListener("mouseover", () => {
            panResultFishEye.setAttribute(
              "src",
              "data:image/jpeg;base64," + res.fisheyeResults[0].fisheye
            );
            panResultFisheyeSeg.setAttribute(
              "src",
              "data:image/jpeg;base64," + res.fisheyeResults[0].fisheye_seg
            );
            map.openInfoWindow(infoWindow, locationPoint);
          })
        }
        markerFishEye.addEventListener("mouseout", () => {
          infoWindow.close();
        });
        map.addOverlay(markerFishEye);
      }
      store.dispatch("map/setSVFPointsLoaded", true);
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

const getLessVerify = () => {
  socket.value.emit("getQinhuaiLessResults", "Obtain some data of Qinhuai district");
  Message.info({
    background: true,
    content: "The data is loading...",
    duration: 5
  });
  socket.value.on("postIdResults", res => {
    panoramaResults.splice(0, panoramaResults.length, res.idResults);
    if (panoramaResults[0].length === 0) {
      map.clearOverlays();
      return;
    }
    map.clearOverlays();

    for (let i = 0; i < panoramaResults[0].length; i++) {
      const locationPoint = new BMap.Point(
        panoramaResults[0][i].lng,
        panoramaResults[0][i].lat
      );
      const markerFishEye = new BMap.Marker(locationPoint, {
        icon: new BMap.Symbol(window.BMap_Symbol_SHAPE_CIRCLE, {
          fillColor: "#4c0073",
          fillOpacity: 0.95,
          strokeColor: "#4c0073",
          strokeWeight: 1,
          scale: 6
        })
      });
      const panoramaId = String(panoramaResults[0][i].id);
      const label = new BMap.Label(panoramaId);
      label.setOffset(new BMap.Size(-5, -23));
      label.setStyle({
        color: "black",
        fontSize: "13px",
        fontFamily: "Times New Roman"
      });
      markerFishEye.setLabel(label);
      map.addOverlay(markerFishEye);
    }
    const centerPoint = new BMap.Point(
      panoramaResults[0][0].lng,
      panoramaResults[0][0].lat
    );
    map.centerAndZoom(centerPoint, 1);
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
