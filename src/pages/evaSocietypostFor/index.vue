<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="title">社会职务</view>
            <view :style="{ 'margin-bottom': '80rpx' }" v-for="(item, index) in socialPostList" :key="index">
              <view :style="{ 'text-align': 'right', color: '#9094A0' }" @click="deleteItem1(item)">删除</view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 社会组织名称 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input v-model="item.societyOrgName" maxlength="20"
                    placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false" :custom-style="uInputStyle"
                    placeholder="请输入名称" />
                </view>
              </view>
              <view class="in-box at-row align-center space-between">
                <view class="in-label"> 职务描述 </view>
                <view class="flex-group at-row align-center space-between">
                  <u-input v-model="item.societyPostName" maxlength="100"
                    placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false" :custom-style="uInputStyle"
                    placeholder="请输入描述" />
                </view>
              </view>
            </view>
            <view class="addbtn">
              <img :src="imgArrow" alt="" @click="additem()" />
            </view>
            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  foreignPostAdd,
  foreignPostUpdate,
  foreignPostDelete,
  foreignPostList,
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
      orgnizeNameFor: '',
      orgnizeDetailFor: '',
      identity: '',
      imgArrow: this.$OSS_IMAGES_URL + "/20220617/arror.png",
      socialPostList: [
        {
          societyOrgName: '',
          societyPostName: ''
        }
      ]

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
    getIdentity(data) {
      this.identity = data.value;
    },
    deleteItem1(item) {
      if (!item.id) this.socialPostList.splice(item.index, 1);
      else {
        const ids = [];
        ids.push(item.id);
        foreignPostDelete({
          ids: ids.join(","),
        }).then((result) => {
          this.init();
        });
      }
    },
    additem() {
      this.socialPostList.push({
        content: ""
      });
      for (let i = 0; i < this.socialPostList.length; i++) {
        this.socialPostList[i].index = i;
      }
    },
    async init() {
      this.getToken = this.$ls.get('KEY_ACCESS_TOKEN')
      console.log('token======' + this.getToken)
      //查询
      if (this.getToken) {
        foreignPostList().then((data) => {
          console.log(data)
          this.socialPostList = data
        })
      }
    },


    exitAndSave() {
      this.checkIs()
      const {

      } = this
      const params = {
        "id": userId,
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
          showScore(res, 1500)
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

    },
    saveList() {
      for (let i = 0; i < this.socialPostList.length; i++) {
        let paramsD = {
          'societyOrgName': this.socialPostList[i].societyOrgName,
          'societyPostName': this.socialPostList[i].societyPostName,
        };      
        if (this.socialPostList[i].id) {
          const data = Object.assign({}, paramsD, {
            id: this.socialPostList[i].id,
          });
          console.log(data)
          foreignPostUpdate(data).then((result) => { console.log(result + 'update') });
        } else {
           console.log(paramsD)
          foreignPostAdd(paramsD).then((result) => { console.log(result + 'add') });
        }
      }
    },
    async evaluateSj() {
      this.checkIs()
      const {
        userId
      } = this
      await this.saveList();

      await precisoEvaluate().then((res) => {
        showScore(res, 1500)
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

      // 
    },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>