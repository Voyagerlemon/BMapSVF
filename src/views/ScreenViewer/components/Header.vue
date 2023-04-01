<template>
  <div
    class="app-header flex justify-between text-default bg-digit bg-opacity-70"
  >
    <div class="app-container flex items-center">
      <img
        v-if="logoUrl"
        :src="logoUrl.path"
        crossOrigin="anonymous"
        class="app-logo"
        alt="logo"
      />
      <span class="app-title text-llg font-bold text-default">
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
      width: 2.05rem;
      height: 2.05rem;
    }
  }
}
</style>
