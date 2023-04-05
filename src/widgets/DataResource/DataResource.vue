<!--
 * @Author: Lauxb
 * @Date: 2021-03-11 13:48:12
 * @LastEditTime: 2023-04-04 09:48:53
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 数据资源树组件
-->
<template>
  <div class="data-resource">
    <!-- <div
      :class="
        meta.search === true ? 'search-visible-true' : 'search-visible-false'
      "
    >
      <Input
        placeholder="请输入关键字"
        search
        clearable
        v-model="curInputVal"
        @on-search="search"
      />
    </div> -->
    <ResourceTree :list="topicTreeData" />
  </div>
</template>

<script>
import lodash from "lodash";
import ResourceTree from "./components/ResourceTree.vue";
// import { regenerateTopicLayerParam } from "@/utils/topic";
import { getWidgetConfig } from "@/api/public";
export default {
  name: "DataResource",
  components: { ResourceTree },
  data() {
    return {
      topicAllList: [],
      topicTreeData: [],
      curInputVal: ""
    };
  },
  watch: {
    curInputVal: {
      handler(newVal) {
        if (!newVal) {
          this.OpenRelatedTopicByName(this.curInputVal);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getDataSource();
  },
  methods: {
    async getDataSource() {
      if (
        this.config &&
        this.config.widgetId &&
        this.config.widgetId.length > 0
      ) {
        const res = await getWidgetConfig(this.config.widgetId);
        const temp = res.config ? JSON.parse(res.config) : res;
        Object.assign(this.config, temp);
      }
     /*  const topics = this.config["topics"];
      console.log("原始数据资源目录：", topics);
      this.transformTopics(topics, this.topicAllList);
      console.log("转换后数据资源目录：", this.topicAllList); */
      this.topicTreeData = this.topicAllList;
    },
    transformTopics(res, list = []) {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        if (item.layers && item.layers.length > 0) {
          item.layers = item.layers.map(layer => {
            //const params = regenerateTopicLayerParam(layer, item);
            return params;
          });
        }
        const temp = {
          name: item.name,
          type: item.type,
          id: item.id,
          layers: item.layers ? item.layers : [],
          visible: item.defaultOpen,
          children: [],
          url: item.url,
          trailConfig: item.trailConfig,
          bothEffect: item.bothEffect
        };

        if (item.children && item.children.length) {
          this.transformTopics(item.children, temp.children);
        }
        list.push(temp);
      }
    },
    search() {
      this.OpenRelatedTopicByName(this.curInputVal);
    },
    // 搜索并打开相关专题(普通函数)
    OpenRelatedTopicByName(curTopicName) {
      const cloneData = lodash.cloneDeep(this.topicAllList);
      if (curTopicName) {
        const tempCatalogs =
          this._recursionHandler(curTopicName, cloneData) || [];
        this.topicTreeData = tempCatalogs;
      } else {
        this.topicTreeData = cloneData;
      }
    },
    _recursionHandler(searchValue, searchTopicCatalogs) {
      const tempSearchArr = [];
      try {
        searchTopicCatalogs.forEach(topicItem => {
          if (topicItem.children && topicItem.children.length > 0) {
            const tempArr = this._recursionHandler(
              searchValue,
              topicItem.children
            );
            if (tempArr.length > 0) {
              this.$set(topicItem, "children", tempArr);
              this.$set(topicItem, "expand", true);
              tempSearchArr.push(topicItem);
            } else {
              if (topicItem.name.indexOf(searchValue) >= 0) {
                tempSearchArr.push(topicItem);
              }
            }
          } else {
            if (topicItem.name.indexOf(searchValue) >= 0) {
              tempSearchArr.push(topicItem);
            }
          }
        });
        return tempSearchArr;
      } catch (error) {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-visible-true {
  display: block;
  padding: 0.95rem 0.95rem 0.55rem 0.95rem;
  height: 3.5rem;
}

.search-visible-false {
  display: none;
}

:deep(.ivu-input) {
  height: 2.2rem;
  line-height: 2.2rem;
  padding: 0.21rem 0.37rem;
  font-size: 0.84rem;
  color: #ffffff;
  border: 1px solid rgba(0, 179, 255, 0.5);
  border-radius: 0.21rem;
  background-color: transparent;
}

:deep(.ivu-input-icon) {
  width: 1.68rem;
  height: 1.68rem;
  line-height: 2.4rem;
  font-size: 1.2rem;
  right: 0.21rem;
  @apply text-default;
  &:hover {
    @apply text-primary;
  }
}

:deep(.ivu-input-icon-clear) {
  @apply text-default;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ffffff;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ffffff;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ffffff;
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
      @apply border-b-0 border-neutral-5;
    }
  }
  > .ivu-collapse-item:last-child {
    > .ivu-collapse-header {
      @apply border-b-0 border-neutral-5;
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
</style>
