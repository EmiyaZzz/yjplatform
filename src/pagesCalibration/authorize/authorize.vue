<template>
  <rcyj-page-view>
    <view class="authorize-wrapper">
      <view class="title">请确认校正信息并授权</view>
      <view class="time">提交时间：{{ today }}</view>
      <view class="content">
        <p>身价校正信息授权管理，将为您的信息安全提供保障，确保您的隐私信息不被泄露。</p>
        <p>您在填写校正信息时，请务必确保信息的真实性、正确性和完整性，以便获取准确的校正结果。如果信息有误，将无法获取准确的校正结果，同时会影响您的身价信用以及其他相关业务。</p>
        <view class="mt-150 at-row align-center space-between">
          <view class="felx-group mr-20"><rcyj-button textColor="#fff" bgColor="#9094A0" @click="$pageBack()">拒绝授权</rcyj-button></view>
          <view class="felx-group ml-20"><rcyj-button @click="revise">确认并授权</rcyj-button></view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import rcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import { formatterDate } from '@/utils/utils'
export default Vue.extend({
  components: { rcyjButton },
  name: 'Authorize',
  data () {
    return {

    }
  },
  computed: {
    today: function () {
      return formatterDate()
    }
  },
  methods: {
    revise () {
      this.$changePage('pagesCalibration/authorize/revise')
    }
  }
})
</script>
<style lang="scss">
    @import "./index.scss";
</style>
