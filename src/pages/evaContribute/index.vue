<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" :key="new Date().getTime()" />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="title">成就贡献</view>
            <view
              :style="{ 'margin-bottom': '80rpx' }"
              v-for="(item, index) in dataTech"
              :key="index"
            >
              <view
                :style="{ 'text-align': 'right', color: '#9094A0' }"
                @click="deleteItem1(item)"
                >删除</view
              >
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 标题 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.contributeName"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入标题"
                  />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 描述 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.contributeDes"
                    maxlength="30"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入描述"
                  />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additem()" />
            </view>
            <view class="tips"
              >*请确保填写信息的真实性，否则会影响评估结果和信用</view
            >
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  contributeList,
  contributeAdd,
  contributeUpdate,
  contributeDelete,
} from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
import MinePop from "../components/mine-pop/mine-pop.vue";
import FunPop from "../components/fun-pop/fun-pop.vue";
import RcyjIcon from "../../components/rcyj-icon/rcyj-icon.vue";
import RcjyInput from "../../components/rcyj-input/rcjy-input.vue";
const config = require("@/config/index");
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon,
    TopInfo,
  },
  data() {
    return {
      action: config.gatewayUrl + "/assess/oss/uploadReturnUrl",
      current: 0,
      uInputStyle: {
        color: "#black",
        fontSize: "30rpx",
        textAlign: "right",
      },
      getToken: this.$ls.get("KEY_ACCESS_TOKEN"),
      identity: "",
      dataTech: [
        {
          id: "",
          contributeName: "",
          patentNum: "",
          contributeDes: "",
        },
      ],
      imgArrow: this.$OSS_IMAGES_URL + "/20220617/arror.png",
    };
  },
  onLoad() {},
  onShow() {
    // let dictType = 'identity'
    this.init();
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);

      contributeList()
        .then((result) => {
          console.log(result);
          if (!result) return;
          this.dataTech = [];
          result.forEach((element) => {
            this.dataTech.push(element);
          });
          // this.userId = result.id
        })
        .catch((err) => {});
    },
    getIdentity(data) {
      this.identity = data.value;
    },
    saveData() {
      const { userId, dataTech } = this;

      for (let i = 0; i < this.dataTech.length; i++) {
        let params = {
          contributeName: this.dataTech[i].contributeName,
          contributeDes: this.dataTech[i].contributeDes,
        };
        if (dataTech[i].id) {
          const data = Object.assign({}, params, {
            id: dataTech[i].id,
          });
          contributeUpdate(data).then((result) => {});
        } else {
          contributeAdd(params).then((result) => {});
        }
      }
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaTechnological/index",
      });
    },
    evaluateSj() {
      this.saveData();
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaHonor/index",
      });
      //  wx.switchTab({
      //   url:'../evaEducation/index'
      // })
    },
    exitAndSave() {
      this.saveData();
      wx.switchTab({
        url: "../index/index",
      });
    },
    additem() {
      this.dataTech.push({
        index: "",
        technologicalAchievementType: "",
        contributeName: "",
        patentNum: "",
        contributeDes: "",
      });
      for (let i = 0; i < this.dataTech.length; i++) {
        this.dataTech[i].index = i;
      }
    },
    deleteItem1(item) {
      if (!item.id) this.dataTech.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        contributeDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>