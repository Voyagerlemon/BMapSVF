<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-28 09:37:29
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-28 14:53:40
 * @FilePath: \BMapSVF-Client\src\widgets\ScreenExport\ScreenExport.vue
 * @Description: 系统截图
-->
<template>
  <Tooltip
    content="Screen shot"
    placement="left"
    class="absolute bottom-24 right-1"
  >
    <div
      class="screen shadow-default cursor-pointer flex items-center justify-center border border-gray-200"
    >
      <SvgIcon
        iconName="screen-shot"
        className="screen-icon"
        @click="clickToImg"
      />
    </div>
  </Tooltip>
</template>
<script setup>
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import { Tooltip } from "view-ui-plus";
import html2canvas from "html2canvas";

const clickToImg = () => {
  // 获取整个文档的HTML元素
  const documentElement = document.documentElement;

  // 调用html2canvas生成canvas
  html2canvas(documentElement).then(canvas => {
    // 将canvas转换为图片URL
    const imgUrl = canvas.toDataURL();
    const event = new MouseEvent("click");
    const a = document.createElement("a");
    a.download = "bmapsvf.png";
    a.href = imgUrl;
    a.dispatchEvent(event);
  });
};
</script>
<style lang="scss" scoped>
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
</style>
