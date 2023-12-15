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
          ref="uploadRef"
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
    <!-- dialog box -->
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

import store from "@/store";
let socket = ref(null);
let map = window.map;
let BMap = window.BMap;
let panoramaData = reactive([]);
const panoramaResults = reactive([]);
// Panoramic data obtained from the latitude and longitude coordinates of the csv file
const postPanoramas = reactive([]);
let uploadRef = ref(null);
let panoramaId = ref("");
const modal = ref(false);
const modal_loading = ref(false);
let loadSecondPoints = reactive([]);
// Filter uploaded file formats
const accept = ref(".csv");
let uploadedResults = reactive([]);
// Local server
const actionUrl = ref("http://127.0.0.1:5000/upload");
// SVF sampling point color
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

// Apply for address: https://lbsyun.baidu.com/apiconsole/center#/home
const API_KEY_POOL = reactive([
  "BrlC46ogjvmEkblNNsauxtjmgKjHBiqN",
  "uYPVx8FpGoILUNAkM9WGCvFb1t5tQAuH",
  "h5GlIkW5aT6ZVyESoOtaz5C8KCPpcCLE",
  "YniOI8mkAeMNRPNR4DkFu5LQP9ArmWGn",
  "YeOWIMkFXGT8k6LIYi6l5eGYEYpnS9gr",
  "qvIqQKAADKsPFqmxR6T0xP6EtKFT6TjQ",
  "5NLRP7yso7RyZWiSkERyl8ZmPVrOEDRH",
  "2rP0A4BSKwhFnWnQAvswGIUISoIHRtTU"
]);

// The color of the marker is given based on the SVF value
function getColor(val) {
  let opts = Math.floor(val * 10);
  if (opts < 0) opts = 0;
  if (opts > 9) opts = 9;
  return svfColors[opts];
}
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

// Create the DOM node of the map information window
// #region
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

const calculateSVF = () => {
  if (panoramaData.length === 0) {
    Message.info({
      background: true,
      content: "Please upload csv file firstly!",
      duration: 3
    });
  } else {
    panoramaData[0].forEach(ele => {
      let lng = ele.position.lng;
      let lat = ele.position.lat;

      let bsvPanorama = `http://api.map.baidu.com/panorama/v2?ak=${API_KEY_POOL[0]}&width=1024&height=512&location=${lng},${lat}&fov=360`;
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
    socket.value.on("postCsvError", res => {
      Message.error({
        background: true,
        content: res
      });
    });
  }
};

const distributeSVF = () => {
  socket.value.emit("getCsvPanoramaResults", "Get BSV processing results");
  Message.info({
    background: true,
    content: "The data is loading!",
    duration: 5
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
        // Annotated click events
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
      map.centerAndZoom(centerPoint, 15);
    } else {
      alert("Please run it in chrome, safari, Internet Explorer 8+ or above!");
    }
  });
};
const clearMarker = () => {
  map.clearOverlays();
  if (uploadRef.value) {
    uploadRef.value.clearFiles();
  }
  store.dispatch("map/setSVFPointsLoaded", false);
  emit("getSVFValue", -1);
};
// Before uploading a csv file, determine the file type and size
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

// File upload successful callback function
const onUploadSuccess = response => {
  if (response.status === 200)
    Message.success({
      background: true,
      content: response.msg
    });
  uploadedResults.splice(0, response.csvResults.length, response.csvResults);
  map.clearOverlays();
  let serviceArr = [];
  for (let i = 0; i < uploadedResults[0].length; i++) {
    const locationPoint = new BMap.Point(
      uploadedResults[0][i].lng,
      uploadedResults[0][i].lat
    );
    const marker = new BMap.Marker(locationPoint);
    map.addOverlay(marker);

    // Retrieve the panoramic data information for this point
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
        serviceArr.push(imgData);
      }
    );
  }
  console.log("ser", serviceArr);
  // Replacement array
  panoramaData.splice(0, panoramaData.length, serviceArr);
  console.log("panoramas", panoramaData[0], panoramaData.length);
  // Jump to the first sampling point of the load
  const locationPoint = new BMap.Point(
    uploadedResults[0][0].lng,
    uploadedResults[0][0].lat
  );
  map.centerAndZoom(locationPoint, 15);
};
const onUploadError = () => {
  socket.value.on("postUploadError", res => {
    Message.error({
      background: true,
      content: res
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
      // Annotated click events
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
  if (uploadRef.value) {
    uploadRef.value.clearFiles();
  }
  store.dispatch("map/setSVFPointsLoaded", false);
});
</script>
<style lang="scss" scoped>
:deep(.ivu-notice) {
  width: 30rem;
}
</style>
