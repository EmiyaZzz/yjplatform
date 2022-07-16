<template>
  <rcyj-page-view>
    <view class="choose-identity-wrapper">
      <view class="choose-top" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">请选择人才类型</view>
        <view class="h6">请按您的身份类型选择并填写校正信息</view>
      </view>
      <view class="swiper-wrapper">
        <swiper
          class="swiper"
          previous-margin="64rpx"
          next-margin="64rpx"
          :interval="interval"
          :duration="duration"
          :circular="true"
          :current="current"
          @change="changeCurrent">
          <swiper-item class="swiper-item-box" v-for="(item, index) in list" :key="item.val">
            <view class="swiper-item" :style="{'transform':index===current ? 'scaleY(1)' : 'scaleY(0.7)'}">
              <image :src="item.image" />
              <view class="identity-tit">{{ item.title }}</view>
              <view class="explain" @click="toIdentityNote(item.val)">身份类型说明</view>
            </view>
          </swiper-item>
        </swiper>
        <view class="indicator-dots">
          {{ current+1 | NumZero }}/{{ list.length | NumZero }}
        </view>
      </view>
      <view class="choose-btn"><rcyj-button height="88rpx" @click="updateBaseInfo">{{ Boolean(this.identityType) ? '已校正' : '选择' }}</rcyj-button></view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import rcyjButton from '../../components/rcyj-button/rcyj-button.vue'
import { updateBaseInfoApi } from '@/api/common'
export default Vue.extend({
  components: { rcyjButton },
  name: 'CHOOSEIDENTITY',
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201212/e9b8fa0504ea4fd793f20bdc456064d4.png',
      // 用户身份
      identityType: null,
      interval: 2000,
      duration: 500,
      current: 0,
      // identityType (string, optional): 1 党政人才 2企业经管人才 3专业技术人才 4 高技能人才 5农村实用人才 6 社会工作人才 7 在校大学生 8 高层次人才 ,
      list: [{
        image: this.$OSS_IMAGES_URL + '/20201213/3dd32132592d4ddbb353dde75c97e94e.png',
        title: '党政人才',
        val: '1'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/14d71224b03e430da483532734478de3.png',
        title: '企业经营人才',
        val: '2'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/708d9c1349c7490a9651700ad6a0e2bf.png',
        title: '专业技术人才',
        val: '3'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/98ad779167e1453ab37d994e44e46e05.png',
        title: '高技能人才',
        val: '4'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/a9221720a2b4471da9bfcdbedaaf4475.png',
        title: '农村实用人才',
        val: '5'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/c081aedf621d4b458c66c520d43df2fd.png',
        title: '社会工作人才',
        val: '6'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/a5b35812739a40978b444060ebf80183.png',
        title: '高层次人才',
        val: '8'
      },
      {
        image: this.$OSS_IMAGES_URL + '/20201213/4cc2d69d3eb640869ac5b51f5778dfea.png',
        title: '在校大学生',
        val: '7'
      }
      ]
    }
  },
  filters: {
    NumZero: function (val) {
      return val < 10 ? '0' + val : val
    }
  },
  created () {
  },
  onLoad (options) {
    if (options.identityType) {
      this.identityType = options.identityType
      /**
       * 根据身份current选中哪个
       */
      for (let i = 0; i < this.list.length; i++) {
        if (this.identityType === this.list[i].val) {
          this.current = i
          return
        }
      }
    }
  },
  methods: {
    changeCurrent (event) {
      this.current = event.detail.current
    },
    toIdentityNote (identityType) {
      this.$changePage('pagesCalibration/identityNote/index?identityType=' + identityType)
    },
    updateBaseInfo () {
      /**
       * 如果已经校正过身份有身份了不用调更新身份接口
       * 如果身份是学生直接跳转到信息填写页面，其他跳转到人才状态选择
       */
      if (this.identityType) {
        if (this.identityType === '7') {
          this.$changePage('pagesCalibration/fillInformation/informationI')
        } else {
          this.$changePage(`pagesCalibration/workingStatus/index`)
        }
      } else {
        const params = {
          identityType: this.list[this.current].val
        }
        updateBaseInfoApi(params).then(res => {
          if (params.identityType === '7') {
            this.$changePage('pagesCalibration/fillInformation/informationI')
          } else {
            this.$changePage(`pagesCalibration/workingStatus/index`)
          }
        })
      }
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
