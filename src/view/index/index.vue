<template>
  <gbobal-header />
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
    <van-swipe-item>☀️ {{ userInfo.name }}</van-swipe-item>
    <van-swipe-item>上次登录: {{ userInfo.updateTime }}</van-swipe-item>
  </van-swipe>

  <van-cell-group title="手动功能区">
    <van-cell center title="签到 (上班打卡)" label="手动进行一次签到操作">
      <template #right-icon>
        <van-button plain hairline type="primary" @click="signIn">签到</van-button>
      </template>
    </van-cell>
    <van-cell center title="签退 (下班打卡)" label="手动进行一次签退操作">
      <template #right-icon>
        <van-button plain hairline type="primary" @click="signOut">签退</van-button>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="设置">
    <van-cell center title="工作日自动签到" label="非周末每日早上08:00:00 会进行打卡操作">
      <template #right-icon>
        <van-switch v-model="userInfo.autoUp" @click="switchAutoUp"/>
      </template>
    </van-cell>
    <van-cell center title="工作日自动签退" label="非周末每日早上17:00:00 会进行打卡操作">
      <template #right-icon>
        <van-switch v-model="userInfo.autoDown" @click="switchAutoDown"/>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="其他">
    <van-cell center is-link title="查看日志" label="查看打卡日志" @click="logView"/>

    <van-cell center is-link title="退出登录" label="服务端依旧会按照设置进行打卡" @click="logout"/>
  </van-cell-group>

  <!--  日志-->
  <!--  <van-pagination v-model="currentPage" :page-count="12" mode="simple" />-->
</template>

<script setup lang="ts">
import {userStore} from "../../store/userInfo";
import {Dialog} from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import {down, up} from "../../api/sign";
import {setDown, setUp} from "../../api/switch";
import {useRouter} from "vue-router";

const router = useRouter()

const userInfo = userStore();
userInfo.getUser();

/**
 * 上班打卡状态切换
 */
const switchAutoUp = () => {
  setUp(userInfo.autoUp).then(res=>{
    if(res !== userInfo.autoUp){
      Dialog.alert({
        title: '提示',
        message: '修改失败,未知错误。',
        theme: 'round-button',
      })
    }
    userInfo.saveCache()
  })
}

/**
 * 下班打卡状态切换
 */
const switchAutoDown = () => {
  setDown(userInfo.autoDown).then(res=>{
    if(res !== userInfo.autoDown){
      Dialog.alert({
        title: '提示',
        message: '修改失败,未知错误。',
        theme: 'round-button',
      })
    }
    userInfo.saveCache()
  })
}

/**
 * 退出登录
 */
const logout = () => {
  userInfo.logout();
}

/**
 * 手动签到
 */
const signIn = () => {
  up().then(res => {
    if (res) {
      Dialog.alert({
        title: '提示',
        message: '打卡完成,是否成功请以公众号提示为准。',
        theme: 'round-button',
      })
    } else {
      Dialog.alert({
        title: '提示',
        message: '打卡失败,可能是cookie失效,是否成功请以公众号提示为准。',
        theme: 'round-button',
      })
    }
  })
}

/**
 * 手动签退
 */
const signOut = () => {
  down().then(res => {
    if (res) {
      Dialog.alert({
        title: '提示',
        message: '打卡完成,是否成功请以公众号提示为准。',
        theme: 'round-button',
      })
    } else {
      Dialog.alert({
        title: '提示',
        message: '打卡失败,可能是cookie失效,是否成功请以公众号提示为准。',
        theme: 'round-button',
      })
    }
  })
}

/**
 * 跳转到日志view
 */
const logView = () => {
  router.push('/log')
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
