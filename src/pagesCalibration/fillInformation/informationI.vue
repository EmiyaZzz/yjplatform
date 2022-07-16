<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <view class="item-1 at-row align-center">
        <image :src="personalEnter" mode="widthFix" />
        <text>{{ realName }}</text>
      </view>
      <caption-box title="性别"></caption-box>
      <view class="content-box at-row align-center">
        <view class="single sex" :class="[item.val === sexVal ? 'active' : '']" v-for="(item, index) in sex" :key="item.icon" @click="changeSex(index)">
          <rcyj-icon :name="item.icon" :color="item.val === sexVal ? '#A26E15' : '#9094A0'" size="28rpx"></rcyj-icon>
          <text class="ml-20">{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="国籍"></caption-box>
      <!-- <view class="content-box line-box">
        <rcjy-input :disabled="false" placeholder="请输入所属国籍" :inval="nationVal" @input="nationChange"></rcjy-input> <!-- @click="$refs.volk.isShow=true"-->
      <!---/view> -->
      <view class="content-box line-box at-row align-center">
        <view class="value nation ellipsis pr-30">{{ nationVal }}</view>
        <view class="placeholder" @click="chooseCountry">其他国籍请点击选择</view> <!--@click="$refs.nation.isShow=true"-->
      </view>
      <caption-box title="证件类型">
        <view class="certificate at-row align-center" slot="right"> <!--@click="$refs.certificate.isShow=true"-->
          <text class="pr-20">{{ certificateTypeVal==='1' ? '身份证' : '护照' }}</text>
          <rcyj-icon name="arrow-left-copy-copy" color="#9094A0" size="22rpx"></rcyj-icon>
        </view>
      </caption-box>
      <view class="content-box line-box">
        <rcjy-input placeholder="请输入证件号码" :inval="certificateVal" @input="certificateChange"></rcjy-input>
      </view>
      <caption-box title="民族">
        <view class="instruction at-row align-center" @click="instructionPop = true" slot="right">
          <rcyj-icon name="shuoming" color="#E15147" size="30rpx"></rcyj-icon>
          <text class="pl-10">说明</text>
        </view>
      </caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择所属民族" :inval="volkVal" @click="changeInstructionPop"></rcjy-input>
      </view>
      <caption-box title="政治面貌"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择所属党派" :inval="politicsStatusName" @click="$refs.politics.isShow=true"></rcjy-input>
      </view>
      <caption-box title="户籍所在地"></caption-box>
      <view class="content-box line-box mb-80">
        <rcjy-input :disabled="true" placeholder="请选择户籍所在省市区" :inval="registration"></rcjy-input>
        <rcyj-picker-districts ref="districts" @confirm="districtsConfirm" />
      </view>
      <rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">下一步</rcyj-button>
      <view class="tips mt-50">*当前页面信息暂不支持修改，仅作为身份验证信息校正，请认真填写！</view>
    </view>
    <u-popup
      slot="instructionPop"
      mode="center"
      :safe-area-inset-bottom="true"
      border-radius="30"
      :closeable="true"
      width="528"
      v-model="instructionPop">
      <view class="instruction-wrapper">
        <view class="h1">帮助说明</view>
        <view class="content">
          已加入中国国籍的外籍人员，可以根据申请加入的中国民族选择民族名称，如未申请加入中国民族，请在其他民族中填写原国籍名称。
        </view>
      </view>
    </u-popup>
    <view slot="picker">
      <rcyj-picker-single ref="nation" :list="nation" @confirm="nationConfirm"/>
      <rcyj-picker-single ref="certificate" :list="certificate" @confirm="certificateConfirm"/>
      <rcyj-picker-single ref="volk" labelName="nationName" valueName="nationName" :list="volkList" @confirm="volkConfirm"/>
      <rcyj-picker-single ref="politics" labelName="dictLabel" valueName="dictLabel" :list="politicsStatusNameList" @confirm="politicsConfirm"/>
    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import rcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getUserInfoApi, getDictTypeApi, updateBaseInfoApi, queryPerfectProportionApi, getNationListApi } from '@/api/common.js'
