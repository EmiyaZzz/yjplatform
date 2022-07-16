<template>
  <rcyj-page-view>
    <view class="working-status-wrapper">
      <view class="bottombg" :style="{'background-image':'url('+bottomBg+')'}"></view>
      <view class="topbg" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">选择您的当前状态</view>
      </view>
      <view class="status-list at-row">
        <view class="status-item at-col-6" v-for="item in list" :key="item.num" @click="changeCurrent(item.num)">
          <text :class="{'active': current === item.num}">{{ item.name }}</text>
        </view>
      </view>
      <view class="choose-btn" @click="changeWorkStatus"><rcyj-button textColor="#fff" :bgColor="bgColor" height="88rpx">进入校正</rcyj-button></view>
      <view class="tips">预计填写校正信息时间3分钟</view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { getUserInfoApi, updateBaseInfoApi } from '@/api/common.js'
import rcyjButton from '../../components/rcyj-button/rcyj-button.vue'
export default Vue.extend({
  components: { rcyjButton },
  name: 'WORKINGSTATUS',
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201213/02ca4769001d4499b298dd428b3d6d99.png',
      bottomBg: this.$OSS_IMAGES_URL + '/20201213/38e1c0a996b047e8b393a9f5caa117b3.png',
      bgColor: 'linear-gradient(90deg, #21BA80 0%, #28986B 100%);',
      current: null,
      workStatus: null,
      list: [
        {
          name: '待业',
          num: '1'
        },
        {
          name: '在职',
          num: '2'
        },
        {
          name: '离退',
          num: '3'
        },
        {
          name: '返聘',
          num: '4'
        }
      ]
    }
  },
  onShow () {
    getUserInfoApi().then((data) => {
      this.workStatus = data.user.workStatus
      console.log(this.workStatus)
      /**
       * 根据状态current选中哪个
       */
      for (let i = 1; i < this.list.length; i++) {
        if (this.workStatus === this.list[i].num) {
          this.current = this.list[i].num
          return
        }
      }
    })
  },
  methods: {
    changeCurrent (num) {
      this.current = num
    },
    changeWorkStatus () {
      if (this.current) {
        const params = {
          workStatus: this.current
        }
        updateBaseInfoApi(params).then(res => {
          this.$changePage('pagesCalibration/fillInformation/informationI')
        })
      }
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
