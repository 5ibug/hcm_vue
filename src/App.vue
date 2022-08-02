<script setup lang="ts">

import GbobalHeader from "./components/gbobalHeader.vue";
</script>

<template>
  <keep-alive>
    <van-config-provider theme="dark">
      <router-view/>
    </van-config-provider>
  </keep-alive>
</template>

<style>
body{
  background-color: #F7F8FA;
}
</style>
