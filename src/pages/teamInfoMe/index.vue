 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <!-- <top-info @getIdentityInfo="getIdentity" /> -->
        <!-- <view class="top-title">我的团队</view> -->
        <view class="box1 shadowb colorbg">
          <view class="title-panel">
            <view v-if="teamInfo.mobile"> {{ teamInfo.teamName }}
              ({{ teamInfo.mobile.substr(teamInfo.mobile.length - 4, teamInfo.mobile.length) }})</view>
            <view class="vipLogo" style="color:red" v-if="payInfo.payStatus == '1'"><img :src=imgvip alt=""> </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="img-panel">
                <img :src=imgAvator alt="">
              </view>
              <view class="info-text">
                <p>团队身价：{{ teamInfo.teamScore }}万</p>
                <p v-if="teamInfo.enterpriseName">所属企业：{{ teamInfo.enterpriseName }}</p>
                <p>团队创建者：{{ teamInfo.userName }}</p>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb">
          <view class="title-panel" @click="toMemberManage">
            <view> 团队成员 </view>
            <img :src=more alt="">
          </view>
          <view class="content-panel">
            <view class="rank-panel">
              <!-- <view class="points-title">
                <view class="content">
                  <view class="points-img">
                    <img :src=icon1 alt="">
                  </view>
                  总积分:{{ allPoints }}
                </view>
                <view class="content">
                  <view class="points-img">
                    <img :src=icon2 alt="">
                  </view>
                  已使用:{{ consumePoints }}
                </view>
                <view class="content">
                  <view class="points-img">
                    <img :src=icon3 alt="">
                  </view>
                  剩余积分:{{ surplusPoints }}
                </view>
              </view> -->

              <view class="rank-list-title">
                <view class="">
                  成员姓名
                </view>
                <view class="">
                  手机号码
                </view>
                <view class="">
                  综合身价
                </view>
              </view>
              <view>
                <view class="scroll_box">
                  <view class="swiper" circular="true" vertical="true" :autoplay="autoplay" :interval="interval"
                    :duration="duration">
                    <view v-for="(item, index) in memberList" :key="index" class="swiper-l">
                      <!-- <view class="swiper-item uni-bg-green" style="font-size:14rpx; width:200rpx">{{ item.create_time }}</view> -->
                      <view class="swiper-item uni-bg-green" style="font-size: 24rpx;margin-right:50rpx">{{
                          item.userName
                      }}</view>
                      <view class="swiper-item uni-bg-green">{{ item.mobile }}
                      </view>
                      <!-- <view class="swiper-item uni-bg-green">{{ item.real_name }}**</view> -->
                      <view class="swiper-item uni-bg-green" style="text-align: right;padding-right:20rpx">{{
                          item.userScore
                      }}万</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>

          </view>
        </view>
        <view class="btn" @click="toBuy" v-if="payInfo.payStatus == '0' || payInfo.isExpired == '1'">
          <view>
            <view class="line1">
              <view class="icon">
                <img :src=imgjf alt="">
              </view>
              <p>团队VIP购买</p>
            </view>
            <view class="line2">(购买后可获得团队身价报告与身价证书)</view>
          </view>
        </view>
        <view class="btn" @click="toBg" v-if="payInfo.payStatus == '1' && payInfo.isExpired == '0'">
          <view class="icon">
            <img :src=imgbg alt="">
          </view>
          <p> 团队身价报告</p>
        </view>
        <view class="btn" @click="toZs" v-if="payInfo.payStatus == '1' && payInfo.isExpired == '0'">
          <view class="icon">
            <img :src=imgzs alt="">
          </view>
          <p> 团队身价证书</p>
        </view>
        <view class="btn" @click="toMemberManage">
          <view class="icon">
            <img :src=imgxg alt="">
          </view>
          <p> 团队成员管理</p>
        </view>
        <view class="btn" @click="teamBreak">
          <view class="icon">
            <img :src=imgzs alt="">
          </view>
          <p> 团队解散</p>
        </view>
        <!-- <view class="btn" @click="backList">
          <view class="icon">
            <img :src=icon2 alt="">
          </view>
          <p> 返回团队列表</p>
        </view> -->
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { teamDetail, teamPayInfo, teamMember, wechatAppletPay, teamBatchBreak } from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
export default Vue.extend({
  components: {
    TopInfo,
  },
  data() {
    return {
      identity: "",
      more: this.$OSS_IMAGES_URL + '/20220617/more.png',
      interval: 2000,
      duration: 2000,
      autoplay: true,
      recodeList: '',
      allPoints: '',
      consumePoints: '',
      surplusPoints: '',
      icon1: this.$OSS_IMAGES_URL + '/20220617/jf1.png',
      icon2: this.$OSS_IMAGES_URL + "/20220617/syjf-1.png",
      icon3: this.$OSS_IMAGES_URL + "/20220617/ysy-1.png",
      additem: this.$OSS_IMAGES_URL + "/20220617/additem.png",
      imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
      imgzs: this.$OSS_IMAGES_URL + '/20220617/zs1.png',
      imgbg: this.$OSS_IMAGES_URL + '/20220617/bg1.png',
      imgxg: this.$OSS_IMAGES_URL + '/20220617/xg1.png',
      imgjf: this.$OSS_IMAGES_URL + '/20220617/jf1.png',
      imgvip: this.$OSS_IMAGES_URL + '/20220617/vip1.png',

      teamId: '',
      teamInfo: {},
      payInfo: {
        isExpired: '0',
        payStatus: '1'
      },
      memberList: []
    };
  },
  onLoad: function (options) {

    this.teamId = options.id
  },
  onShow() {
    // let dictType = 'identity'
    // let params = {
    //   id:this.teamId
    // }
    teamDetail(this.teamId).then((data) => {
      console.log(data)
      this.teamInfo = data
    })
    teamPayInfo({ teamId: this.teamId }).then((data) => {
      console.log(data)
      this.payInfo = data
    })
    teamMember({ teamId: this.teamId }).then((data) => {
      console.log(data)
      this.memberList = data
    })
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value;
    },
    toBuy() {
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
              orderType: "t_cert_report",
              price: "0.01",
              teamId: teamId,
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
                      title: `购买成功！`,
                      duration: 1000
                    })
                  },
                  "fail": function (res) {
                    console.log(res)
                    uni.showToast({
                      icon: 'none',
                      title: `购买失败！`,
                      duration: 1000
                    })
                  },
                  "complete": function (res) {
                    console.log(params1)
                    console.log('wancheng')


                    teamPayInfo({ teamId: params1.teamId }).then((data) => {
                      console.log(data)
                      that.payInfo = data
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
    toZs() {
      // this.$changePage("pages/sjcertificateTeam/index");
      this.$changePageR({
        params: {
          id: this.teamId,
        },
        url: "pages/sjcertificateTeam/index",
      });
    },
    toBg() {
      // this.$changePage("pages/teamSjpdf/index");
      this.$changePageR({
        params: {
          id: this.teamId,
        },
        url: "pages/teamSjpdf/index",
      });
    },
    toMemberManage() {
      this.$changePageR({
        params: {
          id: this.teamId,
        },
        url: "pages/teamMemberManage/index",
      });
    },
    teamBreak() {

      const ids = [];
      ids.push(this.teamId);
      console.log(ids)
      teamBatchBreak({
        ids: ids.join(","),
      }).then((data) => {
        this.$changePage("pages/team/index");

      })
    }
  },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>