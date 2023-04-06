<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-04 16:02:24
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-06 13:45:43
 * @FilePath: \BMapSVF-Client\src\widgets\Toolbox\Toolbox.vue
 * @Description: 工具箱管理组件
-->
<template>
  <div class="flex flex-row-reverse h-auto toolbox" @click="handleClickToolbox">
    <div
      class="shadow bg-default rounded overflow-hidden right-toolbar"
      :class="{ spread: isWholeBarShow }"
      @mouseenter="showWholeBar"
      @mouseleave="showPartBar"
    >
      <div
        class="tool-bar-item-wrapper flex flex-col justify-between items-center text-sm text-neutral-3"
      >
        <CommonToolItem :toolItem="toolBox" @click="handleToolBox" />
        <div v-for="(item, index) in commonTools">
          <CommonToolItem :key="index" :toolItem="item" @click="handleTool" />
        </div>
      </div>
    </div>

    <div
      class="left-tool-panel bg-default rounded shadow overflow-hidden"
      v-show="isToolPanelShow"
    >
      <div
        ref="panelHeader"
        class="tool-panel-header flex justify-between border-b border-neutral-5"
      >
        <div class="flex items-center header-left">
          <SvgIcon iconName="tool-box" className="w-4 h-4 tool-icon" />
          <span class="text-base font-extrabold text-center">ToolBox</span>
        </div>
        <div class="flex items-center flex-row header-right">
          <div
            v-if="editable"
            class="inline-flex justify-between text-sm confirm-edit"
          >
            <span class="edit-ok" @click="confirmEdit">确认</span>
            <span class="edit-cancel" @click="cancelEdit">取消</span>
          </div>
          <SvgIcon
            v-else
            iconName="edit"
            className="w-3 h-3 icon-edit"
            @click="editToolPanel"
          />
          <SvgIcon
            iconName="close"
            className="w-3 h-3 icon-close"
            @click="closePanel"
          />
        </div>
      </div>
      <div class="panel-content w-full">
        <div class="select-tools flex justify-start flex-wrap" v-if="editable">
          <div v-for="(item, index) in tempCommonTool">
            <ToolItem
              :key="index"
              :toolItem="item"
              :editable="editable"
              :selected="true"
              @edit-click="editToolItem"
            />
          </div>
        </div>
        <div class="all-tools">
          <div
            class="block relative font-bold all-tools-item"
            v-for="(item, index) in allTools"
            :key="index"
          >
            <div class="all-tools-item-title text-sm text-neutral-3 relative">
              {{ item.label }}
            </div>
            <div
              class="all-tools-item-content relative flex justify-start font-normal flex-wrap"
            >
              <div>
                <ToolItem
                  :editable="editable"
                  :selectLight="true"
                  @click="handleTool"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import ToolItem from "./components/ToolItem.vue";
import CommonToolItem from "./components/CommonToolItem.vue";
import { Message } from "view-ui-plus";
import store from "@/store"
import SvgIcon from "@/views/SvgViewer/components/SvgRegister.vue";
const editable = ref(false);
const isWholeBarShow = ref(false);
const isToolPanelShow = ref(false);

const commonTools = reactive([]);
const tempCommonTool = reactive([]);
const allTools = reactive([]);
const toolBox = reactive({
  name: "ToolBox",
  label: "ToolBox",
  meta: {
    icon: "tool-box2"
  }
});
const handleClickToolbox = e => {
  e.stopPropagation();
};
const showWholeBar = () => {
  isWholeBarShow.value = true;
};
const showPartBar = () => {
  isWholeBarShow.value = isToolPanelShow.value;
};
const closePanel = () => {
  isToolPanelShow.value = false;
  isWholeBarShow.value = false;
};
const editToolPanel = () => {
  editable.value = !editable.value;
};
const handleToolBox = () => {
  isToolPanelShow.value = true;
};
const handleTool = (item, state) => {
  isToolPanelShow.value = false;
  isWholeBarShow.value = false;
  if (!state) {
    store.dispatch("widget/closeWidget", item.name);
    return;
  }
  store.dispatch("widget/openWidget", {
    name: item.name,
    prop: {
      widgetName: item.name,
      eyemap,
      store
    }
  });
};
const confirmEdit = () => {
  Message.info({
    background: true,
    content: "This feature is being tested!",
    duration: 3
  });
  editable.value = false;
};
const cancelEdit = () => {
  editable.value = false;
};
onMounted(() => {
  document.click = e => {
    isToolPanelShow.value = false;
    isWholeBarShow.value = false;
  };
});
</script>
<style lang="scss" scoped>
.toolbox {
  .right-toolbar {
    width: 2.08rem;
    height: max-content;
    transition: width 0.3s ease;
    &.spread {
      width: 6.1rem;
    }
    .tool-bar-item-wrapper {
      width: 6.3rem;
    }
  }
  .left-tool-panel {
    width: 26.62rem;
    margin-right: 0.52rem;
    padding-bottom: 1.04rem;

    .tool-panel-header {
      margin: 0 0.78rem;
      height: 2rem;
      .header-left .tool-icon {
        margin-right: 0.31rem;
        cursor: pointer;
      }
      .header-right {
        .icon-edit,
        .icon-close {
          cursor: pointer;
          margin-left: 0.78rem;
        }

        .confirm-edit {
          width: 5rem;
          padding: 0 0.3rem;
          span {
            width: 50%;
            height: 100%;
            @apply text-primary;
            cursor: pointer;
          }
          .edit-ok {
            border-right: 1px solid rgba(151, 151, 151, 0.8);
          }
          .edit-cancel {
            text-align: right;
          }
        }
      }
    }
    .panel-content {
      max-height: 38.35rem;
      padding: 0 0.78rem;
      margin-top: 0.52rem;
      overflow-x: hidden;
      overflow-y: auto;
      .select-tools {
        max-height: 5.31rem;
        padding: 0.52rem 0;
        border-radius: 0.05rem;
        border: 0.05rem dashed rgba(151, 151, 151, 1);
        overflow-y: hidden;
      }
      .all-tools {
        .all-tools-item {
          margin-top: 0.68rem;
          .all-tools-item-title {
            height: 1.09rem;
            line-height: 1.09rem;
            padding-left: 0.73rem;
            &::before {
              content: "";
              width: 0.42rem;
              height: 0.42rem;
              border-radius: 0.42rem;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              @apply bg-primary;
            }
          }
          .all-tools-item-content {
            padding: 0.11rem 0;
            border-radius: 0.05rem;
          }
        }
      }
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
