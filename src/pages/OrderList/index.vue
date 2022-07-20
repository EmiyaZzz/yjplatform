 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
        <view class="box1 shadowb" v-for="(item, index) in orderL" :key="index">
          <view class="title-panel">
            <view>{{item.commodity_name}}订单 </view>
             <view v-if="!item.order_num">您还没有订单数据 </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>订单编号：{{ item.order_num }}</p>
                 <p>订单日期：{{ item.pay_time }}</p>
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
import { getPointRecord, pointDetail, queryUserOrderList } from "@/api/common.js";
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
      icon1: this.$OSS_IMAGES_URL + '/20220617/jf1.png',
      icon2: this.$OSS_IMAGES_URL + "/20220617/syjf-1.png",
      icon3: this.$OSS_IMAGES_URL + "/20220617/ysy-1.png",

      orderL: []
    };
  },
  onLoad() {
    queryUserOrderList().then((res) => {
      console.log(res);
      this.orderL = res
    })
  },
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