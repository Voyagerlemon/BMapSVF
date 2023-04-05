<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-04 16:02:24
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-05 10:26:49
 * @FilePath: \BMapSVF-Client\src\widgets\Toolbox\Toolbox.vue
 * @Description: 工具箱组件
-->
<template>
  <div
    ref="panelHeader"
    class="tool-panel-header flex justify-between border-b border-neutral-5"
  >
    <div class="flex items-center header-left">
      <SvgIcon iconName="tool-box" className="w-6 h-6" />
      <span class="text-base font-bold text-center">Toolbox</span>
    </div>
    <!--   <div class="flex items-center flex-row header-right">
      <div
        v-if="editable"
        class="inline-flex justify-between text-sm confirm-edit"
      >
        <span class="edit-ok">确认</span>
        <span class="edit-cancel">取消</span>
      </div>
      <SvgIcon v-else iconName="edit" class="w-3 h-3" />
      <SvgIcon iconName="close" class="w-3 h-3 icno-close" />
    </div> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
const editable = ref(true);
</script>
<style lang="scss" scoped>
.tool-panel-header {
  margin: 0 0.78rem;
  height: 2rem;
  .header-left .svg-icon {
    margin-right: 0.31rem;
  }
  .header-right {
    .svg-icon {
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
</style>
