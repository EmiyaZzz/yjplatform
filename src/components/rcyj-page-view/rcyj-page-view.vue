<template>
  <view class="rcyj-page-view">
    <slot name="header" />
    <rcyj-page-content>
      <slot />
    </rcyj-page-content>
    <slot name="footer" />
  </view>
</template>
<script>
export default {

}
</script>
<style lang="scss">
@import "./rcyj-page-view.scss";
</style>
