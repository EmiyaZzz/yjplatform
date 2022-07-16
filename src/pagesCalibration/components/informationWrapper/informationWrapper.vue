<template>
  <rcyj-page-view>
    <view class="information-wrapper">
      <view class="topbg" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">请填写校正信息<text>{{ identity | identityFilter }}</text></view>
        <view class="h6">信息完善进度</view>
        <view class="my-progress">
          <view class="progress-area">
            <u-line-progress
              :percent="progressNum"
              active-color="#C99E54"
              inactive-color="#393B3F"
              :show-percent="false"
              height="13"
              :striped="true"
              :striped-active="true">
              <img :src="progress" :style="{'left': (progressNum-5)+'%'}">
            </u-line-progress>
          </view>
          <view class="striped">{{ progressNum+'%' }}</view>
        </view>
      </view>
      <slot name="formWrapper"></slot>
      <slot name="instructionPop"></slot>
      <view class="tips">请确保信息填写正确如信息有误会影响您的身价校正结果及相关业务</view>
    </view>
    <slot name="picker"></slot>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { getBaseInfoApi } from '@/api/common'
export default Vue.extend({
  name: 'INFORMATIONWrapper',
  props: {
    progressNum: {
      type: Number,
      default: 0
    }
  },
  filters: {
    identityFilter (identity) {
      const statusMap = {
        1: '党政人才',
        2: '企业经管人才',
        3: '专业技术人才',
        4: '高技能人才',
        5: '农村实用人才',
        6: '社会工作人才',
        7: '在校大学生',
        8: '高层次人才'
      }
      return statusMap[identity]
    }
  },
  data () {
    return {
      identity: '',
      topBg: this.$OSS_IMAGES_URL + '/20201213/0d5d8bbdce9a411e87393eb6e1a22970.png',
      progress: this.$OSS_IMAGES_URL + '/20201213/d064a7d9a4f04d908d82cbd957a14158.png'
    }
  },
  created () {
    getBaseInfoApi().then(res => {
      this.identity = res.identityType
    })
  },
  methods: {

  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
