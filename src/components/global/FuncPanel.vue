<template>
  <!-- panel whole -->
  <div
    v-show="show"
    class="func-panel absolute shadow overflow-hidden"
    v-drag="true"
    ref="draggableBoxRef"
    :style="panelStyle"
  >
    <!-- panel header -->
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
        <span>return</span>
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
      <!-- panel widget -->
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
  defineComponent,
  getCurrentInstance
} from "vue";
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
import store from "@/store";

const panelWidget = store.state.widget.hasPanelWidget;
// let defaultHidden = panelWidget.meta.defaultHidden;
let draggableBoxRef = ref(null);
// Storing widget components
let contentRef = ref(null);
// Whether the panel is expanded
const expand = ref(true);
// Panel width
const expandWidth = ref(0);
// Component page
const pageIndex = ref(0);
// A child component of a panel
const comChildren = ref(null);
// Whether the panel triggers the drag event
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
// Receive event
const emits = defineEmits(["toggle-expand", "page-change", "show", "return"]);
// Gets the icon of a widget with a panel
const getIcon = computed(() => {
  const { icon } = props.meta;
  return icon;
});
// Gets the widget positioning style with panel
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

// panel: the default width and height is adaptive. The minimum width and height is 36 x 36
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
// The mouse appears in the 20 * 20px area in the lower right corner and determines resize
const resizeStart = event => {
  if (!expand.value) {
    return;
  }
  event.stopPropagation();
};
// Mouse end event
const resizeEnd = () => {
  if (!expand.value) {
    return;
  }
};
const handleReturn = () => {
  pageIndex.value--;
  emits("return", pageIndex.value);
};
function close() {
  if (!comChildren.value) {
    return;
  }
  comChildren.value.unmount();
  const vNode = document.querySelector(".func-panel");
  vNode.parentElement.removeChild(vNode);
}
// The expanded state of the panel
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
    expand: expand.value
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

  comChildren.value = comp;
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
// Gets the coordinate value within the limits of the rectangle
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
      // The distance of the mouse to the inner margin of the target DOM element
      const disx = e.offsetX;
      const disy = e.offsetY;
      // Distance from the target DOM element to the parent element
      const offsetX = el.offsetLeft;
      const offsetY = el.offsetTop;
      // The distance from the parent element to the origin of the client area
      const parentX = e.clientX - disx - offsetX;
      const parentY = e.clientY - disy - offsetY;
      // Block browser default events
      e.preventDefault();
      document.onmousemove = e => {
        el.style.bottom = "auto";
        el.style.right = "auto";
        // Reset the distance between the target DOM element and 
        // the parent element based on the distance between the current mouse position and the origin of the client area
        const currX = e.clientX - disx - parentX;
        const currY = e.clientY - disy - parentY;
        const maxX = el.offsetParent.clientWidth - el.clientWidth;
        const maxY = el.offsetParent.clientHeight - el.clientHeight;
        // Border control
        const { x, y } = getPositionWithinBoundary(currX, currY, maxX, maxY);
        // If the expression results in false, no dragging is done
        if (!value) {
          return;
        }
        // modifier
        if (modifiers.x) {
          el.style.left = x + "px";
        }
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
  // overflow: initial;
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
