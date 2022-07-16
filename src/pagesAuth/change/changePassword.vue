<template>
  <rcyj-page-view>
    <view class="change-wrapper">
      <view class="in-box at-row align-center space-between" style="border-bottom: 0; margin-bottom: 20rpx;">
        <view class="in-label">
          当前手机号
        </view>
        <view class="felx-group">
          <u-input v-model="mobile" :disabled="true" maxlength="11" :clearable="false" :custom-style="uInputStyle" />
        </view>
      </view>
      <view class="in-box at-row align-center space-between">
        <view class="in-label">
          旧密码
        </view>
        <view class="felx-group">
          <u-input v-model="oldpass" type="password" placeholder-style="color:#9094A0;font-size:28rpx"
            :clearable="false" :custom-style="uInputStyle" placeholder="请输入旧密码（默认为手机号后六位）" />
        </view>
      </view>
      <view class="in-box at-row align-center space-between">
        <view class="in-label">
          设置新密码
        </view>
        <view class="felx-group">
          <u-input v-model="pass" type="password" placeholder-style="color:#9094A0;font-size:28rpx" :clearable="false"
            :custom-style="uInputStyle" placeholder="请设置新密码" />
        </view>
      </view>
      <view class="in-box at-row align-center space-between">
        <view class="in-label">
          确认密码
        </view>
        <view class="felx-group">
          <u-input v-model="repass" type="password" placeholder-style="color:#9094A0;font-size:28rpx" :clearable="false"
            :custom-style="uInputStyle" placeholder="请再次输入密码确认" />
        </view>
      </view>
      <view class="tips" />
      <rcyj-button @click="changePassword">
        确认修改
      </rcyj-button>
    </view>
  </rcyj-page-view>
</template>
<script>
  import Vue from 'vue'
  import {
    changePasswordApi,
    userInfo,
    userInfoUpdate,
    UpdatePwd
  } from '@/api/common.js'
  import {
    Encrypt
  } from '@/utils/aes'
  export default Vue.extend({
    name: 'REGISTER',
    data() {
      return {
        userId: '',
        uInputStyle: {
          color: '#373737',
          fontSize: '28rpx',
          textAlign: 'right'
        },
        mobile: '',
        oldpass: '',
        pass: '',
        repass: ''
      }
    },
    created() {
      if (this.$ls.get('KEY_ACCESS_TOKEN')) {
        userInfo().then((result) => {
          if (result) {
             this.userId = result.id
            this.mobile = result.phone
          }
        }).catch((err) => {

        });
      }

    },
    methods: {
      changePassword() {
        const {
          userId,
          oldpass,
          pass,
          repass,
          mobile
        } = this
        if (!oldpass) {
          // eslint-disable-next-line no-undef
          uni.showToast({
            title: `请输入旧密码`,
            icon: 'none'
          })
          return
        }
        if (!pass) {
          // eslint-disable-next-line no-undef
          uni.showToast({
            title: `请输入新密码`,
            icon: 'none'
          })
          return
        }
        if (pass.length < 6 || pass.length > 20) {
          // eslint-disable-next-line no-undef
          uni.showToast({
            title: '密码长度为6-20位',
            icon: 'none'
          })
          return
        }
        if (!repass) {
          // eslint-disable-next-line no-undef
          uni.showToast({
            title: `请确认密码`,
            icon: 'none'
          })
          return
        }
        if (pass !== repass) {
          // eslint-disable-next-line no-undef
          uni.showToast({
            title: `新密码与确认密码不一致`,
            icon: 'none'
          })
          return
        }
        const params = {
          oldPwd: Encrypt(oldpass),
          password: Encrypt(pass),
          id: userId,
          // 'mobile':mobile,
          // 'password': Encrypt(pass),
          // 'smstype':'modify',
          // 'validateCode':
        }
        userInfoUpdate(params).then(() => {
          uni.showToast({
            title: `更换成功`,
            icon: 'none'
          })
          setTimeout(() => {
            this.$pageBack()
          }, 1000)
           wx.switchTab({
              url: '../index/index'
            })
        })
        // changePasswordApi(params).then(() => {
        //   // uni.clearStorageSync();
        //   // eslint-disable-next-line no-undef
        //   uni.showToast({
        //     title: `更换成功`,
        //     icon: 'none'
        //   })
        //   setTimeout(() => {
        //     this.$pageBack()
        //   }, 1000)
        // })
      }
    }
  })
</script>
<style lang="scss">
  @import "./index.scss";
</style>