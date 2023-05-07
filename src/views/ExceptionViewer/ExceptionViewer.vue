<!--
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-05-07 11:40:53
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-07 15:52:57
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
