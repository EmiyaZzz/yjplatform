<template>
  <view class="caption-box at-row align-center space-between" :class="{'mb-40': mb!=='0'}">
    <view class="caption at-row align-center space-between">
      <image :src="caption" mode="widthFix" class="captionImg" />
      <view class="title">{{ title }}</view>
    </view>
    <slot name="right"></slot>
  </view>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    mb: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      caption: this.$OSS_IMAGES_URL + '/20201213/18299a60cdd44b1ba814201fc4e82afb.png'
    }
  }
})
</script>
<style lang="scss">
.caption-box {
    .caption {
        .captionImg {
            width: 20rpx;
            margin-right: 23rpx;
        }

        .title {
            color: #1D1E1F;
            font-size: 32rpx;
            font-weight: bold;
        }
    }
}
</style>
