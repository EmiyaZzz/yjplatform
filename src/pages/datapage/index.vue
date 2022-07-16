<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <view class="top-bg">
          <view class="avator"></view>
          <view>
            <view class="name-bg">
              <view class="name">小鹿</view>
              <view class="perbtn">完善信息</view>
            </view>
            <view class="level-bg">
              <p>高层次人才</p>
            </view>
          </view>
          <view class="qrcode">
            <img src="/static/images/index/qr.webp" alt="">
          </view>
        </view>
        <view class="center-btn">
          <view class="box1"></view>
          <view class="ring" @click="assessScore">
            <view class="cbtn">
              <view class="p1"> 身价</view>
              <view class="p2"> {{ !getToken ? '登录查询' : '查询' }}</view>
            </view>
          </view>
        </view>
        <!-- <view class="per">高于90%人群</view> -->
        <view class="btn-box1" v-if="status === 4">
          <view class="box1">
            <img src="/static/images/index/当前身价logo@2x.png" alt="">
            <p style="color: #07469b;">当前身价</p>
          </view>
          <view class="box1">
            <img src="/static/images/index/潜在身价@2x.png" alt="">
            <p style="color: #77797b;">潜在身价</p>
          </view>
        </view>
        <view class="search-box" v-if="status === 3">
          <view class="cbtn">信息修改</view>
          <view class="cbtn">身价提升</view>
        </view>
        <view class="btn-box2">
          <view class="box" v-if="financeValue!=0">
            <img src="/static/images/index/银行@2x.png" alt="">
            <p>金融价值</p>
            <p style="color: #77797b;margin-left:280rpx">1000万</p>
          </view>
          <view class="box" v-if="postValue!=0">
            <img src="/static/images/index/银行@2x.png" alt="">
            <p>岗位价值</p>
            <p style="color: #77797b;margin-left:280rpx">1000万</p>
          </view>
          <view class="box" v-if="investmentValue!=0">
            <img src="/static/images/index/银行@2x.png" alt="">
            <p>投资价值</p>
            <p style="color: #77797b;margin-left:280rpx">1000万</p>
          </view>
        </view>
        <view class="slide-panel" @click="openPopuos">
          <img src="/static/images/index/上滑@2x.png" alt="">
        </view>
        <!-- 底部弹出 -->
        <!-- <uni-popup class="popup_box" ref="popups" type="bottom">
          <view class="popup_top">
            <view class="popup_top_text" style="margin:0 auto">
              我的身价超能力
            </view>
          </view>
        </uni-popup> -->
        <!-- <view
          style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          "
        >
          <rcyj-button
            type="primary"
            block
            open-type="getUserInfo"
            @getuserinfo="appLoginWx"
          >
            微信一键登录
          </rcyj-button>
          <rcyj-button
            v-show="showPhone"
            type="primary"
            block
            open-type="getPhoneNumber"
            @getphonenumber="getPhone"
          >
            授权电话
          </rcyj-button>
        </view> -->
      </view>
    </view>
    <mine-pop ref="mine" :headPhoto="headPhoto" :ralname="ralname" :mobile="mobile"></mine-pop>
    <fun-pop ref="fun" :headPhoto="headPhoto" :ralname="ralname" :mobile="mobile"></fun-pop>

  </rcyj-page-view>
