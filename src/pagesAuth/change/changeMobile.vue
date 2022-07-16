<template>
  <rcyj-page-view>
    <view class="change-wrapper">
      <view
        class="in-box at-row align-center space-between"
        style="border-bottom: 0; margin-bottom: 20rpx;"
      >
        <view class="in-label">
          当前手机号
        </view>
        <view class="felx-group">
          <u-input
            v-model="oldmobile"
            :disabled="true"
            maxlength="11"
            :clearable="false"
            :custom-style="uInputStyle"
          />
        </view>
      </view>
      <view class="in-box at-row align-center space-between">
        <view class="in-label">
          更换手机号
        </view>
        <view class="felx-group">
          <u-input
            v-model="mobile"
            maxlength="11"
            placeholder-style="color:#9094A0;font-size:28rpx"
            :clearable="false"
            :custom-style="uInputStyle"
            placeholder="请输入新手机号"
          />
        </view>
      </view>
      <view class="in-box at-row align-center space-between">
        <view class="in-label">
          验证码
        </view>
        <view class="felx-group at-row align-center flex-end">
          <u-input
            v-model="validateCode"
            maxlength="11"
            placeholder-style="color:#9094A0;font-size:28rpx"
            :clearable="false"
            :custom-style="uInputStyle"
            placeholder="请输入手机验证码"
          />
          <u-line
            direction="col"
            color="#9094A0"
            length="25rpx"
            margin="0 30rpx"
          />
          <view class="getcode">
            <text
              v-if="second<=0"
              @click="openModel"
            >
              {{ smsCodeText }}
            </text>
            <text v-else>
              {{ second }}
            </text>
          </view>
        </view>
      </view>
      <view class="tips">
        <p>* 验证码将发送到您的新手机号码上</p>
      </view>
      <rcyj-button @click="changeMobile">
        确认更换
      </rcyj-button>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { sendCodeApi, changeMobileApi, getUserInfoApi,userInfoUpdate } from '@/api/common.js'
const HandleSetInterval = null
export default Vue.extend({
  name: 'REGISTER',
  data () {
    return {
      uInputStyle: {
        color: '#373737',
        fontSize: '28rpx',
        textAlign: 'right'
      },
      oldmobile: '',
      mobile: '',
      second: 0,
      smsCodeText: '获取验证码',
      validateCode: ''
    }
  },
  created () {
    if (this.$ls.get('KEY_ACCESS_TOKEN')) {
      getUserInfoApi().then((data) => {
        this.oldmobile = data.user.mobile
      })
    }
  },
  methods: {
    changeMobile () {
      const { mobile, validateCode } = this
      if (!mobile) {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `请输入手机号`, icon: 'none' })
        return
      }
      // eslint-disable-next-line no-mixed-operators
      if (mobile && mobile.length !== 11 || mobile[0] !== '1') {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `手机号格式错误`, icon: 'none' })
        return
      }
      if (!validateCode) {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `请输入短信验证码`, icon: 'none' })
        return
      }
      const params = {
        smsCode: validateCode,
        newMobile: mobile
      }
      changeMobileApi(params).then(() => {
        // uni.clearStorageSync();
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `更换成功`, icon: 'none' })
        setTimeout(() => {
          this.$pageBack()
        }, 1000)
      })
    },
    openModel () {
      const { mobile } = this
      if (!mobile) {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `请输入手机号`, icon: 'none' })
        return
      }
      // eslint-disable-next-line no-mixed-operators
      if (mobile && mobile.length !== 11 || mobile[0] !== '1') {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `手机号格式错误`, icon: 'none' })
        return
      }
      this.sendCode({ mobile })
    },
    sendCode (params) {
      sendCodeApi(params).then(() => {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `短信发送成功`, icon: 'none' })
        this.countDown()
      })
    },
    countDown () {
      // eslint-disable-next-line no-const-assign
      HandleSetInterval = setInterval(() => {
        if (this.second === 1) {
          clearInterval(HandleSetInterval)
        }
        this.second = this.second === 0 ? 60 : this.second - 1
      }, 1000)
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
