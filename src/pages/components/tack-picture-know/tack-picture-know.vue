<template>
  <u-popup
    v-model="isShow"
    mode="center"
    :safe-area-inset-bottom="true"
    :closeable="true"
    :border-radius="30"
    :width="560">
    <view class="tack-picture-know-wrappper">
      <view class="title">拍摄须知</view>
      <image :src="standard" mode="widthFix"></image>
    </view>
  </u-popup>
</template>
<script>
export default {
  data () {
    return {
      standard: this.$OSS_IMAGES_URL + '/20201208/fd10ecb9a07045918d523bdfd8c3f9b2.png',
      isShow: false
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.tack-picture-know-wrappper {
    padding-bottom: 69rpx;

    .title {
        color: #1D1E1F;
        font-size: 36rpx;
        padding: 69rpx 0 55rpx;
        text-align: center;
        font-weight: bold;
    }

    image {
        width: 100%;
    }
}

</style>
