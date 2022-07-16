<template>
  <rcyj-page-view>
    <view class="revise-wrapper" :style="{'background-image':'url('+revise+')'}">
      <view class="loading">正在校正中...</view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { reCalculateScoreApi } from '@/api/common'
export default Vue.extend({
  name: 'Revise',
  data () {
    return {
      revise: this.$OSS_IMAGES_URL + '/20201219/54223de344bc4c858aa1ebdbc858b7e9.gif'
    }
  },
  onLoad () {
    reCalculateScoreApi().then(res => {
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        })
        // this.$changePage('pages/index/index')
      }, 3000)
    })
  }
})
</script>
<style lang="scss">
    @import "./index.scss";
</style>
