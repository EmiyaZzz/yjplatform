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
          邮箱
        </view>
        <view class="felx-group">
          <u-input v-model="emailS" placeholder-style="color:#9094A0;font-size:28rpx" :clearable="false"
            :custom-style="uInputStyle" placeholder="请输入邮箱" />
        </view>
      </view>

      <view class="tips" />
      <rcyj-button @click="changeEmail">
        确认修改
      </rcyj-button>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  userInfo,
  userInfoUpdate,
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
      repass: '',

      emailS: ''
    }
  },
  created() {
    if (this.$ls.get('KEY_ACCESS_TOKEN')) {
      userInfo().then((result) => {
        if (result) {
          this.userId = result.id
          this.emailS = result.email
          this.mobile = result.phone
        }
      }).catch((err) => {

      });
    }

  },
  methods: {
    changeEmail() {
      const {
        userId,
        emailS
      } = this
      if (!emailS) {
        // eslint-disable-next-line no-undef
        uni.showToast({
          title: `请输入邮箱`,
          icon: 'none'
        })
        return
      }
      const params = {
        email:emailS,
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

    }
  }
})
</script>
<style lang="scss">
@import "./index.scss";
</style>