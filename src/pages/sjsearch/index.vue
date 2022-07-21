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
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                姓名
              </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="userName" maxlength="11" placeholder-style="color:#9094A0;font-size:28rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入真实姓名" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                性别
              </view>
              <view>
                <view class="select-group at-row align-center space-between" @click="$refs.sexSelect.isShow = true">
                  {{ sexS.label }}
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                出生日期
              </view>
              <!-- <view class="felx-group">
                <assess-date-picker @confirm="confirmbirthday"> <view>请选择</view></assess-date-picker>
              </view> -->
              <view>
                <view class="select-group at-row align-center space-between" @click="$refs.birthday.isShow = true">
               <view v-if="birthday">
                {{ birthday }}
               </view>  
               <view v-else>
                请选择
               </view> 
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                学历
              </view>
              <view>
                <view class="select-group at-row align-center space-between"
                  @click="$refs.educationSelect.isShow = true">
                  {{ educationS.label }}
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                毕业时间
              </view>
              <view>
                <view class="select-group at-row align-center space-between"
                  @click="$refs.graduacionTime.isShow = true">
                <view v-if="graduacionTime">
                  {{ graduacionTime }}
                </view>  
                <view v-else>
                  请选择
                </view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label">
                职务
              </view>
              <view>
                <view class="select-group at-row align-center space-between"
                  @click="$refs.positionSelect.isShow = true">
                  {{ positionS.label }}
                </view>
              </view>
            </view>
            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="sjSearch()">快速评估</view>
            <!-- <rcyj-button @click="sjSearch()">
              快速评估
            </rcyj-button> -->
            <!-- <view class="btn">保存退出</view> -->
          </view>
          <rcyj-picker-single ref="sexSelect" :list="sex" @confirm="sexConfirm" />
          <rcyj-date ref="birthday" @confirm="birthdayConfim" />
          <rcyj-picker-single ref="educationSelect" :list="education" @confirm="educationConfirm" />
          <rcyj-date ref="graduacionTime" @confirm="graduacionTimeConfirm" />
          <rcyj-picker-single ref="positionSelect" :list="position" @confirm="positionConfirm" />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  fastSearch,
  getUserInfoApi,
  precisoEvaluate,
  pointAdd
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    TopInfo
  },
  data() {
    return {
      idnum: '',
      current: 0,
      uInputStyle: {
        color: '#9094A0',
        fontSize: '28rpx',
        textAlign: 'right'
      },
      // 性别数组
      sex: [{
        value: '0',
        label: '男'
      },
      {
        value: '1',
        label: '女'
      }
      ],
      education: [{
        value: '5',
        label: '博士研究生'
      },
      {
        value: '4',
        label: '硕士研究生'
      },
      {
        value: '3',
        label: '本科'
      },
      {
        value: '2',
        label: '大专'
      },
      {
        value: '1',
        label: '中专'
      }
      ],
      position: [{
        value: '1',
        label: '基层'
      },
      {
        value: '2',
        label: '中层'
      },
      {
        value: '3',
        label: '高层'
      },
      {
        value: '4',
        label: '决策层'
      }
      ],
      userName: '',
      // 选择的性别
      sexS: {
        value: '0',
        label: '男'
      },
      birthday: '',
      educationS: {
        value: '5',
        label: '博士研究生'
      },
      graduacionTime: '',
      positionS: {
        value: '1',
        label: '基层'
      },
    }
  },
  onLoad() {

  },
  onShow() {
    this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
    if (this.getToken) {
      getUserInfoApi().then((data) => {
        if (!data)
          return
        this.userName = data.realName
        this.sex.forEach(element => {
          if (element.value == data.sex) {
            this.sexS = element
          }
        });
        this.birthday = data.birthday
        this.education.forEach(element => {
          if (element.value == data.education) {
            this.educationS = element
          }
        });
      })
    }
  },
  methods: {
    sjSearch() {
      const {
        userName,
        sexS,
        birthday,
        educationS,
        graduacionTime,
        positionS
      } = this
      if (!this.userName) {
        this.$toast('请输入真实姓名')
        return
      }
      if (!this.birthday) {
        this.$toast('请选择出生日期')
        return
      }
      //  if (this.graduacionTime=='请选择') {
      //   this.$toast('请选择毕业时间')
      //   return
      // }
      //    if (this.positionS) {
      //   this.$toast('请选择职务')
      //   return
      // }
      const params = {
        "birthday": birthday,
        "education": educationS.value,
        "graduacionTime": graduacionTime,
        "position": positionS.value,
        "sex": sexS.value,
        "userName": userName
      }

      console.log(params)
      fastSearch(params).then((data) => {
        console.log(data)
        //  this.$changePage({
        //     params: {
        //       data: this.identityType
        //     },
        //     url: '/pagesCalibration/chooseIdentity/index'
        //   })
        getApp().globalData.complexScoreData = data
        pointAdd({
          "pointDes": "快速评估",
          "pointNum": 5,
        }).then(() => {
          uni.showToast({
            icon: 'none',
            title: `恭喜您完成快速评估，奖励您5个身价分`,
            duration: 3000
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index'
            })
          }, 3000);
        })
        // wx.switchTab({
        //   url: '../index/index'
        // })
      })
    },
    graduacionTimeConfirm(result) {
      this.graduacionTime = result
    },
    educationConfirm(result) {
      this.educationS = result[0]
    },
    positionConfirm(result) {
      this.positionS = result[0]
    },
    birthdayConfim(result) {
      this.birthday = result
    },
    sexConfirm(result) {
      this.sexS = result[0]
    }
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>