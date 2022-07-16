<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="rank-out-wrapper">
        <view
          class="rank-out-top"
          :style="{'background-image':'url('+rankOutTop+')'}"
        />
        <view
          class="rank-out-bottom"
          :style="{'background-image':'url('+rankOutBottom+')'}"
        />
        <view class="ranking-ten-box">
          <view class="rank-ten-tit">
            <image
              :src="rankTenTit"
              mode="widthFix"
            />
          </view>
          <view class="at-row align-center th">
            <text>排名</text>
            <text>用户</text>
            <text>身价</text>
          </view>
          <view
            v-for="(item, index) in rankList"
            :key="index"
            class="at-row align-center td"
          >
            <view
              v-if="index===0"
              class="at-row align-center"
            >
              <image
                :src="rankOne"
                mode="widthFix"
              />
            </view>
            <view
              v-else-if="index===1"
              class="at-row align-center"
            >
              <image
                :src="rankTwo"
                mode="widthFix"
              />
            </view>
            <view
              v-else-if="index===2"
              class="at-row align-center"
            >
              <image
                :src="rank3"
                mode="widthFix"
              />
            </view>
            <text v-else>
              第{{ index+1 }}名
            </text>
            <text>{{ item.name }}</text>
            <text>{{ item.socialScore }}</text>
          </view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { getRankListApi } from '@/api/common.js'
export default Vue.extend({
  data () {
    return {
      defaultAvatar: this.$IMAGES_URL + '/pic/default-head.png',
      personalEnter: this.$IMAGES_URL + '/pic/personal-enter-img.png',
      V: this.$IMAGES_URL + '/pic/V.png',
      indexTopBg: this.$IMAGES_URL + '/pic/index-top-bg.png',
      rankIcon: this.$IMAGES_URL + '/pic/rank-icon.png',
      timeIcon: this.$IMAGES_URL + '/pic/time-icon.png',
      rankTenTit: this.$IMAGES_URL + '/pic/rank-ten-tit.png',
      rankOne: this.$IMAGES_URL + '/pic/rank-one.png',
      rankTwo: this.$IMAGES_URL + '/pic/rank-two.png',
      rank3: this.$IMAGES_URL + '/pic/rank-3.png',
      loginPopImg: this.$IMAGES_URL + '/pic/login-pop-img.png',
      mobileIcon: this.$IMAGES_URL + '/pic/mobile-icon.png',
      editIcon: this.$IMAGES_URL + '/pic/edit-icon.png',
      rankOutTop: this.$IMAGES_URL + '/pic/rank-out-top.png',
      rankOutBottom: this.$IMAGES_URL + '/pic/rank-out-bottom.png',
      rankList: []
    }
  },
  onLoad () {

  },
  onShow () {
    getRankListApi().then(data => {
      this.rankList = data
    })
  },
  methods: {
  }
})
</script>

<style lang="scss">
.index-wrapper {
    min-height: 100vh;
    background-color: #1D1E1F;
	.rank-out-wrapper {
        position: relative;
        padding: 0 40rpx 60rpx;

        .rank-out-top {
            width: 318rpx;
            height: 829rpx;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
        }

        .rank-out-bottom {
            width: 389rpx;
            height: 732rpx;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            bottom: 0;
            right: 0;
        }

        .ranking-ten-box {
            padding: 90rpx 0 50rpx;
            border-radius: 20rpx;

            .rank-ten-tit {
                margin-bottom: 35rpx;
                text-align: center;

                image {
                    width: 476rpx;
                }
            }

            .th, .td {
                text, view {
                    flex: 1;
                    line-height: 84rpx;
                    color: #C99E54;
                    font-size: 28rpx;
                    text-align: center;

                    image {
                        width: 56rpx;
                        margin: 0 auto;
                    }
                }
            }

            .td {
                &:nth-child(2n+1){
                    background-color: rgba(255, 223, 158, 0.05);
                }
                text {
                    color: #F6DEB0;
                }
            }
        }

    }
}
</style>
