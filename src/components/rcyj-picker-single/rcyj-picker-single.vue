<template>
  <u-select
    v-model="isShow"
    :list="list"
    :safe-area-inset-bottom="true"
    confirm-color="#21BA80"
    :label-name="labelName"
    :value-name="valueName"
    @confirm="confirm"
  />
  <!-- 引入组件<rcyj-picker-single ref="credentials" :list="credentials" @confirm="credentialsConfirm"/> -->
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelName: {
      type: String,
      default: 'label'
    },
    valueName: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    confirm (result) {
      const date = result
      this.$emit('confirm', date)
    }
  }
}
</script>
