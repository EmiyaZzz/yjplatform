<template>
  <u-picker
    v-model="isShow"
    :params="params"
    :start-year="startYear"
    :end-year="endYear"
    :title="title"
    mode="time"
    @confirm="timeConfim"
  />
  <!-- 引入组件<rcyj-date ref="time" @confirm="timeConfim"/> -->
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false
      }
    }
  },
  computed: {
    startYear () {
      return '1900'
    },
    endYear () {
      return new Date().getFullYear()
    }
  },
  methods: {
    timeConfim (result) {
      const date = result.year + '-' + result.month + '-' + result.day
      this.$emit('confirm', date)
    }
  }
}
</script>
