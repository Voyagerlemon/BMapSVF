<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-29 20:26:35
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 20:52:40
 * @FilePath: \BMapSVF-Client\src\views\SvgViewer\SvgViewer.vue
 * @Description: svg图标预览组件
-->
<template>
  <div class="icon-view">
    <h2>点击Svg图标获取代码</h2>
    <div class="icons">
      <div class="icon" v-for="item in iconName" @click="handleIconClick(item)">
        <SvgIcon :iconName="item" />
        <span class="icon-name">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { Message } from "view-ui-plus";
const iconName = reactive([]);
const div = reactive([]);
const icons = import.meta.glob("../../svg/*.svg");

const getIcons = () => {
  for (let icon in icons) {
    const iconPath = icon.split(/\s*(?:\/|$)\s*/);
    const name = iconPath[3].split(/\.svg$/)[0];
    iconName.push(name);
  }
};
async function handleIconClick(iconName) {
  await navigator.clipboard.writeText(`<SvgIcon iconName="${iconName}" />`);
  Message.success({
    content: `${iconName}图标代码已复制到剪切板`,
    duration: 3
  });
}

onMounted(() => {
  getIcons();
});
</script>
<style lang="scss" scoped>
.icon-view {
  width: 100%;
  height: 100%;
  font-size: 35px;
  display: flex;
  flex-direction: column;
  background-color: #000000;
  h2 {
    color: #eee;
    letter-spacing: 0.1rem;
    text-align: center;
    margin: 20px 0;
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    overflow: auto;
    justify-content: space-between;
    .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 9px 8px;
      width: 140px;
      height: 90px;
      background-color: #222733;
      border-radius: 8%;
      cursor: pointer;
      :deep(svg) {
        height: 1.5rem;
        width: 1.5rem;
      }
      i:hover {
        transform: scale(1.5);
      }
      .icon-name {
        color: #8f9797;
        margin-top: 20px;
        font-size: 14px;
        font-weight: normal;
      }
      .icon-name:hover {
        color: #42b883;
        font-weight: bold;
      }
      &:hover {
        transform: translateY(-3%);
      }
    }
  }
}
</style>
