<template>
  <div class="flex flex-col">
    <!--  <div class="font-bold text-sm mr-1 mt-2 mb-2">
          API Key:
          <Input clearable class=" ml-2 w-72"/>
        </div> -->
    <div class="font-bold text-sm mr-1">Extract multiple BSV panoramas</div>
    <div class="flex flex-col">
      <div class="ml-0 mr-2 mt-3 mb-3">
        <Upload
          :action="actionUrl"
          :before-upload="beforeUpload"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :show-upload-list="true"
          :accept="accept"
        >
          <Button class="text-base">Upload csv file</Button>
        </Upload>
      </div>
      <div class="flex flex-row">
        <Button class="text-base" @click="calculateSVF">Calculate SVF</Button>
        <Button class="text-base ml-2" @click="distributeSVF">
          SVF distribution of sampling points
        </Button>

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
let panoramaData = reactive([]);
const panoramaResults = reactive([]);
// 根据csv文件的经纬度坐标获取的全景数据
const postPanoramas = reactive([]);

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
  panoramaData.forEach(ele => {
    let lng = ele.position.lng;
    let lat = ele.position.lat;
    let bsvPanorama = `http://api.map.baidu.com/panorama/v2?ak=qvIqQKAADKsPFqmxR6T0xP6EtKFT6TjQ&width=1024&height=512&location=${lng},${lat}&fov=360`;
    let bMapData = {
      panoid: ele.id,
      date: nowTime,
      lng: ele.position.lng,
      lat: ele.position.lat,
      description: ele.description,
      srcPath: bsvPanorama
    };
    postPanoramas.push(bMapData);
  });
  socket.value.emit("postCsvPanoramas", postPanoramas);
  socket.value.on("getReadSegInfo", res => {
    Notice.info({
      title: "Semantic segmentation",
      desc: res.msg
    });
  });
  socket.value.on("getReadPanorama", res => {
    Notice.success({
      title: "Semantic segmentation",
      desc: res.msg
    });
  });
  socket.value.on("getCalculateSVF", res => {
    Notice.success({
      title: "SVF",
      desc: res.msg
    });
    emit("getSVFValue", res.svf);
  });
  socket.value.on("getSuccessPanorama", res => {
    Message.success({
      background: true,
      content: res.msg,
      duration: 3
    });
  });
};

const distributeSVF = () => {
  socket.value.emit("postCsvPanoramaResults", "获取百度全景处理结果");
  socket.value.on("getCsvPanoramaResults", res => {
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
          enableMassClear: false,
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
    } else {
      alert("请在chrome、safari、IE8+以上浏览器运行");
    }
  });
};
const clearMarker = () => {
  map.clearOverlays();
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
// WGS84-->BD09转换回调函数, 一次最多10个点
const translateCallback = data => {
  if (data.status === 0) {
    const marker = new BMap.Marker(data.points[0]);
    map.addOverlay(marker);
    map.setCenter(data.points[0]);
  }
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
  for (let i = 0; i < uploadedResults[0].length; i++) {
    const locationPoint = new BMap.Point(
      uploadedResults[0][i].lng,
      uploadedResults[0][i].lat
    );
    const marker = new BMap.Marker(locationPoint);
    map.addOverlay(marker);

    // 检索这一点的全景数据信息
    const panoramaService = new BMap.PanoramaService();
    panoramaService.getPanoramaByLocation(
      locationPoint,
      25,
      function (imgData) {
        if (imgData === null) {
          Message.info({
            background: true,
            content: "There is no panorama here!",
            duration: 3
          });
          return;
        }
        panoramaData.push(imgData);
      }
    );
  }
  // 跳转至加载的采样点上
  const locationPoint = new BMap.Point(
    uploadedResults[0][1].lng,
    uploadedResults[0][1].lat
  );
  map.centerAndZoom(locationPoint, 18);
};
const onUploadError = () => {
  Message.error({
    background: true,
    content: "The csv file uploaded successfully, but it fails to be parsed!",
    duration: 3
  });
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
  map.clearOverlays()
});
</script>
<style lang="scss" scoped>
.ivu-notice {
  width: 22rem;
}
</style>
