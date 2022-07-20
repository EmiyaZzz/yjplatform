<template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <!-- <view style="width:100%;position:relative;height:168rpx;background:gray;">
       <official-account style="position:absolute;top:0;width:100%;height:168rpx;border:1rpx solid black;"></official-account>
      </view> -->
      <view class="body">
        <!-- :key="new Date().getTime()" -->
        <top-info />
        <view class="box-panel">
          <view class="data-form-content">
            <view class="box-content">
              <view class="box" @click="identitySelect(item)"
                v-for="(item, index) in identityTypeList" :key="index">
                <view class="items" :class="{itemsborder:item.value==identityTypeS.value}">
                      <view class="img-con" v-if="item.value!='99'">
                  <img :src=imgIden[item.value-1] alt="">
                </view>
                      <view class="img-con" v-if="item.value=='99'">
                  <img :src=imgIden[7] alt="">
                </view>
                <view class="itemlabel">
                  {{ item.label }}
                </view>
                </view>
            
                <!-- <view class="select-mark" v-if="item.value==identityTypeS.value ">
                  
                </view> -->
              </view>
              <!-- <view class="box" @click="identitySelect({ value: '2', label: ' 企业经营管理人才' })">
                <view class="img-con">
                  <img :src=iden2 alt="">
                </view>
                <view class="">
                  企业经营管理人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '3', label: ' 专业技术人才' })">
                <view class="img-con">
                  <img :src=iden3 alt="">
                </view>
                <view class="">
                  专业技术人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '4', label: ' 高技能人才' })">
                <view class="img-con">
                  <img :src=iden4 alt="">
                </view>
                <view class="">
                  高技能人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '5', label: ' 农村实用人才' })">
                <view class="img-con">
                  <img :src=iden5 alt="">
                </view>
                <view class="">
                  农村实用人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '6', label: ' 社会工作人才' })">
                <view class="img-con">
                  <img :src=iden6 alt="">
                </view>
                <view class="">
                  社会工作人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '7', label: ' 高层次人才' })">
                <view class="img-con">
                  <img :src=iden7 alt="">
                </view>
                <view class="">
                  高层次人才
                </view>
              </view>
              <view class="box" @click="identitySelect({ value: '99', label: ' 其他' })">
                <view class="img-con">
                  <img :src=iden7 alt="">
                </view>
                <view class="">
                  其他
                </view>
              </view>
              <view class="box">
                <view class="img-con">
                  <img :src=iden8 alt="">
                </view>
                <view class="">
                  申请修改
                </view>
              </view> -->
            </view>

            <!-- <view class="in-box at-row align-center space-between">
              <view class="in-label">
                人才类别
              </view>
              <view>
                <view class="select-group" @click="$refs.identityTypeSelect.isShow = true">
                  {{ identityTypeS.label }}<view v-if="!identityTypeS.label">请选择</view>
                </view>
              </view>
            </view> -->
            <view class="tips">*请准确选择人才类别，一旦选择将无法自行修改。当人才类别发生实际改变时，请提交人才类别修改申请，并提交响应证件，通过审核后方可修改。</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="nextPage()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
          <view class="description">
            <view class="desTitle">人才分类说明</view>
            <!-- <view class="line"></view>
            <view class="line shen"></view> -->
            <view class="desContent" @scroll.passive="getScroll($event)">
              <!-- <p>人才的概念：</p>
              <p> 人才是指具有一定的专业知识或专门技能，进行创造性劳动并对社会作出贡献的人，是人力资源中能力和素质较高的劳动者。</p>
              <p>人才分类：</p>
              <p>人才主要包括党政人才、企业经营管理人才、专业技术人才、高技能人才、农村实用人才、社会工作人才六支人才队伍。</p> -->
              <p>党政人才：</p>
              <p>指公务员、参照公务员法管理的群团机关工作人员。包括列入公务员法实施范围的全市各级党委、人大、政府、政协、两院机关、群团组织，以及参照公务员法管理的事业单位中已登记和暂缓登记人员。</p>
              <p>
                企业经营管理人才：</p>
              <p>
                指在企业经营管理岗位上工作的人员，主要包括：一是出资人代表：指出资人任命或推荐任职的董事、监事；二是经营管理人员：指具体从事经营管理活动的人员、包括各级经理人以及具体从事规划计划、人力资源、市场营销、资本运营、财务审计、生产管理、法律事务、质量安全环保、行政管理等业务工作的人员；三是党群工作者：指企业中主要从事党务、纪检监察、工会、共青团、老干部、企业文化建设等工作的人员。
              </p>
              <p>专业技术人才：</p>
              <p>指有专业技术职称和未获得专业技术职称但在专业技术岗位上工作的人员。专业技术人才是我国人才队伍的骨干力量，在建设创新型国家和全面建设小康社会伟大事业中发挥着重要作用。</p>
              <p>高技能人才：</p>
              <p>指在生产或服务等领域岗位一线的从业者中，具有精湛专业技能，关键环节发挥作用，能够解决生产操作难题的人员，包括取得高级技师、技师和高级工职业资格及相应职业技能等级人员。</p>
              <p>
                农村实用人才：</p>
              <p>
                指具有一定的知识或技能，能够起到示范和带头作用，为当地农业和农村经济发展作出积极贡献，并得到群众认可的农村劳动者，主要包括五个方面的人员：一是生产型人员，主要有种植能手、养殖能手、捕捞能手和加工能手；二是经营型人员，主要有企业经营人员、农民专业合作组织带头人和农村经纪人；三是技能带动型人员，主要有能工巧匠和科技示范户；四是科技服务型人员，主要有村级动物防疫员、作物病虫害综合防治员、农产品质量检验检测员、肥料配方师、农机能手和农村能源建设服务人员；五是社会服务型人员，主要有乡村文体艺术人员和具有农民身份的乡村社会工作人员。 </p>
              <p>社会工作人才：</p>
              <p>指具备一定社会工作专业素质，在相关领域从事专门性社会服务的人员。</p>        
            </view>
          </view>

          <rcyj-picker-single ref="identityTypeSelect" :list="identityTypeList" @confirm="identityConfirm" />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import {
  getUserInfoApi,
  userInfoAdd,
  queryDictDataByType,
  queryHighArea,
  upload
} from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'

