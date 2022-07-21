<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="title">社会组织职务</view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                是否具有社会组织职务
              </view>
              <view>
                <view class="select-group" @click="$refs.check.isShow = true">
                  <view v-if="isSocietyPost.label">
                    {{ isSocietyPost.label }}
                  </view>
                  <view v-if="!isSocietyPost.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isSocietyPost.value == 1">
              <view class="in-label">
                组织等级
              </view>
              <view>
                <view class="select-group" @click="$refs.societyPostLevelSelect.isShow = true">
                  <view v-if="societyPostLevelS.label">{{ societyPostLevelS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isSocietyPost.value == 1">
              <view class="in-label">
                职务全称
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="societyPostName" maxlength="30" placeholder-style="color:$uni-text-color;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="全称" />
              </view>
            </view>

            <view class="title">政协委员</view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                是否是政协委员
              </view>
              <view>
                <view class="select-group" @click="$refs.checkZx.isShow = true">
                  <view v-if="isZx.label">
                    {{ isZx.label }}
                  </view>
                  <view v-if="!isZx.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isZx.value == 1">
              <view class="in-label">
                等级
              </view>
              <view>
                <view class="select-group" @click="$refs.zxwyLevelSelect.isShow = true">
                  <view v-if="zxwyLevelS.label">{{ zxwyLevelS.label }}></view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isZx.value == 1">
              <view class="in-label">
                全称
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="zxwyName" maxlength="30" placeholder-style="color:$uni-text-color;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="全称" />
              </view>
            </view>
            <view class="title">人大代表</view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                是否是人大代表
              </view>
              <view>
                <view class="select-group" @click="$refs.checkRd.isShow = true">
                  <view v-if="isRd.label">
                    {{ isRd.label }}
                  </view>
                  <view v-if="!isRd.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isRd.value == 1">
              <view class="in-label">
                等级
              </view>
              <view>
                <view class="select-group" @click="$refs.rdLevelSelect.isShow = true">
                  <view v-if="rdLevelS.label">{{ rdLevelS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isRd.value == 1">
              <view class="in-label">
                全称
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="rdName" maxlength="30" placeholder-style="color:$uni-text-color;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="全称" />
              </view>
            </view>

            <view class="title">党代表</view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                是否是党代表
              </view>
              <view>
                <view class="select-group" @click="$refs.checkDdb.isShow = true">
                  <view v-if="isDdb.label">
                    {{ isDdb.label }}
                  </view>
                  <view v-if="!isDdb.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isDdb.value == 1">
              <view class="in-label">
                等级
              </view>
              <view>
                <view class="select-group" @click="$refs.ddbSelect.isShow = true">
                  <view v-if="ddbLevelS.label"> {{ ddbLevelS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isDdb.value == 1">
              <view class="in-label">
                全称
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="ddbName" maxlength="30" placeholder-style="color:$uni-text-color;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="全称" />
              </view>
            </view>

            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
          <rcyj-picker-single ref="societyPostLevelSelect" :list="societyPostLevelList"
            @confirm="societyPostLevelConfirm" />
          <rcyj-picker-single ref="zxwyLevelSelect" :list="zxwyLevelList" @confirm="zxwyLevelConfirm" />
          <rcyj-picker-single ref="rdLevelSelect" :list="rdLevelList" @confirm="rdLevelConfirm" />
          <rcyj-picker-single ref="ddbSelect" :list="ddbLevelList" @confirm="ddbLevelConfirm" />
          <rcyj-picker-single ref="check" :list="check" @confirm="checkisSocietyPostConfirm" />
          <rcyj-picker-single ref="checkZx" :list="check" @confirm="checkZxConfirm" />
          <rcyj-picker-single ref="checkRd" :list="check" @confirm="checkRdConfirm" />
          <rcyj-picker-single ref="checkDdb" :list="check" @confirm="checkDdbConfirm" />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  societypostDetail,
  societypostUpdate,
  queryDictDataByType,
  queryHighArea,
  upload,
  precisoEvaluate
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import { showScore } from '@/utils/utils'
const config = require('@/config/index')
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon,
    TopInfo
  },
  data() {
    return {
      action: config.gatewayUrl + '/assess/oss/uploadReturnUrl',
      current: 0,
      uInputStyle: {
        color: '#black',
        fontSize: '30rpx',
        textAlign: 'right'
      },
      getToken: this.$ls.get('KEY_ACCESS_TOKEN'),
      userId: '',
      societyPostLevelS: '',
      societyPostLevelList: [],
      societyPostName: '',

      zxwyLevelS: '',
      zxwyLevelList: [],
      zxwyName: '',

      rdLevelS: '',
      rdLevelList: [],
      rdName: '',

      ddbLevelS: '',
      ddbLevelList: [],
      ddbName: '',
      identityType: '',
      isSocietyPost: [],
      isZx: [],
      isRd: [],
      isDdb: [],
      check: [{
        value: '1',
        label: '是'
      },
      {
        value: '0',
        label: '否'
      }
      ],

      //----------------------
    }
  },
  onLoad() {
    this.init()
  },
  onShow() {
    // let dictType = 'identity'
    // console.log(this.$route.params)

  },
  methods: {
    async init() {
      this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
      console.log('token======' + this.getToken)
      //查询
      await queryDictDataByType({
        dictType: 'social_job_rank'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.societyPostLevelList.push(temp)
        }
      })
      await queryDictDataByType({
        dictType: 'zw_rank'
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {}
          temp.value = data[i].dictValue
          temp.label = data[i].dictLabel
          this.zxwyLevelList.push(temp)
          this.rdLevelList.push(temp)
          this.ddbLevelList.push(temp)
        }
      })
      if (this.getToken) {
        await societypostDetail().then((data) => {
          console.log(data)
          if (!data)
            return
          this.userId = data.id
          this.societyPostLevelList.forEach(element => {
            if (element.value === data.societyPostLevel) {
              this.societyPostLevelS = element
            }
          });
          this.zxwyLevelList.forEach(element => {
            if (element.value === data.zxwyLevel) {
              this.zxwyLevelS = element
            }
          });
          this.rdLevelList.forEach(element => {
            if (element.value === data.rdLevel) {
              this.rdLevelS = element
            }
          });
          this.ddbLevelList.forEach(element => {
            if (element.value === data.ddbLevel) {
              this.ddbLevelS = element
            }
          });
          this.societyPostName = data.societyPostName
          this.zxwyName = data.zxwyName
          this.rdName = data.rdName
          this.ddbName = data.ddbName

          this.check.forEach(element => {
            if (element.value === data.isSocietyPost) {
              this.isSocietyPost = element
            }
            if (element.value === data.isZxwy) {
              this.isZx = element
            }
            if (element.value === data.isRd) {
              this.isRd = element
            }
            if (element.value === data.isDdb) {
              this.isDdb = element
            }
          });

        })
      }
    },

    societyPostLevelConfirm(result) {
      this.societyPostLevelS = result[0]
    },
    zxwyLevelConfirm(result) {
      this.zxwyLevelS = result[0]
    },
    rdLevelConfirm(result) {
      this.rdLevelS = result[0]
    },
    ddbLevelConfirm(result) {
      this.ddbLevelS = result[0]
    },
    checkisSocietyPostConfirm(result) {
      this.isSocietyPost = result[0]
    },
    checkZxConfirm(result) {
      this.isZx = result[0]
    },
    checkRdConfirm(result) {
      this.isRd = result[0]
    },
    checkDdbConfirm(result) {
      this.isDdb = result[0]
    },
    exitAndSave() {
      this.checkIs()
      const {
        userId,
        societyPostLevelS,
        societyPostName,
        zxwyLevelS,
        zxwyName,
        rdLevelS,
        rdName,
        ddbLevelS,
        ddbName,
        isSocietyPost,
        isZx,
        isRd,
        isDdb
      } = this
      const params = {
        "id": userId,
        "societyPostLevel": societyPostLevelS.value,
        "societyPostName": societyPostName,
        "zxwyLevel": zxwyLevelS.value,
        "zxwyName": zxwyName,
        "rdLevel": rdLevelS.value,
        "rdName": rdName,
        "ddbLevel": ddbLevelS.value,
        "ddbName": ddbName,
        "isSocietyPost": isSocietyPost.value,
        "isZxwy": isZx.value,
        "isRd": isRd.value,
        "isDdb": isDdb.value
      }
      console.log(params)
      societypostUpdate(params).then((data) => {
        // this.$changePage({
        //   // params: {
        //   //   data: this.identityType
        //   // },
        //   url: '/pages/evaAdditional/index'
        // })
        precisoEvaluate().then((res) => {
           showScore(res,1500)
          // uni.showToast({
          //   icon: 'none',
          //   title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + res + '万',
          //   duration: 1500
          // })
          setTimeout(() => {
            wx.switchTab({
              url: "../index/index",
            });
          }, 1500);
        });
      }).catch((err) => {

      });
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaHonor/index",
      });
    },
    checkIs() {
      if (this.isSocietyPost == '0') {
        this.societyPostLevelS = [],
          this.societyPostName = ''
      }
      if (this.isZx == '0') {
        this.zxwyLevelS = [],
          this.zxwyName = ''
      }
      if (this.isRd == '0') {
        this.rdLevelS = [],
          this.rdName = ''
      }
      if (this.isDdb == '0') {
        this.ddbLevelS = [],
          this.ddbName = ''
      }
    },
    evaluateSj() {
      this.checkIs()
      const {
        userId,
        societyPostLevelS,
        societyPostName,
        zxwyLevelS,
        zxwyName,
        rdLevelS,
        rdName,
        ddbLevelS,
        ddbName,
        isSocietyPost,
        isZx,
        isRd,
        isDdb
      } = this
      const params = {
        "id": userId,
        "societyPostLevel": societyPostLevelS.value,
        "societyPostName": societyPostName,
        "zxwyLevel": zxwyLevelS.value,
        "zxwyName": zxwyName,
        "rdLevel": rdLevelS.value,
        "rdName": rdName,
        "ddbLevel": ddbLevelS.value,
        "ddbName": ddbName,
        "isSocietyPost": isSocietyPost.value,
        "isZxwy": isZx.value,
        "isRd": isRd.value,
        "isDdb": isDdb.value
      }
      // 
      societypostUpdate(params).then((data) => {
        precisoEvaluate().then((res) => {
           showScore(res,1500)
          // uni.showToast({
          //   icon: 'none',
          //   title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + res + '万',
          //   duration: 1500
          // })
          setTimeout(() => {
            this.$changePage({
              params: {
                data: this.identity,
              },
              url: "pages/evaAdditional/index",
            });
          }, 1500);
        });

        //  wx.switchTab({ 
        //   url:'../index/index'
        // })
      }).catch((err) => {
        console.log(err)
      });
    },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>