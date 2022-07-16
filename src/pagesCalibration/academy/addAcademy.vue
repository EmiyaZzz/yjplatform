<template>
  <view class="add-academy-wrapper">
    <view class="box">
      <view class="choose">
        <view class="line-box">
          <rcjy-input :disabled="true" placeholder="选择省份" :inval="prinvinceName" @click="$refs.prinvince.isShow=true"></rcjy-input>
          <rcyj-icon name="arrow-left-copy-copy" size="24rpx" color="#9094A0"></rcyj-icon>
        </view>
        <rcjy-input placeholder="请输入院校名称查询" :inval="academy" @input="changVal"></rcjy-input>
      </view>
      <text class="cancel" @click="cancel">取消</text>
    </view>
    <view class="list" v-if="list.length>0">
      <view class="item" v-for="item in list" :key="item.id" @click="choose(item.schoolName)">{{ item.schoolName }}</view>
    </view>
    <view class="no-data" v-if="list.length===0">
      <text class="tips">没有查询到信息</text>
      <rcyj-button height="50rpx" bgColor="transparent" textColor="#A26E15">
        <text class="choose" @click="chooseNo">选择</text>
      </rcyj-button>
    </view>
    <rcyj-picker-single ref="prinvince" labelName="name" valueName="id" :list="prinvinceList" @confirm="prinvinceConfirm"/>
  </view>
</template>
<script>
import Vue from 'vue'
import RcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import { getSchoolListApi, getDistrictsListApi } from '@/api/common.js'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
export default Vue.extend({
  components: { RcjyInput, RcyjButton, RcyjIcon },
  data () {
    return {
      academy: '',
      list: [],
      prinvinceName: '',
      prinvinceId: null,
      prinvinceList: []
    }
  },
  onLoad () {
    // this.getSchoolList()
    getDistrictsListApi({ deep: 0 }).then(province => {
      this.prinvinceList.push(...province.rows)
    })
  },
  methods: {
    prinvinceConfirm (e) {
      console.log(e)
      this.prinvinceName = e[0].label
      this.prinvinceId = e[0].value
    },
    changVal (val) {
      this.academy = val
      this.getSchoolList()
    },
    getSchoolList () {
      const params = {
        prinvinceId: this.prinvinceId,
        schoolName: this.academy
      }
      getSchoolListApi(params).then(res => {
        this.list = []
        this.list = res
      })
    },
    cancel () {
      this.$ls.remove('school')
      this.$pageBack()
    },
    chooseNo () {
      this.$ls.set('school', this.academy)
      this.$pageBack()
    },
    choose (academy) {
      this.$ls.set('school', academy)
      this.$pageBack()
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
