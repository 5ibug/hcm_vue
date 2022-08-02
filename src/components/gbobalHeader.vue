<template>
  <van-sticky>
    <van-nav-bar
        @click-left="backRouter"
        :title="title"
        :left-text="isLeft ? '返回' : ''"
        :left-arrow=isLeft
    />
    <van-notice-bar
        left-icon="volume-o"
        mode="closeable"
        scrollable
        text="[公告] 目前正常使用"
    />
  </van-sticky>
</template>

<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {ref} from "vue";

export default {
  name: "gbobalHeader",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isLeft = ref(!!route.meta.back)
    const title = ref(route.meta.title ?? "自动化上班")
    console.log(isLeft,title)
    const backRouter = () => {
      router.back()
    }
    return {
      title,
      isLeft,
      backRouter
    }
  }
}
</script>

<style scoped>

</style>
