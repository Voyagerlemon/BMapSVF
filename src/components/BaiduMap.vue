<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-06 16:53:21
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 15:19:27
 * @FilePath: \BMapSVF-Client\src\components\BaiduMap.vue
 * @Description: 封装的百度地图组件
-->
<template>
  <div id="map"></div>
</template>

<script>
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
