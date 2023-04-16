<template>
  <div class="flex flex-col">
    <!--  <div class="font-bold text-sm mr-1 mt-2 mb-2">
        API Key:
        <Input clearable class=" ml-2 w-72"/>
      </div> -->
    <div class="font-bold text-sm mr-1">Extract multiple BSV panoramas</div>
    <div class="flex flex-col">
      <div class="ml-0 mr-2 mt-3 mb-5">
        <Upload
          :action="actionUrl"
          :before-upload="beforeUpload"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :show-upload-list="false"
          :accept="accept"
        >
          <Button class="text-base">Upload csv file</Button>
        </Upload>
      </div>
      <div class="flex flex-row">
        <Button class="text-base">Calculate SVF</Button>
        <Button class="text-base ml-2">SVF distribution of sampling points</Button>

        <Tooltip content="Clear with One Click" placement="right" transfer>
          <SvgIcon
            className="w-5 h-5 cursor-pointer ml-2 mr-0"
            iconName="clear"
            @click="clearMarker"
          />
        </Tooltip>
      </div>
    </div>
  </div>
</template>
<script setup>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Button, Tooltip, Upload } from "view-ui-plus";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Message, Notice } from "view-ui-plus";

let socket = ref(null);
let map = window.map;
let BMap = window.BMap;
let BMapLib = window.BMapLib;
const markerLocation = reactive([]);
let panoramaData = reactive({});
const panoramaResults = reactive([]);

// 过滤上传的文件格式
const accept = ref(".csv");
let uploadedResults = reactive([]);
const actionUrl = ref("http://127.0.0.1:5000/upload");
// SVF采样点颜色
const svfColors = reactive([
  "rgb(0,104,55)",
  "rgb(26,152,80)",
  "rgb(102,189,99)",
  "rgb(166,217,106)",
  "rgb(217,239,139)",
  "rgb(254,224,139)",
  "rgb(253,174,97)",
  "rgb(244,109,67)",
  "rgb(215,48,39)",
  "rgb(165,0,38)"
]);

const emit = defineEmits(["getSVFValue"]);
const date = new Date();
const year = date.getFullYear();
const month =
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
const nowTime = year + "-" + month + "-" + day;

// 根据SVF值给定标记点的颜色
function getColor(val) {
  let opts = Math.floor(val * 10);
  if (opts < 0) opts = 0;
  if (opts > 9) opts = 9;
  return svfColors[opts];
}
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

// 计算SVF
const calculateSVF = () => {
  const bsvPanorama = `http://api.map.baidu.com/panorama/v2?ak=qvIqQKAADKsPFqmxR6T0xP6EtKFT6TjQ&width=1024&height=512&location=${panoramaData.position.lng},${panoramaData.position.lat}&fov=360`;
  const bMapData = {
    panoid: panoramaData.id,
    date: nowTime,
    lng: panoramaData.position.lng,
    lat: panoramaData.position.lat,
    description: panoramaData.description,
    srcPath: bsvPanorama
  };

  // 将获取的全景图信息传个服务器
  socket.value.emit("postSavePanorama", bMapData);
  socket.value.on("getReadSegInfo", res => {
    Notice.info({
      desc: res.msg
    });
  });
  socket.value.on("getReadPanorama", res => {
    Notice.success({
      desc: res.msg
    });
  });
  socket.value.on("getCalculateSVF", res => {
    Notice.success({
      desc: res.msg
    });
    emit("getSVFValue", res.svf);
  });
  socket.value.on("getSuccessPanorama", res => {
    Notice.success({
      desc: res.msg
    });
  });
};
const distributeSVF = () => {
  socket.value.emit("postPanoramaResults", "获取百度全景处理结果");
  socket.value.on("getPanoramaResults", res => {
    panoramaResults.push(res.panoramaResults);
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
    } else {
      alert("请在chrome、safari、IE8+以上浏览器运行");
    }
  });
};
const clearMarker = () => {
  window.map.clearOverlays();
  emit("getSVFValue", -1);
};
// csv文件上传之前, 对文件类型和大小等进行判断
const beforeUpload = file => {
  if (file.type !== "text/csv") {
    Message.error({
      background: true,
      content: "Only csv file can be uploaded!",
      duration: 3
    });
    return false;
  }
  if (file.size > 1024 * 1024 * 20) {
    Message.error({
      background: true,
      content: "The file size cannot exceed 20 MB!",
      duration: 3
    });
    return false;
  }
  return true;
};
// 文件上传成功的回调
const onUploadSuccess = response => {
  if (response.status === 200)
    Message.success({
      background: true,
      content: "File uploaded successfully!",
      duration: 3
    });
  uploadedResults.push(response.csvResults);
  console.log("csv", uploadedResults);
};
const onUploadError = () => {
  Message.error({
    background: true,
    content: "file uploaded unsuccessfully!",
    duration: 3
  });
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
});
</script>
