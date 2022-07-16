<template>
  <picker
    mode="multiSelector"
    range-key="name"
    :value="cityIndex"
    :range="cityOptions"
    @columnchange="bindCityChange"
    @change="cityChange">
    <view class="in-cell-value"></view>
  </picker>
  <!-- 引入组件<rcyj-picker-districts ref="districts" @confirm="districtsConfirm" /> -->
</template>
<script>
import { getDistrictsListApi } from '@/api/common.js'
export default {
//   props: {
//     list: {
//       type: Array,
//       default: () => {
//         return []
//       }
//     }
//   },
  data () {
    return {
      isShow: true,
      provinceId: null, // 省份id
      province: '', // 省
      city: '', // 城市
      cityId: null, // 城市id
      area: '', // 区
      areaId: null, // 区县id
      cityOptions: [
        [],
        [],
        []
      ],
      cityIndex: [0, 0, 0]
    }
  },
  async created () {
    let cityid
    let areaid
    await getDistrictsListApi({ deep: 0 }).then(province => {
      this.cityOptions[0].push(...province.rows)
      cityid = province.rows[0].id
    })
    await getDistrictsListApi({
      pid: cityid
    }).then(city => {
      this.cityOptions[1].push(...city.rows)
      areaid = city.rows[0].id
    })
    await getDistrictsListApi({
      pid: areaid
    }).then(area => {
      this.cityOptions[2].push(...area.rows)
    })
  },
  methods: {
    cityChange: function (e) {
      this.cityIndex = e.detail.value
      this.province = this.cityOptions[0][this.cityIndex[0]].name
      this.city = this.cityOptions[1][this.cityIndex[1]].name
      this.area = this.cityOptions[2][this.cityIndex[2]].name
      this.provinceId = this.cityOptions[0][this.cityIndex[0]].id
      this.cityId = this.cityOptions[1][this.cityIndex[1]].id
      this.areaId = this.cityOptions[2][this.cityIndex[2]].id
      const params = {
        provinceName: this.province,
        provinceId: this.provinceId,
        city: this.city,
        cityId: this.cityId,
        areaName: this.area,
        areaId: this.areaId
      }
      this.$emit('confirm', params)
    },
    async bindCityChange (e) {
      if (e.detail.column === 0) { // 改变了第几列
        const cityid = this.cityOptions[0][e.detail.value].id // e.detail.value表示变更值的下标
        let areaid
        await getDistrictsListApi({
          pid: cityid
        }).then(city => {
          this.$set(this.cityOptions, 1, [])
          city.rows.forEach((val, index) => {
            this.cityOptions[1].push(val)
          })
          areaid = city.rows[0].id
        })
        await getDistrictsListApi({
          pid: areaid
        }).then(area => {
          this.$set(this.cityOptions, 2, [])
          this.cityOptions[2] = []
          area.rows.forEach((val, index) => {
            this.cityOptions[2].push(val)
          })
        })
      } else if (e.detail.column === 1) {
        const areaid = this.cityOptions[1][e.detail.value].id
        await getDistrictsListApi({
          pid: areaid
        }).then(area => {
          this.$set(this.cityOptions, 2, [])
          area.rows.forEach((val, index) => {
            this.cityOptions[2].push(val)
          })
        })
      }
    }
  }
}
</script>
<style scoped>
.in-cell-value {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
}
</style>
