 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb bgw">
                    <view class="title-panel ">
                        <view>
                            评估记录
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="tr">
                            <view class="th">评估时间</view>
                            <view class="th">综合身价</view>
                            <!-- <view class="th">金融身价</view>
                            <view class="th">岗位身价</view>
                            <view class="th">投资身价</view> -->
                        </view>
                        <view class="text-panel">
                            <view class="intro-text" v-for="(item, index) in recordlist" :key="index">
                                <view class="td" style="font-size:20rpx">{{ item.createTime }}</view>
                                <view class="td">{{ item.complexScore }}</view>
                                <!-- <view class="td">{{ item.financeScore }}</view>
                                <view class="td">{{ item.postScore }}</view>
                                <view class="td">{{ item.investScore }}</view> -->
                            </view>
                        </view>
                    </view>
                </view>
                <!-- <view class="box1 shadowb bgw">
                    <view class="title-panel ">
                        <view>
                            图表
                        </view>
                      
                    </view>
                    <view class="content-panel">
                        <view class="dataTable">
                            <u-toast ref="uToast" />
                            <view class="dataTable-canvas">
                                <view class="dataTable-canvas-title">
                                    <text>
                                        近七日学生上报统计
                                    </text>
                                </view>
                                <canvas id="myEcharts"></canvas>
                            </view>
                        </view>

                    </view>
                </view> -->
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { userScoreRecords } from '@/api/common.js'
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
            myChart: null
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
        this.myChart.clear();
        this.myChart.dispose();
    },
    onShow() {
        userScoreRecords().then((res) => {
            console.log(res)
            this.recordlist = res
        })
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value
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