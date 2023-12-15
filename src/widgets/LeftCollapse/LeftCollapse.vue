<template>
  <div
    :style="`width:${show ? '23rem' : 0}`"
    style="transition: ease-in-out all 0.3s"
    class="relative h-full left-collapse"
  >
    <Collapse accordion simple v-model="activeName">
      <Panel hide-arrow v-for="item in panels" :name="item.name" :key="item.id">
        <div
          class="flex w-full h-full items-center text-sm font-bold text-dark bg-default collapse-header"
        >
          {{ item.name }}
        </div>
        >
      </Panel>
    </Collapse>
     <div class="flex items-center bg-neutral-5 text-neutral-3 reset-wrapper">
      <div class="flex items-center cursor-pointer" @click="reset">
        <SvgIcon className="w-4 h-4 reset-icon" iconName="reset-setting" />
        <span>Reset</span>
      </div>
      <div class="flex-1 tip">
        <div v-show="isResetTip" class="flex justify-end">
          <span
            class="text-primary font-medium cursor-pointer tip-button"
            @click="okReset"
          >
            Confirm
          </span>
          <Divider type="vertical" />
          <span class="text-primary cursor-pointer tip-button" @click="noReset">
            Cancel
          </span>
        </div>
      </div>
    </div>
    <div
      class="absolute flex flex-col justify-center items-center text-default cursor-pointer collapse-button"
      @click="collapsePanel"
    >
      <span class="text-xl">Data</span>
      <SvgIcon
        className="w-4 h-4"
        :iconName="show ? 'arrow-left-dubble' : 'arrow-right-dubble'"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { getWidgetConfig } from "@/api/public";
import { handleResource } from "@/utils/permission/permission";
import DataResource from "@/widgets/DataResource";
const store = useStore();
const show = ref(true);
const isResetTip = ref(false);
const activeName = ref("");
let panels = reactive([]);

const init = async () => {
  const resourceMap = await getWidgetConfig("DataResource");
  const resources = handleResource("app", resourceMap);
  const leftResources = resources.app.children.config.topics[0];
  panels.push(...(leftResources.children || []));

  loadPanel();
};
const loadPanel = () => {
  panels.forEach((panel, index) => {
    if (index === 0) {
      activeName.value = panel.name;
    }
    /*  store.dispatch("widget/openWidget", {
      name: panel.name,
      prop: {
        widgetName: panel.name,
        store
      }
    }); */
  });
};
const collapsePanel = () => {
  show.value = !show.value;
};
const reset = () => {
  isResetTip.value = true;
};
const okReset = () => {
  debugger;
  isResetTip.value = false;
};
const noReset = () => {
  isResetTip.value = false;
};
onMounted(() => {
  init();
});
</script>
<style lang="scss" scoped>
.left-collapse {
  .collapse-header {
    margin: 0 0.83rem;
  }
  :deep(.ivu-collapse) {
    height: calc(100% - 2.29rem);
    @apply flex flex-col bg-transparent border-0;
    .ivu-collapse-item {
      @apply border-t border-neutral-5;
      .ivu-collapse-header {
        height: 2.29rem;
        @apply truncate pl-0;
      }
    }
    .ivu-collapse-item-active {
      height: calc(100% - 2.29rem);
      .ivu-collapse-header {
        @apply border-b border-neutral-5;
      }
    }
    > .ivu-collapse-item:last-child {
      > .ivu-collapse-header {
        @apply border-b border-neutral-5;
      }
    }
  }
  :deep(.ivu-collapse-content) {
    height: 100%;
    overflow-y: auto !important;
    @apply p-0;
    @apply bg-transparent;
    .ivu-collapse-content-box {
      @apply pb-0;
    }
  }

  .reset-wrapper {
    height: 2.29rem;
    padding: 1.04rem;
    .reset-icon {
      margin-right: 0.3rem;
      opacity: 0.5;
    }
    .ivu-divider {
      @apply bg-neutral-3;
    }
  }
  .collapse-button {
    width: 1.97rem;
    height: 7.59rem;
    background: rgb(62, 117, 252, 0.9);
    border-radius: 0rem 0.42rem 0.42rem 0rem;
    right: -1.97rem;
    top: calc(50% - 7.59rem / 2);
    z-index: 1;
    span {
      display: flex;
      align-items: center;
      writing-mode: vertical-lr;
      letter-spacing: 0.21rem;
    }
  }
}
</style>
