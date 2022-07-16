<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" :key="new Date().getTime()" />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="title">未转化原创发明专利</view>
            <view
              :style="{ 'margin-bottom': '80rpx' }"
              v-for="(item, index) in dataPatent"
              :key="index"
            >
              <view
                :style="{ 'text-align': 'right', color: '#9094A0' }"
                @click="deleteItem1(item)"
                >删除</view
              >
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利名称 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentName"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利名称"
                  />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利号 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentNum"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利号"
                  />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利描述 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentDes"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利描述"
                  />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additem()" />
            </view>

            <view class="title">已转化原创发明专利</view>
            <view
              :style="{ 'margin-bottom': '80rpx' }"
              v-for="(item, index) in dataPatented"
              :key="index"
            >
              <view
                :style="{ 'text-align': 'right', color: '#9094A0' }"
                @click="deleteItem1(item)"
                >删除</view
              >
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利名称 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentName"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利名称"
                  />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利号 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentNum"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利号"
                  />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 专利描述 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input
                    v-model="item.patentDes"
                    maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false"
                    :custom-style="uInputStyle"
                    placeholder="请输入专利描述"
                  />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additemEd()" />
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
  intellectualList,
  intellectualAdd,
  intellectualUpdate,
  intellectualDelete,
  queryDictDataByType,
  queryHighArea,
  upload,
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
      dataPatent: [
        {
          id: "",
          patentName: "",
          patentNum: "",
          patentDes: "",
        },
      ],
      dataPatented: [
        {
          id: "",
          patentName: "",
          patentNum: "",
          patentDes: "",
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

      intellectualList()
        .then((result) => {
          console.log(result);
          if (!result) return;
          this.dataPatent = [];
          this.dataPatented = [];
          result.forEach((element) => {
            if (element.patentType == "2") {
              this.dataPatent.push(element);
            }
            if (element.patentType == "1") {
              this.dataPatented.push(element);
            }
          });
          // this.userId = result.id
        })
        .catch((err) => {});
    },
    getIdentity(data) {
      this.identity = data.value;
    },
    saveData() {
      const { userId, dataPatent, dataPatented } = this;

      for (let i = 0; i < this.dataPatent.length; i++) {
        let params = {
          patentType: "2",
          patentName: this.dataPatent[i].patentName,
          patentNum: this.dataPatent[i].patentNum,
          patentDes: this.dataPatent[i].patentDes,
        };
        if (dataPatent[i].id) {
          const data = Object.assign({}, params, {
            id: dataPatent[i].id,
          });
          intellectualUpdate(data).then((result) => {});
        } else {
          intellectualAdd(params).then((result) => {});
        }
      }
      for (let i = 0; i < dataPatented.length; i++) {
        let params = {
          id: dataPatented[i].id,
          patentType: "1",
          patentName: dataPatented[i].patentName,
          patentNum: dataPatented[i].patentNum,
          patentDes: dataPatented[i].patentDes,
        };
        if (dataPatented[i].id) {
          const data = Object.assign({}, params, {
            id: dataPatented[i].id,
          });
          intellectualUpdate(data).then((result) => {});
        } else {
          intellectualAdd(params).then((result) => {});
        }
      }
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaDuty/index",
      });
    },
    evaluateSj() {
      this.saveData();
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaTechnological/index",
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
      this.dataPatent.push({
        index: "",
        patentType: "",
        patentName: "",
        patentNum: "",
        patentDes: "",
      });
      for (let i = 0; i < this.dataPatent.length; i++) {
        this.dataPatent[i].index = i;
      }
    },
    additemEd() {
      this.dataPatented.push({
        index: "",
        patentType: "",
        patentName: "",
        patentNum: "",
        patentDes: "",
      });
      for (let i = 0; i < this.dataPatented.length; i++) {
        this.dataPatented[i].index = i;
      }
    },
    deleteItem1(item) {
      if (!item.id) {
        console.log("没有IDIDID");
        this.dataPatent.splice(item.index, 1);
      } else {
        console.log("IDIDID是" + item.id);
        const ids = [];
        ids.push(item.id);
        intellectualDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    deleteItem2(item) {
      if (!item.id) this.dataPatented.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        intellectualDelete({
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