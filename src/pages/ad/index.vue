<template>
  <view class="index-wrapper">
    <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
    <view class="body">
      <!-- :style="{'background-image':'url('+imgAd+')'}" -->

      <view class="btnfield">
        <view class="btn" @click="adjump">
          <text>{{ count }} | 跳过</text>
        </view>
      </view>
      <view class="ad-logo">
        <img :src=imgLogo alt="" />
      </view>

    </view>
  </view>
</template>
<script>
const WXBizDataCrypt = require("@/utils/WXBizDataCrypt");
import Vue from "vue";
import {
  getUserInfoApi,
  getRankApi,
  getApprobateApi,
  updateBaseInfoApi,
} from "@/api/common.js";
import MinePop from "../components/mine-pop/mine-pop.vue";
// import { Button } from '../components/vant';
// import Button from 'vant/lib/button'; // button组件
export default Vue.extend({
  components: {
    MinePop,
  },
  data() {
    return {
      count: 0,
      time: '',
      imgAd: this.$OSS_IMAGES_URL + '/20220617/ad1.jpg',
      imgLogo: this.$OSS_IMAGES_URL + '/20220617/adlogo.png',
      imgSlogan: this.$OSS_IMAGES_URL + '/20220617/slogan.png',
    };
  },
  onLoad() {

  },
  onShow() {
    this.addHandle();
  },
  methods: {
    addHandle() {
      // 定义n=5秒
      this.count = 3;
      // 定义定时器time
      this.time = setInterval(() => {
        // 禁用
        this.istrue = true;
        // 改变倒计时文字提示
        this.count--;
        // 如果n<0，清除定时器，禁用状态取消，文字提示为空（不显示）
        if (this.count <= 0) {
          wx.switchTab({
            url: '../sy/index'
          })
          // this.$changePage("pages/index/index");
          clearInterval(this.time);
        }
      }, 1000);
    },
    adjump() {
      // this.$changePage("pages/index/index");
      clearInterval(this.time);
      wx.switchTab({
        url: '../sy/index'
      })
    },

  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>