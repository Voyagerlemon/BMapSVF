<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  props: {
    // 传入需要定位的经纬度
    latitude: {
      type: Number,
      default: () => {
        return 31.14;
      }
    },
    longitude: {
      type: Number,
      default: () => {
        return 118.22;
      }
    },
    zoom: {
      type: Number,
      default: 15
    }
  },
  setup(props, { emit }) {
    const BMap = (window as any).BMap;

    onMounted(() => {
      var map = new BMap.Map("map");
      var point = new BMap.Point(props.longitude, props.latitude);
      map.centerAndZoom(point, props.zoom);
      map.enableScrollWheelZoom(true);
    });
  }
});
</script>
<style scoped>
#map {
  width: 100%;
  height: 93vh;
  overflow: hidden;
  margin: 0;
}
</style>
