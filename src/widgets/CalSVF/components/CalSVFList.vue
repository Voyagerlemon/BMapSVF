<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-09 20:03:35
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-28 19:12:41
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\components\CalSVFList.vue
 * @Description: SVF计算方式
-->
<template>
  <div class="flex flex-col">
    <!--  <div class="font-bold text-sm mr-1 mt-2 mb-2">
      API Key:
      <Input clearable class=" ml-2 w-72"/>
    </div> -->
    <div class="font-bold text-sm mr-1">Extract single BSV panorama</div>
    <div class="flex flex-row items-center">
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base" @click="singleClick">
          Single-click selection
        </Button>
      </div>
      <div class="ml-0 mr-2 mt-2 mb-2">
        <Button class="text-base" @click="calculateSVF">Calculate SVF</Button>
      </div>
      <Tooltip content="Clear with One Click" placement="right" transfer>
        <SvgIcon
          className="w-5 h-5 cursor-pointer ml-2 mr-0"
          iconName="clear"
          @click="clearMarker"
        />
      </Tooltip>
    </div>
    <div class="ml-0 mr-2 mt-2 mb-2">
      <Button class="text-base" @click="distributeSVF">
        SVF distribution of sampling points
      </Button>
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
import { Button, Tooltip } from "view-ui-plus";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Message, Notice, Modal } from "view-ui-plus";

let socket = ref(null);
let map = window.map;
let BMap = window.BMap;
let BMapLib = window.BMapLib;
const markerLocation = reactive([]);
let panoramaData = reactive({});
const panoramaResults = reactive([]);
const modal = ref(false);
const modal_loading = ref(false);
let panoramaId = ref("");
let loadSecondPoints = reactive([]);
import store from "@/store";
// SVF采样点颜色
/* const svfColors = reactive([
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
]); */
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
// 标记点的鼠标绘制事件
const drawingManager = new BMapLib.DrawingManager(map, {
  isOpen: false,
  drawingType: window.BMAP_DRAWING_MARKER,
  enableDrawingTool: false,
  markerOptions: {
    title: "point",
    offset: new BMap.Size(6, 13)
  }
});
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

// 在地图点击选点
const singleClick = () => {
  // 开启地图绘制模式
  drawingManager.open();

  // 标注点绘制完成事件
  drawingManager.addEventListener("markercomplete", function (e) {
    markerLocation.splice(0, 1, e.point);
    const location = markerLocation[0];
    // 检索这一点的全景数据信息
    const panoramaService = new BMap.PanoramaService();
    panoramaService.getPanoramaByLocation(
      new BMap.Point(location.lng, location.lat),
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
        panoramaData = imgData;
      }
    );
  });

  // 鼠标右键关闭地图绘制
  document.body.onmouseup = e => {
    if (e.button === 2) {
      drawingManager.close();
    }
  };
};
// 计算SVF
const calculateSVF = () => {
  if (!panoramaData) {
    Message.info({
      background: true,
      content: "Please Clicking firstly!",
      duration: 3
    });
  } else {
    const bsvPanorama = `http://api.map.baidu.com/panorama/v2?ak=qvIqQKAADKsPFqmxR6T0xP6EtKFT6TjQ&width=1024&height=512&location=${panoramaData.position.lng},${panoramaData.position.lat}&fov=360`;
    const bMapData = {
      panoid: panoramaData.id,
      date: panoramaData.copyright.photoDate,
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
    socket.value.on("postSaveError", res => {
      Message.error({
        background: true,
        content: res
      });
    });
  }
};
const distributeSVF = () => {
  socket.value.emit("getPanoramaResults", "获取百度全景处理结果");
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
const clearMarker = () => {
  window.map.clearOverlays();
  store.dispatch("map/setSVFPointsLoaded", false);
  emit("getSVFValue", -1);
};

const delPoint = () => {
  modal_loading.value = true;
  socket.value.emit("deletePoint", panoramaId.value);
  socket.value.on("getDeletePoint", res => {
    modal_loading.value = false;
    modal.value = false;
    Message.success({
      background: true,
      content: res.msg,
      duration: 3
    });
  });
  socket.value.on("getSecondPoints", res => {
    loadSecondPoints.splice(0, loadSecondPoints.length, res.secondPoints);
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
  store.dispatch("map/setSVFPointsLoaded", false);
});
</script>
