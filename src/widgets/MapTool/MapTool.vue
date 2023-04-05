<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-04 15:55:32
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-05 10:25:11
 * @FilePath: \BMapSVF-Client\src\widgets\MapTool\MapTool.vue
 * @Description: 地图工具容器
-->
<template>
  <div class="scene-tool">
    <div
      id="sceneTopLeft"
      class="absolute flex items-start max-w-full pointer-events-auto left-0 top-0"
    >
      <!--  -->
    </div>
    <div
      id="sceneTopRight"
      class="absolute flex items-start flex-row-reverse max-w-full pointer-events-auto top-0 right-0"
    >
      <ToolBox></ToolBox>
      <!--  -->
    </div>
    <div
      id="sceneBottomLeft"
      class="absolute flex items-start max-w-full pointer-events-auto bottom-0 left-0"
    >
      <!--  -->
    </div>
    <div
      id="sceneBottomRight"
      class="absolute flex items-end flex-col-reverse max-w-full pointer-events-auto bottom-0 right-0"
    >
      <!--  -->
    </div>
  </div>
</template>
<script setup>
import ToolBox from "../Toolbox";
</script>
<style lang="scss" scoped>
.scene-tool {
  #sceneTopRight {
    > div {
      margin-left: 0.83rem;
    }
  }
  #sceneTopLeft {
    margin-left: 1.5rem;
    > div {
      margin-right: 0.83rem;
    }
  }
  #sceneBottomLeft {
    > div {
      margin-right: 0.83rem;
    }
  }
  #sceneBottomRight {
    > div {
      margin-top: 0.83rem;
    }
  }
}
</style>
