<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2022-12-05 15:40:45
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 13:02:47
 * @FilePath: \ce-map3d\src\views\SvgViewer\components\SvgRegister.vue
 * @Description: Svg icon registration
-->
<template>
  <svg :class="className" aria-hidden="true">
    <use :href="'#icon-' + iconName"></use>
  </svg>
</template>

<script setup>
defineProps({
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
