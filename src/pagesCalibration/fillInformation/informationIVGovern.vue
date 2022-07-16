<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="党龄"></caption-box>
      <view class="content-box line-box">
        <rcjy-input
          type="number"
          placeholder="请输入(单位：年)"
          :inval="partyStanding"
          @input="partyStandingChange"
          maxlength="2"></rcjy-input>
      </view>
      <caption-box title="职业"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择从事岗位类别" :inval="profession" @click="$refs.profession.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职务"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择职务名称" :inval="duties" @click="$refs.duties.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职级"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择职务级别" :inval="professionalLevel" @click="$refs.rank.isShow=true"></rcjy-input>
      </view>
      <caption-box title="是否政协委员" mb="mb-40">
        <u-switch v-model="isCppccMember" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
        <!-- <view class="mb-40"></view> -->
      </caption-box>
      <view class="content-box at-row align-center mb-30" v-if="isCppccMember">
        <view class="single" :class="[item.val === CPPCCVal ? 'active' : '']" v-for="(item, index) in CPPCC" :key="item.val" @click="changeCPPCC(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="是否人大代表" mb="mb-40">
        <u-switch v-model="isRddb" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
        <view class="mb-40"></view>
      </caption-box>
      <caption-box title="是否党代表" mb="mb-40">
        <u-switch v-model="isPartyRepresentatives" active-color="rgba(33, 186, 128, 0.3)" inactive-color="rgba(144, 148, 160, 0.3)" slot="right"></u-switch>
        <view class="mb-40"></view>
      </caption-box>
      <caption-box title="基层工作经历" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addGrassExperience', grassExperience === '1', 'pagesCalibration/fillInformation/managementGrassExperience')" slot="right">{{ grassExperience === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="荣誉成就" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addHonor', honor === '1', 'pagesCalibration/fillInformation/managementHonor')" slot="right">{{ honor === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>

      <view class="at-row align-center">
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">提交</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="profession" labelName="dictLabel" valueName="dictLabel" :list="professionList" @confirm="professionConfirm"/>
      <rcyj-picker-single ref="duties" labelName="dictLabel" valueName="dictLabel" :list="dutiesList" @confirm="dutiesConfirm"/>
      <rcyj-picker-single ref="rank" labelName="dictLabel" valueName="dictLabel" :list="rankList" @confirm="rankConfirm"/>

    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getDictTypeApi, updateBaseInfoApi, getBaseInfoApi, getWorkexperiencesQueryApi, getHonorQueryApi, queryPerfectProportionApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'InformationIVGovern',
  data () {
    return {
      // 填写进度
      progressNum: 0,
      // 党龄必填
      partyStanding: '',
      // 职业必填
      profession: '',
      professionList: [],
      // 职务必填
      duties: '',
      dutiesList: [],
      // 职级必填
      professionalLevel: '',
      rankList: [],
      // 是否政协委员
      isCppccMember: true,
      CPPCCVal: '',
      CPPCC: [
        {
          name: '全国',
          val: '1'
        },
        {
          name: '省',
          val: '2'
        },
        {
          name: '市',
          val: '3'
        },
        {
          name: '区',
          val: '4'
        },
        {
          name: '县',
          val: '5'
        }
      ],
      // 是否人大代表
      isRddb: true,
      // 是否党代表
      isPartyRepresentatives: true,
      // 基层工作经历1:已添加2：未添加
      grassExperience: '2',
      // 荣誉成就
      honor: '2'
    }
  },
  onLoad () {
    getBaseInfoApi().then(res => {
      this.partyStanding = res.partyAge
      this.profession = res.profession
      this.duties = res.post
      this.professionalLevel = res.rank
      this.isCppccMember = res.isCppccMember === '1'
      this.CPPCCVal = res.cppccMemberLevel
      this.isRddb = res.isRddb === '1'
      this.isPartyRepresentatives = res.isPartyRepresentatives === '1'
    })
    // 职业必填
    getDictTypeApi({ dictType: 'identity' }).then(res => {
      this.professionList = res
    })
    // 职务必填
    getDictTypeApi({ dictType: 'position' }).then(res => {
      this.dutiesList = res
    })
    // 职级必填
    getDictTypeApi({ dictType: 'rank' }).then(res => {
      this.rankList = res
    })
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
    getWorkexperiencesQueryApi().then(res => {
      if (res && res.length) {
        this.grassExperience = '1'
      } else {
        this.grassExperience = '2'
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
    updateBaseInfo () {
      if (!this.partyStanding) {
        this.$toast('请输入党龄')
        return
      }
      if (!this.profession) {
        this.$toast('请选择从事岗位类别')
        return
      }
      if (!this.duties) {
        this.$toast('请选择职务名称')
        return
      }
      if (!this.professionalLevel) {
        this.$toast('请选择职务级别')
        return
      }
      if (this.isCppccMember && !this.CPPCCVal) {
        this.$toast('请选择政协委员级别')
        return
      }
      const params = {
        partyAge: this.partyStanding,
        profession: this.profession,
        post: this.duties,
        rank: this.professionalLevel,
        isCppccMember: this.isCppccMember ? '1' : '2',
        cppccMemberLevel: this.CPPCCVal,
        isRddb: this.isRddb ? '1' : '2',
        isPartyRepresentatives: this.isPartyRepresentatives ? '1' : '2'
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
    dutiesConfirm (e) {
      this.duties = e[0].value
    },
    rankConfirm (e) {
      this.professionalLevel = e[0].value
    },
    partyStandingChange (e) {
      this.partyStanding = e
    },
    changeCPPCC (index) {
      this.CPPCCVal = this.CPPCC[index].val
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
