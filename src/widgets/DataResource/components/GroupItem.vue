<!--
 * @Author: Lauxb
 * @Date: 2021-03-11 14:03:07
 * @LastEditTime: 2023-04-04 11:36:30
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 组数据组件
-->
<template>
  <div class="group-item">
    <Collapse accordion simple v-model="activeName" @on-change="onChange">
      <Panel hide-arrow :name="itemData.name">
        <div class="flex items-center h-full" :style="paddingLift(level)">
          <SvgIcon :name="panelStateIcon(itemData.name)" width="0.63rem" />
          <div class="w-full truncate" :class="{ 'big-header': level === 0 }">
            {{
              itemData.name +
              "（" +
              getValidCount(itemData) +
              "/" +
              getTotalCount(itemData) +
              "）"
            }}
          </div>
          <div
            class="flex h-full items-center cursor-auto state"
            :class="active ? 'visible' : 'invisible'"
            @click.stop="() => {}"
          >
            <SvgIcon class="text-default" name="eye-open" width="0.83rem" />
          </div>
        </div>
        <div slot="content" v-if="itemData.children">
          <div v-for="item in itemData.children" :key="item.id">
            <GroupItem
              v-if="item.type === 0"
              :itemData="item"
              :level="level + 1"
              @state-change="stateChange"
            />
            <ResourceItem
              v-else
              :itemData="item"
              :level="level + 1"
              @state-change="stateChange"
            />
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import ResourceItem from "./ReourceItem.vue";

export default {
  name: "GroupItem",
  components: { ResourceItem },
  props: {
    level: {
      type: Number,
      default: () => 0
    },
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeName: this.level === 0 ? this.itemData.name : "",
      active: false
    };
  },
  computed: {
    activeMap() {
      return this.$store.getters["topic/activeMap"];
    }
  },
  methods: {
    paddingLift(level) {
      const left = ++level * 0.83;
      return `padding-left:${left}rem`;
    },
    stateChange() {
      this.active = this.getActiveCount(this.itemData);
      this.$emit("state-change", this.active);
    },
    onChange(values) {
      console.log("Collapse onChange return values:", values);
      this.activeName = values;
    },
    panelStateIcon(key) {
      return this.activeName.toString().indexOf(key) > -1
        ? "arrow-up"
        : "arrow-down";
    },
    getTotalCount(item) {
      let count = 0;
      if (!item.children) {
        return count;
      }
      for (const obj of item.children) {
        if (obj.type !== 0) {
          count++;
        } else {
          count += this.getTotalCount(obj);
        }
      }
      return count;
    },
    getActiveCount(item) {
      let count = 0;
      if (!item.children) {
        return count;
      }
      for (const obj of item.children) {
        if (obj.type !== 0 && this.activeMap[obj.id]) {
          count++;
        } else {
          count += this.getActiveCount(obj);
        }
      }
      return count;
    },
    getValidCount(item) {
      let count = 0;
      if (!item.children) {
        return count;
      }
      for (const obj of item.children) {
        if (obj.type !== 0 && obj.layers && obj.layers.length > 0) {
          count++;
        } else {
          count += this.getValidCount(obj);
        }
      }
      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
.group-item {
  .big-header {
    font-weight: 700;
  }
  /* ::v-deep .ivu-collapse {
    @apply bg-transparent border-0;
    .ivu-collapse-item {
      .ivu-collapse-header {
        height: 2.29rem;
        @apply border-b-0 border-neutral-5 truncate pl-0 text-default;
      }
      .ivu-collapse-header:hover {
        @apply bg-light;
      }
      .ivu-collapse-content {
        @apply p-0 text-default;
        .ivu-collapse-content-box {
          @apply pb-0;
        }
      }
    }
  } */
  .svg-icon {
    margin-right: 0.73rem;
  }
  .state {
    .svg-icon {
      margin: 0 0.73rem;
    }
  }
}
</style>
