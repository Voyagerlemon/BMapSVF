<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-05 15:01:31
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:57:30
 * @FilePath: \BMapSVF-Client\src\widgets\ToolBox\components\CommonToolItem.vue
 * @Description: Toolbox button
-->
<template>
  <div
    class="flex items-center cursor-pointer overflow-hidden w-full common-too-item bg-gray-200"
    :class="{ active: state }"
    @click="handleClick"
  >
    <SvgIcon
      :iconName="toolItem && toolItem.meta ? toolItem.meta.icon : ''"
      className="h-8 w-8"
    />
    <span class="truncate text-justify text-between tool-name">
      {{ toolItem.label }}
    </span>
  </div>
</template>
<script setup>
import { ref, watchEffect } from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import store from "@/store";
const state = ref(false);
const props = defineProps({
  toolItem: {
    type: Object,
    default: () => {}
  }
});
const emits = defineEmits(["click"]);
watchEffect(() => store.state.widget.activeMap, {
  handler(data) {
    if (data) {
      state.value = data[props.toolItem.name] ? true : false;
    }
  }
});
const handleClick = () => {
  emits("click", props.toolItem, !state.value);
};
</script>
<style lang="scss" scoped>
.common-too-item {
  height: 2.13rem;
  padding: 0 0.02rem;
  &:hover {
    @apply bg-light;
  }
  &.active {
    @apply text-primary;
  }
  .tool-icon {
    margin-right: 0.62rem;
  }
  .tool-name {
    width: 3.4rem;
  }
  .text-between {
    text-justify: distribute-all-lines; // ie6-8
    text-align-last: justify; // ie9
    -moz-text-align-last: justify; // ff
    -webkit-text-align-last: justify; // chrome 20+
  }
}
</style>
