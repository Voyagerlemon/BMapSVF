<!--
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-05-07 11:40:53
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:44:52
 * @FilePath: \BMapSVF-Client\src\views\ExceptionViewer\ExceptionViewer.vue
 * @Description: Exception viewer
-->
<template>
  <div>
    <Exception
      type="500"
      img-color
      desc="Sorry, there is an error on the server, please try again later!"
      class="flex flex-row mt-20"
      back-text="Back Homepage"
      redirect="/viewer"
    />
  </div>
</template>
<script setup></script>
