<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-06 16:53:21
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:37:15
 * @FilePath: \BMapSVF-Client\src\components\BaiduMap.vue
 * @Description: Packaged Baidu map components
-->
<template>
  <div id="map"></div>
</template>

<script>
import {defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    // Pass in the latitude and longitude to be located
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
    const BMap = window.BMap;
    onMounted(() => {
      var map = new BMap.Map("map");
      window.map = map;
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
  },
});
</script>
<style scoped>
#map {
  width: 100%;
  height: 93.5vh;
  overflow: hidden;
  margin: 0;
}
</style>
