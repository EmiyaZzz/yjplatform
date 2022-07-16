<template>
  <view style="position: relative; height: 70rpx">
    <picker
      mode="multiSelector"
      :value="selectorIndex"
      :range="columns"
      range-key="text"
      @change="selectorChange"
      @columnchange="onChange"
    >
      <slot name="content"></slot>
      <view class="time"></view><!--{{ selectedDate }}-->
    </picker>
  </view>
</template>

<script>
import rcjyInput from '../rcyj-input/rcjy-input'
export default {
  components: {
    rcjyInput
  },
  props: {
    // 是否展示今年之后的年份月份
    hasAfterDate: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    selectorIndex () {
      if (this.columns[1].length) {
        this.selectedDate = this.columns[0][this.selectorIndex[0]].text + '-' + this.columns[1][this.selectorIndex[1]].text
      } else {
        this.selectedDate = this.columns[0][this.selectorIndex[0]].text
      }
      this.$emit('confirm', this.selectedDate)
    }
  },
  data () {
    return {
      entryPopupShow: false,
      columns: [
        // 第一列
        [],
        // 第二列
        []
      ],
      selectorIndex: [0, 0],
      monthFull: [],
      month: [],
      selectedDate: ''
    }
  },
  created () {
    const now = new Date()
    const nowdata = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate()
    }
    if (!this.hasAfterDate) {
      // 初始化近30年
      for (let i = nowdata.year - 60; i <= nowdata.year; i++) {
        this.columns[0].push({
          text: i,
          value: i
        })
      }
    } else {
      // 初始化今年前30年后10年
      for (let i = nowdata.year - 60; i <= nowdata.year + 10; i++) {
        this.columns[0].push({
          text: i,
          value: i
        })
      }
    }
    this.columns[0].push({ text: '至今', value: '-1' })
    // 默认显示今年
    this.columns[0].forEach((val, index) => {
      if (val.value === nowdata.year) {
        this.selectorIndex[0] = index
      }
    })
    //  初始化12个月
    for (let i = 1; i <= 12; i++) {
      this.monthFull.push({
        text: i < 10 ? '0' + i : '' + i,
        value: i
      })
    }
    // 当前年 ,限制月份小于等于当前月
    for (let i = 1; i <= nowdata.month; i++) {
      this.month.push({
        text: i < 10 ? '0' + i : '' + i,
        value: i
      })
    }
    // 默认显示本月
    if (!this.hasAfterDate) {
      this.month.forEach((val, index) => {
        this.columns[1].splice(0, this.columns[1].length)
        this.columns[1].push(...this.month)
        if (val.value === nowdata.month) {
          this.selectorIndex[1] = index
        }
      })
    } else {
      this.columns[1].splice(0, this.columns[1].length)
      this.columns[1].push(...this.monthFull)
      this.monthFull.forEach((val, index) => {
        if (val.value === nowdata.month) {
          this.selectorIndex[1] = index
        }
      })
    }
  },
  methods: {
    chooseEntry (value) {
      this.$emit(
        'confirm',
        this.columns[value[0]].text + '-' + this.columns[value[1]].text
      )
    },
    selectorChange (e) {
      this.selectorIndex = e.target.value
    },
    onChange (e) {
      const value = e.detail
      console.log(this.columns[0][value.value].value)
      if (value.column === 0) {
        if (this.columns[0][value.value].value === '-1') {
          this.columns[1].splice(0, this.columns[1].length)
        } else if (!this.hasAfterDate) {
          this.columns[1].splice(0, this.columns[1].length)
          if (this.columns[0][value.value].value >= new Date().getFullYear()) {
            this.columns[1].push(...this.month)
          } else {
            this.columns[1].push(...this.monthFull)
          }
        } else {
          this.columns[1].splice(0, this.columns[1].length)
          this.columns[1].push(...this.monthFull)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time  {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 70rpx;
  z-index: 10;
}
</style>
