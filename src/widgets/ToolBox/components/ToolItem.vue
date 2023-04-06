<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-05 15:01:31
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-06 14:08:13
 * @FilePath: \BMapSVF-Client\src\widgets\ToolBox\components\CommonToolItem.vue
 * @Description: 工具箱中的功能组件
-->
<template>
  <Tooltip :content="toolItem.label" placement="top">
    <div
      class="relative flex items-center overflow-hidden cursor-pointer text-neutral-3 tool-item"
      :class="{
        active:
          (editable && selected && selectLight) ||
          (!editable && state && selectLight),
        highlight: !editable && !isDisable,
        disable: isDisable
      }"
      @click="handleClick"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
    >
      <SvgIcon
        :iconName="
          toolItem && toolItem.meta && toolItem.meta.icon
            ? toolItem.meta.icon
            : ''
        "
        className="h-4 w-4"
      />
      <span class="truncate text-justify text-between item-name">
        {{ toolItem.label }}
      </span>
      <div
        class="absolute top-0 left-0 h-full w-full text-center cursor-pointer shadow-popper"
        v-if="editable && showEdit"
        :class="[selected ? 'has-del' : 'has-add']"
        @click.stop="editToolItem"
      >
        <span>{{ selected ? "删除" : "添加" }}</span>
      </div>
    </div>
  </Tooltip>
</template>
<script setup>
import { ref, watchEffect, computed } from "vue";
import store from "@/store"
import { Message } from "view-ui-plus";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
const props = defineProps({
  toolItem: {
    type: Object,
    default: () => {}
  },
  editable: {
    type: Boolean,
    default: () => false
  },
  selected: {
    type: Boolean,
    default: () => false
  },
  selectLight: {
    type: Boolean,
    default: () => false
  }
});
const emits = defineEmits(["click", "edit-click"]);
const showEdit = ref(false);
const state = ref(false);

watchEffect(() => store.state.widgets.activeMap, {
  handler(data) {
    if (data) {
      state.value = data[props.toolItem.name] ? true : false;
    }
  }
});
let isDisable = computed(() => {
  return store.getters["map/mapMode"] === "2D" && props.toolItem.meta.isMap;
});
const handleClick = () => {
  if (!isDisable) {
    emit("click", props.toolItem, !state.value);
  } else {
    Message.warning({
      background: true,
      content: "二维场景不支持三维功能！",
      duration: 3
    });
  }
};
const handleEnter = () => {
  showEdit.value = true;
};
const handleLeave = () => {
  showEdit.value = false;
};
const editToolItem = () => {
  emits("edit-click", props.toolItem, props.selected);
};
</script>
<style lang="scss" scoped>
.tool-item {
  width: 6.2rem;
  height: 1.82rem;
  line-height: 1.82rem;
  padding: 0 0.62rem;
  margin: 0.31rem 1.2rem 0 0.52rem;
  border-radius: 0.21rem;
  @apply border border-transparent;
  &.disable {
    @apply text-neutral-4 cursor-not-allowed;
  }
  &.active {
    @apply text-primary border-primary;
  }

  &.highlight {
    &:hover {
      @apply text-primary border-primary;
    }
  }
  .item-name {
    width: 3.44rem;
    margin-left: 0.62rem;
  }
  .shadow-popper {
    border-radius: 0.21rem;
    &.has-del {
      background: rgba(0, 0, 0, 0.7);
      @apply text-default;
    }
    &.has-add {
      background: rgba(228, 234, 247, 0.9);
      @apply text-primary;
    }
  }
  .text-between {
    text-justify: distribute-all-lines; // ie6-8
    text-align-last: justify; // ie9
    -moz-text-align-last: justify; // ff
    -webkit-text-align-last: justify; // chrome 20+
  }
}
</style>
