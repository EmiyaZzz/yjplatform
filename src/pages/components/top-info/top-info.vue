<template>
  <view class="top-bg">
    <view class="avator" :style="{ 'background-image': 'url(' + imgAvator + ')' }"></view>
    <view>
      <view class="name-bg">
        <view class="name">{{ info.realName }}</view>
        <view class="perbtn" @click="toAssessment">完善信息</view>
      </view>
      <view class="level-bg">
        <p>{{ identityType.label }}</p>
      </view>
    </view>
    <view class="qrcode">
      <img :src=imgQrcode alt="" @click="toDoc">
    </view>
    <!-- <view class="city" >
      
    </view> -->
  </view>
</template>
<script>
import {
  userInfo,
  queryDictDataByType,
  getUserInfoApi
} from '@/api/common.js'
export default {
  props: {

  },
  data() {
    return {
      info: { realName: '鹿小才' },
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      identityType: '',
      identityTypeList: [],
      imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
      imgQrcode: this.$OSS_IMAGES_URL + '/20220617/qrt.png',
      scoreStatus: '0'
    }
  },
  watch: {
    identityType(newData, oldData) {
    }
  },
  created() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    // console.log( this.getToken)
    if (this.getToken) {
      this.dataSet()
    } else {
      //  this.$changePage("pagesAuth/login/index");
    }

  },
  methods: {
    toAssessment() {
      this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
      // console.log( this.getToken)
      if (this.getToken) {
        this.isShow = false
        // this.$changePage("pages/evaIdentityTypeSelect/index");
        this.$changePage('pages/wodeInfo/index')
      } else {
        this.$toast('未登录，请点击“我的”进行登录')
      }

    },
    dataSet() {
      userInfo().then((data) => {

        if (data.photoOssUrl) {
          this.imgAvator = data.photoOssUrl

        }
        this.scoreStatus = data.scoreStatus
      })
      queryDictDataByType({
        dictType: 'talent_type'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.identityTypeList.push(temp)
        }
        getUserInfoApi().then((result) => {
          if (!result)
            return
          this.info = result
          this.identityTypeList.forEach(element => {
            if (element.value == result.talentCategory) {
              this.identityType = element
              // eslint-disable-next-line vue/custom-event-name-casing
              this.$emit('getIdentityInfo', this.identityType)
            }
          });
        }).catch((err) => {

        });
      }).catch((err) => {

      });
    },
    toDoc() {
      console.log(this.getToken)
      this.checkStatus("pages/sjDoc/index")
    },
    checkStatus(url) {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      }
      else {
        this.isShow = false
        if (this.scoreStatus == '2') {
          // this.$changePage("pages/sjcertificate/index");
          this.$changePage(url);
        } else {
          if (this.scoreStatus == '0') {
            uni.showToast({
              icon: 'none',
              title: `未进行快速评估，即将前往快速评估`,
              duration: 2000
            })
            setTimeout(() => {
              this.$changePage('pages/sjsearch/index')
            }, 2000);
          }
          if (this.scoreStatus == '1') {
            uni.showToast({
              icon: 'none',
              title: `未进行身价评估，即将前往身价评估`,
              duration: 2000
            })
            setTimeout(() => {
              this.$changePage("pages/evaIdentityTypeSelect/index");
            }, 2000);
          }
        }
      }
    },
  }
}
</script>
<style lang="scss">
@import "./top-info.scss";
</style>