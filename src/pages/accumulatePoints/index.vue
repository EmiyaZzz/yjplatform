 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
        <view class="box1 shadowb">
          <view class="title-panel">
            <view> 身价分介绍 </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>身价分可以通过注册登录、快速评估、身价提升等途径获得。</p>
                <p>完成注册奖励100分</p>
                <p>完成快速评估奖励5分</p>
                <p>完成身价提升奖励50分</p>
                <!-- <p>每日登录奖励10分</p> -->
                <!-- <p>充值奖励等额身价分</p> -->
                <p>身价分可用于报告购买、证书购买等。</p>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb">
          <view class="title-panel">
            <view> 分值明细 </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="rank-panel">
              <view class="points-title">
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
              </view>

              <view class="rank-list-title">
                <view class="">
                  使用时间
                </view>
                <view class="">
                  积分用途
                </view>
                <view class="">
                  积分变动
                </view>
              </view>
              <view>
                <view class="scroll_box">
                  <swiper class="swiper" circular="true" vertical="true" display-multiple-items='4' :autoplay="autoplay"
                    :interval="interval" :duration="duration">
                    <swiper-item v-for="(item, index) in recodeList" :key="index" class="swiper-l">
                      <!-- <view class="swiper-item uni-bg-green" style="font-size:14rpx; width:200rpx">{{ item.create_time }}</view> -->
                      <view class="swiper-item uni-bg-green" style="font-size: 24rpx;margin-right:50rpx">{{
                          item.createTime
                      }}</view>
                      <view class="swiper-item uni-bg-green">{{ item.pointDes }}
                      </view>
                      <!-- <view class="swiper-item uni-bg-green">{{ item.real_name }}**</view> -->
                      <view class="swiper-item uni-bg-green" style="text-align: right;padding-right:40rpx">{{
                          item.pointNum
                      }}</view>
                    </swiper-item>
                  </swiper>
                </view>
              </view>
            </view>

          </view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { getPointRecord, pointDetail } from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
export default Vue.extend({
  components: {
    TopInfo,
  },
  data() {
    return {
      identity: "",
      more: this.$OSS_IMAGES_URL + "/20220617/morew.png",
      interval: 1000,
      duration: 1000,
      autoplay: true,
      recodeList: '',
      allPoints: '',
      consumePoints: '',
      surplusPoints: '',
      icon1:this.$OSS_IMAGES_URL + '/20220617/jf1.png',
      icon2:this.$OSS_IMAGES_URL + "/20220617/syjf-1.png",
      icon3:this.$OSS_IMAGES_URL + "/20220617/ysy-1.png",
    };
  },
  onLoad() { },
  onShow() {
    // let dictType = 'identity'
    pointDetail().then((result) => {
      console.log(result)
      this.allPoints = result.allPoints
      this.consumePoints = result.consumePoints
      this.surplusPoints = result.surplusPoints
    })
    getPointRecord().then((result) => {
      this.recodeList = result
    })
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value;
    },
  },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>