<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="在校职务"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="false" placeholder="请填写在校担任的校职务" :inval="duties" @input="dutiesChange"></rcjy-input>
      </view>
      <caption-box title="是否获得过奖学金" mb="mb-40">
        <u-switch v-model="scholarshipCheck" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
        <view class="mb-40"></view>
      </caption-box>
      <caption-box title="所获荣誉" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addHonor', honor === '1', 'pagesCalibration/fillInformation/managementHonor')" slot="right">{{ honor === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="技能资格" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addProfessional', professional === '1', 'pagesCalibration/fillInformation/managementProfessional')" slot="right">{{ professional === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="参加的赛事及获奖项" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addCompetition', competition === '1', 'pagesCalibration/fillInformation/managementCompetition')" slot="right">{{ competition === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>

      <view class="at-row align-center">
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">提交</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="level" :list="levelList" @confirm="levelConfirm"/>
    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getHonorQueryApi, getBaseInfoApi, getProfessionalQueryApi, getCompetitionQueryApi, updateBaseInfoApi, queryPerfectProportionApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'INFORMATIONIIIStu',
  data () {
    return {
      // 填写进度
      progressNum: 0,
      // 在校职务
      duties: '',
      // 是否获得过奖学金
      scholarshipCheck: true,
      // 工作单位
      companyName: '',
      // 工龄
      workYear: '',
      // 行业
      industry: '',
      // 年收入
      salary: '',
      // 单位性质
      companyNatureList: [
        {
          name: '政府机关',
          val: '1'
        },
        {
          name: '事业单位',
          val: '2'
        }
      ],
      companyNature: '',
      honor: '2',
      professional: '2',
      competition: '2'
    }
  },
  onLoad () {
    getBaseInfoApi().then(res => {
      this.duties = res.schoolPosition
      this.scholarshipCheck = res.isHaveScholarship === '1'
    })
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
    getHonorQueryApi().then(res => {
      if (res && res.length) {
        this.honor = '1'
      } else {
        this.honor = '2'
      }
    })
    getProfessionalQueryApi().then(res => {
      if (res && res.length) {
        this.professional = '1'
      } else {
        this.professional = '2'
      }
    })
    getCompetitionQueryApi().then(res => {
      if (res && res.length) {
        this.competition = '1'
      } else {
        this.competition = '2'
      }
    })
  },
  methods: {
    updateBaseInfo () {
      if (!this.duties) {
        this.$toast('请输入在校职务')
        return
      }
      const params = {
        schoolPosition: this.duties,
        isHaveScholarship: this.scholarshipCheck ? '1' : '2'
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          this.$changePage('pagesCalibration/authorize/authorize')
        }, 1500)
      })
    },
    goChangePage (url, has, management) {
      if (!has) {
        this.$changePage(url)
      } else {
        this.$changePage(management)
      }
    },
    dutiesChange (e) {
      this.duties = e
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
