<template>
  <view class="rcyj-page-content">
    <slot />
  </view>
</template>
<script>
export default {
  // data () {
  //   return {
  //     hei: '94vh'
  //   }
  // },
  onLoad () {

  },
  mounted () {
    // #ifdef MP
    // this.hei = '100vh'
    // this.$logs('change to ' + this.hei)
    // #endif
  }
}
</script>
<style lang="scss">
@import "./rcyj-page-content.scss";
</style>
