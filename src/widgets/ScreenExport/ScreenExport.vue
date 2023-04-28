<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-28 09:37:29
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-28 11:36:02
 * @FilePath: \BMapSVF-Client\src\widgets\ScreenExport\ScreenExport.vue
 * @Description: 系统截图
-->
<template>
  <Tooltip content="Screen shot" placement="left" class="absolute bottom-24 right-1">
    <div
      class="screen shadow-default cursor-pointer flex items-center justify-center border border-gray-200"
    >
      <SvgIcon iconName="screen-shot" className="screen-icon" />
    </div>
  </Tooltip>
</template>
<script setup>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Tooltip } from "view-ui-plus";
function takeScreenshot() {
  const Vcanvas = document.createElement("canvas");
  Vcanvas
  const canvas = document.getElementById("screen-export");
  const video = document.createElement("video");
  const stream = canvas.captureStream();

  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then(displayStream => {
      video.srcObject = displayStream;
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        const event = new MouseEvent("click");
        a.download = "map.png";
        a.href = image;
        a.dispatchEvent(event);
      };
    });
}
</script>
<style lang="scss">
.screen {
  width: 2.48rem;
  height: 2.48rem;
  border-radius: 0.26rem;
  background-color: #f8f8f8;
  &-icon {
    width: 1.6rem;
    height: 1.6rem;
    margin-top: 0.33rem;
    fill: #707070;
  }
}

#screenshot-canvas {
  position: absolute;
  top: -99999px;
  left: -99999px;
  width: 100%;
  height: 100%;
}

video {
  display: none;
}
</style>
