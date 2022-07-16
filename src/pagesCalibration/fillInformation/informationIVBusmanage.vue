<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="单位规模"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择单位规模区间" :inval="organizationSize" @click="$refs.rank.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职业"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择从事岗位类别" :inval="profession" @click="$refs.profession.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职级"></caption-box>
      <view class="content-box at-row align-center pt-30 mb-30">
        <view class="single degrees" :class="[item.val === learnVal ? 'active' : '']" v-for="(item, index) in learnStatus" :key="item.val" @click="changeLearnStatus(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="荣誉成就" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addHonor', honor === '1', 'pagesCalibration/fillInformation/managementHonor')" slot="right">{{ honor === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="相关职业资格" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addProfessional', professional === '1', 'pagesCalibration/fillInformation/managementProfessional')" slot="right">{{ professional === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="是否属于高新技术企业" mb="mb-40">
        <u-switch v-model="isAssessOrganizationLevel" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
        <!-- <view class="mb-40"></view> -->
      </caption-box>

      <view class="at-row align-center">
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">提交</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="profession" labelName="dictLabel" valueName="dictLabel" :list="professionList" @confirm="professionConfirm"/>
      <rcyj-picker-single ref="rank" labelName="dictLabel" valueName="dictValue" :list="organizationSizeList" @confirm="rankConfirm"/>

    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getDictTypeApi, updateBaseInfoApi, getBaseInfoApi, getProfessionalQueryApi, getHonorQueryApi, getScientificQueryApi, queryPerfectProportionApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'InformationIVGovern',
  data () {
    return {
      // 填写进度
      progressNum: 0,
      // 组织规模
      organizationSize: '',
      organizationVal: '',
      organizationSizeList: [],
      // 职业必填
      profession: '',
      professionList: [],
      // 职级
      learnVal: '',
      learnStatus: [
        {
          name: '高层',
          val: '3'
        },
        {
          name: '中层',
          val: '2'
        },
        {
          name: '基层',
          val: '1'
        }
      ],
      // 资格1:已添加2：未添加
      professional: '2',
      // 荣誉成就
      honor: '2',
      // 是否属于高新技术企业
      isAssessOrganizationLevel: true
    }
  },
  async onLoad () {
    await getBaseInfoApi().then(res => {
      this.organizationVal = res.unitSize
      this.profession = res.profession
      this.learnVal = res.rank
      this.isAssessOrganizationLevel = res.isHighTechEnterprise === '1'
    })
    // 职业必填
    await getDictTypeApi({ dictType: 'identity' }).then(res => {
      this.professionList = res
    })
    // 组织规模
    await getDictTypeApi({ dictType: 'organization_staff' }).then(res => {
      this.organizationSizeList = res
      this.organizationSizeList.forEach(val => {
        if (val.dictValue === this.organizationVal) {
          this.organizationSize = val.dictLabel
        }
      })
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
    // 科研成果
    getScientificQueryApi().then(res => {
      if (res && res.length) {
        this.scientific = '1'
      } else {
        this.scientific = '2'
      }
    })
  },
  methods: {
    updateBaseInfo () {
      if (!this.organizationSize) {
        this.$toast('请选择单位规模')
        return
      }
      if (!this.profession) {
        this.$toast('请选择从事岗位类别')
        return
      }
      if (!this.learnVal) {
        this.$toast('请选择职级')
        return
      }
      const params = {
        unitSize: this.organizationVal,
        profession: this.profession,
        rank: this.learnVal,
        isHighTechEnterprise: this.isAssessOrganizationLevel ? '1' : '2'
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
      this.organizationSize = e[0].label
      this.organizationVal = e[0].value
    },
    changeLearnStatus (index) {
      this.learnVal = this.learnStatus[index].val
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
