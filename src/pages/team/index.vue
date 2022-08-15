 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <view class="top-title">我的团队</view>
        <view class="box1 shadowb" @click="toMyTeam(item)" v-for="(item, index) in myTeam" :key="index" >
          <view class="title-panel">
            <view class="content"> <img class="logo" :src=imgAvator alt="">
              <view>{{ item.teamName }}</view>
            </view>
            <img :src=more class="img-more" alt="">
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>团队身价：{{ item.teamScore }}万</p>
              </view>
              <view class="intro-text" v-if="item.enterpriseName">
                <p>所属企业：{{ item.enterpriseName }}</p>
              </view>
              <view class="intro-text">
                <p>团队描述：{{ item.teamDes }}</p>
              </view>
            </view>
          </view>
        </view>
        <view class="box1 shadowb" @click="toCreateTeam" v-if="myTeam.length<2">
          <view class="content-panel">
            <view class="teamadd">
              <view class="content">点击创建团队</view>
              <view class="addimg"><img :src=additem alt=""></view>
            </view>
          </view>
        </view>
        <view class="top-title">参与的团队</view>
        <view class="box1 shadowb" @click="toOthersTeam(item)" v-for="(item, index) in joinTeam" :key="index" >
          <view class="title-panel">
            <view class="content"> <img class="logo" :src=imgAvator alt="">
              <view>{{ item.teamName }}</view>
            </view>
            <img :src=more class="img-more" alt="">
          </view>
          <view class="content-panel">
            <view class="text-panel">
              <view class="intro-text">
                <p>团队身价：{{ item.teamScore }}万</p>
              </view>
              <view class="intro-text" v-if="item.enterpriseName">
                <p>所属企业：{{ item.enterpriseName }}</p>
              </view>
              <view class="intro-text">
                <p>团队描述：{{ item.teamDes }}</p>
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
import { teamInfoList, teamInfoJoinList } from "@/api/common.js";
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

      myTeam: [
        {
          teamName: '',
          teamScore:'',
          enterpriseName: '',
          teamDes: ''
        },  {
          teamName: '',
          teamScore:'',
          enterpriseName: '',
          teamDes: ''
        },
      ],
      joinTeam: [{
        teamName: '',
        enterpriseName: '',
        teamDes: ''
      }]
    };
  },
  onLoad() { },
  onShow() {
    // let dictType = 'identity'
    teamInfoList().then((data) => {
      this.myTeam = data
    })
    teamInfoJoinList().then((data) => {
      this.joinTeam = data
    })
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value;
    },
    toCreateTeam() {
      this.$changePage("pages/teamCreate/index");
      // let params = {
      //   enterpriseName: "有价平台",
      // }
      // teamAdd(params).then((data) => {
      //   console.log(data)
      // })
    },
    toMyTeam(item) {
      // this.$changePage("pages/teamInfoMe/index");
      console.log('9999')
      this.$changePageR({
        params: {
          id: item.id,
        },
        url: "pages/teamInfoMe/index",
      });
    },
    toOthersTeam(item) {
        this.$changePageR({
        params: {
          id: item.id,
        },
        url: "pages/teamInfoOther/index",
      });
    }
  },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>