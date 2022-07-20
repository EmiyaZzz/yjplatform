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
                <view class="img-l">
                  <img :src=imgjf alt="" />
                </view>
                <view>
                  身价分：{{ accumulatePoints }}
                </view>
              </view>
            </view>
          </view>
          <view class="sj">
            <view class="sjt">
              <view style="display:flex">
                <img class="sjcion" :src=complexScoreIcon alt="">
                <p>综合身价</p>
                <p class="smallw">（万元）</p>
              </view>
              <view>
                {{ complexScore }}
              </view>
            </view>
          </view>
        </view>
        <!-- v-if="getToken" -->
        <view>
          <view class="fun-bg">

            <view class="btn1 whitebg" @click="toCertificate()">
              <view class="img-l">
                <img :src=imgzs alt="" />
              </view>
              <p class="p1">身价证书</p>
            </view>
            <view class="btn1 whitebg" @click="toReport()">
              <view class="img-l">
                <img :src=imgbg alt="" />
              </view>
              <p class="p1">身价报告</p>
            </view>
          </view>
          <view class="fun-middle-bg">
            <view class="btn1 firstbtn whitebg" @click="toEvaRecord()">
              <view class="img-l">
                <img :src=imgjl alt="" />
              </view>
              <p class="p1">评估记录</p>
            </view>
            <view class="btn1 whitebg" @click="toOrderList()">
              <view class="img-l">
                <img :src=imgcz alt="" />
              </view>
              <p class="p1">订单列表</p>
            </view>
            <view class="btn1 whitebg" @click="toAccumulatePoints()">
              <view class="img-l">
                <img :src=imgjf alt="" />
              </view>
              <p class="p1">身价分</p>
            </view>
            <view class="btn1 whitebg" @click="toCard()">
              <view class="img-l">
                <img :src=imgmp alt="" />
              </view>
              <p class="p1">身价卡包</p>
            </view>

            <view class="btn1 endbtn whitebg" @click="toDoc()">
              <view class="img-l">
                <img :src=imgda alt="" />
              </view>
              <p class="p1">身价档案</p>
            </view>
          </view>
          <!-- <view class="fun-bg">
            <view class="btn1 long" @click="toUpdate()">
              <p class="p1">资料修改</p>
            </view>
          </view> -->
          <view class="fun-bg">
            <view class="btn1 long whitebg" @click="toChangePass()">
              <view class="img-l">
                <img :src=imgmmxg alt="" />
              </view>
              <p class="p1">修改密码</p>
            </view>
          </view>
          <view class="fun-bg">
            <view class="btn1 long whitebg" @click="toChangeEmail()">
              <view class="img-l">
                <img :src=imgxg alt="" />
              </view>
              <p class="p1">修改邮箱</p>
            </view>
          </view>
          <view class="fun-bg">
            <view class="btn1 long whitebg" @click="outLogin()">
              <p class="p1">退出登录</p>
            </view>
          </view>
          <view style="text-align:right">当前版本：V1.0.5</view>
        </view>
        <!-- <view v-else>
          <view class="fun-bg">
            <view class="btn1 long" @click="toRegister()">
              <p class="p1">登录</p>
            </view>
          </view>
        </view> -->
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  userInfo,
  userInfoUpdate,
  upload,
  uploadUrl,
  getUserInfoApi,
  userScore,
  queryDictDataByType
} from '@/api/common.js'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
const config = require('@/config/index')
export default Vue.extend({
  components: {
    MinePop,
    FunPop
  },
  data() {
    return {
      userId: '',
      scoreStatus: '0',
      accumulatePoints: 0,  //身价分
      action: config.gatewayUrl + '/assess/oss/uploadReturnUrl',
      userName: '',
      complexScore: '未评估',
      identityType: '',
      identityTypeList: [],
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
      imgAvatorUp: '',
      complexScoreIcon: this.$OSS_IMAGES_URL + '/20220617/jf.png',
      imgzs: this.$OSS_IMAGES_URL + '/20220617/zs1.png',
      imgbg: this.$OSS_IMAGES_URL + '/20220617/bg1.png',
      imgjl: this.$OSS_IMAGES_URL + '/20220617/jl1.png',
      imgmp: this.$OSS_IMAGES_URL + '/20220617/mp1.png',
      imgcz: this.$OSS_IMAGES_URL + '/20220617/chongzhi2.png',
      imgjf: this.$OSS_IMAGES_URL + '/20220617/jf1.png',
      imgda: this.$OSS_IMAGES_URL + '/20220617/da1.png',
      imgxg: this.$OSS_IMAGES_URL + '/20220617/xg1.png',
      imgmmxg: this.$OSS_IMAGES_URL + '/20220617/passswordicon.png',
    }
  },
  onLoad() {

  },
  onShow() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (this.getToken) {
      this.dataSet()
      this.getUserInfo()
      // getUserInfoApi().then((data) => {
      //   this.userName = data.realName
      // })
      userScore().then((data => {
        if (data) {
          this.complexScore = data.complexScore
        }

      }))
    } else {
      // this.$changePage("pagesAuth/login/index");
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
        this.getUserBaseInfo()
      }).catch((err) => {

      });
    },
    //用户账户信息
    getUserInfo() {
      userInfo().then((data) => {
        this.userId = data.id
        this.scoreStatus = data.scoreStatus
        this.accumulatePoints = data.accumulatePoints
        if (data.photoOssUrl)
          this.imgAvator = data.photoOssUrl
      })
    },
    //用户信息
    getUserBaseInfo() {
      getUserInfoApi().then((result) => {
        this.userName = result.realName
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
    },
    toRegister() {
      this.isShow = false
      this.$changePage("pagesAuth/login/index");
    },
    toChangeEmail() {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      } else {
        this.isShow = false
        this.$changePage('pagesAuth/change/changeEmail')
      }
    },
    toChangeMobile() {
      this.isShow = false
      this.$changePage('pagesAuth/change/changeMobile')
    },
    toChangePass() {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      } else {
        this.isShow = false
        this.$changePage('pagesAuth/change/changePassword')
      }
    },
    toReport() {
      this.checkStatus("pages/sjreport/index")
    },
    toCard() {
      this.checkStatus("pages/sjCard/index")
      //   if (!this.getToken) {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未登录，即将前往登录页`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage("pagesAuth/login/index");
      //     }, 2000);
      //   } else {
      //     this.isShow = false
      //     if (this.scoreStatus == '2') {
      //       this.$changePage("pages/sjCard/index");
      //     } else {
      //       if (this.scoreStatus == '0') {
      //         uni.showToast({
      //           icon: 'none',
      //           title: `未进行快速评估，即将前往快速评估`,
      //           duration: 2000
      //         })
      //         setTimeout(() => {
      //           this.$changePage('pages/sjsearch/index')
      //         }, 2000);
      //       }
      //       if (this.scoreStatus == '1') {
      //         uni.showToast({
      //           icon: 'none',
      //           title: `未进行身价评估，即将前往身价评估`,
      //           duration: 2000
      //         })
      //         setTimeout(() => {
      //           this.$changePage("pages/evaIdentityTypeSelect/index");
      //         }, 2000);
      //       }
      //     }
      //   }
    },
    toDoc() {
      this.checkStatus("pages/sjDoc/index")
      // if (!this.getToken) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: `未登录，即将前往登录页`,
      //     duration: 2000
      //   })
      //   setTimeout(() => {
      //     this.$changePage("pagesAuth/login/index");
      //   }, 2000);
      // } else {
      //   this.isShow = false
      //   if (this.scoreStatus == '2') {
      //     this.$changePage("pages/sjDoc/index");
      //   } else {
      //     uni.showToast({
      //       icon: 'none',
      //       title: `未进行身价评估，即将前往身价评估`,
      //       duration: 2000
      //     })
      //     setTimeout(() => {
      //       this.$changePage("pages/evaIdentityTypeSelect/index");
      //     }, 2000);
      //   }
      // }
    },
    toUpdate() {
      this.isShow = false
      if (this.scoreStatus == '2') {
        this.$changePage('pages/wodeInfo/index')
      } else {
        uni.showToast({
          icon: 'none',
          title: `未进行身价评估，即将前往身价评估`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pages/evaIdentityTypeSelect/index");
        }, 2000);
      }
    },
    toEvaRecord() {
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
        this.$changePage('pages/userScoreRecords/index')
      }
    },
    toOrderList() {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      } else {
        this.isShow = false
        this.$changePage('pages/OrderList/index')
      }
    },
    toAccumulatePoints() {
      if (!this.getToken) {
        uni.showToast({
          icon: 'none',
          title: `未登录，即将前往登录页`,
          duration: 2000
        })
        setTimeout(() => {
          this.$changePage("pagesAuth/login/index");
        }, 2000);
      } else {
        this.isShow = false
        this.$changePage('pages/accumulatePoints/index')
      }
    },
    toCertificate() {
      this.checkStatus("pages/sjcertificate/index")
      // if (!this.getToken) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: `未登录，即将前往登录页`,
      //     duration: 2000
      //   })
      //   setTimeout(() => {
      //     this.$changePage("pagesAuth/login/index");
      //   }, 2000);
      // }
      // else {
      //   this.isShow = false
      //   if (this.scoreStatus == '2') {
      //     this.$changePage("pages/sjcertificate/index");
      //   } else {
      //     if (this.scoreStatus == '0') {
      //       uni.showToast({
      //         icon: 'none',
      //         title: `未进行快速评估，即将前往快速评估`,
      //         duration: 2000
      //       })
      //       setTimeout(() => {
      //         this.$changePage('pages/sjsearch/index')
      //       }, 2000);
      //     }
      //     if (this.scoreStatus == '1') {
      //       uni.showToast({
      //         icon: 'none',
      //         title: `未进行身价评估，即将前往身价评估`,
      //         duration: 2000
      //       })
      //       setTimeout(() => {
      //         this.$changePage("pages/evaIdentityTypeSelect/index");
      //       }, 2000);
      //     }
      //   }
      // }

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
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>