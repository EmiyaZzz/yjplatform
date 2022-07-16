<template>
  <u-popup
    v-model="isShow"
    mode="center"
    width="540rpx"
    border-radius="30"
    z-index="10075"
  >
    <view class="login-popup-content">
      <image
        class="login-pop-img"
        :src="loginPopImg"
        mode="widthFix"
      />
      <view class="login-pop-bg">
        <view class="tips">
          <p>新用户可以直接查询身价哦~</p>
          <p>已查询过身价的用户</p>
          <p>直接登录查看吧~</p>
        </view>
        <view
          class="btn reg-btn"
          @click="toRegister"
        >
          新用户查询
        </view>
        <view
          class="btn login-btn"
          @click="toLogin"
        >
          老用户登录
        </view>
      </view>
    </view>
  </u-popup>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false,
      loginPopImg: this.$IMAGES_URL + '/pic/login-pop-img.png'
    }
  },
  methods: {
    toRegister () {
      this.isShow = false
      this.$changePage('pagesAuth/regist/index')
    },
    toLogin () {
      this.isShow = false
      this.$changePage('pagesAuth/login/index')
    }
  }
}
</script>
<style lang="scss">
@import "./login-type-choose.scss";
</style>
