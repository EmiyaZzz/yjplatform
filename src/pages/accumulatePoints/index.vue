 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
        <view class="box1 shadowb">
          <view class="title-panel">
            <view> 身价积分介绍 </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <!-- <p>身价积分可以通过注册登录、快速评估、身价提升等途径获得。</p>
                <p>完成注册奖励10分</p>
                <p>完成快速评估奖励5分</p>
                <p>完成身价提升奖励5分</p>
                <p>身价积分可用于报告购买、证书购买等。</p> -->
                <p>每日登录奖励10分</p>
                <p>快评奖励10分</p>
                <p>评估奖励100分</p>
                <p>充值奖励等额身价分</p>
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
import { certificateInit } from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
export default Vue.extend({
  components: {
    TopInfo,
  },
  data() {
    return {
      identity: "",
      more: this.$OSS_IMAGES_URL + "/20220617/morew.png",
    };
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