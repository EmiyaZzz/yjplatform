<template>
  <rcyj-page-view>
    <!-- <tack-picture-know ref="pictureKnow" /> -->
    <view class="register-wrapper">
      <view class="register-welcome-tips">
        <view class="big-tit">
          <!-- <image mode="widthFix" :src="regTitle"></image> -->
        </view>
      </view>
      <!-- <view class="register-top-bar">
        <u-tabs
          :list="bar"
          :is-scroll="false"
          :current="current"
          bg-color="#fff"
          inactive-color="#6c6e70"
          active-color="#003e8d"
          bar-width="80"
          bar-height="5"
          :bold="false"
          @change="changeTab"
        />
      </view> -->
      <view v-if="current === 0" class="register-form-wrapper">
        <view class="register-form-content">
          <!-- <view class="in-box at-row align-center space-between">
            <view class="in-label">
              法定姓名
            </view>
            <view class="felx-group">
              <u-input
                v-model="realname"
                maxlength="11"
                placeholder-style="color:#9094A0;font-size:28rpx"
                :clearable="false"
                :custom-style="uInputStyle"
                placeholder="请输入真实姓名"
              />
            </view>
          </view> -->
          <!-- <view class="in-box at-row align-center space-between">
            <view class="in-label" @click="$refs.credentials.isShow = true">
              {{ credentialsVal }}<image style="width: 20rpx; margin-left: 7rpx" mode="widthFix" :src="downIcon"></image>
            </view>
            <view class="felx-group">
              <u-input
                v-model="birthday"
                placeholder-style="color:#9094A0;font-size:28rpx"
                :clearable="false"
                :custom-style="uInputStyle"
                placeholder="请输入与证件一致的信息"
              />
            </view>
            <rcyj-picker-single ref="credentials" :list="credentials" @confirm="credentialsConfirm"/>
          </view> -->
          <view class="in-box at-row align-center space-between">
            <view class="in-label">
              手机号码
            </view>
            <view class="felx-group">
              <u-input v-model="mobile" maxlength="11" placeholder-style="color:#9094A0;font-size:28rpx"
                :clearable="false" :custom-style="uInputStyle" placeholder="请输入常用手机号码" />
            </view>
          </view>
          <view class="in-box at-row align-center space-between">
            <view class="in-label">
              验证码
            </view>
            <view class="felx-group at-row align-center flex-end">
              <u-input v-model="validateCode" maxlength="11" placeholder-style="color:#9094A0;font-size:28rpx"
                :clearable="false" :custom-style="uInputStyle" placeholder="请输入手机验证码" />
              <u-line direction="col" color="#9094A0" length="25rpx" margin="0 30rpx" />
              <view class="getcode">
                <view v-if="second <= 0" @click="openModel">
                  {{ smsCodeText }}
                </view>
                <view v-else>
                  {{ second }}
                </view>
              </view>
            </view>
          </view>
          <view class="pt-50 pb-50 at-row align-center" @click="seletAgreement">
            <image class="check-radio-img" mode="widthFix" :src="!agreeFlag ? selectImg : selectedImg" />
            <view class="agree-title ml-30">
              同意并阅读
              <text class="agree" @click.stop="toNewsPro">《有价平台用户隐私协议》</text>
            </view>
          </view>
        </view>
      </view>
      <view v-if="current === 1" class="register-paper-wrapper">
        <view class="register-paper-box">
          <image :src="headImg ? headImg : head" :style="{ 'z-index': headImg ? '3' : '1' }"
            @click="openSheet('headImg')" />
          <view class="know-in" @click="$refs.pictureKnow.isShow = true">查看拍摄须知</view>
        </view>
        <view class="register-form-wrapper">
          <view class="register-form-content">
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                手机号码
              </view>
              <view class="felx-group">
                <u-input v-model="mobile" maxlength="11" placeholder-style="color:#9094A0;font-size:28rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入常用手机号码" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                验证码
              </view>
              <view class="felx-group at-row align-center flex-end">
                <u-input v-model="validateCode" maxlength="11" placeholder-style="color:#9094A0;font-size:28rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入手机验证码" />
                <u-line direction="col" color="#9094A0" length="25rpx" margin="0 30rpx" />
                <view class="getcode">
                  <text v-if="second <= 0" @click="openModel">
                    {{ smsCodeText }}
                  </text>
                  <text v-else>
                    {{ second }}
                  </text>
                </view>
              </view>
            </view>
            <view class="pt-50 pb-50 at-row align-center" @click="seletAgreement">
              <image class="check-radio-img" mode="widthFix" :src="!agreeFlag ? selectImg : selectedImg" />
              <view class="agree-title ml-30">
                同意并阅读
                <text class="agree" @click.stop="toNewsPro">《有价平台用户隐私协议》</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="pl-30 pr-30">
        <view class="login-in mt-40 mb-40"><text @click="toLogin">已有账号，去登录</text></view>
        <view class="mb-40">
          <rcyj-button @click="assessRegister">
            注册
          </rcyj-button>
        </view>
        <view class="tips">
          <p>* 手机号将用于登录账号，接收评估结果</p>
          <p>* 请填写真实身份信息，信息提交后不可更改，如信息有误会影响您的评估结果！</p>
        </view>
      </view>
    </view>
    <u-modal v-model="readIdCardModel" :show-title="false" :show-confirm-button="false">
      <view class="readIdCardBox">
        <view class="tips">请确认识别得信息，如有误可手动修改后确认</view>
        <view class="infobox">
          <view class="item">
            <rcjy-input placeholder="请输入" :inval="readIdCardInfo.name" @input="readNameChange" />
          </view>
          <view class="item">
            <rcjy-input placeholder="请输入" :inval="readIdCardInfo.idcard" @input="readIdcardChange" />
          </view>
        </view>
        <view class="btn">
          <rcyj-button @click="readIdCardModel = false">确认</rcyj-button>
        </view>
      </view>
    </u-modal>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { sendCodeApi, assessRegisterApi, uploadIdCardApi, readIdCardApi } from '@/api/common.js'
import RcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
const config = require('@/config/index')
let HandleSetInterval = null
export default Vue.extend({
  components: { RcyjButton, RcjyInput },
  name: 'REGISTER',
  data() {
    return {
      effect: this.$IMAGES_URL + '/pic/effect.png',
      head: this.$OSS_IMAGES_URL + '/20201208/193a803b783748a4bbadb1074935eb6b.png',
      national: this.$IMAGES_URL + '/pic/national.png',
      know: this.$IMAGES_URL + '/pic/know.png',
      action: config.gatewayUrl + '/app/uploadimg',
      regTitle: this.$OSS_IMAGES_URL + '/20201208/c0910d5060ff4f5598d0f68e3b7dd53d.png',
      downIcon: this.$OSS_IMAGES_URL + '/20201208/e8c17f02336b4b889687c8dc9f92a6d5.png',
      selectImg: this.$OSS_IMAGES_URL + '/20220617/selectImg.png',
      selectedImg: this.$OSS_IMAGES_URL + '/20220617/selectedImg.png',
      uInputStyle: {
        color: '#black',
        fontSize: '28rpx',
        textAlign: 'right'
      },
      second: 0,
      smsCodeText: '获取验证码',
      bar: [{
        name: '填写信息查询'
      }, {
        name: '上传证件查询',
        count: '推荐'
      }],
      current: 0,
      realname: '',
      birthday: '',
      mobile: '',
      smstype: 'register',
      validateCode: '',
      headImg: '',
      nationalImg: '',
      file: '',
      origin: '',
      // 证件数组
      credentials: [
        {
          value: '1',
          label: '身份证'
        },
        {
          value: '2',
          label: '护照'
        }
      ],
      // 选择的证件类型
      credentialsVal: '身份证',
      agreeFlag: false,
      readIdCardModel: false,
      readIdCardInfo: {
        name: '',
        idcard: ''
      }
    }
  },
  onLoad(options) {
    if (options.origin) {
      this.origin = options.origin
    }
  },
  methods: {
    readNameChange(e) {
      this.readIdCardInfo.name = e
    },
    readIdcardChange(e) {
      this.readIdCardInfo.idcard = e
    },
    changeTab(index) {
      this.current = index
    },
    credentialsConfirm(result) {
      this.credentialsVal = result[0].label
    },
    async openSheet(type) {
      const params = {
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      }
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params)
      this[type] = res[1].tempFilePaths[0]
      if (type === 'headImg') {
        this.uploadAvatar(res[1].tempFilePaths[0])
      }
    },
    async uploadAvatar(filePath) {
      // eslint-disable-next-line no-undef
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: 'file',
        header: {

        }
      })
      this.file = JSON.parse(res[1].data).data
      await readIdCardApi({ file: this.file }).then(res => {
        this.readIdCardModel = true
        this.readIdCardInfo.name = res.name
        this.readIdCardInfo.idcard = res.idcard
      })
      // let headPhoto = JSON.parse(res[1].data).data.key
      // this.saveHeadPhoto()
    },
    assessRegister() {
      const { current, realname, birthday, mobile, validateCode, headImg, file, agreeFlag, smstype } = this
      if (current === 0) {
        // if (!realname) {
        //   this.$toast('请输入法定姓名')
        //   return
        // }
        // if (!birthday) {
        //   this.$toast('请输入证件号码')
        //   return
        // }
        // if (birthday && birthday.length !== 15 && birthday.length !== 18) {
        //   this.$toast('请输入与证件一致的信息')
        //   return
        // }
        if (!mobile) {
          this.$toast('请输入手机号')
          return
        }
        // eslint-disable-next-line no-mixed-operators
        if (mobile && mobile.length !== 11 || mobile[0] !== '1') {
          this.$toast('手机号格式错误')
          return
        }
        if (!validateCode) {
          this.$toast('请输入短信验证码')
          return
        }
        if (!agreeFlag) {
          this.$toast('请同意并阅读《有价平台平台用户隐私协议》')
          return
        }
        const params = {
          // birthday,
          mobile,
          smstype,
          // name: realname,
          validateCode
        }
        assessRegisterApi(params).then((data) => {
          this.$toast('注册成功，奖励您10个身价分')
          this.$ls.set('KEY_ACCESS_TOKEN', data.access_token)
          console.log(data)
          uni.reLaunch({
            url: '/pages/sy/index'
          })
          setTimeout(() => {
            if (this.origin) {
              // eslint-disable-next-line no-undef
              uni.navigateBack({
                delta: 2
              })
            } else {
              // eslint-disable-next-line no-undef
              uni.navigateBack({
                delta: 1
              })
            }
          }, 1000)
        })
      } else {
        if (!headImg) {
          // eslint-disable-next-line no-undef
          uni.showToast({ title: `请上传证件照`, icon: 'none' })
          return
        }
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
        if (!agreeFlag) {
          this.$toast('请同意并阅读《有价平台平台用户隐私协议》')
          return
        }
        const params = {
          file: file,
          mobile,
          validateCode
        }
        // this.uploadAvatar(params);
        uploadIdCardApi(params).then((data) => {
          // eslint-disable-next-line no-undef
          uni.showToast({ title: `注册成功`, icon: 'none' })
          this.$ls.set('KEY_ACCESS_TOKEN', data.token)
          setTimeout(() => {
            // eslint-disable-next-line no-undef
            uni.reLaunch({
              url: '/pages/index/index'
            })
            // if (this.origin) {
            //   // eslint-disable-next-line no-undef
            //   uni.navigateBack({
            //     delta: 2
            //   })
            // } else {
            //   // eslint-disable-next-line no-undef
            //   uni.navigateBack({
            //     delta: 1
            //   })
            // }
          }, 1000)
        })
      }
    },
    openModel() {
      const { mobile, smstype } = this
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
      this.sendCode({ mobile, smstype })
    },
    sendCode(params) {
      console.log(params)
      sendCodeApi(params).then(() => {
        // eslint-disable-next-line no-undef
        uni.showToast({ title: `短信发送成功`, icon: 'none' })
        this.countDown()
      })
    },
    countDown() {
      HandleSetInterval = setInterval(() => {
        if (this.second === 1) {
          clearInterval(HandleSetInterval)
        }
        this.second = this.second === 0 ? 60 : this.second - 1
      }, 1000)
    },
    seletAgreement() {
      this.agreeFlag = !this.agreeFlag
    },
    toNewsPro() {
      // eslint-disable-next-line no-undef
      uni.navigateTo({
        // url: '/pages/news/detail?id=5459&title=《有价平台用户隐私协议》&titleHide=true'
         url: '/pages/agreement/index'
      })
    },
    toLogin() {
      this.$changePage('/pagesAuth/login/index')
    }
  }
})
</script>

<style lang="scss">
@import "./regist.scss";
</style>
