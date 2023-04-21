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
    <!-- 对话框 -->
    <Modal v-model="modal" width="320" transfer>
      <template #header>
        <div
          class="text-primary text-xl font-medium flex flex-row items-center justify-center"
        >
          <SvgIcon iconName="info-circle" className="w-5 h-5" />
          <span class="ml-1">Delete confirmation</span>
        </div>
      </template>
      <div class="flex flex-col justify-center items-center text-center">
        <p class="text-base mb-2 font-medium">
          This is a SVF sampling point, panoid is {{ panoramaId }}
        </p>
        <p class="text-base font-medium">Will you delete it?</p>
      </div>
      <template #footer>
        <Button
          type="primary"
          size="large"
          long
          :loading="modal_loading"
          @click="delPoint"
        >
          Delete
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Button, Tooltip, Upload, Modal } from "view-ui-plus";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Message, Notice } from "view-ui-plus";

let socket = ref(null);
let map = window.map;
let BMap = window.BMap;
let panoramaData = reactive([]);
const panoramaResults = reactive([]);
// 根据csv文件的经纬度坐标获取的全景数据
const postPanoramas = reactive([]);

let panoramaId = ref("");
const modal = ref(false);
const modal_loading = ref(false);
let loadSecondPoints = reactive([]);
// 过滤上传的文件格式
const accept = ref(".csv");
let uploadedResults = reactive([]);
const actionUrl = ref("http://127.0.0.1:5000/upload");
// SVF采样点颜色
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
const emit = defineEmits(["getSVFValue"]);

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
      date: ele.copyright.photoDate,
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
  socket.value.emit("getCsvPanoramaResults", "获取百度全景处理结果");
  Message.info({
    background: true,
    content: "The data is loading!",
    duration: 3
  });
  socket.value.on("postCsvPanoramaResults", res => {
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
        // 标注的点击事件
        markerFishEye.addEventListener("click", () => {
          modal.value = true;
          panoramaId.value = panoramaResults[0][i].panoid;
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
  // 跳转至加载的第一个采样点上
  const locationPoint = new BMap.Point(
    uploadedResults[0][0].lng,
    uploadedResults[0][0].lat
  );
  map.centerAndZoom(locationPoint, 18);
};
const onUploadError = () => {
  socket.value.on("postError", res => {
    Message.error({
      background: true,
      content: res,
      duration: 3
    });
  });
};
const delPoint = () => {
  modal_loading.value = true;
  socket.value.emit("deleteCsvPoints", panoramaId.value);
  socket.value.on("getDeleteCsvPoint", res => {
    modal_loading.value = false;
    modal.value = false;
    Message.success({
      background: true,
      content: res.msg,
      duration: 3
    });
  });
  socket.value.on("getSecondCsvPoints", res => {
    loadSecondPoints.splice(0, loadSecondPoints.length, res.secondCsvPoints);
    if (loadSecondPoints[0].length === 0) {
      map.clearOverlays();
      return;
    }
    map.clearOverlays();
    loadSecondPoints[0].forEach(ele => {
      const locationPoint = new BMap.Point(ele.lng, ele.lat);
      const markerFishEye = new BMap.Marker(locationPoint, {
        icon: new BMap.Symbol(window.BMap_Symbol_SHAPE_CIRCLE, {
          fillColor: getColor(ele.svf),
          fillOpacity: 0.95,
          strokeColor: getColor(ele.svf),
          strokeWeight: 1,
          scale: 7
        }),

        title: "SVF=" + String(ele.svf.toFixed(2)) + " (sky)"
      });
      // 标注的点击事件
      markerFishEye.addEventListener("click", () => {
        modal.value = true;
        panoramaId.value = ele.panoid;
      });
      markerFishEye.addEventListener("mouseover", () => {
        panResultFishEye.setAttribute(
          "src",
          "data:image/jpeg;base64," + ele.fisheye
        );
        panResultFisheyeSeg.setAttribute(
          "src",
          "data:image/jpeg;base64," + ele.fisheye_seg
        );
        map.openInfoWindow(infoWindow, locationPoint);
      });
      markerFishEye.addEventListener("mouseout", () => {
        infoWindow.close();
      });

      map.addOverlay(markerFishEye);
    });
  });
  socket.value.on("getError", res => {
    modal_loading.value = false;
    modal.value = false;
    Message.error({
      background: true,
      content: res,
      duration: 3
    });
  });
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
  map.clearOverlays();
});
</script>
<style lang="scss" scoped>
.ivu-notice {
  width: 26rem;
}
</style>
