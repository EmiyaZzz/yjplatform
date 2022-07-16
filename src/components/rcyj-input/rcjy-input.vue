<template>
  <u-input
    :input-align="inputAlign"
    :type="type"
    v-model="value"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :border="border"
    :placeholder-style="placeholderStyle"
    :custom-style="customStyle"
    :disabled="disabled"
    @blur="$emit('blur')"
    @input="changeVal"
    @click="$emit('click')" />
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    maxlength: {
      type: String,
      default: '18'
    },
    border: {
      type: Boolean,
      default: false
    },
    inval: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    inputAlign: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      placeholderStyle: 'color: #9094A0;fontSize: 30rpx',
      customStyle: {
        color: '#1D1E1F',
        fontSize: '30rpx'
      },
      value: ''
    }
  },
  watch: {
    inval: function (val) {
      console.log(val)
      this.value = val
    }
  },
  created () {
    this.value = this.inval
  },
  methods: {
    changeVal (e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="scss">
// @import "./rcyj-button.scss";
</style>