</template>
<script>
  import Vue from 'vue'
  import {
    getUserInfoApi,
    getRankApi,
    getApprobateApi,
    updateBaseInfoApi
  } from '@/api/common.js'
  import MinePop from '../components/mine-pop/mine-pop.vue'
  import FunPop from '../components/fun-pop/fun-pop.vue'
  // import uniPopup from '../components/uni-popup/uni-popup.vue'
  export default Vue.extend({
    components: {
      MinePop,
      FunPop
    },
    data() {
      return {
        status:0,//状态 未登录0 登陆未身价查询1 登陆初次身价查询2 身价查询未评估3 身份查询已部分评估4 身份查询已完全评估5
        financeValue:0,
        postValue:0,
        investmentValue:0,

        firstSearch:false,
        defaultAvatar: this.$IMAGES_URL + '/pic/default-head.png',
        personalEnter: this.$IMAGES_URL + '/pic/personal-enter-img.png',
        V: this.$IMAGES_URL + '/pic/V.png',
        indexTopBg: this.$IMAGES_URL + '/pic/index-top-bg.png',
        rankIcon: this.$IMAGES_URL + '/pic/rank-icon.png',
        timeIcon: this.$IMAGES_URL + '/pic/time-icon.png',
        rankTenTit: this.$IMAGES_URL + '/pic/rank-ten-tit.png',
        rankOne: this.$IMAGES_URL + '/pic/rank-one.png',
        rankTwo: this.$IMAGES_URL + '/pic/rank-two.png',
        rank3: this.$IMAGES_URL + '/pic/rank-3.png',
        loginPopImg: this.$IMAGES_URL + '/pic/login-pop-img.png',
        mobileIcon: this.$IMAGES_URL + '/pic/mobile-icon.png',
        editIcon: this.$IMAGES_URL + '/pic/edit-icon.png',
        rankOutTop: this.$IMAGES_URL + '/pic/rank-out-top.png',
        rankOutBottom: this.$IMAGES_URL + '/pic/rank-out-bottom.png',
        upload: this.$IMAGES_URL + '/pic/upload.png',
        lump1: this.$OSS_IMAGES_URL + '/20201208/a99daae94306471d8a930609ef1ac7d7.png',
        lump2: this.$OSS_IMAGES_URL + '/20201208/9a48de9081ad4609bb2d1395fb898af3.png',
        indexTitleIcon1: this.$OSS_IMAGES_URL + '/20201208/095da1ecf8b84b478cbb147c5380c86b.png',
        indexTitleIcon2: this.$OSS_IMAGES_URL + '/20201208/a1c20179bcf743eda3e445a522715d4d.png',
        indexTitleIcon3: this.$OSS_IMAGES_URL + '/20201208/864235ee49ff41f785f7c1f9f388cdcd.png',
        indexTitleIcon4: this.$OSS_IMAGES_URL + '/20201208/9c0545cb57704746b37c712000b45fdf.png',
        denyBg: this.$OSS_IMAGES_URL + '/20201208/285abe5bf35e4c9baa3fd42eb3f9e1fd.png',
        approveBg: this.$OSS_IMAGES_URL + '/20201208/b46fa13b6f65484b9a4e6407c292f96b.png',
        huo: this.$OSS_IMAGES_URL + '/20201209/644bd9aa32f843ceb1e27363ae48c993.png',
        vs: this.$OSS_IMAGES_URL + '/20201209/952dc56a39484abca9b61db6c8232968.png',
        loginPopup: false,
        minePopup: false,
        isLogin: false,
        getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
        socialScore: '',
        headPhoto: '',
        rankList: [],
        level: '',
        createTime: '',
        ralname: '',
        mobile: '',
        // 用户身份
        identityType: null,
        prove: {
          accept_status: '',
          approvenum: 0,
          napprovenum: 0
        }
      }
    },
    onLoad() {
      this.getApprobate()
    },
    onShow() {
      this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
      console.log('token======' +this.getToken )
      if (this.getToken) {
        getUserInfoApi().then((data) => {
          if (data.assessResult) this.socialScore = data.assessResult.socialScore ? data.assessResult
            .socialScore : '0'
          if (data.assessResult) this.createTime = data.assessResult.createTime ? data.assessResult.createTime :
            ''
          this.mobile = data.user.mobile.replace(data.user.mobile.substring(3, 7), '****')
          this.ralname = this.formatName(data.user.username)
          this.headPhoto = data.user.pic ? 'data:image/jpg;base64,' + data.user.pic : ''
          this.identityType = data.user.identityType
        })

        // getRankApi().then(data => {
        //   this.level = data.level
        // })
      }
    },
    methods: {
      openPopuos() {
        this.showLoginPop()
      },
      //-------------------------------------------微信授权登录---------------------------------------------------------------
      // 授权获取微信用户信息
      appLoginWx(res) {
        console.log(res);
        // 获取用户信息成功
        if (
          res.detail.errMsg === "getUserProfile:ok" ||
          res.detail.errMsg === "getUserInfo:ok"
        ) {
          this.userInfo = res.detail.userInfo;
          const _this = this;
          uni.showLoading({
            title: "获取用户信息...",
            mask: true,
          });
          // 获取jsCode
          uni.login({
            provider: "weixin",
            success(resLogin) {
              console.log(resLogin);
              if (resLogin.errMsg === "login:ok") {
                // 获取jsCode成功，通过jsCode调用微信api获取用户openId
                _this.wechatLogin(resLogin.code);
                return;
              }
              uni.hideLoading();
              uni.showToast({
                title: "获取用户信息失败，请重试",
                icon: "none",
                duration: 2000,
              });
            },
            fail() {
              uni.hideLoading();
              uni.showToast({
                title: "获取用户信息失败，请重试",
                icon: "none",
                duration: 2000,
              });
            },
          });
        }
      },
      // 授权电话号回调 (这里千万注意：小程序必须要完成 微信认证才能获取到加密的手机号码)
      getPhone(res) {
        console.log(res);
        if (res.detail.errMsg === "getPhoneNumber:ok") {
          const encryptedData = res.detail.encryptedData;
          console.log(123, sessionKey, encryptedData, iv);
          const pc = new WXBizDataCrypt(this.appId, this.sessionKey);
          const data = pc.decryptData(encryptedData, res.detail.iv); // 这里使用解密手机号的方法
          console.log("解密后 data: ", data.phoneNumber);
          this.phone = data.phoneNumber;
          this.showPhone = false;
          this.loginHandle();
        } else {
          this.showPhone = false;
          uni.showToast({
            title: "获取手机号失败，请重试",
            icon: "none",
            duration: 2000,
          });
        }
      },
      // 用户注册
      loginHandle() {
        const data = {
          account: this.phone,
          icon: this.userInfo.avatarUrl,
          id: this.id,
          nickname: this.userInfo.nickName,
          openId: this.openId,
          phone: this.phone,
          unionid: this.unionid,
        };
        console.log(data);
        uni.showLoading({
          title: "登录中...",
          mask: true,
        });
        this.$post("/login/login", data).then((res) => {
          console.log(res);
          uni.hideLoading();
          if (res.status == 200) {
            uni.showToast({
              title: "登录成功！",
              duration: 1000,
            });
            uni.setStorageSync("token", res.data.token);
            uni.setStorageSync("userInfo", res.data);
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none",
              duration: 2000,
            });
          }
        });
      },
      //-------------------------------------------微信授权登录end---------------------------------------------------------------
      toLogin() {
        this.$toast('请先登录')
        setTimeout(() => {
          // this.$changePage('pages/regist/index')
          this.$changePage('pagesAuth/login/index')
        }, 1500)
      },
      getApprobate() {
        // if (this.getToken) {
        //   getApprobateApi().then(res => {
        //     Object.assign(this.prove, res)
        //   })
        // }
      },
      changeAcceptStatus(acceptStatus) {
        // if (!this.getToken) {
        //   this.toLogin()
        //   return
        // }
        // if (!this.prove.accept_status) {
        //   const params = {
        //     acceptStatus: acceptStatus
        //   }
        //   updateBaseInfoApi(params).then(res => {
        //     this.$toast('投票成功')
        //     this.getApprobate()
        //   })
        // } else {
        //   this.$toast('24小时内不可重复投票')
        // }
      },
      showLoginPop() {
        this.$refs.fun.isShow = true
        // if (!this.getToken) {
        //   this.loginPopup = true
        //   this.minePopup = true
        //   console.log(this.minePopup)
        // } else {
        //   this.minePopup = true
        // }
      },
      assessScore() {
        if (!this.getToken) {
          this.toLogin()
          return
        }
        // 1 党政人才 2企业经管人才 3专业技术人才 4 高技能人才 5农村实用人才 6 社会工作人才 7 在校大学生 8 高层次人才 ,
        console.log(this.identityType)
        if (this.identityType) {
          this.$changePage({
            params: {
              identityType: this.identityType
            },
            url: '/pagesCalibration/chooseIdentity/index'
          })
        } else {
          this.$changePage('pagesCalibration/chooseIdentity/index')
        }
      },
      outLogin() {
        // eslint-disable-next-line no-undef
        uni.showToast({
          title: `退出成功`,
          icon: 'none'
        })
        // eslint-disable-next-line no-undef
        uni.clearStorageSync()
        this.socialScore = ''
        this.createTime = ''
        this.mobile = ''
        this.ralname = ''
        this.level = ''
        this.getToken = ''
      },
      formatName: function (name) {
        let newStr
        if (name.length === 2) {
          newStr = name.substr(0, 1) + '*'
        } else if (name.length > 2) {
          let char = ''
          for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*'
          }
          newStr = name.substr(0, 1) + char + name.substr(-1, 1)
        } else {
          newStr = name
        }
        return newStr
      }
    }
  })
</script>

<style lang="scss">
  @import "./index.scss";
</style>