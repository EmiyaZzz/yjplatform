<template>
  <u-popup
    v-model="isShow"
    width="50%"
  >
    <view class="mine-pop-content">
      <view class="avatar">
        <image
          class="avatar-img"
          :src="headPhoto ? headPhoto : defaultAvatar"
        />
        <!-- <image class="upload-icon" @click="openSheet" :src="upload" mode="widthFix" /> -->
      </view>
      <view class="name">
        {{ ralname }}
      </view>
      <view class="mobile">
        {{ mobile }}
      </view>
      <view
        class="edit-item at-row align-center mb-60"
        @click="toChangeMobile"
      >
        <image
          class="icon mr-30"
          :src="mobileIcon"
          mode="widthFix"
        />
        <text>换绑手机</text>
      </view>
      <view
        class="edit-item at-row align-center mb-60"
        @click="toChangePass"
      >
        <image
          class="icon mr-30"
          :src="editIcon"
          mode="widthFix"
        />
        <text>修改密码</text>
      </view>
      <view
        class="outlogin"
        @click="outLogin"
      >
        退出登录
      </view>
    </view>
  </u-popup>
</template>
<script>
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
  data () {
    return {
      isShow: false,
      defaultAvatar: this.$IMAGES_URL + '/pic/default-head.png',
      mobileIcon: this.$IMAGES_URL + '/pic/mobile-icon.png',
      editIcon: this.$IMAGES_URL + '/pic/edit-icon.png'
    }
  },
  methods: {
    toChangeMobile () {
      this.isShow = false
      this.$changePage('pagesAuth/change/changeMobile')
    },
    toChangePass () {
      this.isShow = false
      this.$changePage('pagesAuth/change/changePassword')
    },
    outLogin () {
      this.$ls.remove('KEY_ACCESS_TOKEN')
      this.$toast('退出成功')
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
@import "./mine-pop.scss";
</style>
