<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo='getIdentity' :key="new Date().getTime()" />

        <view class="tips">
          <view class="tips-content">
            <view class="laba">
              <img :src=laba alt="" />
            </view>

            <view>
              <view class="scroll_box">
                <swiper class="swiper" circular="true" display-multiple-items="1" :autoplay="autoplay"
                  :interval="interval" :duration="duration">
                  <swiper-item v-for="(item, index) in list" :key="index">
                    <view class="swiper-item uni-bg-green">{{ item }}</view>
                  </swiper-item>
                </swiper>
              </view>
            </view>

          </view>
        </view>

        <view class="box1 shadowb bgw" style="margin-top:16rpx;padding-bottom: 10rpx;">
          <view class="fun-content">
            <view class="fun-btn" @click="toEva">
              <view class="circle">
                <img class="icon" :src=icon1 alt="" />
              </view>
              <view class="fun-text">
                身价评估
              </view>
            </view>
            <view class="fun-btn" @click="toReport">
              <view class="circle">
                <img class="icon" :src=icon2 alt="" />
              </view>
              <view class="fun-text">
                身价报告
              </view>
            </view>
            <view class="fun-btn" @click="toCertificate">
              <view class="circle">
                <img class="icon" :src=icon3 alt="" />
              </view>
              <view class="fun-text">
                身价证书
              </view>
            </view>
            <view class="fun-btn" @click="toUseIntro">
              <view class="circle">
                <img class="icon" :src=icon4 alt="" />
              </view>
              <view class="fun-text">
                身价常识
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb bgw" style="margin-top:16rpx">
          <!-- <view class="title-panel">
            <view>
              身价快讯
            </view>
            <img :src=more alt="">
          </view> -->
          <view class="content-panel">
            <!-- <img :src=showImg alt=""> -->
            <view class="home">
              <!--circular用来设置循环轮播   indicator-dots设置下面小圆点用来点击 -->
              <swiper circular indicator-dots>
                <!-- v-for循环遍历数组 -->
                <swiper-item v-for="item in swipers" :key="item">
                  <image :src="item"></image>
                </swiper-item>
              </swiper>
            </view>
          </view>
        </view>
        <view class="box1 shadowb bgw" style="margin-top:16rpx" @click="toUseIntro">
          <view class="title-panel">
            <view>
              关于身价
            </view>
            <img :src=more alt="">
          </view>
          <view class="line"></view>
          <view class="line shen"></view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                身价是基于人的过去、现在和将来创造力、影响力和信用度的价值体现。在人力资本产业生态中，身价可用于企业注册、增资、垫资，并参与分配，在职称评审、人才认定、资格认定、求职招聘、定岗定薪、流动补偿等方面具有广泛的应用，是供给侧改革、新旧动能转换、高质量发展和双招双引、转型升级、创新创业的新动能。
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb bgw" style="margin-top:16rpx;">
          <view class="title-panel ">
            <view>
              评估动态
            </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="line"></view>
          <view class="line shen"></view>
          <view class="rank-panel">
            <view class="rank-list-title">
              <view class="">
                评估时间
              </view>
              <view class="">
                评估人员
              </view>
              <view class="">
                综合身价
              </view>
            </view>
            <view>
              <view class="scroll_box">
                <swiper class="swiper" circular="true" vertical="true" :display-multiple-items=itemlength
                  :autoplay="autoplay" :interval="intervalRank" :duration="durationRank">
                  <swiper-item v-for="(item, index) in rankList" :key="index" class="swiper-l">
                    <!-- <view class="swiper-item uni-bg-green" style="font-size:14rpx; width:200rpx">{{ item.create_time }}</view> -->
                    <view class="swiper-item uni-bg-green" style="font-size: 24rpx;margin-right:50rpx">{{
                        item.create_time
                    }}</view>
                    <view v-if="item.real_name" class="swiper-item uni-bg-green">{{ item.real_name.substring(0, 1) }}**
                    </view>
                    <view v-else class="swiper-item uni-bg-green">{{ item.real_name }}**
                    </view>
                    <!-- <view class="swiper-item uni-bg-green">{{ item.real_name }}**</view> -->
                    <view class="swiper-item uni-bg-green" style="text-align: right;padding-right:40rpx">{{
                        item.complex_score
                    }}</view>
                  </swiper-item>
                </swiper>
              </view>
            </view>
          </view>
        </view>
      </view>
      <rcyj-picker-single ref="citySelect" :list="cityList" @confirm="cityConfirm" />
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { certificateInit, scoreRecords, userInfo, argScore } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    TopInfo
  },
  data() {
    return {
      identity: '',
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      city: {
        value: 1,
        label: '济南'
      },
      itemlength: 1,
      laba: this.$OSS_IMAGES_URL + '/20220617/laba.png',
      icon1: this.$OSS_IMAGES_URL + '/20220617/pgb.png',
      icon2: this.$OSS_IMAGES_URL + '/20220617/%E8%BA%AB%E4%BB%B7%E6%8A%A5%E5%91%8A.png',
      icon3: this.$OSS_IMAGES_URL + '/20220617/%E8%BA%AB%E4%BB%B7%E8%AF%81%E4%B9%A6.png',
      icon4: this.$OSS_IMAGES_URL + '/20220617/%E8%BA%AB%E4%BB%B7%E6%9F%A5%E8%AF%A2.png',
      imgTips: this.$OSS_IMAGES_URL + '/20220617/tips.png',
      imgURL: '',
      arrowd: this.$OSS_IMAGES_URL + '/20220617/angle%20down.png',
      Volume: this.$OSS_IMAGES_URL + '/20220617/Medium%20Volume.png',
      more: this.$OSS_IMAGES_URL + '/20220617/more.png',
      showImg: this.$OSS_IMAGES_URL + '/20220617/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220625101216.jpg',
      swipers: [
        this.$OSS_IMAGES_URL + '/20220617/lunbo.png',
        this.$OSS_IMAGES_URL + '/20220617/lunbo2.jpg',
      ],
      cityList: [
        {
          value: '1',
          label: '济南'
        },
        {
          value: '2',
          label: '青岛'
        },
        {
          value: '3',
          label: '威海'
        },
        {
          value: '4',
          label: '烟台'
        },
      ],
      autoplay: true,
      interval: 6000,
      duration: 6000,

      intervalRank: 2000,
      durationRank: 2000,
      argExp:0,
      list: [
        ' 有价是一种创业方式',
        ' 人才有价 人人有价',
      ],
      rankList: [],
      scoreStatus: '0'  //0为查询 1快评完成 2评估完成
    }
  },
  filters: {
    nameCover: function (name) {
      return name.substring(0, 1)
    }
  },
  onLoad() {

  },
  onShow() {
    scoreRecords().then((data) => {
      this.rankList = data
      if (data.length < 4) {
        this.itemlength = data.length
      } else {
        this.itemlength = 4
      }
    })
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (!this.getToken) {
      //  this.$toast('未登录，请点击“我的”进行登录')
      return
    }
    userInfo().then((data) => {
      this.scoreStatus = data.scoreStatus
      console.log('阶段' + this.scoreStatus)
    })
    argScore().then((data) => {
      console.log(data)
      this.argExp = data.score
      this.list.push('身价指数:'+this.argExp)
    })
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value
    },
    toEva() {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 500
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 500);
        return
      }
      wx.switchTab({
        url: '../index/index'
      })
    },
    toUseIntro() {
      // if (!this.getToken) {
      //   this.$toast('未登录，请点击“我的”进行登录')
      //   return
      // }
      this.$changePage("pages/sjuse/index");
    },
    toReport() {
      this.checkStatus("pages/sjreport/index")
      // if (!this.getToken) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: `未登录，即将前往登录页`,
      //     duration: 500
      //   })
      //   setTimeout(() => {
      //     this.$changePage("pagesAuth/login/index");
      //   }, 500);
      //   return
      // }
      // if (this.scoreStatus == '2') {
      //   this.$changePage("pages/sjreport/index");
      // } else {
      //   if (this.scoreStatus == '0') {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未进行快速评估，即将前往快速评估`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage('pages/sjsearch/index')
      //     }, 2000);
      //   }
      //   if (this.scoreStatus == '1') {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未进行身价评估，即将前往身价评估`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage("pages/evaIdentityTypeSelect/index");
      //     }, 2000);
      //   }
      // }
    },
    toCertificate() {
      this.checkStatus("pages/sjcertificate/index")
      // if (!this.getToken) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: `未登录，即将前往登录页`,
      //     duration: 500
      //   })
      //   setTimeout(() => {
      //     this.$changePage("pagesAuth/login/index");
      //   }, 500);
      //   return
      // }
      // if (this.scoreStatus == '2') {
      //   this.$changePage("pages/sjcertificate/index");
      // } else {

      //   if (this.scoreStatus == '0') {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未进行快速评估，即将前往快速评估`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage('pages/sjsearch/index')
      //     }, 2000);
      //   }
      //   if (this.scoreStatus == '1') {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未进行身价评估，即将前往身价评估`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage("pages/evaIdentityTypeSelect/index");
      //     }, 2000);
      //   }
      // }
    },
    cityConfirm(res) {
      this.city = res[0]
    },
    checkStatus(url) {

      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 500
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 500);
        return
      }
      if (this.scoreStatus == '2') {
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
    },

    // computed: {
    //   today: function () {
    //     return 
    //   }
    // },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>