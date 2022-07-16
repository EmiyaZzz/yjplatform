<template>
  <view class="add-academy-wrapper">
    <!-- <view class="box">
      <rcjy-input placeholder="请输入国家名称查询" :inval="academy" @input="changVal"></rcjy-input>
      <text class="cancel" @click="cancel">取消</text>
    </view> -->
    <view class="list">
      <view class="item" v-for="item in list" :key="item.id" @click="choose(item.countryName)">{{ item.countryName }}</view>
    </view>
    <!-- <view class="no-data" v-if="list.length===0">
      <text class="tips">没有查询到信息</text>
      <rcyj-button height="50rpx" bgColor="transparent" textColor="#A26E15">
        <text class="choose" @click="chooseNo">选择</text>
      </rcyj-button>
    </view> -->
  </view>
</template>
<script>
import Vue from 'vue'
import RcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import { getCountryListApi } from '@/api/common.js'
export default Vue.extend({
  components: { RcjyInput, RcyjButton },
  data () {
    return {
      academy: '',
      list: []
    }
  },
  onLoad () {
    this.getSchoolList()
  },
  methods: {
    changVal (val) {
      this.academy = val
      this.getSchoolList()
    },
    getSchoolList () {
      getCountryListApi().then(res => {
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
      this.$ls.set('country', academy)
      this.$pageBack()
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
