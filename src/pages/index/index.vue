<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo='getIdentity' :key="new Date().getTime()" />
        <!-- <view class="top-bg" @click="outLogin()">
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
        </view> -->
        <view class="panel-bg">
          <view class="bgw">
            <view class="empty" v-if="scoreStatus == '0'"></view>
            <view class="center-btn" :style="{ 'background-image': 'url(' + imgCenterBtn + ')' }">
              <view class="box1"></view>
              <view class="ring" @click="assessScore">
                <view class="cbtn">
                  <!-- <view class="p1">{{ctitle}}</view> -->
                  <view class="p2" v-if="complexScore == -1"> {{ !getToken ? '登录评估' : '快速评估' }}</view>
                  <view class="p2" v-else> {{ complexScore }}万</view>
                </view>
              </view>
              <view class="chao">您的身价已经超过{{rankPercent}}的用户</view>
            </view>
            <!-- <view class="empty2" v-if="scoreStatus == '0'">
              快速评估是体验身价评估的快捷方式，请填写真实信息，以免影响评估结果和信用。您提供的信息仅用作您本人的身价评估，我们将按照国家有关法律法规的规定严格保密。
            </view> -->
            <view class="intro-box" v-if="scoreStatus == '0'">
              <view class="intro-text">
                <view style="text-align:center">
                  温馨提示
                </view>
                <view class="text">
                  快速评估是体验身价评估的快捷方式，请填写真实信息，以免影响评估结果和信用。您提供的信息仅用作您本人的身价评估，我们将按照国家有关法律法规的规定严格保密。
                </view>
              </view>
            </view>
            <!-- <view class="per">高于90%人群</view> -->
            <view class="btn-box1" v-if="scoreStatus != '0'">
              <view class="box1" @click="toDoc">
                <view class="img-panel">
                  <img :src=imgCurrentSj alt="" />
                </view>
                <p>身价档案</p>
              </view>
              <view class="box1" @click="toAssessment">
                <view class="img-panel">
                  <img :src=imgUpSj alt="">
                </view>
                <p>身价提升</p>
              </view>
            </view>
            <view class="search-box" v-if="scoreStatus == 3">
              <view class="cbtn">信息修改</view>
              <view class="cbtn">身价提升</view>
            </view>
            <view class="intro-box" v-if="scoreStatus == '1'">
              <view class="intro-text">
                <view style="text-align:center;margin-top: 50rpx;">
                  温馨提示
                </view>
                <view class="text">
                  恭喜您成为有价人才，您当前身价为{{ complexScore
                  }}万元，已获赠100积分，可用于身价报告、身价证书下载，您可以点击“身价提升”按钮填写信息以获得金融价值、岗位价值、投资价值以及身价报告、身价证书。
                </view>
              </view>
            </view>
            <view class="btn-box2">
              <view class="box" v-if="financeValue">
                <img :src=imgJr alt="">
                <p>金融价值</p>
                <p style="color: #77797b;margin-left:280rpx">{{ financeValue }}万</p>
              </view>
              <view class="box" v-if="postValue">
                <img :src=imgGw alt="">
                <p>岗位价值</p>
                <p style="color: #77797b;margin-left:280rpx">{{ postValue }}万</p>
              </view>
              <view class="box" v-if="investmentValue">
                <img :src=imgTz alt="">
                <p>投资价值</p>
                <p style="color: #77797b;margin-left:280rpx">{{ investmentValue }}万</p>
              </view>
            </view>
          </view>
          <view class="slide-panel" @click="openPopuos" :style="{ 'background-image': 'url(' + imgSlidePanel + ')' }"
            v-if="scoreStatus == '2'">

            <view class="img-slider">
              <img :src=imgSh alt="" />
              <view>
                点击了解更多
              </view>
            </view>
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
    </view>
    <!-- <mine-pop ref="mine" :headPhoto="headPhoto" :ralname="ralname" :mobile="mobile"></mine-pop> -->
    <fun-pop ref="fun"></fun-pop>

  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  getUserInfoApi,
  userScore,
  userInfo,
  getRankApi,
  getApprobateApi,
  updateBaseInfoApi,
  queryRankPercent
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
// import uniPopup from '../components/uni-popup/uni-popup.vue'
export default Vue.extend({
  components: {
    TopInfo,
    MinePop,
    FunPop
  },
  data() {
    return {
      scoreTitle: '',
      complexScore: -1,
      // status: 0, //状态 未登录0 登陆未身价查询1 登陆初次身价查询2 身价查询未评估3 身份查询已部分评估4 身份查询已完全评估5
      financeValue: '',
      postValue: '',
      investmentValue: '',
      scoreStatus: 0,
      rankPercent: '',
      firstSearch: false,

      imgCurrentSj: this.$OSS_IMAGES_URL + '/20220617/indexmp1.png',//this.$OSS_IMAGES_URL + '/20220617/%E5%BD%93%E5%89%8D%E8%BA%AB%E4%BB%B7logo%402x.png',
      imgUpSj: this.$OSS_IMAGES_URL + '/20220617/indexts1.png',//this.$OSS_IMAGES_URL + '/20220617/%E6%BD%9C%E5%9C%A8%E8%BA%AB%E4%BB%B7%402x.png',
      imgJr: this.$OSS_IMAGES_URL + '/20220617/%E9%93%B6%E8%A1%8C%402x.png',
      imgGw: this.$OSS_IMAGES_URL + '/20220617/%E6%96%87%E4%BB%B6%402x.png',
      imgTz: this.$OSS_IMAGES_URL + '/20220617/%E6%8A%95%E8%B5%84%E8%AE%A1%E5%88%92%402x.png',
      imgSh: this.$OSS_IMAGES_URL + '/20220617/arrowUp2.png',
      // imgCenterBtn: this.$OSS_IMAGES_URL + '/20220617/3.0%E5%9C%86%E8%BA%AB%E4%BB%B7%E8%AF%84%E4%BC%B0%402x.png',
      imgCenterBtn: this.$OSS_IMAGES_URL + '/20220617/ringbg2.png',
      imgSlidePanel: this.$OSS_IMAGES_URL + '/20220617/indexslider2.png',
      imgRing: this.$OSS_IMAGES_URL + '20220617/ring.png',

      // defaultAvatar: this.$IMAGES_URL + '/pic/default-head.png',
      // personalEnter: this.$IMAGES_URL + '/pic/personal-enter-img.png',
      // V: this.$IMAGES_URL + '/pic/V.png',
      // indexTopBg: this.$IMAGES_URL + '/pic/index-top-bg.png',
      // rankIcon: this.$IMAGES_URL + '/pic/rank-icon.png',
      // timeIcon: this.$IMAGES_URL + '/pic/time-icon.png',
      // rankTenTit: this.$IMAGES_URL + '/pic/rank-ten-tit.png',
      // rankOne: this.$IMAGES_URL + '/pic/rank-one.png',
      // rankTwo: this.$IMAGES_URL + '/pic/rank-two.png',
      // rank3: this.$IMAGES_URL + '/pic/rank-3.png',
      // loginPopImg: this.$IMAGES_URL + '/pic/login-pop-img.png',
      // mobileIcon: this.$IMAGES_URL + '/pic/mobile-icon.png',
      // editIcon: this.$IMAGES_URL + '/pic/edit-icon.png',
      rankOutTop: this.$IMAGES_URL + '/pic/rank-out-top.png',
      // rankOutBottom: this.$IMAGES_URL + '/pic/rank-out-bottom.png',
      // upload: this.$IMAGES_URL + '/pic/upload.png',
      // lump1: this.$OSS_IMAGES_URL + '/20201208/a99daae94306471d8a930609ef1ac7d7.png',
      // lump2: this.$OSS_IMAGES_URL + '/20201208/9a48de9081ad4609bb2d1395fb898af3.png',
      // indexTitleIcon1: this.$OSS_IMAGES_URL + '/20201208/095da1ecf8b84b478cbb147c5380c86b.png',
      // indexTitleIcon2: this.$OSS_IMAGES_URL + '/20201208/a1c20179bcf743eda3e445a522715d4d.png',
      // indexTitleIcon3: this.$OSS_IMAGES_URL + '/20201208/864235ee49ff41f785f7c1f9f388cdcd.png',
      // indexTitleIcon4: this.$OSS_IMAGES_URL + '/20201208/9c0545cb57704746b37c712000b45fdf.png',
      // denyBg: this.$OSS_IMAGES_URL + '/20201208/285abe5bf35e4c9baa3fd42eb3f9e1fd.png',
      // approveBg: this.$OSS_IMAGES_URL + '/20201208/b46fa13b6f65484b9a4e6407c292f96b.png',
      // huo: this.$OSS_IMAGES_URL + '/20201209/644bd9aa32f843ceb1e27363ae48c993.png',
      // vs: this.$OSS_IMAGES_URL + '/20201209/952dc56a39484abca9b61db6c8232968.png',
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
  computed: {
    // 计算属性的 getter
    ctitle: function () {
      // `this` 指向 vm 实例
      let res = ''
      if (this.scoreStatus == '2') {
        res = '身价'
      } else {
        res = ''
      }
      return res
    }
  },
  onLoad() {
    // this.getApprobate()
  },
  onShow() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (this.getToken) {
      userInfo().then((data) => {
        this.scoreStatus = data.scoreStatus
      })
      queryRankPercent().then((data) => {
        console.log(data)
        this.rankPercent = data.level
      })
      getUserInfoApi().then((data) => {
        // if (data.assessResult) this.socialScore = data.assessResult.socialScore ? data.assessResult
        //   .socialScore : '0'
        // if (data.assessResult) this.createTime = data.assessResult.createTime ? data.assessResult.createTime :
        //   ''
        // this.mobile = data.user.mobile.replace(data.user.mobile.substring(3, 7), '****')
        // this.ralname = this.formatName(data.user.username)
        // this.headPhoto = data.user.pic ? 'data:image/jpg;base64,' + data.user.pic : ''
        // this.identityType = data.user.identityType
      })
      userScore().then((data => {
        if (!data)
          return
        console.log(data)
        this.complexScore = data.complexScore
        this.financeValue = data.financeScore
        this.postValue = data.postScore
        this.investmentValue = data.investScore
      }))

      // getRankApi().then(data => {
      //   this.level = data.level
      // })
    }
  },
  methods: {
    getIdentity(data) {
      this.identityType = data.value
    },
    toAssessment() {
      this.isShow = false
      this.$changePage("pages/evaIdentityTypeSelect/index");
    },
    toPersonal() {
      // this.$changePage("pages/wode/index");
      // wx.switchTab({
      //   url:'../wode/index'
      // })
    },
    openPopuos() {
      this.showLoginPop()
    },
    //-------------------------------------------微信授权登录---------------------------------------------------------------
    // 授权获取微信用户信息
    appLoginWx(res) {
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
      uni.showLoading({
        title: "登录中...",
        mask: true,
      });
      this.$post("/login/login", data).then((res) => {
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
      console.log(this.scoreStatus)
      if (this.scoreStatus == 0) {
        this.$changePage("pages/sjsearch/index");
      }
      // 1 党政人才 2企业经管人才 3专业技术人才 4 高技能人才 5农村实用人才 6 社会工作人才 7 在校大学生 8 高层次人才 ,
      // console.log(this.identityType)
      // if (this.identityType) {
      //   this.$changePage({
      //     params: {
      //       identityType: this.identityType
      //     },
      //     url: '/pagesCalibration/chooseIdentity/index'
      //   })
      // } else {
      //   this.$changePage('pagesCalibration/chooseIdentity/index')
      // }
    },
    toDoc() {
      this.checkStatus("pages/sjDoc/index")
    },
    checkStatus(url) {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      }
      else {
        this.isShow = false
        if (this.scoreStatus == '2') {
          // this.$changePage("pages/sjcertificate/index");
          this.$changePage(url);
        } else {
          if (this.scoreStatus == '0') {
            uni.showToast({
              icon: 'none',
              title: `未进行快速评估，即将前往快速评估`,
              duration: 2000
            })
            setTimeout(() => {
              this.$changePage('pages/sjsearch/index')
            }, 2000);
          }
          if (this.scoreStatus == '1') {
            uni.showToast({
              icon: 'none',
              title: `未进行身价评估，即将前往身价评估`,
              duration: 2000
            })
            setTimeout(() => {
              this.$changePage("pages/evaIdentityTypeSelect/index");
            }, 2000);
          }
        }
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