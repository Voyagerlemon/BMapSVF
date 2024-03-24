<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-01 22:34:27
 * @LastEditors: Voyagerlemon xuhaiyangw@163.com
 * @LastEditTime: 2024-03-07 15:58:11
 * @FilePath: \BMapSVF-Client\src\views\MapViewer\components\Header.vue
 * @Description: Header component
-->
<template>
  <div class="app-header flex justify-between text-default bg-primary">
    <div class="app-container flex items-center">
      <img
        v-if="logoUrl"
        :src="logoUrl.icon"
        crossOrigin="anonymous"
        class="app-logo"
        alt="logo"
      />
      <span class="app-title text-xxl font-bold text-default">
        {{ appTitle }}
      </span>
    </div>
    <div class="flex items-center">
      <SvgIcon
        iconName="github"
        className="w-8 h-8 cursor-pointer"
        @click="skipGithubUrl"
      />
      <SvgIcon iconName="lang-en" className="w-8 h-8 cursor-pointer ml-4 mr-4" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  logoUrl: {
    type: Object
  },
  appTitle: {
    type: String
  },
  githubUrl: {
    type: Object
  }
});

const skipGithubUrl = () => {
  window.location.href = props.githubUrl.url;
};
</script>
<style lang="scss" scoped>
.app-header {
  height: 3.63rem;
  z-index: 99;
  .app-container {
    margin-left: 0.83rem;
    .app-title {
      cursor: pointer;
      margin-left: 0.83rem;
    }
    .app-logo {
      cursor: pointer;
      width: 3.05rem;
      height: 3.05rem;
    }
  }
}
</style>
