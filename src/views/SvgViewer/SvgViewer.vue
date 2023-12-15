<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-29 20:26:35
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 13:05:28
 * @FilePath: \BMapSVF-Client\src\views\SvgViewer\SvgViewer.vue
 * @Description: SVG icon preview component
-->
<template>
  <div class="icon-view">
    <h2>Click the SVG icon to get the code</h2>
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
import { Message, Copy } from "view-ui-plus";
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
  Copy({
    text: `<SvgIcon iconName="${iconName}" />`,
    showTip: false,
    success: () => {
      Message.success({
        background: true,
        content: `${iconName} icon code was copied to the clipboard`,
        duration: 3
      });
    },
    error: () => {
      Message.error({
        background: true,
        content: `${iconName} failed to copy icon code`,
        duration: 3
      });
    }
  });
  /*  await navigator.clipboard.writeText(`<SvgIcon iconName="${iconName}" />`);
  Message.success({
    background: true,
    content: `${iconName} icon code is copied to the clipboard`,
    duration: 3
  }); */
}
// The package is copied to the clipboard in network and local environments
/* function copyToClipboard(textToCopy) {
  // navigator clipboard: A security context such as https is required
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard: Write text to the clipboard
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // Creating a text area
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // Make the text area out of the viewport and invisible
    textArea.style.position = "absolute";
    textArea.style.opacity = 0;
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // Execute the copy command and remove the text box
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
} */
onMounted(() => {
  getIcons();
});
</script>
<style lang="scss" scoped>
.icon-view {
  width: 100%;
  height: 100vh;
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
