<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="所属实用人才类型">
        <view class="instruction at-row align-center" slot="right" @click="instructionPop=true"><!-- @click="instructionPop=true"-->
          <rcyj-icon name="shuoming" color="#E15147" size="30rpx"></rcyj-icon>
          <text class="pl-10">说明</text>
        </view>
      </caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择农村实用人才类型" :inval="practicalTalentCategory" @click="$refs.rank.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职业"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择从事岗位类别" :inval="profession" @click="$refs.profession.isShow=true"></rcjy-input>
      </view>
      <caption-box title="荣誉成就" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addHonor', honor === '1', 'pagesCalibration/fillInformation/managementHonor')" slot="right">{{ honor === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="相关职业资格" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addProfessional', professional === '1', 'pagesCalibration/fillInformation/managementProfessional')" slot="right">{{ professional === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>

      <view class="at-row align-center">
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">提交</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="profession" labelName="dictLabel" valueName="dictLabel" :list="professionList" @confirm="professionConfirm"/>
      <rcyj-picker-single ref="rank" labelName="label" valueName="value" :list="practicalTalentCategoryList" @confirm="rankConfirm"/>
    </view>
    <u-popup
      slot="instructionPop"
      mode="center"
      :safe-area-inset-bottom="true"
      border-radius="30"
      :closeable="true"
      width="590"
      height="810"
      v-model="instructionPop">
      <view class="instruction-wrapper">
        <view class="h1">农村实用人才类型说明</view>
        <u-tabs :list="navlist" active-color="#21BA80" :show-bar="false" :current="current" @change="navChange"></u-tabs>
        <view class="content">
          {{ current | conFilter }}
        </view>
      </view>
    </u-popup>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getDictTypeApi, updateBaseInfoApi, getBaseInfoApi, getProfessionalQueryApi, getHonorQueryApi, queryPerfectProportionApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'InformationIVGovern',
  filters: {
    conFilter (identity) {
      const statusMap = {
        0: '在统计年度内从事种植业、畜牧业、农产品加工和渔业生产、捕捞的农村劳动者。',
        1: '在统计年度内主要收入来源为经营性收入的农村住户。主要指农村开办企业的主要投资者或经营业主、农民专业合作组织者、农村经纪人。',
        2: '在统计年度内专门或主要从事农业技术服务，具有较高技术和服务水平，服务对象达到一定规模以上(10户以上)的村级农业技术服务人员。主要包括村级动物防疫员、植物病虫害综合防治员、农产品质量检验检测员、肥料配方师、农机驾驶和维修能手、农村能源工作人员等。',
        3: '在统计年度内具有制造业、加工业、建筑业、服务业等方面的特长或技能，以从事该行业作为主要经济来源，本人年纯收入大大超过本地农村居民人均纯收入，并能带动其他农民掌握该技术或进入该行业的农村劳动者。具体包括铁匠、木匠、泥匠、篾匠、漆匠、驾驶员、电工、家电维修者、理发师、手工艺人等人员',
        4: '在统计年度内主要从事农村文化、体育、医疗、就业、中介、社会保障等领域提供服务的农村劳动者。包括乡村文体艺术人才和乡村社会工作人员。'
      }
      return statusMap[identity]
    }
  },
  data () {
    return {
      instructionPop: false,
      // 填写进度
      progressNum: 0,
      // 所属实用性人才
      practicalTalentCategory: '',
      practicalTalentCategoryVal: '',
      practicalTalentCategoryList: [
        {
          value: '1',
          label: '生产型人才'
        },
        {
          value: '2',
          label: '经营型人才'
        },
        {
          value: '3',
          label: '技能服务型人才'
        },
        {
          value: '4',
          label: '经营技能带动型人才型人才'
        },
        {
          value: '5',
          label: '社会服务型人才'
        }
      ],
      // 职业必填
      profession: '',
      professionList: [],
      // 资格1:已添加2：未添加
      professional: '2',
      // 荣誉成就
      honor: '2',
      navlist: [
        {
          name: '生产型人才'
        },
        {
          name: '经营型人才'
        },
        {
          name: '技能服务型人才'
        },
        {
          name: '技能带动型人才'
        },
        {
          name: '社会服务型人才'
        }
      ],
      current: 0
    }
  },
  onLoad () {
    getBaseInfoApi().then(res => {
      this.practicalTalentCategoryVal = res.practicalTalentCategory
      this.practicalTalentCategoryList.forEach(element => {
        if (element.value === res.practicalTalentCategory) {
          this.practicalTalentCategory = element.label
        }
      })
      this.profession = res.profession
    })
    // 职业必填
    getDictTypeApi({ dictType: 'identity' }).then(res => {
      this.professionList = res
    })
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
    getProfessionalQueryApi().then(res => {
      if (res && res.length) {
        this.professional = '1'
      } else {
        this.professional = '2'
      }
    })
    getHonorQueryApi().then(res => {
      if (res && res.length) {
        this.honor = '1'
      } else {
        this.honor = '2'
      }
    })
  },
  methods: {
    navChange (index) {
      this.current = index
    },
    updateBaseInfo () {
      if (!this.practicalTalentCategory) {
        this.$toast('请选择所属实用人才类型')
        return
      }
      if (!this.profession) {
        this.$toast('请选择从事岗位类别')
        return
      }
      const params = {
        practicalTalentCategory: this.practicalTalentCategoryVal,
        profession: this.profession
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          this.$changePage('pagesCalibration/authorize/authorize')
        }, 1500)
      })
    },
    professionConfirm (e) {
      this.profession = e[0].value
    },
    rankConfirm (e) {
      this.practicalTalentCategory = e[0].label
      this.practicalTalentCategoryVal = e[0].value
    },
    goChangePage (url, has, management) {
      if (!has) {
        this.$changePage(url)
      } else {
        this.$changePage(management)
      }
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
