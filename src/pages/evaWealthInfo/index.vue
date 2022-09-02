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
              <view class="in-label"> 最高年收入(万元) </view>
              <!-- <view class="flex-group at-row align-center space-between">
                <u-input v-model="annualIncome" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入" />
              </view> -->
              <view>
                <view class="select-group" @click="$refs.t1Income.isShow = true">
                  <view v-if="t1IncomeS.label">
                    {{ t1IncomeS.label }}</view>
                  <view v-if="!t1IncomeS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 总资产(万元) </view>
              <!-- <view class="flex-group at-row align-center space-between">
                <u-input v-model="totalAssets" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入" />
              </view> -->
              <view>
                <view class="select-group" @click="$refs.t2Income.isShow = true">
                  <view v-if="t2IncomeS.label">
                    {{ t2IncomeS.label }}</view>
                  <view v-if="!t2IncomeS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 总负债(万元) </view>
              <!-- <view class="flex-group at-row align-center space-between">
                <u-input v-model="totalLiability" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入" />
              </view> -->
              <view>
                <view class="select-group" @click="$refs.t3Income.isShow = true">
                  <view v-if="t3IncomeS.label">
                    {{ t3IncomeS.label }}</view>
                  <view v-if="!t3IncomeS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否有信用卡 </view>
              <view>
                <view class="select-group" @click="$refs.check1.isShow = true">
                  <view v-if="isCreditCardS.label">
                    {{ isCreditCardS.label }}</view>
                  <view v-if="!isCreditCardS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否有按揭贷款 </view>
              <view>
                <view class="select-group" @click="$refs.check2.isShow = true">
                  <view v-if="isMortgageLoanS.label">
                    {{ isMortgageLoanS.label }}</view>
                  <view v-if="!isMortgageLoanS.label">请选择</view>
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
            <!-- <view class="in-box at-row align-center space-between">
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
            </view> -->
            <view class="title">补充信息</view>
            <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in dataRemark" :key="index">
              <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem1(item)">删除</view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label">信息名称</view>
                <u-input v-model="item.batchName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入补充名称" />
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label">信息内容</view>
                <view class="flex-group at-row align-center space-between">
                  <u-input v-model="item.batchContent" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                    :clearable="false" :custom-style="uInputStyle" placeholder="请输入补充内容" />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additem()" />
            </view>
            <!-- <view class="in-box at-row align-center space-between">
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
            </view> -->

            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">提升完成</view>
            <!-- <view class="btn1" @click="exitAndSave()">保存退出</view> -->
          </view>
          <diy-pop ref="diypop"/>
          <rcyj-picker-single ref="check1" :list="check" @confirm="check1Confirm" />
          <rcyj-picker-single ref="check2" :list="check" @confirm="check2Confirm" />

          <rcyj-picker-single ref="t1Income" :list="t1IncomeList" @confirm="t1IncomeConfirm" />
          <rcyj-picker-single ref="t2Income" :list="t2IncomeList" @confirm="t2IncomeConfirm" />
          <rcyj-picker-single ref="t3Income" :list="t3IncomeList" @confirm="t3IncomeConfirm" />
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
  batchDelete,
  batchAdd,
  batchList,
  batchupdate,
  queryDictDataByType
} from "@/api/common.js";
// 
import TopInfo from "../components/top-info/top-info.vue";
import MinePop from "../components/mine-pop/mine-pop.vue";
import FunPop from "../components/fun-pop/fun-pop.vue";
import RcyjIcon from "../../components/rcyj-icon/rcyj-icon.vue";
import RcjyInput from "../../components/rcyj-input/rcjy-input.vue";
import { showScore } from '@/utils/utils';
import DiyPop from '../components/diy-pop/diy-pop.vue';
const config = require("@/config/index");
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon,
    TopInfo,
    DiyPop
  },
  data() {
    return {
      action: config.gatewayUrl + "/assess/oss/uploadReturnUrl",
      imgArrow: this.$OSS_IMAGES_URL + "/20220617/arror.png",
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

      t1IncomeList: [],
      t1IncomeS: {},

      t2IncomeList: [],
      t2IncomeS: {},

      t3IncomeList: [],
      t3IncomeS: {},


      dataRemark: [
        {
          id: "",
          batchName: "",
          batchContent: "",
        },
      ],
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
  onLoad() { },
  onShow() {
    // let dictType = 'identity'
    // console.log(this.$route.params)
    this.init();
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);

      if (this.getToken) {
        //查询
        await queryDictDataByType({
          dictType: 'max_annual_income'
        }).then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = {}
            temp.value = data[i].dictValue
            temp.label = data[i].dictLabel
            this.t1IncomeList.push(temp)
          }
        })
        await queryDictDataByType({
          dictType: 'total_assets'
        }).then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = {}
            temp.value = data[i].dictValue
            temp.label = data[i].dictLabel
            this.t2IncomeList.push(temp)
          }
        })
        await queryDictDataByType({
          dictType: 'total_liabilities'
        }).then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = {}
            temp.value = data[i].dictValue
            temp.label = data[i].dictLabel
            this.t3IncomeList.push(temp)
          }
        })


        batchList().then((result) => {
          if (!result) return;
          this.dataRemark = [];
          result.forEach((element) => {
            let batchItem = {
              id: element.id,
              batchName: element.designation,
              batchContent: element.comment,
            }
            this.dataRemark.push(batchItem);
          });
        }).catch((err) => { });

        await wealthInfoDetail().then((data) => {
          console.log(data);
          if (!data) return;
          this.userId = data.id;
          this.annualIncome = data.annualIncome;
          this.totalAssets = data.totalAssets;
          this.totalLiability = data.totalLiability;

        this.t1IncomeList.forEach((element) => {
          if (element.value == data.annualIncome) {
            this.t1IncomeS = element;
          }
        });
        this.t2IncomeList.forEach((element) => {
          if (element.value == data.totalAssets) {
            this.t2IncomeS = element;
          }
        });
        this.t3IncomeList.forEach((element) => {
          if (element.value == data.totalLiability) {
            this.t3IncomeS = element;
          }
        });
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
    additem() {
      this.dataRemark.push({
        remarkDetail: ""
      });
      for (let i = 0; i < this.dataRemark.length; i++) {
        this.dataRemark[i].index = i;
      }
    },
    deleteItem1(item) {
      if (!item.id) this.dataRemark.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        batchDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    t1IncomeConfirm(result) {
      this.t1IncomeS = result[0];
    },
    t2IncomeConfirm(result) {
      this.t2IncomeS = result[0];
    },
    t3IncomeConfirm(result) {
      this.t3IncomeS = result[0];
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

        t1IncomeS,
        t2IncomeS,
        t3IncomeS,
      } = this;
      const params = {
        id: userId,
        annualIncome: t1IncomeS.value,
        totalAssets: t2IncomeS.value,
        totalLiability: t3IncomeS.value,
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
        .catch((err) => { });
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
        dataRemark,

        t1IncomeS,
        t2IncomeS,
        t3IncomeS,

      } = this;

      for (let i = 0; i < this.dataRemark.length; i++) {
        let paramsD = {
          'designation': this.dataRemark[i].batchName,
          'comment': this.dataRemark[i].batchContent,
        };
        console.log(paramsD)
        if (dataRemark[i].id) {
          const data = Object.assign({}, paramsD, {
            id: dataRemark[i].id,
          });
          batchupdate(data).then((result) => { });
        } else {
          batchAdd(paramsD).then((result) => { });
        }
      }


      const params = {
        id: userId,
        annualIncome: t1IncomeS.value,
        totalAssets: t2IncomeS.value,
        totalLiability: t3IncomeS.value,
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
          let isComplete ='1'
          precisoEvaluate(isComplete).then((res) => {
            pointAdd({
              pointDes: "身价提升",
              pointNum: 50,
            }).then(() => {
              uni.showToast({
                icon: "none",
                title: `恭喜您完成身价提升，奖励您50身价分`,
                duration: 2000,
              });
              // setTimeout(() => {
              //   wx.switchTab({
              //     url: "../index/index",
              //   });
              // }, 2000);
              // this.$refs.diypop.vueShowModel = false
            });
          });
          // this.$changePage({
          //   // params: {
          //   //   data: this.identityType
          //   // },
          //   url: '/pages/wealthInfo/index'
          // })
        })
        .catch((err) => { });
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>