<template>
  <i
    :class="['iconfont', 'rcyj-icon', iconName ]"
    :style="{fontSize: size, color: color, width: size, height: size}"
    @click="$emit('click')"
  >
    <u-badge
      :count="badge"
      :is-dot="true"
      :absolute="true"
      :offset="[-5, -5]"
      type="error"
    />
  </i>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    badge: {
      type: Number,
      default: 0
    }
  },
  computed: {
    iconName () {
      return 'icon' + this.name
    }
  }
}
</script>
<style lang="scss">
@import "./rcyj-icon.scss";
</style>
