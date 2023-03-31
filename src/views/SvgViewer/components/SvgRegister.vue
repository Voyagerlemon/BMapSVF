<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2022-12-05 15:40:45
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 20:52:47
 * @FilePath: \ce-map3d\src\views\SvgViewer\components\SvgRegister.vue
 * @Description: Svg图标注册
-->
<template>
  <svg :class="className" aria-hidden="true">
    <use :href="'#icon-' + iconName"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  iconName: String,
  className: {
    type: String,
    default: () => "svg-icon"
  }
});
</script>

<style scoped>
.svg-icon {
  width: 3rem;
  height: 3rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
