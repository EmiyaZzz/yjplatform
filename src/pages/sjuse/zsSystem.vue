 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb">
                    <view class="title-panel">
                        <view>
                            指数系统
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel-img">
                        <view class="btn" @click="toBuy(0.01)" v-if="payStatus == 0">
                            <view class="text-panel"> 点击认领 </view>
                            <view class="text-panel"> 人才价值指数评估系统 </view>
                        </view>
                        <view class="img-panel" v-if="payStatus == 1">
                            <image :show-menu-by-longpress="true" :src=zsxt @click="previewImage"></image>
                            <view class="text-panel"> 系统累计下载次数:{{ xzcs }} </view>
                        </view>
                  
                        <!-- <view> 点击下载人才价值指数评估系统</view> -->
                    </view>
                </view>
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { zsSystemInfo, zsSystemCode, wechatAppletPay } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
export default Vue.extend({
    components: {
        TopInfo
    },
    data() {
        return {
            identity: '',
            payStatus: '0',
            keyCode: '',
            xzcs: 0,
            more: this.$OSS_IMAGES_URL + '/20220617/morew.png',
            zsxt: this.$OSS_IMAGES_URL + '/20220617/zsxt.jpg',
        }
    },
    onShow() {
        zsSystemInfo().then((data) => {
            console.log(data.isPay)
            console.log(data.xzcs)
            this.payStatus = data.isPay
            this.xzcs = data.xzcs
            if (this.payStatus == '1') {
                zsSystemCode().then((data) => {
                    this.keyCode = data.keyCode
                })
            }
        })
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value
        },
        goBaidu() {
            window.location.href = 'https://pan.baidu.com/s/10ms__-xlNpJfOF4Aq8mAgA';
            // var path = 'pages/netdisk_share/share?surl=1aiuxxxxx';
            // wx.navigateToMiniProgram({
            //     appId: 'wxdcd3d073e47d1742',
            //     path: path,
            //     extraData: {
            //         foo: 'bar'
            //     },
            //     envVersion: 'release',   //默认为正式版，咱们提取网盘资料，这里就正式版，如果是自己开发的两个小程序，可以选择"develop" 开发板    "trial" 体验版 "release" 正式版
            //     success(res) {
            //         // 打开成功
            //     }
            // })
        },
        toBuy(money) {
            const { teamId } = this
            let that = this
            wx.login({
                success(res) {
                    if (res.code) {
                        console.log(res)
                        console.log(res.code)
                        //发起网络请求
                        // wx.request({
                        //   url: 'https://example.com/onLogin',
                        //   data: {
                        //     code: res.code
                        //   }
                        // })
                        let params1 = {
                            code: res.code,
                            orderType: "zs_assess_sys",
                            price: money
                        }
                        wechatAppletPay(params1).then((data) => {
                            let params = JSON.parse(data.results)
                            wx.requestPayment(
                                {
                                    "timeStamp": params.timeStamp,
                                    "nonceStr": params.nonceStr,
                                    "package": params.package,
                                    "signType": "MD5",
                                    "paySign": params.sign,
                                    "success": function (res) {
                                        console.log(res)
                                        uni.showToast({
                                            icon: 'none',
                                            title: `充值成功！`,
                                            duration: 1000
                                        })
                                        zsSystemInfo().then((data) => {
                                            console.log(data)
                                            that.payStatus = data.isPay
                                            that.xzcs = data.xzcs
                                            console.log('payStatus' + that.payStatus)
                                            zsSystemCode().then((data) => {
                                                console.log(data)
                                                that.keyCode = data.keyCode
                                                console.log('keyCode' + that.keyCode)
                                            })
                                        })
                                    },
                                    "fail": function (res) {
                                        console.log(res)
                                        uni.showToast({
                                            icon: 'none',
                                            title: `充值失败！`,
                                            duration: 1000
                                        })
                                    },
                                    "complete": function (res) {
                                        console.log(params1)
                                        console.log('wancheng')
                                        console.log('payStatus-----' + that.payStatus)
                                    }
                                })
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        previewImage(e) {
            uni.previewImage({
                // 需要预览的图片链接列表。若无需预览，可以注释urls
                urls: [e.target.src],
                // 为当前显示图片的链接/索引值
                current: e.target.src,
                // 图片指示器样式	
                indicator: 'default',
                // 是否可循环预览
                loop: false,
                // 长按图片显示操作菜单，如不填默认为保存相册
                // longPressActions:{
                // 	itemList:[this.l('发送给朋友'),this.l]
                // },
                success: res => {
                    console.log('previewImage res', res);
                },
                fail: err => {
                    console.log('previewImage err', err);
                }
            });
        },
    }

})
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>