<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2021-03-11 13:53:12
 * @LastEditTime: 2023-12-15 18:33:20
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @Description: Resource tree component
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
