 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb bgw">
                    <view class="title-panel ">
                        <view>
                            当前积分：
                        </view>
                        <view>{{ surplusPoints }}</view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="item" @click="buyScore(0.01)">
                            <view class="t t1">10积分</view>
                            <view class="t t2">￥1</view>
                        </view>
                        <view class="item" @click="buyScore(0.1)">
                            <view class="t t1">50积分</view>
                            <view class="t t2">￥5</view>
                        </view>
                        <view class="item" @click="buyScore(0.01)">
                            <view class="t t1">100积分</view>
                            <view class="t t2">￥10</view>
                        </view>
                        <view class="item" @click="buyScore(0.01)">
                            <view class="t t1">500积分</view>
                            <view class="t t2">￥50</view>
                        </view>
                    </view>

                </view>
                <!-- <view class="btn1 firstbtn whitebg" @click="toRecharge()">
                    <view class="img-l">
                        <img :src=imgcz alt="" />
                    </view>
                    <p class="p1">积分充值</p>
                </view> -->
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { pointDetail,wechatAppletPay } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'

// import * as echarts from 'echarts';
export default Vue.extend({
    components: {
        TopInfo
    },
    data() {
        return {
            identity: '',
            more: this.$OSS_IMAGES_URL + '/20220617/morew.png',
            recordlist: [],
            myChart: null,
            imgcz: this.$OSS_IMAGES_URL + '/20220617/chongzhi2.png',
            surplusPoints: ''
        }
    },
    onLoad() {
        // this.echartsInit()

        // let that = this;
        // // 通过nextTick异步画图
        // this.$nextTick(() => {
        //     that.drawLines();
        // });
    },
    beforeDestroy() {
        // 页面关闭时销毁echarts实例
        // this.myChart.clear();
        // this.myChart.dispose();
    },
    onShow() {

        pointDetail().then((result) => {

            this.surplusPoints = result.surplusPoints
        })
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value
        },
        buyScore(money) {
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
                            orderType: "recharge",
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
                                        pointDetail().then((result) => {
                                            that.surplusPoints = result.surplusPoints
                                              console.log(that.surplusPoints)
                                        })
                                    }
                                })
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },

        async drawLines() {
            // 这里是初始化的方式，通过id查询找到你的canvas标签
            this.myChart = echarts.init(document.getElementById('myEcharts'));
            // 这里我初始化了4个数组用来存放 后端接口给我的数据
            let data = [];
            let tian = [];
            let reportLine = [];
            let notReportLine = [];
            try {
                // let res = await userScoreRecords();
                // console.log(res);
                // if (res.code != 0) {
                //     this.$refs.uToast.show({
                //         title: res.message,
                //         type: 'error',
                //         duration: 3000,
                //     });
                // } else {
                //     data = res.result;
                //     data.forEach((item) => {
                //         // 从接口中提取自己想要的数据
                //         tian.push(item.type);
                //         reportLine.push(item.sbNum);
                //         notReportLine.push(item.notSbNum);
                //     })
                // }
                tian = this.recordlist;
                data.forEach((item) => {
                    // 从接口中提取自己想要的数据
                    tian.push(item.type);
                    reportLine.push(item.sbNum);
                    notReportLine.push(item.notSbNum);
                })
            } catch (e) {
                console.log(e);
            }

            // 这里开始就是echarts的配置项了
            let option = {
                // x轴数据
                xAxis: {
                    type: 'category',
                    data: tian,
                },
                // y轴数据
                yAxis: {
                    type: 'value',
                },
                // 这里写2个对象是2条线条，3个则是3条
                series: [
                    {
                        // data使用刚才定义的数组，数据从后端接口中取得
                        data: reportLine,
                        type: 'line',
                        smooth: true,
                    },
                    {
                        data: notReportLine,
                        type: 'line',
                        smooth: true,
                    },
                ],
                grid: {
                    // 这里可以防止Y轴显示不全
                    containLabel: true
                }
            }

            // 这里不要忘记把option设置给echarts实例
            this.myChart.setOption(option);

            // 这里是用于窗口变化时的自适应，利用的是echarts自带的resize方法
            // 如果你打印出来这个echarts实例，可以在函数里面找到这个方法
            window.addEventListener('resize', () => {
                this.myChart.resize()
            });
        },
    }
})
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>