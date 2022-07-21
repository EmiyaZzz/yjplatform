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
            <view class="title">荣誉称号</view>
            <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in dataHonor" :key="index">
              <view :style="{ 'text-align': 'right', color: '#303133' }" @click="deleteItem1(item)">删除</view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 荣誉等级 </view>
                <view class="list-c" @click="setCurrentSelect(item)">
                  <u-select :default-value="defaultValue" mode="mutil-column-auto" v-model="isShow"
                    :list="honorSelectList" @confirm="honorConfirm" @cancel="cancel">
                  </u-select>
                  <!-- <view v-if="!item.honorLevel">请选择</view> -->
                  <view v-if="item.honorLevel.label">{{
                      item.honorLevel.label
                  }}</view>
                  <view v-else>{{ item.honorLevel }}</view>
                  <view v-if="!item.honorLevel" style="color:#9094A0">请选择</view>
                  <!-- <view class="select-group" @click="$refs.honorSelect.isShow = true">
                    {{ honorSelectS.label }}<view v-if="!honorSelectS.label">请选择</view>
                  </view> -->
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 荣誉名称 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input v-model="item.honorName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false" :custom-style="uInputStyle" placeholder="请输入荣誉名称" />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additem()" />
            </view>
            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
        </view>
        <!-- <rcyj-picker-single v-for="(item, index) in dataHonor" :key="index" ref="honorSelect+'index'" :list="honorSelectList" @confirm="honorConfirm" /> -->
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  honorList,
  honorAdd,
  honorUpdate,
  honorDelete,
  queryDictDataByType,
  precisoEvaluate
} from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
import MinePop from "../components/mine-pop/mine-pop.vue";
import FunPop from "../components/fun-pop/fun-pop.vue";
import RcyjIcon from "../../components/rcyj-icon/rcyj-icon.vue";
import RcjyInput from "../../components/rcyj-input/rcjy-input.vue";
import { showScore } from '@/utils/utils'
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
      honorSelectS: "",
      honorSelectList: [],
      dataHonor: [
        {
          id: "",
          honorName: "",
          honorLevel: {
            label: "请选择",
          },
        },
      ],
      isShow: false,
      defaultValue: [0],
      currentSelect: [],
      currentIndex: 0,
      imgArrow: this.$OSS_IMAGES_URL + "/20220617/arror.png",
    };
  },
  onLoad() { },
  onShow() {
    // let dictType = 'identity'
    this.init();
  },
  methods: {
    setCurrentSelect(item) {
      this.isShow = true;
      this.currentSelect = item;
    },
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);

      await queryDictDataByType({
        dictType: "honor_Level",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.honorSelectList.push(temp);
          if (i == data.length - 1) {
            console.log(111);
            this.dataSet();
          }
        }
      });
    },
    dataSet() {
      honorList()
        .then((result) => {
          if (!result) return;
          this.dataHonor = [];
          let showList = result;
          console.log(this.honorSelectList.length);
          showList.forEach((element1) => {
            this.honorSelectList.forEach((element2) => {
              // console.log(element1)
              //  console.log(element2)
              if (element1.honorLevel == element2.value) {
                //  console.log(element1.honorLevel)
                element1.honorLevel = element2.label;
              }
            });
          });
          console.log(showList);
          showList.forEach((element) => {
            this.dataHonor.push(element);
          });
          for (let i = 0; i < this.dataHonor.length; i++) {
            this.dataHonor[i].index = i;
          }
          console.log(this.dataHonor);
          // this.userId = result.id
        })
        .catch((err) => { });
    },
    getIdentity(data) {
      this.identity = data.value;
    },
    saveDataAndJump(url) {
      const { userId, dataHonor } = this;
      if (dataHonor.length == 0) {
        this.evaData(url)
        return
      }
      for (let i = 0; i < this.dataHonor.length; i++) {
        let params = {
          honorName: this.dataHonor[i].honorName,
          honorLevel: this.dataHonor[i].honorLevel.value,
        };
        console.log(params);
        if (dataHonor[i].id) {
          const data = Object.assign({}, params, {
            id: dataHonor[i].id,
          });
          honorUpdate(data).then((result) => { this.evaData(url) });
        } else {
          honorAdd(params).then((result) => { this.evaData(url)});
        }
      }
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaContribute/index",
      });
    },
    evaData(url) {
      precisoEvaluate().then((res) => {
         showScore(res,1500)
        // uni.showToast({
        //   icon: 'none',
        //   title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + res + '万',
        //   duration: 1500
        // })
        setTimeout(() => {
          this.$changePage({
            params: {
              data: this.identity,
            },
            url: url//"pages/evaSocietypost/index",
          });
        }, 1500);
      });
    },
    evaluateSj() {
      this.saveDataAndJump("pages/evaSocietypost/index");
      //  wx.switchTab({
      //   url:'../evaEducation/index'
      // })
    },
    exitAndSave() {
      this.saveDataAndJump(0);
      // precisoEvaluate().then((res) => {
      //   uni.showToast({
      //     icon: 'none',
      //     title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + res + '万',
      //     duration: 1500
      //   })
      //   setTimeout(() => {
      //     wx.switchTab({
      //       url: "../index/index",
      //     });
      //   }, 1500);
      // });
    },
    additem() {
      this.dataHonor.push({
        index: "",
        honorName: "",
        honorLevel: "",
      });
      for (let i = 0; i < this.dataHonor.length; i++) {
        this.dataHonor[i].index = i;
      }
    },
    deleteItem1(item) {
      if (!item.id) this.dataHonor.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        honorDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },

    honorConfirm(result) {
      console.log(this.currentSelect);
      console.log(result);
      this.dataHonor[this.currentSelect.index].honorLevel = result[0];
      console.log(this.dataHonor);
      this.currentSelect = [];
      // this.dataHonor.honorLevel
      // this.honorSelectS = result[0]
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>