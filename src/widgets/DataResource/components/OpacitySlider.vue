<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2021-03-11 15:39:04
 * @LastEditTime: 2023-12-15 13:29:50
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @Description: Transparent slide
-->
<template>
  <div class="flex items-center opacity-slider">
    <Slider
      class="flex-1"
      v-model="opacityValue"
      @on-input="sliderChange"
    ></Slider>
    <InputNumber
      style="max-width: 3.4rem"
      class="radius slider-font"
      :min="0"
      :max="100"
      size="small"
      :formatter="value => `${value}%`"
      v-model="opacityValue"
    ></InputNumber>
    <span
      class="text-xs slider-font text-neutral-3 cursor-pointer"
      @click="reset"
    >
      <SvgIcon name="reset" width="0.83rem" />
    </span>
    <span
      class="text-xs slider-font text-neutral-3 cursor-pointer"
      @click="close"
    >
      <SvgIcon name="arrow-up" width="0.83rem" />
    </span>
  </div>
</template>

<script>
export default {
  name: "OpacitySlider",
  components: {},
  props: {
    value: {
      type: Number,
      default: () => 100
    }
  },
  data() {
    return {
      opacityValue: this.value
    };
  },
  watch: {
    value: {
      handler(data) {
        if (data) {
          this.opacityValue = data;
        }
      }
    }
  },
  methods: {
    sliderChange(value) {
      this.$emit("on-change", value);
    },
    reset() {
      this.opacityValue = 100;
      this.$emit("on-change", this.opacityValue);
    },
    close() {
      this.$emit("on-close");
    }
  }
};
</script>
<style lang="scss" scoped>
.opacity-slider {
  .slider-font {
    margin-left: 1rem;
    .svg-icon {
      opacity: 0.5;
    }
  }
  /* ::v-deep .ivu-slider-bar {
    @apply bg-primary;
  }
  ::v-deep .ivu-slider-button-wrap {
    top: -0.37rem;
    @apply flex items-center justify-center;
    .ivu-tooltip {
      @apply inline-flex;
    }
  }
  ::v-deep .ivu-input-number-input {
    @apply text-xs;
  } */
}
</style>
