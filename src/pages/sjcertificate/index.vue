<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo='getIdentity' :key="new Date().getTime()" />
        <view class="img-wrap">
          <img :src=imgUrl alt="">
        </view>

        <view class="fun-bg">
          <!-- <view class="btn1" @click="avatorImgUpload">委托制作</view> -->
          <view class="btn1" @click="openSheet('headImg')">
            <view class="twoLine">
              <view style="text-align:center;">照片上传</view>
              <view style="font-size: 20rpx;text-align:center;">150*150以内正方形图片</view>
            </view>
          </view>
          <view class="btn1" @click="toBuy" v-if="payStatus == '0'">认领</view>
          <view class="btn1" @click="toBuy" v-if="isExpired == '1'">认领</view>
          <view class="btn1" @click="downloadImg" v-if="payStatus == '1'">下载</view>
        </view>

        <!-- <toast ref='toast'></toast>
          <modal :show="authorizationModal" width="621rpx" custom padding="48rpx 0 0">
            <view class="authorization-modal" slot="custom">
              <view class="title">温馨提示</view>
              <view class="content">检测到您未打开微信相册授权，开启后即可保存</view>
              <view class="btn-group">
                <view @click="authorizationModal = false">取消</view>
                <view open-type="openSetting" @opensetting="opensetting">去开启</view>
              </view>
            </view>
          </modal> -->
        <!-- <view class="fun-bg"  v-if="payStatus == '0'">
          <view class="btn1 long" @click="toBuy">购买(1积分)</view>
        </view>
        <view class="fun-bg" v-if="isExpired == '1'">
          <view class="btn1 long" @click="toBuy" >购买(1积分)</view>
        </view>
        <view class="fun-bg" v-if="payStatus == '1'">
          <view class="btn1 long" @click="downloadImg" >下载</view>
        </view> -->
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { certificateInit, certificateQuery, reportOrder, avatorImg, userPicDetail } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
const config = require('@/config/index')
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    TopInfo
  },
  data() {
    return {
      identity: '',
      imgURL: '',
      // imgUrl: 'https://duo-online-resource.oss-cn-beijing.aliyuncs.com/inviteimg/d0ddfa747e1b436baba50bb100749075.png',
      temFilePath: '',
      authorizationModal: false,

      modalType: false, //弹框默认不显示
      imgUrl: '', //模拟图片

      payStatus: 0,
      isExpired: 0,
      commodityId: '',
      action: config.gatewayUrl + '/assess/oss/uploadReturnUrl',
      picId: ''
    }
  },
  onLoad() {
    userPicDetail().then((result) => {
      console.log(result)
      if (result)
        this.picId = result.id
    })
    certificateQuery().then((result) => {
      this.payStatus = result.payStatus
      console.log(result)
      this.isExpired = result.isExpired
      this.commodityId = result.id
      certificateInit({ paystatus: this.payStatus }).then((res) => {
        this.imgUrl = res
      }).catch((err) => {

      });
    })
  },
  onShow() {

  },
  methods: {
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
        this.imgAvatorUp = res[1].tempFilePaths[0]
      }
    },
    async uploadAvatar(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: 'files',
        header: {
          'Authorization': Vue.ls.get('KEY_ACCESS_TOKEN'),
          'site': 'client'
        }
      })
      this.file = JSON.parse(res[1].data).data
      console.log(this.file.key)
      await avatorImg({
        id: this.picId,
        certificatePic: this.file.key
      }).then(res => {
        certificateInit({ paystatus: this.payStatus }).then((res) => {
          uni.showToast({
            icon: 'none',
            title: `上传成功！`,
            duration: 1000
          })
          this.imgUrl = res
          userPicDetail().then((result) => {
            if (result)
              this.picId = result.id
          })
        }).catch((err) => {

        });
      })
      let headPhoto = JSON.parse(res[1].data).data.key
    },
    toBuy() {
      let that = this
      uni.showModal({
        title: '支付',
        content: '即将花费5积分',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            reportOrder(
              {
                commodityId: that.commodityId,
                payWay: "0"
              }
            ).then((res) => {
              console.log(res);
              // this.$toast(res)
              uni.showToast({
                icon: 'none',
                title: `购买成功！`,
                // duration: 2000
              })
              that.payStatus = '1'

              certificateInit({ paystatus: that.payStatus }).then((res) => {
                that.imgUrl = res
              }).catch((err) => {

              });
            }).catch((err) => {
              console.log(err.message);
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },
    getIdentity(data) {
      this.identity = data.value
    },

    opensetting() {
      this.authorizationModal = false;
    },
    downloadFile() {
      if (this.imgUrl) {
        console.log('图片地址存在');
        if (this.temFilePath) {
          console.log('图片已经缓存');
          this.saveImg();
        } else {
          console.log('下载图片');
          uni.downloadFile({
            url: this.imgUrl,
            success: (res) => {
              console.log(res);
              this.temFilePath = res.tempFilePath;
              if (res.statusCode === 200) {
                this.saveImg();
              } else {
                this.$toast({
                  title: '临时地址生成失败'
                })
              }
            },
            fail: (res) => {
              this.$toast({
                title: '临时地址生成失败'
              })
            }
          });
        }
      } else {
        this.$toast({
          title: '图片地址不存在'
        })
      }
    },
    saveImg() {
      console.log('下载图片');
      uni.saveImageToPhotosAlbum({
        filePath: this.temFilePath,
        success: (res) => {
          if (res.errMsg == "saveImageToPhotosAlbum:ok") {
            this.$toast({
              title: '图片保存成功'
            })
          }
        },
        fail: (res) => {
          console.log('去开启权限');
          if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
            this.authorizationModal = true;
          }

        }
      })
    },

    avatorImgUpload() {
      avatorImg().then((result) => {

      })
    },
    // 点击下载图片事件
    downloadImg() {
      wx.showLoading({
        title: '加载中...'
      });
      //wx.downloadFile方法：下载文件资源到本地
      wx.downloadFile({
        url: this.imgUrl, //图片地址
        success: function (res) {
          //wx.saveImageToPhotosAlbum方法：保存图片到系统相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath, //图片文件路径
            success: function (data) {
              wx.hideLoading(); //隐藏 loading 提示框
              wx.showModal({
                title: '提示',
                content: '保存成功',
                modalType: false,
              })
            },
            // 接口调用失败的回调函数
            fail: function (err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  modalType: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        console.log("settingdata", settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            modalType: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            modalType: false,
                          })
                        }
                      },
                      fail(failData) {
                        console.log("failData", failData)
                      },
                      complete(finishData) {
                        console.log("finishData", finishData)
                      }
                    })
                  }
                })
              }
            },
            complete(res) {
              wx.hideLoading(); //隐藏 loading 提示框
            }
          })
        }
      })
    }

  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>