import { encode, decode } from 'js-base64'
export default Vue.extend({
  components: { rcyjButton, RcyjIcon, RcjyInput, informationWrapper, captionBox },
  name: 'INFORMATIONI',
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201213/0d5d8bbdce9a411e87393eb6e1a22970.png',
      progress: this.$OSS_IMAGES_URL + '/20201213/d064a7d9a4f04d908d82cbd957a14158.png',
      personalEnter: this.$IMAGES_URL + '/pic/personal-enter-img.png',
      caption: this.$OSS_IMAGES_URL + '/20201213/18299a60cdd44b1ba814201fc4e82afb.png',
      instructionPop: false,
      // 填写进度
      progressNum: 0,
      realName: '',
      // 性别
      sex: [
        {
          name: '男士',
          icon: 'nan',
          val: '男'
        },
        {
          name: '女士',
          icon: 'nv',
          val: '女'
        }
      ],
      sexVal: '',
      // 国籍
      nationVal: '中国',
      nation: [
        {
          value: '1',
          label: '中国'
        },
        {
          value: '2',
          label: '美国'
        }
      ],
      // 证件
      certificateTypeVal: '1',
      certificate: [
        {
          value: '1',
          label: '身份证'
        },
        {
          value: '2',
          label: '护照'
        }
      ],
      certificateVal: '',
      // 民族
      volkVal: '',
      volkList: [],
      // 政治面貌
      politicsStatusName: '',
      politicsStatusNameList: [
        {
          value: '1',
          label: '群众'
        },
        {
          value: '2',
          label: '党员'
        }
      ],
      // 户籍
      registration: '',
      // 身份类型（人才类型）1 党政人才 2企业经管人才 3专业技术人才 4 高技能人才 5农村实用人才 6 社会工作人才 7 在校大学生 8 高层次人才
      identityType: ''
    }
  },
  onShow () {
    this.getUserInfo()
    this.getDictType()
    this.$ls.remove('school')
    this.$ls.remove('addAcademy_options')
  },
  watch: {
    nationVal (newName) {
      if (newName !== '中国') {
        this.certificateTypeVal = '2'
        this.volkVal = '国际'
      } else {
        this.certificateTypeVal = '1'
        this.volkVal = ''
      }
    }
  },
  methods: {
    // nationVal==='中国' ? '' : instructionPop=true
    changeInstructionPop () {
      if (this.nationVal === '中国') {
        this.$refs.volk.isShow = true
      }
    },
    chooseCountry () {
      const addAcademyOptions = {
        sexVal: this.sexVal,
        nationVal: this.nationVal,
        certificateTypeVal: this.certificateTypeVal,
        certificateVal: this.certificateVal,
        volkVal: this.volkVal,
        politicsStatusName: this.politicsStatusName,
        registration: this.registration
      }
      const params = encodeURIComponent(encode(JSON.stringify(addAcademyOptions)))
      this.$ls.set('addCountry_options', params)
      this.$changePage('pagesCalibration/academy/addCountry')
    },
    getUserInfo () {
      queryPerfectProportionApi().then(res => {
        this.progressNum = res
      })
      getUserInfoApi().then(res => {
        this.realName = res.user.username
        this.sexVal = res.user.sex
        this.nationVal = res.user.national
        this.certificateTypeVal = res.user.idType ? res.user.idType : '1'
        this.certificateVal = res.user.idcard
        this.volkVal = res.user.nation
        this.politicsStatusName = res.user.politicalVisage
        this.registration = res.user.adress
        this.identityType = res.user.identityType

        if (this.$ls.get('addCountry_options')) {
          const params = JSON.parse(decode(decodeURIComponent(this.$ls.get('addCountry_options'))))
          this.sexVal = params.sexVal
          // this.nationVal = params.nationVal
          this.certificateTypeVal = params.certificateTypeVal
          this.certificateVal = params.certificateVal
          this.volkVal = params.volkVal
          this.politicsStatusName = params.politicsStatusName
          this.registration = params.registration
        }
        if (this.$ls.get('country')) {
          this.nationVal = this.$ls.get('country')
        }
      })
    },
    getDictType () {
      getDictTypeApi({ dictType: 'exponent_political_status' }).then(res => {
        this.politicsStatusNameList = res
      })
      getNationListApi().then(res => {
        this.volkList = res
      })
    },
    updateBaseInfo () {
      if (!this.sexVal) {
        this.$toast('请选择性别')
        return
      }
      if (!this.nationVal) {
        this.$toast('请输入国籍')
        return
      }
      if (!this.certificateTypeVal) {
        this.$toast('请选择证件类型')
        return
      }
      if (!this.certificateVal) {
        this.$toast('请输入证件号码')
        return
      }
      if (!this.volkVal) {
        this.$toast('请输入所属民族')
        return
      }
      if (!this.politicsStatusName) {
        this.$toast('请选择所属党派')
        return
      }
      if (!this.registration) {
        this.$toast('请选择户籍所在地')
        return
      }
      const params = {
        username: this.realName,
        sex: this.sexVal,
        national: this.nationVal,
        idType: this.certificateTypeVal,
        idcard: this.certificateVal,
        nation: this.volkVal,
        politicalVisage: this.politicsStatusName,
        adress: this.registration
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          this.$ls.remove('country')
          this.$ls.remove('addCountry_options')
          this.$changePage('pagesCalibration/fillInformation/informationII')
        }, 1500)
      })
    },
    nationConfirm (e) {
      this.nationVal = e[0].label
    },
    certificateChange (e) {
      this.certificateVal = e
    },
    volkChange (e) {
      this.volkVal = e
    },
    nationChange (e) {
      this.nationVal = e
    },
    certificateConfirm (e) {
      this.certificateTypeVal = e[0].value
    },
    volkConfirm (e) {
      this.volkVal = e[0].label
    },
    politicsConfirm (e) {
      this.politicsStatusName = e[0].label
    },
    changeSex (index) {
      this.sexVal = this.sex[index].val
    },
    districtsConfirm (data) {
      this.registration = data.provinceName + '-' + data.city + '-' + data.areaName
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
