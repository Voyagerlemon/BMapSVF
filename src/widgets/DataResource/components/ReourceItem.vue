<!--
 * @Author: Lauxb
 * @Date: 2021-03-11 14:05:31
 * @LastEditTime: 2023-04-05 16:18:39
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 右侧操作按钮组件
-->
<template>
  <div class="border-b-0 border-solid border-neutral-5 resource-item">
    <div
      class="flex items-center cursor-pointer item-label"
      :class="[
        state ? ' text-primary' : '',
        !itemData.layers || itemData.layers.length < 1 ? 'disabled' : ''
      ]"
      :style="`padding-left:${
        itemData.name.indexOf('--') >= 0 ? paddings[level] + 1 : paddings[level]
      }rem`"
      @click="changeTopicState"
    >
      <div class="icon">
        <SvgIcon :name="state ? 'eye-open' : 'eye-close'" width="0.83rem" />
      </div>
      <div class="w-full">
        {{
          itemData.name.indexOf("--") >= 0
            ? itemData.name.split("--")[1]
            : itemData.name
        }}
      </div>
      <Poptip v-show="state" trigger="hover" placement="bottom">
        <div
          class="h-full flex items-center cursor-auto icon"
          @click.stop="() => {}"
        >
          <SvgIcon name="menu" width="0.83rem" />
        </div>
        <div
          v-show="popTipVisible"
          slot="content"
          class="text-neutral-3 tool-list bg-digit bg-opacity-70"
        >
          <div
            class="border-b border-neutral-3 tool-item"
            :class="{ active: isFavorite }"
            @click.stop="collectResource"
          >
            {{ isFavorite ? "取消收藏" : "收藏" }}
          </div>
          <div
            :class="`border-b border-neutral-3 tool-item ${
              showOpacitySlider ? 'active' : ''
            }`"
            @click.stop="openOpacity"
          >
            透明度
          </div>
          <div class="tool-item" @click.stop="zoomToTopic">显示全图</div>
        </div>
      </Poptip>
    </div>
    <div :style="`padding-left:${paddings[level]}rem;padding-right: 0.73rem`">
      <OpacitySlider
        v-show="showOpacitySlider"
        :value="opacityValue"
        @on-change="opacityChange"
        @on-close="openOpacity"
      />
    </div>
  </div>
</template>

<script>
//import OpacitySlider from "./OpacitySlider";
//import { setTopicFavorites, deleteTopicFavorites } from "@/api/favorite";
//import { locateLayers } from "@tys/chaos/locate";
import { getChaos } from "@/utils/sceneUtils/chaos";
let chaos = null;

export default {
  name: "ResourceItem",
  /* components: {
    OpacitySlider
  }, */
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
      paddings: [0.83, 1.66, 2.49, 3.32, 4.15, 4.98, 5.81, 6.64],
      state: false,
      showOpacitySlider: false,
      popTipVisible: true
    };
  },
  computed: {
    opacityValue() {
      return (
        this.$store.getters["topic/topicOpacityMap"][this.itemData.id] || 100
      );
    },
    isFavorite() {
      const favoriteTopics = this.$store.getters["favorite/topics"];
      const favoriteTopic = favoriteTopics.filter(topic => {
        return topic.topicId === this.itemData.id;
      });
      return favoriteTopic && favoriteTopic.length > 0;
    }
  },
  watch: {
    "$store.state.topic.activeMap": {
      handler(data) {
        if (data) {
          this.state = data[this.itemData.id] ? true : false;
          this.showOpacitySlider = this.state && this.showOpacitySlider;
          this.$emit("state-change", this.state);
        }
      }
    }
  },
  beforeCreate() {
    chaos = getChaos();
  },
  mounted() {
    this.$store.dispatch("topic/setTopic", this.itemData);
  },
  methods: {
    changeTopicState() {
      this.state = !this.state;
      debugger;
      this.$store.dispatch("topic/changeTopicState", {
        topicInfo: this.itemData,
        state: this.state
      });
      if (!this.state) {
        this.openOpacity();
      }
    },
    async collectResource() {
      this.controlPopTip();
      const params = {
        topicId: this.itemData.id
      };
      if (this.isFavorite) {
        await deleteTopicFavorites(this.itemData.id);
      } else {
        await setTopicFavorites(params);
      }
      this.$store.dispatch("favorite/getTopics");
    },
    openOpacity() {
      this.controlPopTip();
      this.showOpacitySlider = this.state && !this.showOpacitySlider;
    },
    opacityChange(value) {
      this.$store.dispatch("topic/changeLayersOpacity", {
        topicInfo: this.itemData,
        value: value
      });
    },
    zoomToTopic() {
      this.controlPopTip();
      locateLayers(chaos, this.itemData.layers);
    },
    controlPopTip() {
      this.popTipVisible = false;
      setTimeout(() => {
        this.popTipVisible = true;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.resource-item {
  .item-label {
    height: 2.29rem;
    @apply truncate;
  }
  .svg-icon {
    margin-right: 0.73rem;
  }
 :deep(.ivu-poptip) {
    @apply h-full;
    .ivu-poptip-rel {
      @apply h-full;
    }
    .svg-icon {
      margin: 0 0.73rem;
    }
  }
 :deep(.ivu-poptip-rel) {
    @apply flex;
  }
 :deep(.ivu-poptip-inner) {
    @apply bg-transparent;
  }
 :deep(.ivu-poptip-body) {
    @apply p-0;
  }
 :deep(.ivu-poptip-popper) {
    min-width: 4rem;
    .ivu-poptip-arrow {
      border-bottom-color: rgba($color: #00131b, $alpha: 0.7);
      &:after {
        border-bottom-color: rgba($color: #00131b, $alpha: 0.7);
      }
    }
  }
  .tool-item {
    height: 1.56rem;
    line-height: 1.56rem;
    padding: 0 0.53rem;
    @apply text-sm;
    @apply text-default;
  }
  .tool-item:hover {
    @apply bg-light;
  }
  .active {
    @apply text-primary;
  }
}
.resource-item:hover {
  @apply bg-light;
}
.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.5;
}
</style>
