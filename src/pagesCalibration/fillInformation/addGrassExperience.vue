<template>
  <rcyj-page-view>
    <view class="information-wrapper pb-70">
      <view class="topbg" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">添加基层工作经历</view>
      </view>
      <view class="form-wrapper add-form-wrapper">
        <caption-box title="工作时间"></caption-box>
        <view class="content-box line-box">
          <view class="picker-wrappper at-row align-center">
            <assess-date-picker @confirm="confirmStartDate"></assess-date-picker>
            <view class="middle">-</view>
            <assess-date-picker @confirm="confirmEndDate"></assess-date-picker>
          </view>
          <view class="two-line text-r at-row align-center space-between">
            <rcjy-input :disabled="true" placeholder="请选择开始时间" :inval="startDate"></rcjy-input>
            <view class="middle">-</view>
            <rcjy-input :disabled="true" placeholder="请选择结束时间" inputAlign="right" :inval="endDate"></rcjy-input>
          </view>
        </view>
        <caption-box title="工作地点"></caption-box>
        <view class="content-box line-box">
          <rcjy-input :disabled="true" placeholder="请选择工作省市区县及街道" :inval="workPlace"></rcjy-input>
          <rcyj-picker-districts ref="districts" @confirm="districtsConfirm" />
        </view>
        <caption-box title="担任职务"></caption-box>
        <view class="content-box line-box">
          <rcjy-input placeholder="请填写职务名称" :inval="business" @input="businessChange"></rcjy-input>
        </view>

        <view class="at-row align-center">
          <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="addWorkexperiences">添加</rcyj-button></view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import AssessDatePicker from '../../components/assess-date-picker/assess-date-picker.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import captionBox from '../components/caption/caption'
import { addWorkexperiencesApi } from '@/api/common'
export default Vue.extend({
  name: 'AddHonor',
  components: { RcjyInput, captionBox, AssessDatePicker },
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201213/0d5d8bbdce9a411e87393eb6e1a22970.png',
      upload: this.$UploadUrl,
      // 工作时间
      startDate: '',
      endDate: '',
      // 工作地点
      workPlace: '',
      // 担任职务
      business: ''
    }
  },
  created () {

  },
  methods: {
    addWorkexperiences () {
      if (!this.startDate) {
        this.$toast('请选择工作开始时间')
        return
      }
      if (!this.endDate) {
        this.$toast('请选择工作结束时间')
        return
      }
      if (!this.endDate) {
        this.$toast('请选择工作地点')
        return
      }
      if (!this.endDate) {
        this.$toast('请输入职务名称')
        return
      }
      const params = {
        workStartDate: this.startDate,
        workEndDate: this.endDate,
        workArea: this.workPlace,
        workPosition: this.business
      }
      addWorkexperiencesApi(params).then(res => {
        this.$toast('添加成功')
        setTimeout(() => {
          this.$pageBack()
        }, 1500)
      })
    },
    confirmStartDate (val) {
      this.startDate = val
    },
    confirmEndDate (val) {
      this.endDate = val
    },
    businessChange (e) {
      this.business = e
    },
    districtsConfirm (data) {
      this.workPlace = data.provinceName + '-' + data.city + '-' + data.areaName
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
