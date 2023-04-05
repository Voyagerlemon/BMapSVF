<!--
 * @Author: Lauxb
 * @Date: 2021-03-11 13:53:12
 * @LastEditTime: 2023-04-04 09:43:30
 * @LastEditors: xuhy 1727317079@qq.com
 * @Description: 资源树组件
-->
<template>
  <div class="resource-tree">
    <div v-for="item in list" :key="item.id">
      <GroupItem v-if="item.type === 0" :itemData="item" :level="0" />
      <ResourceItem v-else :itemData="item" :level="0" />
    </div>
  </div>
</template>

<script>
import GroupItem from "./GroupItem.vue";
import ResourceItem from "./ReourceItem.vue";

export default {
  name: "ResourceTree",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    GroupItem,
    ResourceItem
  }
};
</script>

<style lang="scss" scoped></style>
