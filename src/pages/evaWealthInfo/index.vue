<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info :key="new Date().getTime()" />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 最高年收入 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="annualIncome"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 总资产 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="totalAssets"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 总负债 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="totalLiability"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否有信用卡 </view>
              <view>
                <view class="select-group" @click="$refs.check1.isShow = true">
                  <view v-if="isCreditCardS.label">
                    {{ isCreditCardS.label }}</view
                  ><view v-if="!isCreditCardS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否有按揭贷款 </view>
              <view>
                <view class="select-group" @click="$refs.check2.isShow = true">
                  <view v-if="isMortgageLoanS.label">
                    {{ isMortgageLoanS.label }}</view
                  ><view v-if="!isMortgageLoanS.label">请选择</view>
                </view>
              </view>
            </view>
            <!-- <view class="in-box at-row align-center space-between">
              <view class="in-label">
                主要收入来源
              </view>
              <view class="felx-group at-row align-center space-between">
                <u-input v-model="majorIncome" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入" />
              </view>
            </view> -->
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 补充信息 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="remark"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 证明人姓名 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="witnessPersonName"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 证明人电话 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="witnessPersonPhone"
                  maxlength="11"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入"
                />
              </view>
            </view>

            <view class="tips"
              >*请确保填写信息的真实性，否则会影响评估结果和信用</view
            >
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">提升完成</view>
            <!-- <view class="btn1" @click="exitAndSave()">保存退出</view> -->
          </view>
          <rcyj-picker-single
            ref="check1"
            :list="check"
            @confirm="check1Confirm"
          />
          <rcyj-picker-single
            ref="check2"
            :list="check"
            @confirm="check2Confirm"
          />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  wealthInfoDetail,
  wealthInfoUpdate,
  precisoEvaluate,
  pointAdd,
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
      uInputStyleLeft: {
        color: "#black",
        fontSize: "30rpx",
        textAlign: "left",
      },
      getToken: this.$ls.get("KEY_ACCESS_TOKEN"),
      userId: "",
      annualIncome: "",
      totalAssets: "",
      totalLiability: "",
      isCreditCardS: "",
      isMortgageLoanS: "",

      majorIncome: "",
      remark: "",
      witnessPersonName: "",
      witnessPersonPhone: "",

      check: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "2",
          label: "否",
        },
      ],
      //----------------------
    };
  },
  onLoad() {},
  onShow() {
    // let dictType = 'identity'
    // console.log(this.$route.params)
    this.init();
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);
      //查询
      // await queryDictDataByType({
      //   dictType: 'health_Status'
      // }).then((data) => {
      //   for (let i = 0; i < data.length; i++) {
      //     let temp = {}
      //     temp.value = data[i].dictValue
      //     temp.label = data[i].dictLabel
      //     this.healthStatusList.push(temp)
      //   }
      // })

      if (this.getToken) {
        await wealthInfoDetail().then((data) => {
          console.log(data);
          if (!data) return;
          this.userId = data.id;
          this.annualIncome = data.annualIncome;
          this.totalAssets = data.totalAssets;
          this.totalLiability = data.totalLiability;

          this.check.forEach((element) => {
            if (element.value == data.isCreditCard) {
              this.isCreditCardS = element;
            }
          });
          this.check.forEach((element) => {
            if (element.value == data.isMortgageLoan) {
              this.isMortgageLoanS = element;
            }
          });

          this.remark = data.remark;
          this.witnessPersonName = data.witnessPersonName;
          this.witnessPersonPhone = data.witnessPersonPhone;
          this.majorIncome = data.majorIncome;
        });
      }
    },
    check1Confirm(result) {
      this.isCreditCardS = result[0];
    },
    check2Confirm(result) {
      this.isMortgageLoanS = result[0];
    },
    exitAndSave() {
      const {
        userId,
        annualIncome,
        totalAssets,
        totalLiability,
        isCreditCardS,
        isMortgageLoanS,
        majorIncome,
        remark,
        witnessPersonName,
        witnessPersonPhone,
      } = this;
      const params = {
        id: userId,
        annualIncome: annualIncome,
        totalAssets: totalAssets,
        totalLiability: totalLiability,
        isCreditCard: isCreditCardS.value,
        isMortgageLoan: isMortgageLoanS.value,
        majorIncome: majorIncome,
        remark: remark,
        witnessPersonName: witnessPersonName,
        witnessPersonPhone: witnessPersonPhone,
      };
      console.log(params);
      wealthInfoUpdate(params)
        .then((data) => {
          precisoEvaluate().then((res) => {
            wx.switchTab({
              url: "../index/index",
            });
          });
          // this.$changePage({
          //   // params: {
          //   //   data: this.identityType
          //   // },
          //   url: '/pages/wealthInfo/index'
          // })
        })
        .catch((err) => {});
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaAdditional/index",
      });
    },
    evaluateSj(result) {
      const {
        userId,
        annualIncome,
        totalAssets,
        totalLiability,
        isCreditCardS,
        isMortgageLoanS,
        majorIncome,
        remark,
        witnessPersonName,
        witnessPersonPhone,
      } = this;
      const params = {
        id: userId,
        annualIncome: annualIncome,
        totalAssets: totalAssets,
        totalLiability: totalLiability,
        isCreditCard: isCreditCardS.value,
        isMortgageLoan: isMortgageLoanS.value,
        majorIncome: majorIncome,
        remark: remark,
        witnessPersonName: witnessPersonName,
        witnessPersonPhone: witnessPersonPhone,
      };
      console.log(params);
      wealthInfoUpdate(params)
        .then((data) => {
          precisoEvaluate().then((res) => {
            pointAdd({
              pointDes: "身价提升",
              pointNum: 5,
            }).then(() => {
              uni.showToast({
                icon: "none",
                title: `恭喜您完成身价提升，奖励您5个身价积分`,
                duration: 2000,
              });
              setTimeout(() => {
                wx.switchTab({
                  url: "../index/index",
                });
              }, 2000);
            });
          });
          // this.$changePage({
          //   // params: {
          //   //   data: this.identityType
          //   // },
          //   url: '/pages/wealthInfo/index'
          // })
        })
        .catch((err) => {});
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>