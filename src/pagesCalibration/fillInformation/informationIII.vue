<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="单位所在城市"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择单位城市" :inval="city"></rcjy-input>
        <rcyj-picker-districts ref="districts" @confirm="districtsConfirm" />
      </view>
      <caption-box title="工作单位"></caption-box>
      <view class="content-box line-box">
        <rcjy-input placeholder="请填写单位名称" :inval="companyName" @input="companyNameChange"></rcjy-input>
      </view>
      <caption-box title="所属行业"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择公司行业类别" :inval="industry" @click="$refs.occupation.isShow=true"></rcjy-input>
      </view>
      <caption-box title="工龄"></caption-box>
      <view class="content-box line-box">
        <rcjy-input type="number" placeholder="请填写（单位：年）" :inval="workYear" @input="workYearChange" maxlength="2"></rcjy-input>
      </view>
      <caption-box title="年收入"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择年收入区间" :inval="salary" @click="$refs.salary.isShow=true"></rcjy-input>
      </view>
      <caption-box title="单位性质"></caption-box>
      <view class="content-box at-row align-center pt-30 mb-30">
        <view class="single degrees" :class="[item.name === companyNature ? 'active' : '']" v-for="(item, index) in companyNatureList" :key="item.val" @click="changeDegrees(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="单位是否在国家级高新区" mb="mb-40">
        <u-switch v-model="nationalHighCheck" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
      </caption-box>
      <view class="content-box line-box" v-if="nationalHighCheck">
        <rcjy-input :disabled="true" placeholder="请根据单位所在城市选择高新区" :inval="nationalHigh" @click="nationalHighHandle"></rcjy-input>
      </view>
      <!-- <view class="content-box line-box" v-if="nationalHighCheck">
        <rcjy-input placeholder="请根据单位所在城市输入高新区" :inval="nationalHigh" @input="nationalHighChange"></rcjy-input>
      </view> -->

      <view class="at-row align-center">
        <view class="felx-group mr-16"><rcyj-button height="88rpx" bgColor="#fff" textColor="#A26E15" border="1px solid #A26E15" @click="backPage">上一步</rcyj-button></view>
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">下一步</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="occupation" labelName="dictLabel" valueName="dictLabel" :list="occupationList" @confirm="occupationConfirm"/>
      <rcyj-picker-single ref="salary" labelName="dictLabel" valueName="dictLabel" :list="salaryList" @confirm="salaryConfirm"/>
      <rcyj-picker-single ref="nationalHigh" labelName="area_name" valueName="area_name" :list="nationalHighList" @confirm="nationalHighConfirm"/>
    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getDictTypeApi, updateBaseInfoApi, getBaseInfoApi, queryPerfectProportionApi, getHighAreaApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'INFORMATIONIII',
  computed: {
    // 所在城市
    city () {
      return this.companyProvinceName ? this.companyProvinceName + '-' + this.companyCity + '-' + this.companyAreaName : ''
    }
  },
  data () {
    return {
      // 根据身份
      identityType: '',
      // 填写进度
      progressNum: 0,
      // 所在城市
      companyProvinceName: '',
      companyProvinceId: null,
      companyCity: '',
      companyCityId: null,
      companyAreaName: '',
      companyAreaId: null,
      // 工作单位
      companyName: '',
      // 工龄
      workYear: null,
      // 行业
      industry: '',
      occupationList: [],
      // 年收入
      salary: '',
      salaryList: [],
      // 单位性质
      companyNatureList: [
        {
          name: '政府机关',
          val: '1'
        },
        {
          name: '事业单位',
          val: '2'
        },
        {
          name: '企业',
          val: '3'
        },
        {
          name: '社会组织',
          val: '4'
        },
        {
          name: '其它',
          val: '5'
        }
      ],
      companyNature: '',
      companyNatureVal: '',
      // 是否是国家级高新区
      nationalHighCheck: true,
      nationalHigh: '',
      nationalHighList: []
    }
  },
  created () {
    getBaseInfoApi().then(res => {
      this.identityType = res.identityType
      // this.city = res.companyCity
      this.companyProvinceName = res.companyProvinceName
      this.companyProvinceId = res.companyProvinceId
      this.companyCity = res.companyCity
      this.companyCityId = res.companyCityId
      this.companyAreaName = res.companyAreaName
      this.companyAreaId = res.companyAreaId
      this.companyName = res.companyName
      this.industry = res.occupation
      this.workYear = res.workingYears
      this.salary = res.annualIncome
      this.companyNatureVal = res.unitNature
      this.companyNatureList.forEach(element => {
        if (element.val === this.companyNatureVal) {
          this.companyNature = element.name
        }
      })
      this.nationalHighCheck = res.isHighTechArea === '1'
      this.nationalHigh = res.highTechZone
    })
    getDictTypeApi({ dictType: 'industry_csj' }).then(res => {
      this.occupationList = res
    })
    getDictTypeApi({ dictType: 'annual_income' }).then(res => {
      this.salaryList = res
    })
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
  },
  methods: {
    companyNameChange (e) {
      this.companyName = e
    },
    workYearChange (e) {
      this.workYear = e
    },
    nationalHighChange (e) {
      this.nationalHigh = e
    },
    changeDegrees (index) {
      this.companyNature = this.companyNatureList[index].name
      this.companyNatureVal = this.companyNatureList[index].val
    },
    districtsConfirm (data) {
      this.companyProvinceName = data.provinceName
      this.companyProvinceId = data.provinceId
      this.companyCity = data.city
      this.companyCityId = data.cityId
      this.companyAreaName = data.areaName
      this.companyAreaId = data.areaId
    },
    // 行业
    occupationConfirm (e) {
      this.industry = e[0].value
    },
    // 年收入
    salaryConfirm (e) {
      this.salary = e[0].value
    },
    backPage () {
      this.$pageBack()
    },
    nationalHighHandle () {
      if (this.companyProvinceName) {
        const params = {
          provinceId: this.companyProvinceId,
          cityId: this.companyCityId
        }
        getHighAreaApi(params).then(res => {
          this.nationalHighList = res
          this.$refs.nationalHigh.isShow = true
        })
      } else {
        this.$toast('请先选择工作所在城市')
      }
    },
    nationalHighConfirm (e) {
      this.nationalHigh = e[0].value
    },
    updateBaseInfo () {
      if (!this.city) {
        this.$toast('请选择工作城市')
        return
      }
      if (!this.companyName) {
        this.$toast('请填写单位名称')
        return
      }
      if (!this.industry) {
        this.$toast('请选择公司行业类别')
        return
      }
      if (!this.workYear) {
        this.$toast('请填写工龄')
        return
      }
      if (!this.salary) {
        this.$toast('请选择年收入区间')
        return
      }
      if (!this.companyNature) {
        this.$toast('请选择单位性质')
        return
      }
      if (this.nationalHighCheck && !this.nationalHigh) {
        this.$toast('请输入工作城市所在高新区')
        return
      }
      const params = {
        companyCity: this.city,
        companyName: this.companyName,
        occupation: this.industry,
        workingYears: this.workYear,
        annualIncome: this.salary,
        unitNature: this.companyNatureVal,
        isHighTechArea: this.nationalHighCheck ? '1' : '2',
        highTechZone: this.nationalHigh
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          if (this.identityType === '1') {
            this.$changePage('pagesCalibration/fillInformation/informationIVGovern')
          }
          if (this.identityType === '2') {
            this.$changePage('pagesCalibration/fillInformation/informationIVBusmanage')
          }
          if (this.identityType === '3') {
            this.$changePage('pagesCalibration/fillInformation/informationIVProfesSkill')
          }
          if (this.identityType === '4') {
            this.$changePage('pagesCalibration/fillInformation/informationIVHighProfess')
          }
          if (this.identityType === '5') {
            this.$changePage('pagesCalibration/fillInformation/informationIVFram')
          }
          if (this.identityType === '6') {
            this.$changePage('pagesCalibration/fillInformation/informationIVSociety')
          }
          // if (this.identityType === '7') {
          //   this.$changePage('pagesCalibration/fillInformation/informationIVBusmanage')
          // }
          if (this.identityType === '8') {
            this.$changePage('pagesCalibration/fillInformation/informationIVHighLevel')
          }
        }, 1500)
      })
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
