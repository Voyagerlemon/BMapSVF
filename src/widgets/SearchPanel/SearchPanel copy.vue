<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-10 17:02:58
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 18:46:46
 * @FilePath: \BMapSVF-Client\src\widgets\SearchPanel\SearchPanel.vue
 * @Description: Baidu map search box
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
    // Mouse over the event on the drop-down list
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
    // Mouse click after the drop-down list of events
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
      // intelligent search
      onSearchComplete: addressPanorama
    });
    console.log(localSearch);
    function addressPanorama() {
      // Get the results of your first intelligent search
      const resultPoi = localSearch.getResults().getPoi(0).point;
      window.map.centerAndZoom(resultPoi, 18);
      // Add annotation
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
