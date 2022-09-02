<template>
  <view>
    <view class="vueDemo">
      <!-- <button @click="vueToMdel">点击打开弹窗</button> -->
      <!-- 弹框内容 -->
      <view class="vueMdelBox">
        <view :hidden="vueShowModel" class="vueContant">
          <view class="vueTitle">标题</view>
          <view class="vueDetail">内容可能过于基础，但对于刚入门的人来说或许是一个窗口</view>
          <!-- 确定取消按钮 -->
          <view class="vueBtn">
            <span @click="cancel()">取消</span>
            <span @click="confirm()">确定</span>
          </view>
        </view>
        <!-- 背景黑色蒙版 -->
        <view class="vueBgdCol" :hidden="vueShowModel" @click="setting()"></view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  userInfo, 
} from '@/api/common.js'
export default {
  props: {
    headPhoto: {
      type: String,
      default: ''
    },
    ralname: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      vueShowModel: true, //默认不显示
    };
  },

  created() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (this.getToken) {
      userInfo().then((data) => {
        this.scoreStatus = data.scoreStatus
      })
    }
  },
  methods: {
    // 点击按钮打开弹框
    vueToMdel() {
      this.vueShowModel = false;
    },
    // 点击蒙版按钮模态框消失
    setting() {
      this.vueShowModel = true;
    },
    // 点击取消按钮模态框消失
    cancel() {
      this.vueShowModel = true;
    },
    // 点击确定按钮模态框消失
    confirm() {
      this.vueShowModel = true;
    },
  },

}
</script>
<style lang="scss">
@import "./fun-pop.scss";
</style>