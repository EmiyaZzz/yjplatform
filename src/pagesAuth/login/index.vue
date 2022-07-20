<template>
  <rcyj-page-view>
    <view class="login-wrapper">
      <view class="login-welcome-tips">
        <view class="big-tit">
          <!-- <image mode="widthFix" :src="login_title"></image> -->
        </view>
        <!-- <view class="small-tit">
          身价是创造力、影响力和信用度的价值体现
        </view> -->
      </view>
      <view class="login-form-wrapper">
        <view class="in-label">
          账号
        </view>
        <view class="in-box mb-50">
          <u-input
            v-model="mobile"
            maxlength="11"
            placeholder-style="color:#9094A0;font-size:30rpx"
            :custom-style="uInputStyle"
            placeholder="请输入手机号码"
          />
        </view>
        <view class="in-label">
          {{ type === 'code' ? '验证码' : '密码' }}
        </view>
        <view
          v-if="type === 'code'"
          class="in-box mb-80 at-row align-center space-between"
        >
          <u-input
            v-model="validateCode"
            maxlength="6"
            placeholder-style="color:#9094A0;font-size:30rpx"
            :custom-style="uInputStyle"
            placeholder="请输入手机验证码"
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
        <view
          v-else
          class="in-box mb-80"
        >
          <u-input
            v-model="password"
            type="password"
            maxlength="11"
            placeholder-style="color:#9094A0;font-size:30rpx"
            :custom-style="uInputStyle"
            placeholder="请输入密码"
          />
        </view>
        <rcyj-button @click="login" bgColor='linear-gradient(90deg, #3977f6 0%, #7ebafa 100%)' textColor="#fff">
          登录
        </rcyj-button>
        <view class="inlet at-row align-center space-between">
          <text @click="changeType">
            {{ type === 'code' ? '密码登录' : '验证码登录' }}
          </text>
          <text @click="toRegist">
            用户注册
          </text>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { loginApi, sendCodeApi } from '@/api/common.js'
import { Encrypt } from '@/utils/aes'
let HandleSetInterval = null
export default Vue.extend({
  name: 'LOGIN',
  data () {
    return {
      uInputStyle: {
        color: 'black'
      },
      type: 'code', // password
      mobile: '',
      smstype:'login',
      validateCode: '',
      password: '',
      second: 0,
      smsCodeText: '获取验证码',
      login_title: this.$OSS_IMAGES_URL + '/20201208/3338b95c30ae4cf48e9548a5ac0bcd2e.png'
    }
  },
  methods: {
    changeType () {
      this.type = this.type === 'code' ? 'password' : 'code'
    },
    toRegist () {
      this.$changePage({
        params: { origin: '/pagesAuth/login/index' },
        url: '/pages/regist/index'
      })
    },
    login () {
      const { type, mobile, password, validateCode,smstype } = this
      if (!mobile) {
        this.$toast('请输入手机号')
        return
      }
      // eslint-disable-next-line no-mixed-operators
      if (mobile && mobile.length !== 11 || mobile[0] !== '1') {
        this.$toast('手机号格式错误')
        return
      }
      const params = {
        mobile,
        smstype
      }
      if (type === 'code') {
        if (!validateCode) {
          this.$toast('请输入短信验证码')
          return
        }
        params.validateCode = validateCode
      } else {
        if (!password) {
          this.$toast('请输入密码')
          return
        }
        params.password = Encrypt(password)
      }
      loginApi(params).then(data => {
        this.$toast('登录成功')
        setTimeout(() => {
          this.$ls.set('KEY_ACCESS_TOKEN', data.access_token)
          console.log(data.access_token)
          // eslint-disable-next-line no-undef
          uni.reLaunch({
            url: '/pages/sy/index'
          })
          // this.$pageBack()
        }, 1000)
      })
    },
    openModel () {
      const { mobile,smstype } = this
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
      this.sendCode({ mobile,smstype})
    },
    sendCode (params) {
       console.log(params)
      sendCodeApi(params).then(() => {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `短信发送成功`, icon: 'none' })
        this.countDown()
      })
    },
    countDown () {
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
	@import "./login.scss";
</style>
