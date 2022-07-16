<template>
  <u-popup v-model="isShow" height="47%" mode="bottom">
    <view class="fun-pop-content" :style="{ 'background-image': 'url(' + imgSlidePanel + ')' }">
      <view class="content">
        <!-- <view class="t1">身价超能力</view> -->
        <!-- <view class="btn-box at-row align-center mb-60" @click="toAssessment()" v-if="scoreStatus != 2"><text>身价查询</text>
        </view> -->
        <!-- <view class="btn-box at-row align-center mb-60" @click="toAssessment()"><text>评估定价</text></view> -->
        <view class="btn-box at-row align-center mb-60" @click="toSjcertificate()"><text>身价证书</text></view>
        <view class="btn-box at-row align-center mb-60" @click="toReport()"><text>身价报告</text></view>
        <!-- <view class="btn-box at-row align-center mb-60"><text>身价排名</text></view> -->
        <!-- <view class="edit-item at-row align-center mb-60" @click="toChangeMobile">
          <image class="icon mr-30" :src="mobileIcon" mode="widthFix" />
          <text></text>
        </view>
        <view class="outlogin" @click="outLogin">
          退出登录
        </view> -->
      </view>


    </view>
  </u-popup>
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
      isShow: false,
      getToken:'',
      defaultAvatar: this.$IMAGES_URL + '/pic/default-head.png',
      mobileIcon: this.$IMAGES_URL + '/pic/mobile-icon.png',
      editIcon: this.$IMAGES_URL + '/pic/edit-icon.png',
      scoreStatus: '',
      imgSlidePanel: this.$OSS_IMAGES_URL + '/20220617/chouchu4.png',
    }
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
    toAssessment() {
      this.isShow = false
      this.$changePage("pages/sjsearch/index");
    },
    toSjcertificate() {
      this.isShow = false
      this.$changePage("pages/sjcertificate/index");
    },
    toReport() {
      this.isShow = false
      this.$changePage("pages/sjreport/index");
    },
    toChangeMobile() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changeMobile')
    },
    toChangePass() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changePassword')
    },
    outLogin() {
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
@import "./fun-pop.scss";
</style>