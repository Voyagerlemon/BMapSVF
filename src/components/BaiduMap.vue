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
    console.log("BMap", window);
    onMounted(() => {
      var map = new BMap.Map("map");
      var point = new BMap.Point(props.longitude, props.latitude);
      map.centerAndZoom(point, props.zoom);
      map.enableScrollWheelZoom(true);
      map.addControl(
        new BMap.GeolocationControl({
          anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
          offset: new BMap.Size(15, 140)
        })
      );
      map.addControl(
        new BMap.PanoramaControl({
          anchor: window.BMAP_ANCHOR_TOP_RIGHT,
          offset: new BMap.Size(15, 50)
        })
      );
      map.addControl(
        new BMap.CityListControl({
          anchor: window.BMAP_ANCHOR_TOP_LEFT,
          offset: new BMap.Size(15, 10)
        })
      );
      map.addControl(
        new BMap.ScaleControl({
          offset: new BMap.Size(90, 23)
        })
      );
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
