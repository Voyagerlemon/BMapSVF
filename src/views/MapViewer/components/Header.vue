<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-01 22:34:27
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-12-12 21:35:42
 * @FilePath: \BMapSVF-Client\src\views\MapViewer\components\Header.vue
 * @Description: Header component
-->
<template>
  <div
    class="app-header flex justify-between text-default bg-primary"
  >
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
  </div>
</template>
<script setup>
defineProps({
  logoUrl: {
    type: Object
  },
  appTitle: {
    type: String
  }
});
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
