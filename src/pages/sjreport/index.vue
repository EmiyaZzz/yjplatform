<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo='getIdentity' :key="new Date().getTime()" />
        <!-- <view class="top-bg">
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
        <view class="box1 shadowb bgw" style="margin-top:16rpx" @click="toUseIntro">
          <view class="title-panel">
            <view>
              身价报告
            </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="line"></view>
          <view class="line shen"></view>
          <view class="content-panel">
            <view class="box-wrap">
              <!-- :style="{ 'background-image': 'url(' + box1Bg + ')' }" -->
              <view class="box box1" @click="sendReport1(item)" v-for="(item, index) in repList" :key="index">
                <view class="text-wrap">
                  <view class="item-up">
                    <view class="img-l">
                      <img :src=imgbg alt="" />
                    </view>
                    <view class="t1">{{ item.name }}</view>
                  </view>
                  <!-- <view class="t2">点击预览</view> -->
                  <!-- <view class="t2">有效期至2022年6月1日</view> -->
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb bgw" style="margin-top:16rpx" @click="toUseIntro">
          <view class="title-panel">
            <view>
              报告用途
            </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="line"></view>
          <view class="line shen"></view>
          <view class="content-panel">
            <view class="box1">
              <view class="team-text-panel">
                <view class="team-text">
                  <p>综合身价报告：</p>
                  <p>用于求职招聘、定岗定薪、晋级晋升、评优评级、资格认定、职称评审、信用评级、投资融资、股权激励、企业设立、创新创业、双招双引等，向相应机构提供。 </p>
                  <p>金融价值报告：
                  </p>
                  <p> 用于身价授信，向金融机构提供。</p>
                  <p>岗位价值报告：</p>
                  <p> 用于求职招聘、定岗定薪等，向用人单位提供。</p>
                  <p>投资价值报告：</p>
                  <p> 用于身价融资，向投资机构提供。</p>
                  <p>身价出资报告：</p>
                  <p> 用于企业注册，向注册机构提供。</p>
                  <p>人才认定报告：</p>
                  <p> 用于人才认定，向人才认定机构提供。</p>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="bg-title">
          身价报告
        </view>
        <view class="line">
        </view>
        <view class="line shen"></view>
        <view class="box-wrap">
          <view class="box box1" @click="sendReport1(item)" 
            v-for="(item, index) in repList" :key="index">
            <view class="text-wrap">
              <view class="t1">{{ item.name }}</view>
              <view class="t2">点击预览</view>
            </view>
          </view>
        </view> -->
        <!-- <view class="bg-title">
          报告用途
        </view>
        <view class="line">
        </view>
        <view class="line shen"></view>
        <view class="box1">
          <view class="team-text-panel">
            <view class="team-text">
              <p>综合身价报告：</p>
              <p>用于求职招聘、定岗定薪、晋级晋升、评优评级、资格认定、职称评审、信用评级、投资融资、股权激励、企业设立、创新创业、双招双引等，向相应机构提供。 </p>
              <p>金融价值报告：
              </p>
              <p> 用于身价授信，向金融机构提供。</p>
              <p>岗位价值报告：</p>
              <p> 用于求职招聘、定岗定薪等，向用人单位提供。</p>
              <p>投资价值报告：</p>
              <p> 用于身价融资，向投资机构提供。</p>
              <p>身价出资报告：</p>
              <p> 用于企业注册，向注册机构提供。</p>
              <p>人才认定报告：</p>
              <p> 用于人才认定，向人才认定机构提供。</p>
            </view>
          </view>
        </view> -->
        <!-- <view class="box-wrap bottom">
          <view class="box box1" @click="sendReport1(item)" :style="{ 'background-image': 'url(' + box2Bg + ')' }"
            v-for="(item, index) in repList" :key="index">
            <view class="text-wrap">
              <view class="t1">{{ item.name }}</view>
              <view class="t2">即将推出</view>
            </view>
          </view>
        </view> -->
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  zhTalentReportSend,
  financeReportSend,
  investReportSend,
  postReportSend,
  reportList,
  reportView
} from '@/api/common.js'
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
      uInputStyle: {
        color: '#black',
        fontSize: '30rpx',
        textAlign: 'right',
        width: '500rpx'
      },
      emailS: '',
      identity: '',
      box1Bg: this.$OSS_IMAGES_URL + '/20220617/bgbg3.png',
      box2Bg: this.$OSS_IMAGES_URL + '/20220617/tdbg.png',
      box3Bg: this.$OSS_IMAGES_URL + '/20220617/redbg.png',
      imgbg: this.$OSS_IMAGES_URL + '/20220617/%E8%BA%AB%E4%BB%B7%E6%8A%A5%E5%91%8A.png',
      repList: []
    }
  },
  onLoad() {

  },
  onShow() {
    reportList().then((data) => {
      this.repList = data
    })
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value
    },
    sendReport1(item) {

      reportView(
        {
          payType: item.payStatus,
          reportType: item.commodityNum
        }
      ).then((res) => {
        // wx.navigateTo({
        //   url: `pages/sjpdf/index`
        // });
        this.$changePage({
          params: {
            reportType: item.commodityNum,
            payStatus: item.payStatus,
            commodityId: item.id,
            data: res,
          },
          url: 'pages/sjpdf/index'
        })
      })
    },
    sendReport2(res) {
      if (this.emailS) {
        const params = {
          email: this.emailS
        }
        financeReportSend(params).then((result) => {
          uni.showToast({
            title: result,
            icon: "none",
            duration: 2000,
          });
        }).catch((err) => {

        });
      } else {
        uni.showToast({
          title: "请输入邮箱",
          icon: "none",
          duration: 2000,
        });
      }

    },
    sendReport3(res) {
      if (this.emailS) {
        const params = {
          email: this.emailS
        }
        investReportSend(params).then((result) => {
          uni.showToast({
            title: result,
            icon: "none",
            duration: 2000,
          });
        }).catch((err) => {

        });
      } else {
        uni.showToast({
          title: "请输入邮箱",
          icon: "none",
          duration: 2000,
        });
      }

    },
    sendReport4(res) {
      if (this.emailS) {
        const params = {
          email: this.emailS
        }
        postReportSend(params).then((result) => {
          uni.showToast({
            title: result,
            icon: "none",
            duration: 2000,
          });
        }).catch((err) => {

        });
      } else {
        uni.showToast({
          title: "请输入邮箱",
          icon: "none",
          duration: 2000,
        });
      }

    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>