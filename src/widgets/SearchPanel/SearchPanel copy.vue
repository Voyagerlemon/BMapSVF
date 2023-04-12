<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-10 17:02:58
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-10 19:34:10
 * @FilePath: \BMapSVF-Client\src\widgets\SearchPanel\SearchPanel.vue
 * @Description: 百度地图搜索框
-->
<template>
  <div class="w-full">
    <Input
      id="suggestId"
      class="w-96 absolute left-20 -top-1/4"
      search
      placeholder="Please enter the search address"
      v-model="addressDetail"
      clearable
      @on-clear="clearAddressPanel"
    />
    <div
      id="searchResultPanel"
      style="
        border: 1px solid #c0c0c0;
        width: 150px;
        height: auto;
        display: none;
      "
    ></div>
  </div>
</template>
<script setup>
import { Input } from "view-ui-plus";
import { ref, onMounted } from "vue";
let addressDetail = ref(null);

function G(id) {
  return document.getElementById(id);
}
const loadSearchPanel = () => {
  let myValue = null;
  const autoComplete = new window.BMap.Autocomplete({
    input: "suggestId",
    location: window.map
  });
  autoComplete.addEventListener("onhighlight", function (e) {
    //鼠标放在下拉列表上的事件
    var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
      value =
        _value.province +
        _value.city +
        _value.district +
        _value.street +
        _value.business;
    }
    str =
      "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
      _value = e.toitem.value;
      value =
        _value.province +
        _value.city +
        _value.district +
        _value.street +
        _value.business;
    }
    str +=
      "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
  });
  autoComplete.addEventListener("onconfirm", function (event) {
    // 鼠标点击下拉列表后的事件
    const _value = event.item.value;
    myValue =
      _value.province +
      _value.city +
      _value.district +
      _value.street +
      _value.business;
    G("searchResultPanel").innerHTML =
      "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace();
  });
  function setPlace() {
    window.map.clearOverlays();
    const localSearch = new window.BMap.LocalSearch(window.map, {
      // 智能搜索
      onSearchComplete: addressPanorama
    });
    console.log(localSearch);
    function addressPanorama() {
      // 获取第一个智能搜索的结果
      const resultPoi = localSearch.getResults().getPoi(0).point;
      window.map.centerAndZoom(resultPoi, 18);
      // 添加标注
      window.map.addOverlay(new window.BMap.Marker(resultPoi));
    }

    localSearch.search(myValue);
  }
};

const clearAddressPanel = () => {
  window.map.clearOverlays();
};
onMounted(() => {
  loadSearchPanel();
});
</script>
<style lang="scss" scoped></style>
