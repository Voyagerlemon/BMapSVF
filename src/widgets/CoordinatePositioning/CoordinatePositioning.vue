<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-08 17:20:17
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-18 16:30:14
 * @FilePath: \BMapSVF-Client\src\widgets\CalSVF\CalSVF.vue
 * @Description: 坐标转换组件
-->
<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col">
      <div class="ml-0 mr-2 mt-3 mb-2">
        WGS84:&nbsp;
        <Input
          clearable
          class="w-80"
          v-model.trim="wgsCoordinate"
          placeholder="Separated by a comma in English"
          @on-clear="clearWGSCoordinate"
        />
      </div>
      <div class="ml-0 mr-2 mt-4 mb-2">
        BD09ll:&nbsp;&nbsp;
        <Input
          clearable
          class="w-80"
          v-model.trim="bd09Coordinate"
          placeholder="Separated by a comma in English"
          @on-clear="clearBD09Coordinate"
        />
      </div>
    </div>
    <div class="flex flex-row ml-0 mt-6 mb-2">
      <Button class="text-base mr-2" @click="coordinatePosition">
        Coordinate positioning
      </Button>
      <Button class="text-base" @click="coordinateTransform">
        Coordinate transformation
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
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Input, Button, Message, Tooltip } from "view-ui-plus";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";

let BMap = window.BMap;
let map = window.map;
const wgsCoordinate = ref("");
const bd09Coordinate = ref("");
let socket = ref(null);

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

const coordinateTransform = () => {
  if (!wgsCoordinate.value && !bd09Coordinate.value) {
    Message.warning({
      background: true,
      content: "Please enter coordinate!",
      duration: 5
    });
  } else if (wgsCoordinate.value && !bd09Coordinate.value) {
    // 对输入的经纬度坐标进行校验
    // WGS84-->BD09
    const parts = wgsCoordinate.value.split(",");
    if (parts.length !== 2) {
      Message.error({
        background: true,
        content:
          'Please enter coordinates in the format of "longitude,latitude"',
        duration: 3
      });
    } else if (
      isNaN(parts[0].trim()) ||
      isNaN(parts[1].trim()) ||
      Math.abs(parseFloat(parts[0].trim())) > 180 ||
      Math.abs(parseFloat(parts[1].trim())) > 90
    ) {
      Message.error({
        background: true,
        content: "Please enter valid coordinates",
        duration: 3
      });
    } else {
      const lngLat = { lng: parts[0], lat: parts[1] };
      socket.value.emit("transformWGSCoordinate", lngLat);
      socket.value.on("getBD09Coordinate", res => {
        bd09Coordinate.value = res.row_result.lng + "," + res.row_result.lat;
      });
    }
  } else if (!wgsCoordinate.value && bd09Coordinate.value) {
    Message.warning({
      background: true,
      content: "You can only convert from wgs84 to bd09ll!"
    });
    return;
  } else {
    Message.warning({
      background: true,
      content:
        "Only one of these coordinates can be entered in a coordinate transformation!"
    });
    return;
  }
};

const clearWGSCoordinate = () => {
  wgsCoordinate.value = "";
};
const clearBD09Coordinate = () => {
  bd09Coordinate.value = "";
};

// WGS84-->BD09转换回调函数, 一次最多10个点
const translateCallback = data => {
  if (data.status === 0) {
    const parts = wgsCoordinate.value.split(",");
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    const locationPoint = new BMap.Point(lng, lat);
    const marker = new BMap.Marker(locationPoint);
    map.addOverlay(marker);
    map.centerAndZoom(locationPoint, 18);
  }
};
const coordinatePosition = () => {
  if (wgsCoordinate.value && bd09Coordinate.value) {
    const parts = bd09Coordinate.value.split(",");
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    const locationPoint = new BMap.Point(lng, lat);
    const marker = new BMap.Marker(locationPoint);
    map.addOverlay(marker);
    map.centerAndZoom(locationPoint, 18);
  } else if (wgsCoordinate.value && !bd09Coordinate.value) {
    const parts = wgsCoordinate.value.split(",");
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    const locationPoint = new BMap.Point(lng, lat);

    const convertor = new BMap.Convertor();
    const pointArr = [];
    pointArr.push(locationPoint);
    convertor.translate(pointArr, 1, 5, translateCallback);
  } else {
    const parts = bd09Coordinate.value.split(",");
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    const locationPoint = new BMap.Point(lng, lat);
    const marker = new BMap.Marker(locationPoint);
    map.addOverlay(marker);
    map.centerAndZoom(locationPoint, 18);
  }
};
const clearMarker = () => {
  wgsCoordinate.value = "";
  bd09Coordinate.value = "";
  map.clearOverlays();
};
onMounted(() => {
  socketInstance();
});
onUnmounted(() => {
  socket.value.close();
});
</script>
