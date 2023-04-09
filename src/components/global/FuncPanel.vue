<template>
  <!-- panel整体 -->
  <div
    v-show="show"
    class="func-panel absolute shadow overflow-hidden"
    v-drag="true"
    ref="draggableBoxRef"
    :style="panelStyle"
  >
    <!-- panel头部 -->
    <div
      v-show="expand"
      class="func-panel-header bg-primary text-default flex items-center justify-center"
    >
      <div
        class="flex cursor-pointer return"
        @click="handleReturn"
        :style="`visibility:${pageIndex !== 0 ? 'visible' : 'hidden'}`"
      >
        <SvgIcon className="w-4 h-4 all-icon" iconName="return" />
        <span>返回</span>
      </div>
      <div class="flex flex-1 justify-center font-bold">
        <SvgIcon className="w-6 h-6 header-icon all-icon" :iconName="getIcon" />
        <span>{{ meta.label }}</span>
      </div>
      <div class="flex flex-row-reverse handle-button">
        <SvgIcon
          className="w-5 h-5 all-icon"
          iconName="close-white"
          @click="close"
        />
        <SvgIcon
          v-if="collapsAble"
          className="w-4 h-4 all-icon"
          iconName="min"
          @click="toggleExpand"
        />
      </div>
    </div>

    <div
      v-show="expand"
      class="func-panel-content bg-default"
      :class="resizeBoxClass"
      :style="resizeBoxStyle"
      @mouseup="resizeEnd"
      @mousedown="resizeStart"
    >
      <!-- panel里的widget -->
      <div ref="contentRef" />
    </div>

    <div
      v-if="collapsAble && !expand"
      class="func-panel-header-min bg-primary text-default flex items-center justify-center"
    >
      <SvgIcon className="w-5 h-5" :iconName="getIcon" />
      <div class="w-full">{{ meta.label }}</div>
      <SvgIcon className="w-5 h-5" iconName="max" @click="toggleExpand" />
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  createApp,
  defineComponent
} from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import store from "@/store";
import { closePanelWidget } from "../../utils/widget/widget";

const panelWidget = store.state.widget.hasPanelWidget;

//let defaultHidden = panelWidget.meta.defaultHidden;
let draggableBoxRef = ref(null);
// 存放widget组件
let contentRef = ref(null);
// panel是否展开
const expand = ref(true);
// 面板展开宽度
const expandWidth = ref(0);
// 组件页
const pageIndex = ref(0);
// panel的子组件
const comChildren = ref(null);
//面板是否触发 drag 事件
const triggeredDrag = ref(false);
const show = ref(true);
const props = defineProps({
  name: {
    type: String
  },
  meta: {
    type: Object,
    default: () => store.state.widget.hasPanelWidget.meta
  },
  component: {
    type: Function
  },
  mixinProps: {
    type: Object
  },
  closeCallBack: {
    type: Function
  },
  resizeAble: {
    type: Boolean,
    default: false
  },
  collapsAble: {
    type: Boolean,
    default: false
  }
});
//接收事件
const emits = defineEmits(["toggle-expand", "page-change", "show"]);
// 获取具有panel的widget的icon
const getIcon = computed(() => {
  const { icon } = props.meta;
  return icon;
});
// 获取具有panel的widget定位样式
const panelStyle = computed(() => {
  const { top, bottom, left, right } = props.meta;
  return {
    top: top ? top + "rem" : "",
    bottom: bottom ? bottom + "rem" : "",
    left: left ? left + "rem" : "",
    right: right ? right + "rem" : ""
  };
});
const resizeBoxClass = computed(() => {
  return {
    resizeAble: expand.value && props.resizeAble,
    "resizeAble-x": expand.value && props.resizeAble === "horizontal",
    "resizeAble-y": expand.value && props.resizeAble === "vertical",
    expand: expand.value,
    collapse: !expand.value
  };
});

