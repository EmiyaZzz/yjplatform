<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="Ppdftest">
        <!-- <img :src=imgBgTop alt=""> -->
      </view>

      <view class="pdf-email at-row align-center space-between" v-if="buyComplete">
        <u-input v-model="emailS" maxlength="50" placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
          :custom-style="uInputStyle" placeholder="请输入邮箱" />
      </view>
      <view class="btn-line">
        <view class="pdf-btn" @click="toView()">
          预览
        </view>
        <view class="pdf-btn" @click="toSend()" v-if="buyComplete">
          邮件发送
        </view>
        <view class="pdf-btn" @click="toBuy()" v-if="!buyComplete">
          认领
        </view>
        <view class="pdf-btn" @click="toBuy()" v-if="isExpired == '1'">
          认领
        </view>
      </view>
      <view class="pdf-btn" @click="backtoRep()">
        返回
      </view>
      <web-view :src="pdfurl" v-if="pdfshow"></web-view>
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
  reportOrder,
  reportSend,
  userInfo,
  reportDetail,
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
      pdfurl: '',
      pdfshow: false,
      commodityId: '',
      buyComplete: false,
      payStatus: 0,
      isExpired: 0,
      reportType: 0,
      imgBgTop: this.$OSS_IMAGES_URL + '/20220617/bg-top.jpg',
    }
  },
  onLoad: function (options) {
    console.log(options)

    // this.pdfurl = options.data
    this.commodityId = options.commodityId
    // console.log(this.commodityId)
    // this.payStatus = options.payStatus
    this.reportType = options.reportType

    reportDetail({ commodityId: this.commodityId }).then((result) => {
      console.log(result)
      this.payStatus = result.payStatus
      this.isExpired = result.isExpired

      if (this.payStatus == '1') {
        this.buyComplete = true
      } else {
        this.buyComplete = false
      }
    })

    userInfo().then((res) => {
      this.emailS = res.email
    })
    // let that = this
    // that.setData({
    //   project_id: options.id,
    //   project_name: options.name
    // })
  },
  onShow() {
  },
  methods: {
    backtoRep() {
      // this.$pageBack()
      this.$changePage("pages/sjreport/index");
    },
    toView() {
      reportView(
        {
          payType: this.payStatus,
          reportType: this.reportType
        }
      ).then((res) => {
        this.pdfurl = res
        this.$changePage({
          params: {
            data: this.pdfurl,
          },
          url: 'pages/pdfView/index'
        })

      })

    },
    //这里的 url 就是pdf文件的路径，直接调用此方法就可以打开pdf文件
    openReport(url) {
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      wx.downloadFile({
        url: url,
        success: function (res) {
          console.log(res)
          uni.hideLoading()
          var filePath = res.tempFilePath;
          uni.showLoading({
            title: '正在打开',
            mask: true
          })
          wx.openDocument({
            filePath: filePath,
            fileType: 'pdf',
            success: function (res) {
              console.log(res)
              uni.hideLoading()
              console.log('打开文档成功');
            },
            fail: function (err) {
              uni.hideLoading()
              console.log('fail:' + JSON.stringify(err));
            }
          });
        },
        fail: function (err) {
          uni.hideLoading()
          console.log('fail:' + JSON.stringify(err));
        }
      });
    },
    getIdentity(data) {
      this.identity = data.value
    },
    toBuy() {
      let that = this
      uni.showModal({
        title: '支付',
        content: '即将花费10积分',
        success: function (res) {
          if (res.confirm) {
            // console.log(ddId);
            reportOrder(
              {
                commodityId: that.commodityId,
                payWay: "0"
              }
            ).then((res) => {
              // this.$toast(res)
              uni.showToast({
                title: res,
                icon: "none"
              })
              that.buyComplete = true
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },
    setSatus() {
      this.buyComplete = true
      console.log(this.buyComplete);
    },
    toSend() {
      reportSend(
        {
          reportType: this.reportType,
          email: this.emailS
        }
      ).then((res) => {
        this.$toast(res)
      })
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>