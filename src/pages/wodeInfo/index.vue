<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <view class="wode-bg">
          <view class="content">
            <view @click="openSheet('headImg')" class="avator"
              :style="{ 'background-image': 'url(' + imgAvator + ')' }">
            </view>
            <view>
              <view class="text-bg">
                <view>{{ userName }}</view>
                <!-- <view>身价号：shenjiahao</view> -->
                <view class="identityType">{{ identityType.label }}</view>
                <!-- <view>山东省代理</view> -->
              </view>
              <view class="jf-bg">
                身价积分：{{ accumulatePoints }}
              </view>
            </view>
          </view>
          <view class="sj">
            <view style="display:flex">
              <img class="sjcion" :src=complexScoreIcon alt="">
              <p>身价值</p>
              <p class="smallw">（万元）</p>
            </view>
            <view>
              {{ complexScore }}
            </view>

          </view>
        </view>
        <view class="fun-bg">
          <view class="btn1 long" @click="toChangePass()">
            <p class="p1">修改密码</p>
          </view>
        </view>
        <view class="fun-bg">
          <view class="btn1 long" @click="toChangeEmail()">
            <p class="p1">修改邮箱</p>
          </view>
        </view>
        <!-- <view style="height: 450rpx;">
        </view> -->

        <view class="fun-bg">
          <view class="btn1 long redbg" @click="outLogin()">
            <p class="p1">退出登录</p>
          </view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  userInfo,
  getUserInfoApi,
  userScore,
  queryDictDataByType
} from '@/api/common.js'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
export default Vue.extend({
  components: {
    MinePop,
    FunPop
  },
  data() {
    return {
      userId: '',
      accumulatePoints: 0,  //身价积分
      userName: '',
      complexScore: '',
      identityType: '',
      identityTypeList: [],
      getToken: '',
      imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
      complexScoreIcon: this.$OSS_IMAGES_URL + '/20220617/jf.png',
    }
  },
  onLoad() {

  },
  onShow() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (this.getToken) {
      this.dataSet()
      getUserInfoApi().then((data) => {
        this.userName = data.realName
      })
      userScore().then((data => {
        this.complexScore = data.complexScore
      }))
    } else {
      this.$changePage("pagesAuth/login/index");
    }
  },
  methods: {
    async openSheet(type) {
      const params = {
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      }
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params)
      this[type] = res[1].tempFilePaths[0]
      if (type === 'headImg') {
        this.uploadAvatar(res[1].tempFilePaths[0])
        this.imgAvatorUp = res[1].tempFilePaths[0]
      }
    },
    async uploadAvatar(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: 'files',
        header: {
          'Authorization': Vue.ls.get('KEY_ACCESS_TOKEN'),
          'site': 'client'
        }
      })
      this.file = JSON.parse(res[1].data).data
      console.log(this.file.key)
      await userInfoUpdate({
        id: this.userId,
        photo: this.file.key
      }).then(res => {
        userInfo().then((data) => {
          this.imgAvator = data.photoOssUrl
        })
      })
      let headPhoto = JSON.parse(res[1].data).data.key
    },
    dataSet() {
      this.getUserInfo()
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
    //用户账户信息
    getUserInfo() {
      userInfo().then((data) => {
        this.userId = data.id
        this.imgAvator = data.photoOssUrl
        this.accumulatePoints = data.accumulatePoints
      })
    },
    toChangeMobile() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changeMobile')
    },
    toChangePass() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changePassword')
    },
    toChangeEmail() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changeEmail')
    },
    toReport() {
      this.isShow = false
      this.$changePage('pages/sjreport/index')
    },
    toCertificate() {
      this.isShow = false
      this.$changePage('pages/sjcertificate/index')
    },
    toSjSearch() {
      this.isShow = false
      this.$changePage('pages/sjsearch/index')
    },
    toSjpg() {
      this.isShow = false
      this.$changePage('pages/evaIdentityTypeSelect/index')
    },
    outLogin() {
      // eslint-disable-next-line no-undef
      uni.showToast({
        title: `退出成功`,
        icon: 'none'
      })
      // eslint-disable-next-line no-undef
      uni.clearStorageSync()
      // this.socialScore = ''
      // this.createTime = ''
      // this.mobile = ''
      // this.ralname = ''
      // this.level = ''
      this.getToken = ''
      this.$changePage('pagesAuth/login/index')
    },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>