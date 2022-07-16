<template>
  <rcyj-page-view>
    <view class="index-wrapper">
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
  reportSend 
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
      pdfshow: true,
      commodityId: '',
      buyComplete: false,
      payStatus: 0,
      reportType:0
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.pdfurl = options.data
     this.openReport(this.pdfurl)
    // let that = this
    // that.setData({
    //   project_id: options.id,
    //   project_name: options.name
    // })
  },
  onShow() {
   
  },
  methods: {
    //这里的 url 就是pdf文件的路径，直接调用此方法就可以打开pdf文件
    openReport(url) {
      console.log('pdf加载')
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
      reportOrder(
        {
          commodityId: this.commodityId,
          payWay: "0"
        }
      ).then((res) => {
        console.log(res);
        this.$toast(res)
        this.buyComplete = true
      }).catch((err) => {
        console.log(err.message);
      })
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