<template>
  <gbobal-header />
  <div style="text-align: center">
    <img :src="qrcode" alt="" style="border: 1px solid #000; width: 95%; margin-top: 2rem;" @click="refreshQrcode">
    <span style="color: rgb(200,200,200);font-size: 12px;">{{ code }}</span>
  </div>
</template>

<script lang="ts">
import {Toast} from 'vant';
import 'vant/es/toast/style';
import {isScanQrcode, getQrcodeInfo, login} from "../../api/qrcode";
import {Ref, ref} from "vue";
import router from "../../router";

// 获取二维码图片.
const getQrcode = async (code: Ref, qrcode: Ref) => {
  let d = await getQrcodeInfo()
  code.value = d.code
  qrcode.value = d.qrcode
}

// 判断是否扫码
const isScan = async (code: Ref, interval: number) => {
  let d = await isScanQrcode(code.value)
  if (d !== "conti") {
    clearInterval(interval)
    login(d).then(res => {
      localStorage.setItem("token", res);
      router.push("home")
    })
  }
}

export default {
  setup() {
    // 非直接访问首页 (已登录状态访问首页会被路由守护拦截跳转到/home)
    if (window.performance.navigation.type != 1) {
      Toast.fail("未登录或登录失效")
    }

    const code = ref()
    const qrcode = ref()
    getQrcode(code, qrcode);

    const refreshQrcode = () => {
      getQrcode(code, qrcode);
    }

    // 持续判断是否扫码
    // http://127.0.0.1:8080/hcm/login/isScanQrcode/a9208f3a-23d3-4671-8768-ba608b9ef905
    const interval = setInterval(() => {
      isScan(code, interval)
    }, 1000)

    return {
      code,
      qrcode,
      refreshQrcode
    }
  }
}

</script>

<style scoped>

</style>