import MinePop from '../components/mine-pop/mine-pop.vue'
import FunPop from '../components/fun-pop/fun-pop.vue'
import RcyjIcon from '../../components/rcyj-icon/rcyj-icon.vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
const config = require('@/config/index')
export default Vue.extend({
  components: {
    TopInfo,
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon
  },
  data() {
    return {
      userId: '',
      realName: ' ',
      identityTypeS: {
        label: '请选择'
      },
      identityTypeBefore: '',
      identityTypeList: [],
      imgIden: [
        this.$OSS_IMAGES_URL + '/20220617/dzrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/qyjyrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/zyjsrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/gjnrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/ncsyrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/shgzrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/gccrc-s1.png',
        this.$OSS_IMAGES_URL + '/20220617/dxs-s1.png',
      ],

    }
  },
  onLoad() {

  },
  onShow() {
    this.identityTypeList = []
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
        if (result) {
          this.userId = result.id
          this.identityTypeList.forEach(element => {
            if (element.value == result.talentCategory) {
              this.identityTypeS = element
              this.identityTypeBefore = element
            }
          });
        }
      }).catch((err) => {

      });
    })
  },
  methods: {
    identitySelect(result) {
      if (this.identityTypeBefore.value != '99' && this.identityTypeBefore != '') {
        uni.showToast({
          icon: 'none',
          title: `您已经选择过人才类别，无法更改`,
          duration: 1500
        })
      }
      else {
        this.identityTypeS = result
      }
    },
    getScroll(event) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
    },
    identityConfirm(result) {
      if (this.identityTypeBefore.value != '99' && this.identityTypeBefore != '') {
        uni.showToast({
          icon: 'none',
          title: `您已经选择过人才类别，无法更改`,
          duration: 1500
        })
      }
      else {
        this.identityTypeS = result[0]
      }
    },
    saveData() {
      const {
        identityTypeS,
        userId
      } = this
      const params = {
        "talentCategory": identityTypeS.value,
        "id": userId,
        "isAssTalentCategory": '0'
      }
      console.log(params)
      userInfoAdd(params).then(result => { })
    },
    nextPage() {
      if (this.identityTypeS) {
        this.saveData()
        this.$changePage({
          params: {
            data: this.identityTypeS
          },
          url: 'pages/evaluateUserInfo/index'
        })
      } else {
        uni.showToast({
          icon: 'none',
          title: `请选择人才类别`,
          duration: 1000
        })
      }
    },
    exitAndSave() {
      this.saveData()
      wx.switchTab({
        url: '../index/index'
      })
    },
  }
})
</script>

<style lang="scss">
@import "./index.scss";
</style>