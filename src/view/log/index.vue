<template>
  <div>
    <gbobal-header/>
    <van-cell v-for="item in list" :key="item.id" :label="item.createTime">
      <template #title>
        <van-tag :type="item.type == 2 ? 'primary' : 'success'" size="large"><span class="custom-title">{{item.msg}}</span></van-tag>
      </template>
    </van-cell>
    <van-pagination v-model="page" :total-items="totalItems" @change="changePage"/>
  </div>
</template>

<script setup lang="ts">
import {getLogList} from "../../api/log";
import {Ref, ref} from "vue";

const list: Ref = ref()
const page: Ref = ref(1)
const totalItems: Ref = ref(0)


const changePage = () => {
  // 后续加载
  getLogList(page.value, 10).then(res => {
    list.value = res.records
    totalItems.value = res.total
    console.log(res.total)
  })
}

changePage()

</script>

<style scoped>

</style>
