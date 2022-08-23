<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
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
                上年度社保缴纳情况
              </view>
              <view>
                <view class="select-group" @click="$refs.securityPaymentSelect.isShow = true">
                  <view v-if="securityPaymentS.label">{{ securityPaymentS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                上年度社保使用情况
              </view>
              <view>
                <view class="select-group" @click="$refs.securitySpendSelect.isShow = true">
                  <view v-if="securitySpendS.label"> {{ securitySpendS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box  align-center space-between">
              <view class="in-label">
                上年度个人所得税缴纳情况(元)
              </view>
              <view class="warp-group">
                <u-input v-model="personalIncomeTax" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyleLeft" placeholder="请输入个人所得税" />
              </view>
            </view>
            <view v-if="identity == '8'">
              <view class="title">来中国的原因</view>
              <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in foreignInfo.comeReason" :key="index">
                <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem1(item)">删除</view>
                <view class="in-box at-row align-center space-between">
                  <!-- <view class="in-label">原因</view> -->
                  <view class="flex-group at-row align-center space-between">
                    <u-input v-model="item.content" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                      :clearable="false" :custom-style="uInputStyleLeft" placeholder="请输入" />
                  </view>
                </view>
              </view>
              <view class="addbtn">
                <img :src="imgArrow" alt="" @click="additem(foreignInfo.comeReason)" />
              </view>
            </view>
            <view v-if="identity == '8'">
              <view class="title">带来了哪些先进技术</view>
              <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in foreignInfo.comeTech" :key="index">
                <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem2(item)">删除</view>
                <view class="in-box at-row align-center space-between">
                  <!-- <view class="in-label">原因</view> -->
                  <view class="flex-group at-row align-center space-between">
                    <u-input v-model="item.content" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                      :clearable="false" :custom-style="uInputStyleLeft" placeholder="请输入" />
                  </view>
                </view>
              </view>
              <view class="addbtn">
                <img :src="imgArrow" alt="" @click="additem(foreignInfo.comeTech)" />
              </view>
            </view>
            <view v-if="identity == '8'">
              <view class="title">在中国解决了哪些那题</view>
              <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in foreignInfo.solvePro" :key="index">
                <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem3(item)">删除</view>
                <view class="in-box at-row align-center space-between">
                  <!-- <view class="in-label">原因</view> -->
                  <view class="flex-group at-row align-center space-between">
                    <u-input v-model="item.content" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                      :clearable="false" :custom-style="uInputStyleLeft" placeholder="请输入" />
                  </view>
                </view>
              </view>
              <view class="addbtn">
                <img :src="imgArrow" alt="" @click="additem(foreignInfo.solvePro)" />
              </view>
            </view>

            <view v-if="identity == '8'">
              <view class="title">在中国创办了什么企业</view>
              <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in foreignInfo.comeCompany" :key="index">
                <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem4(item)">删除</view>
                <view class="in-box at-row align-center space-between">
                  <!-- <view class="in-label">原因</view> -->
                  <view class="flex-group at-row align-center space-between">
                    <u-input v-model="item.batchContent" maxlength="20"
                      placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
                      :custom-style="uInputStyleLeft" placeholder="请输入" />
                  </view>
                </view>
              </view>
              <view class="addbtn">
                <img :src="imgArrow" alt="" @click="additem(foreignInfo.comeCompany)" />
              </view>
            </view>

            <view v-if="identity == '8'">
              <view class="title">在中国发展了哪些特长</view>
              <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in foreignInfo.specialty" :key="index">
                <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem5(item)">删除</view>
                <view class="in-box at-row align-center space-between">
                  <!-- <view class="in-label">原因</view> -->
                  <view class="flex-group at-row align-center space-between">
                    <u-input v-model="item.batchContent" maxlength="20"
                      placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
                      :custom-style="uInputStyleLeft" placeholder="请输入" />
                  </view>
                </view>
              </view>
              <view class="addbtn">
                <img :src="imgArrow" alt="" @click="additem(foreignInfo.specialty)" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="identity == '8'">
              <view class="in-label"> 累计在中国的时间(年) </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="foreignInfo.comeDuration" maxlength="200"
                  placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false" :custom-style="uInputStyle"
                  placeholder="请输入" />
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
  upload,
  precisoEvaluate,
  foreignReasonAdd,
  foreignReasonUpdate,
  foreignReasonList,
  foreignReasonDelete,
  foreignTechDelete,
  foreignTechAdd,
  foreignTechUpdate,
  foreignTechList,
  foreignProblemAdd,
  foreignProblemUpdate,
  foreignProblemDelete,
  foreignProblemList,
  foreignEnterpriseDelete,
  foreignEnterpriseAdd,
  foreignEnterpriseUpdate,
  foreignEnterpriseList,
  foreignSpecialtyDelete,
  foreignSpecialtyAdd,
  foreignSpecialtyUpdate,
  foreignSpecialtyList
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import { showScore } from '@/utils/utils'
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
        color: '#9094A0',
        fontSize: '30rpx',
        textAlign: 'right'
      },
      uInputStyleLeft: {
        color: '#black',
        fontSize: '30rpx',
        textAlign: 'left'
      },
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      identity: '',
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
      entrepreneurialExperienceS: { label: '否', value: '2' },
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
      imgArrow: this.$OSS_IMAGES_URL + "/20220617/arror.png",
      foreignInfo: {
        comeReason: [
          {
            id: "",
            content: "",
          },
        ],
        comeTech: [
          {
            id: "",
            content: "",
          },
        ],
        solvePro: [
          {
            id: "",
            content: "",
          },
        ],
        comeCompany: [
          {
            id: "",
            content: "",
          },
        ],
        specialty: [
          {
            id: "",
            content: "",
          },
        ],
        comeDuration: '',
      }
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
    getIdentity(data) {
      console.log("parent");
      console.log(data);
      this.identity = data.value;
      console.log(this.identity);
    },
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
        await foreignReasonList().then((data) => {
          this.foreignInfo.comeReason = data
        })
        await foreignTechList().then((data) => {
          this.foreignInfo.comeTech = data
        })
        await foreignProblemList().then((data) => {
          this.foreignInfo.solvePro = data
        })
        await foreignEnterpriseList().then((data) => {
          this.foreignInfo.comeCompany = data
        })
        await foreignSpecialtyList().then((data) => {
          this.foreignInfo.specialty = data
        })
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
    additem(group) {
      group.push({
        content: ""
      });
      for (let i = 0; i < group.length; i++) {
        group[i].index = i;
      }
    },
    deleteItem1(item) {
      if (!item.id) this.foreignInfo.comeReason.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignReasonDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    deleteItem2(item) {
      if (!item.id) this.foreignInfo.comeTech.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignTechDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    deleteItem3(item) {
      if (!item.id) this.foreignInfo.solvePro.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignProblemDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    deleteItem4(item) {
      if (!item.id) this.foreignInfo.comeCompany.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignEnterpriseDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    deleteItem5(item) {
      if (!item.id) this.foreignInfo.specialty.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignSpecialtyDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
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
      this.entrepreneurialExperience = ''
    },
    saveAndGo() {

    },
    checkIs() {
      if (this.entrepreneurialExperienceS.value == '0') {
        this.entrepreneurialExperience = ''
      }
    },
    async exitAndSave() {
      this.checkIs()
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
        entrepreneurialExperience,
        foreignInfo
      } = this

      await this.saveList(foreignInfo.comeReason, 'reasonComeChina', foreignReasonUpdate, foreignReasonAdd)
      await this.saveList(foreignInfo.comeTech, 'technologyName', foreignTechUpdate, foreignTechAdd)
      await this.saveList(foreignInfo.solvePro, 'solveProblemContent', foreignProblemUpdate, foreignProblemAdd)
      await this.saveList(foreignInfo.comeCompany, 'enterpriseName', foreignEnterpriseUpdate, foreignEnterpriseAdd)
      await this.saveList(foreignInfo.specialty, 'specialtyContent', foreignSpecialtyUpdate, foreignSpecialtyAdd)
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
     await additionalUpdate(params).then((data) => {
        // this.$changePage({
        //   // params: {
        //   //   data: this.identityType
        //   // },
        //   url: '/pages/evaWealthInfo/index'
        // })
        precisoEvaluate().then((res) => {
          showScore(res, 1500)
          // uni.showToast({
          //   icon: 'none',
          //   title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + res + '万',
          //   duration: 1500
          // })
          setTimeout(() => {
            wx.switchTab({
              url: "../index/index",
            });
          }, 1500);
        });
      }).catch((err) => {

      });
    },
    saveList(list, item, add, update) {
      for (let i = 0; i < list.length; i++) {
        let paramsD = {
          item: list[i].content,
        };
        console.log(list[i])
        if (list[i].id) {
          const data = Object.assign({}, paramsD, {
            id: list[i].id,
          });
          update(data).then((result) => { console.log(item + result + 'update') });
        } else {
          add(paramsD).then((result) => { console.log(item + result + 'add') });
        }
      }
    },
    pageBack() {
      let urlc = this.identity == '8'?  "pages/evaSocietypostFor/index": "pages/evaSocietypost/index"
      
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: urlc,
      });
    },
    async evaluateSj() {
      this.checkIs()
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
        entrepreneurialExperience,
        foreignInfo
      } = this

      await this.saveList(foreignInfo.comeReason, 'reasonComeChina', foreignReasonUpdate, foreignReasonAdd)
      await this.saveList(foreignInfo.comeTech, 'technologyName', foreignTechUpdate, foreignTechAdd)
      await this.saveList(foreignInfo.solvePro, 'solveProblemContent', foreignProblemUpdate, foreignProblemAdd)
      await this.saveList(foreignInfo.comeCompany, 'enterpriseName', foreignEnterpriseUpdate, foreignEnterpriseAdd)
      await this.saveList(foreignInfo.specialty, 'specialtyContent', foreignSpecialtyUpdate, foreignSpecialtyAdd)
      // for (let i = 0; i < foreignInfo.comeReason.length; i++) {
      //   let paramsD = {
      //     'reasonComeChina': foreignInfo.comeReason[i].content,
      //   };
      //   console.log(paramsD)
      //   if (foreignInfo.comeReason[i].id) {
      //     const data = Object.assign({}, paramsD, {
      //       id: foreignInfo.comeReason[i].id,
      //     });
      //     foreignReasonUpdate(data).then((result) => { });
      //   } else {
      //     foreignReasonAdd(paramsD).then((result) => { });
      //   }
      // }

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
      await additionalUpdate(params).then((data) => {
        precisoEvaluate().then((res) => {
          showScore(res, 1500)
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
              url: "pages/evaWealthInfo/index",
            });
          }, 1500);
        });

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