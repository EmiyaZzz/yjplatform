 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <!-- <top-info @getIdentityInfo="getIdentity" /> -->
        <view class="top-title">我的团队</view>
        <view class="box1 shadowb"  @click="toMyTeam">
          <view class="title-panel">
            <view class="content"> <img class="logo" :src=imgAvator alt="">
              <view>李东泽（5383）的团队</view>
            </view>
            <img :src=more class="img-more" alt="">
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>综合身价：5000万</p>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb" @click="toCreateTeam">
          <!-- <view class="title-panel">
            <view> </view>
            <img :src=more alt="">
          </view> -->
          <view class="content-panel">
            <view class="teamadd">
              <view class="content">点击创建团队</view>
              <view class="addimg"><img :src=additem alt=""></view>
            </view>
          </view>
        </view>
        <view class="top-title">参与的团队</view>

        <view class="box1 shadowb"  @click="toOthersTeam">
          <view class="title-panel">
            <view class="content"> <img class="logo" :src=imgAvator alt="">
              <view>赵灵儿（5383）的团队</view>
            </view>
            <img :src=more class="img-more" alt="">
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>综合身价：5000万</p>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb"  @click="toOthersTeam">
          <view class="title-panel">
            <view class="content"> <img class="logo" :src=imgAvator alt="">
              <view>李逍遥（5383）的团队</view>
            </view>
            <img :src=more class="img-more" alt="">
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>综合身价：5000万</p>
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
      more: this.$OSS_IMAGES_URL + '/20220617/more.png',
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
      additem: this.$OSS_IMAGES_URL + "/20220617/additem.png",
      imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
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
    toCreateTeam() {
      this.$changePage("pages/teamCreate/index");
    },
    toMyTeam() {
      this.$changePage("pages/teamInfoMe/index");
    },
     toOthersTeam() {
      this.$changePage("pages/teamInfoOther/index");
    }
  },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>