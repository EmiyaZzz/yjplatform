<template>
  <rcyj-page-view>
    <view class="information-wrapper pb-70">
      <view class="topbg" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">科研成果</view>
      </view>
      <view class="management-wrapper">
        <view v-if="list.length">
          <view class="management-item mb-40" v-for="(item, index) in list" :key="item.id" :style="{'height':item.unfold ? '300rpx':'134rpx'}">
            <view class="reveal at-row align-center space-between">
              <view class="title at-row align-center">
                <view class="name ellipsis">{{ item.scientificAchievementsName }}</view>
                <view class="grade">{{ item.scientificAchievementLevel | statusFilter }}</view>
              </view>
              <view class="unfold" @click="unfoldChange(index)" v-if="!isManagementTime">{{ item.unfold ? '收起' : '展开' }}</view>
              <image class="selectImg" :src="item.selected ? selected : unchecked" v-if="isManagementTime" @click="selectedChange(index)" />
            </view>
            <view class="pb-50">
              <view v-if="item.scientificAchievementMaterial.length>0">
                <view class="img-box" v-for="(val, tIndex) in item.scientificAchievementMaterial" :key="tIndex">
                  <image :src="val" />
                </view>
              </view>
              <view class="noImg" v-else>未上传相关证明照片</view>
            </view>
          </view>
        </view>
        <view class="pb-100" v-if="!isManagementTime">
          <view class="add" @click="add">添加新项</view>
          <view class="manage"><text @click="isManagementTime = true">管理条目</text></view>
        </view>
      </view>
      <view class="manage-bottom at-row align-center space-between" v-if="isManagementTime">
        <view class="finish" @click="isManagementTime = false">完成</view>
        <view class="del" @click="del">删除</view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import captionBox from '../components/caption/caption'
import { getScientificQueryApi, delScientificApi } from '@/api/common'
export default Vue.extend({
  name: 'AddHonor',
  components: { RcjyInput, captionBox },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '国家级',
        2: '省部级',
        3: '其他',
        4: '市厅级'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201213/0d5d8bbdce9a411e87393eb6e1a22970.png',
      unchecked: this.$OSS_IMAGES_URL + '/20201219/9347b577aa7d47528413d2c23c5a618c.png',
      selected: this.$OSS_IMAGES_URL + '/20201219/5392e50719554c94babfb8a0f949c894.png',
      list: [],
      isManagementTime: false
    }
  },
  onShow () {
    this.getHonorQuery()
  },
  methods: {
    getHonorQuery () {
      getScientificQueryApi().then(res => {
        const reslist = JSON.parse(JSON.stringify(res))
        this.list = []
        reslist.forEach(val => {
          val.unfold = false
          val.selected = false
          val.scientificAchievementMaterial = val.scientificAchievementMaterial ? JSON.parse(val.scientificAchievementMaterial) : []
          this.list.push(val)
        })
      })
    },
    unfoldChange (index) {
      this.list[index].unfold = !this.list[index].unfold
    },
    selectedChange (index) {
      this.list[index].selected = !this.list[index].selected
    },
    del () {
      const selectedList = this.list.filter((val, index) => {
        return val.selected
      })
      const ids = []
      selectedList.forEach(item => {
        ids.push(item.id)
      })
      delScientificApi({ ids: ids.join(',') }).then(res => {
        this.getHonorQuery()
        this.$toast('删除成功')
      })
    },
    add () {
      this.$changePage('/pagesCalibration/fillInformation/addScientific')
    }
  }
})
</script>
<style lang="scss">
    @import "./index.scss";
</style>
