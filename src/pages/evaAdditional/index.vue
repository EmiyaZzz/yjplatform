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
              <view class="in-label">
                健康状况
              </view>
              <view>
                <view class="select-group" @click="$refs.healthStatusSelect.isShow = true">
                  <view v-if="healthStatusS.label">
                    {{ healthStatusS.label }}
                  </view>
                  <view v-if="!healthStatusS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                婚姻状况
              </view>
              <view>
                <view class="select-group" @click="$refs.marryStatusSelect.isShow = true">
                  <view v-if="marryStatusS.label">
                    {{ marryStatusS.label }}
                  </view>
                  <view v-if="!marryStatusS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                兵役状况
              </view>
              <view>
                <view class="select-group" @click="$refs.militaryServiceSelect.isShow = true">
                  <view v-if="militaryService.label">
                    {{ militaryService.label }}
                  </view>
                  <view v-if="!militaryService.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                所属党派
              </view>
              <view>
                <view class="select-group" @click="$refs.ddbSelect.isShow = true">
                  <view v-if="partisanS.label">
                    {{ partisanS.label }}
                  </view>
                  <view v-if="!partisanS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                社保缴纳情况
              </view>
              <view>
                <view class="select-group" @click="$refs.securityPaymentSelect.isShow = true">
                  {{ securityPaymentS.label }}<view v-if="!securityPaymentS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                社保使用情况
              </view>
              <view>
                <view class="select-group" @click="$refs.securitySpendSelect.isShow = true">
                  {{ securitySpendS.label }}<view v-if="!securitySpendS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                个人所得税
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="personalIncomeTax" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入个人所得税" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                是否有创业经历
              </view>
              <view>
                <view class="select-group" @click="$refs.checkEntExp.isShow = true">
                  {{ entrepreneurialExperienceS.label }}<view v-if="!entrepreneurialExperienceS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="entrepreneurialExperienceS.value == '1'">
              <view class="in-label">
                创业经历
              </view>
            </view>
            <view v-if="entrepreneurialExperienceS.value == '1'">
              <!-- <u-input v-model="entrepreneurialExperience" maxlength="100"
                placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false" :custom-style="uInputStyleLeft"
                placeholder="请输入创业经历" /> -->
              <textarea v-model="entrepreneurialExperience" maxlength="100" placeholder-style="color:#9094A0"
                placeholder="请输入创业经历" :custom-style="uInputStyleLeft" />

            </view>
            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
             <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
          <rcyj-picker-single ref="healthStatusSelect" :list="healthStatusList" @confirm="societyPostLevelConfirm" />
          <rcyj-picker-single ref="marryStatusSelect" :list="marryStatusList" @confirm="marryStatusConfirm" />
          <rcyj-picker-single ref="militaryServiceSelect" :list="militaryServiceList" @confirm="rdLevelConfirm" />
          <rcyj-picker-single ref="ddbSelect" :list="partisanList" @confirm="ddbLevelConfirm" />
          <rcyj-picker-single ref="securityPaymentSelect" :list="securityPaymentList"
            @confirm="securityPaymentConfirm" />
          <rcyj-picker-single ref="securitySpendSelect" :list="securitySpendList" @confirm="securitySpendConfirm" />
          <rcyj-picker-single ref="checkEntExp" :list="check" @confirm="checkEntExpConfirm" />

        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  additionalDetail,
  additionalUpdate,
  queryDictDataByType,
  queryHighArea,
  upload
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
const config = require('@/config/index')
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon,
    TopInfo
  },
  data() {
    return {
      action: config.gatewayUrl + '/assess/oss/uploadReturnUrl',
      current: 0,
      uInputStyle: {
        color: '#black',
        fontSize: '30rpx',
        textAlign: 'right'
      },
      uInputStyleLeft: {
        color: '#black',
        fontSize: '30rpx',
        textAlign: 'left'
      },
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      userId: '',
      healthStatusS: '',
      healthStatusList: [],
      healthStatusName: '',

      marryStatusS: '',
      marryStatusList: [],
      marryStatusName: '',

      militaryService: '',
      militaryServiceList: [{
        label: '未服兵役',
        value: '1'
      }, {
        label: '已服兵役',
        value: '2'
      }],
      militaryServiceName: '',

      partisanS: '',
      partisanList: [],
      partisanName: '',

      securityPaymentS: '',
      securityPaymentList: [],
      securityPaymentName: '',

      securitySpendS: '',
      securitySpendList: [],
      securitySpendName: '',

      personalIncomeTax: '',
      entrepreneurialExperienceS: '',
      entrepreneurialExperience: '',

      check: [{
        value: '1',
        label: '是'
      },
      {
        value: '2',
        label: '否'
      }
      ],
      //----------------------
    }
  },
  onLoad() {

  },
  onShow() {
    // let dictType = 'identity'
    // console.log(this.$route.params)
    this.init()
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
      console.log('token======' + this.getToken)
      //查询
      await queryDictDataByType({
        dictType: 'health_Status'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.healthStatusList.push(temp)
        }
      })
      await queryDictDataByType({
        dictType: 'marry_Status'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.marryStatusList.push(temp)
        }
      })
      await queryDictDataByType({
        dictType: 'partisan'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.partisanList.push(temp)
        }
      })
      await queryDictDataByType({
        dictType: 'social_security_payment'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.securityPaymentList.push(temp)
        }
      })
      await queryDictDataByType({
        dictType: 'social_security_spend'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.securitySpendList.push(temp)
        }
      })
      if (this.getToken) {
        await additionalDetail().then((data) => {
          //  console.log(data)
          if (!data)
            return
          this.userId = data.id
          this.healthStatusList.forEach(element => {
            if (element.value === data.healthStatus) {
              this.healthStatusS = element
            }
          });
          this.marryStatusList.forEach(element => {
            if (element.value === data.marryStatus) {
              this.marryStatusS = element
            }
          });
          this.militaryServiceList.forEach(element => {
            if (element.value === data.militaryService) {
              this.militaryService = element
            }
          });
          this.partisanList.forEach(element => {
            if (element.value === data.partisan) {
              this.partisanS = element
            }
          });
          this.securityPaymentList.forEach(element => {
            if (element.value === data.socialSecurityPayment) {
              this.securityPaymentS = element
            }
          });
          this.securitySpendList.forEach(element => {
            if (element.value === data.socialSecuritySpend) {
              this.securitySpendS = element
            }
          });
          this.check.forEach(element => {
            if (element.value === data.entrepreneurialExperience) {
              this.entrepreneurialExperienceS = element
            }
          });
          this.entrepreneurialExperience = data.entrepreneurialExperienceDes
          this.personalIncomeTax = data.personalIncomeTax
        })
      }
    },

    societyPostLevelConfirm(result) {
      this.healthStatusS = result[0]
    },
    marryStatusConfirm(result) {
      this.marryStatusS = result[0]
    },
    rdLevelConfirm(result) {
      this.militaryService = result[0]
    },
    ddbLevelConfirm(result) {
      this.partisanS = result[0]
    },
    securityPaymentConfirm(result) {
      this.securityPaymentS = result[0]
    },
    securitySpendConfirm(result) {
      this.securitySpendS = result[0]
    },
    checkEntExpConfirm(result) {
      this.entrepreneurialExperienceS = result[0]
    },
    saveAndGo() {

    },
    exitAndSave() {
      const {
        userId,
        healthStatusS,
        marryStatusS,
        militaryService,
        partisanS,
        securityPaymentS,
        securitySpendS,
        personalIncomeTax,
        entrepreneurialExperienceS,
        entrepreneurialExperience
      } = this
      const params = {
        "id": userId,
        "healthStatus": healthStatusS.value,
        "marryStatus": marryStatusS.value,
        "militaryService": militaryService.value,
        "partisan": partisanS.value,
        "socialSecurityPayment": securityPaymentS.value,
        "socialSecuritySpend": securitySpendS.value,
        "securitySpendS": securitySpendS.value,
        "personalIncomeTax": personalIncomeTax,
        "entrepreneurialExperience": entrepreneurialExperienceS.value,
        "entrepreneurialExperienceDes": entrepreneurialExperience
      }
      console.log(params)
      additionalUpdate(params).then((data) => {
        // this.$changePage({
        //   // params: {
        //   //   data: this.identityType
        //   // },
        //   url: '/pages/evaWealthInfo/index'
        // })
        wx.switchTab({
          url: '../index/index'
        })
      }).catch((err) => {

      });
    },
   pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaSocietypost/index",
      });
    },
    evaluateSj() {
      const {
        userId,
        healthStatusS,
        marryStatusS,
        militaryService,
        partisanS,
        securityPaymentS,
        securitySpendS,
        personalIncomeTax,
        entrepreneurialExperienceS,
        entrepreneurialExperience
      } = this
      const params = {
        "id": userId,
        "healthStatus": healthStatusS.value,
        "marryStatus": marryStatusS.value,
        "militaryService": militaryService.value,
        "partisan": partisanS.value,
        "socialSecurityPayment": securityPaymentS.value,
        "socialSecuritySpend": securitySpendS.value,
        "securitySpendS": securitySpendS.value,
        "personalIncomeTax": personalIncomeTax,
        "entrepreneurialExperience": entrepreneurialExperienceS.value,
        "entrepreneurialExperienceDes": entrepreneurialExperience
      }
      console.log(params)
      additionalUpdate(params).then((data) => {
        this.$changePage({
          // params: {
          //   data: this.identityType
          // },
          url: '/pages/evaWealthInfo/index'
        })
        //  wx.switchTab({ 
        //   url:'../index/index'
        // })
      }).catch((err) => {

      });
    },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>