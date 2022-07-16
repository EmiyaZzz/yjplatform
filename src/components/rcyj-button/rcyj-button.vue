<template>
  <view
    :class="['rcyj-button', {disabled: disabled}]"
    :style="{'border': (border?border:'0'),'color':(disabled?'#999999':textColor),'background':(disabled?'#e9e9e9':bgColor),'pointer-events':(disabled?'none':''), 'height': height, 'line-height': height}"
    @click="$emit('click')"
  >
    <slot />
  </view>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      // default: '#fff'
      default:'#202023'
    },
    bgColor: {
      type: String,
      // default: 'linear-gradient(90deg, #3977f6 0%, #7ebafa 100%)'//linear-gradient(#3977f6, #7ebafa);
      default:'#fff'
    },
    height: {
      type: String,
      default: '100rpx'
    },
    border: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
@import "./rcyj-button.scss";
</style>