// panel 默认宽高自适应, 最小宽高为 36 * 36
const resizeBoxStyle = computed(() => {
  {
    const { width, height, minWidth, maxWidth, minHeight, maxHeight } =
      props.meta;
    return {
      height: height ? height + "px" : "auto",
      width: width ? width + "px" : "auto",
      "min-width": Math.max(36, minWidth) + "px",
      "min-height": Math.max(36, minHeight) + "px",
      "max-width": maxWidth ? maxWidth + "px" : "",
      "max-height": maxHeight ? maxHeight + "px" : "",
      resize: expand.value
        ? props.resizeAble
          ? props.resizeAble === true
            ? "both"
            : props.resizeAble
          : "none"
        : "none"
    };
  }
});
// 鼠标出现在右下角 20 * 20px 区域，判定为resize
const resizeStart = event => {
  if (!expand.value) {
    return;
  }
  event.stopPropagation();
  console.log("resizeS", event);
};
// 鼠标结束事件
const resizeEnd = () => {
  if (!expand.value) {
    return;
  }
  console.log("resizeEnd");
};
const handleReturn = () => {
  pageIndex.value--;
  comp.$emit("return", pageIndex.value);
};
function close() {
  /* closePanelWidget(); */
}
const toggleExpand = () => {
  if (triggeredDrag.value) {
    return;
  }
  const el = draggableBoxRef.value;
  const DISTANCE = 36;
  if (expand.value) {
    expandWidth.value = el.clientWidth;
    el.style.left = el.offsetLeft + (expandWidth.value - DISTANCE) + "px";
  } else {
    el.style.left =
      Math.max(0, el.offsetLeft - (expandWidth.value - DISTANCE)) + "px";
  }
  expand.value = !expand.value;
  emits("toggle-expand", {
    expand
  });
};
const insertContent = async () => {
  const { meta, component } = panelWidget;
  const compConfig = await component();
  const Comp = defineComponent(compConfig.default);
  const comp = createApp(Comp, { props: meta });
  comChildren.value = comp;
  const el = contentRef.value;
  comp.mount(el);

  emits("page-change", index => {
    pageIndex.value = index;
  });

  emits("show", visible => {
    show.value = visible;
  });
};
onMounted(() => {
  insertContent();
});
onUnmounted(() => {
  if (!comChildren.value) {
    return;
  }
  comChildren.value.unmount();
});
// 获取在限定矩形范围内的坐标值
const getPositionWithinBoundary = function (x, y, maxX, maxY) {
  if (x < 0) x = 0;
  if (x > maxX) x = maxX;
  if (y < 0) y = 0;
  if (y > maxY) y = maxY;
  return {
    x,
    y
  };
};
const vDrag = {
  mounted: (el, { value, modifiers }) => {
    el.onmousedown = e => {
      // 鼠标到目标DOM元素内边距的距离
      const disx = e.offsetX;
      const disy = e.offsetY;
      // 目标DOM元素到父元素的距离
      const offsetX = el.offsetLeft;
      const offsetY = el.offsetTop;
      // 父元素到客户端区域原点的距离
      const parentX = e.clientX - disx - offsetX;
      const parentY = e.clientY - disy - offsetY;
      //阻止浏览器的默认事件
      e.preventDefault();
      document.onmousemove = e => {
        el.style.bottom = "auto";
        el.style.right = "auto";
        // 根据鼠标当前位置到客户端区域原点的距离，重新设置 目标DOM元素到父元素的距离
        const currX = e.clientX - disx - parentX;
        const currY = e.clientY - disy - parentY;
        const maxX = el.offsetParent.clientWidth - el.clientWidth;
        const maxY = el.offsetParent.clientHeight - el.clientHeight;
        // 边界控制
        const { x, y } = getPositionWithinBoundary(currX, currY, maxX, maxY);
        //如果表达式的结果是false,就不拖拽
        if (!value) {
          return;
        }
        //修饰符
        if (modifiers.x) {
          el.style.left = x + "px";
        }
        //修饰符
        if (modifiers.y) {
          el.style.top = y + "px";
        }
        if (!(modifiers.x && !modifiers.y) && value) {
          el.style.left = x + "px";
          el.style.top = y + "px";
        }
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};
</script>
<style lang="scss" scoped>
.func-panel {
  z-index: 99;
  width: auto;
  height: auto;
  border-radius: 0.36rem;
  pointer-events: auto;
  //overflow: initial;
  .all-icon {
    cursor: pointer;
    margin: auto 0.31rem;
  }
  &-header {
    padding: 0.47rem 0.31rem;
    &:hover {
      cursor: move;
    }
    .return,
    .handle-button {
      width: 4rem;
    }
    .header-icon {
      margin-left: 0;
    }
  }
  &-header-min {
    padding: 0.47rem 0.62rem;
    width: 10rem;
    &:hover {
      cursor: move;
    }
  }
  &-content {
    // for chrome
    box-sizing: border-box;
    padding: 0.47rem 0.83rem;
    width: auto;
    height: auto;
    min-width: 20rem;
    min-height: auto;
    max-width: 100vw;
    max-height: 100vh;
    overflow: auto;
    resize: both;
    &.resizable::before {
      content: "";
      position: absolute;
      bottom: 0px;
      right: 0px;
      cursor: se-resize;
      width: 20px;
      height: 20px;
      opacity: 0;
    }
    &.resizable-x::before {
      cursor: ew-resize;
    }
    &.resizable-y::before {
      cursor: ns-resize;
    }
  }
}
</style>
