<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box title="高层次人才类型">
        <view class="instruction at-row align-center" slot="right" @click="instructionPop=true"><!-- @click="instructionPop=true"-->
          <rcyj-icon name="shuoming" color="#E15147" size="30rpx"></rcyj-icon>
          <text class="pl-10">说明</text>
        </view>
      </caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请根据类型说明选择" :inval="organizationSize" @click="$refs.rank.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职业"></caption-box>
      <view class="content-box line-box">
        <rcjy-input :disabled="true" placeholder="请选择从事岗位类别" :inval="profession" @click="$refs.profession.isShow=true"></rcjy-input>
      </view>
      <caption-box title="职级"></caption-box>
      <view class="content-box at-row align-center pt-30 mb-30">
        <view class="single degrees" :class="[item.val === learnVal ? 'active' : '']" v-for="(item, index) in learnStatus" :key="item.val" @click="changeLearnStatus(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="荣誉成就" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addHonor', honor === '1', 'pagesCalibration/fillInformation/managementHonor')" slot="right">{{ honor === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="相关职业资格" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addProfessional', professional === '1', 'pagesCalibration/fillInformation/managementProfessional')" slot="right">{{ professional === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>
      <caption-box title="科研成果" mb="mb-40">
        <view class="caption-add" @click="goChangePage('pagesCalibration/fillInformation/addScientific', scientific === '1', 'pagesCalibration/fillInformation/managementScientific')" slot="right">{{ scientific === '1' ? '已添加' : '添加' }}<u-icon name="arrow-right"></u-icon></view>
      </caption-box>

      <view class="at-row align-center">
        <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">提交</rcyj-button></view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="profession" labelName="dictLabel" valueName="dictLabel" :list="professionList" @confirm="professionConfirm"/>
      <rcyj-picker-single ref="rank" labelName="label" valueName="value" :list="organizationSizeList" @confirm="rankConfirm"/>
    </view>
    <u-popup
      slot="instructionPop"
      mode="center"
      :safe-area-inset-bottom="true"
      border-radius="30"
      :closeable="true"
      width="590"
      height="810"
      v-model="instructionPop">
      <view class="instruction-wrapper">
        <view class="h1">高层次人才类型说明</view>
        <u-tabs
          :list="navlist"
          active-color="#21BA80"
          :is-scroll="false"
          :show-bar="false"
          :current="current"
          @change="navChange"></u-tabs>
        <view class="content no-indent">
          <u-parse :html="current | conFilter"></u-parse>
        </view>
      </view>
    </u-popup>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getDictTypeApi, updateBaseInfoApi, getBaseInfoApi, getProfessionalQueryApi, getHonorQueryApi, getScientificQueryApi, queryPerfectProportionApi } from '@/api/common'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'InformationIVGovern',
  filters: {
    conFilter (identity) {
      const statusMap = {
        0: `<p>1、诺贝尔奖获得者</p><p>2、国家最高科学技术奖获得者</p><p>3、国家<万人计划>杰出人才</p><p>4、中国社会科学院学部委员、荣誉学部委员</p><p>5、中国工程院院士</p><p>6、中国科学院院士</p><p>7、其他：相当于上述的顶尖人才</p>`,
        1: `<p>1、国家<万人计划>中杰出人才之外的人选</p><p>2、教育部<长江学者奖励计划>特聘教授</p><p>3、国家杰出青年科学基金获得者</p><p>4、中国政府<友谊奖>专家</p><p>5、中华技能大奖获得者</p><p>6、国家<千人计划>人选</p><p>7、其他：相当于上述层次的国家级领军人才</p>`,
        2: `<p>1、<外专双百计划>入选者、<齐鲁友谊奖>专家</p><p>2、世界500强企业、中国500强企业...</p><p>3、省科学技术最高奖获得者</p><p>4、泰山学者、泰山产业领军人</p><p>5、百、千、万人才工程国家级人选</p><p>6、科技部创新人才推进计划人选</p><p>7、全国技术能手、国家级技能大师工作室领衔人</p><p>8、全国宣传文化系统<四个一批>人才</p><p>9、教育部<新世纪优秀人才支持计划>入选者</p><p>10、国家级教学名师、国家优秀教师、省特级教师</p><p>11、国家卫生计生有突出贡献的中青年专家</p><p>12、国家重点实验室、国家工程实验室...</p><p>13、齐鲁文化名家</p><p>14、其他：相当于上述层次的升级领军人才</p>`,
        3: `<p>1、省留学人员回国创业奖获得者</p><p>2、省优秀科技工作者获得者、省青年科技奖获得者</p><p>3、齐鲁名师名校长</p><p>4、齐鲁和谐使者</p><p>5、齐鲁文化英才、文化之星</p><p>6、齐鲁乡村之星</p><p>7、齐鲁首席技师、省技术能手省级技能大师工作站领衔人</p><p>8、省有突出贡献的中青年专家</p><p>9、全国优秀科技工作者、中国青年科技奖获得者</p><p>10、享受国务院特殊津贴人员</p><p>11、济南高端外传计划入选人才、泉城友谊奖专家</p><p>12、济南专业技术拔尖人才</p><p>13、泉城特聘专家、泉城学者</p><p>14、市科学技术最高奖获得者</p><p>15、其他：相当于上述层次的市级领军人才</p>`,
        4: `<p>1、济南市规模以上企业获市级以上奖励的主要经营...</p><p>2、具有国内外全日制博士、硕士学历学位的人才</p><p>3、泉城文化英才、文化之星</p><p>4、泉城和谐使者</p><p>5、泉城乡村之星</p><p>6、泉城首席技师、济南突出贡献技师、济南市杰出...</p><p>7、济南市学术技术带头人</p><p>8、具有副高级专业技术职务任职资格、高级技师职业...</p><p>9、其他具有正高级专业技术职务资格的专业技术人才</p><p>10、其他：相当于上述层次的高级人才</p>`
      }
      return statusMap[identity]
    }
  },
  data () {
    return {
      // 填写进度
      progressNum: 0,
      instructionPop: false,
      // 组织规模
      organizationSize: '',
      organizationSizeList: [
        {
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'D',
          label: 'D'
        },
        {
          value: 'E',
          label: 'E'
        }
      ],
      // 职业必填
      profession: '',
      professionList: [],
      // 职级
      learnVal: '',
      learnStatus: [
        {
          name: '高层',
          val: '3'
        },
        {
          name: '中层',
          val: '2'
        },
        {
          name: '基层',
          val: '1'
        }
      ],
      // 资格1:已添加2：未添加
      professional: '2',
      // 荣誉成就
      honor: '2',
      // 科研成果
      scientific: '2',
      navlist: [
        {
          name: 'A类'
        },
        {
          name: 'B类'
        },
        {
          name: 'C类'
        },
        {
          name: 'D类'
        },
        {
          name: 'E类'
        }
      ],
      current: 0
    }
  },
  onLoad () {
    getBaseInfoApi().then(res => {
      this.organizationSize = res.highLevelTalentsType
      this.profession = res.profession
      this.learnVal = res.rank
    })
    // 职业必填
    getDictTypeApi({ dictType: 'identity' }).then(res => {
      this.professionList = res
    })
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
    getProfessionalQueryApi().then(res => {
      if (res && res.length) {
        this.professional = '1'
      } else {
        this.professional = '2'
      }
    })
    getHonorQueryApi().then(res => {
      if (res && res.length) {
        this.honor = '1'
      } else {
        this.honor = '2'
      }
    })
    // 科研成果
    getScientificQueryApi().then(res => {
      if (res && res.length) {
        this.scientific = '1'
      } else {
        this.scientific = '2'
      }
    })
  },
  methods: {
    navChange (index) {
      this.current = index
    },
    updateBaseInfo () {
      if (!this.organizationSize) {
        this.$toast('请选择高层次人才类型')
        return
      }
      if (!this.profession) {
        this.$toast('请选择从事岗位类别')
        return
      }
      if (!this.learnVal) {
        this.$toast('请选择职级')
        return
      }
      const params = {
        highLevelTalentsType: this.organizationSize,
        profession: this.profession,
        rank: this.learnVal
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          this.$changePage('pagesCalibration/authorize/authorize')
        }, 1500)
      })
    },
    professionConfirm (e) {
      this.profession = e[0].value
    },
    rankConfirm (e) {
      this.organizationSize = e[0].label
    },
    changeLearnStatus (index) {
      this.learnVal = this.learnStatus[index].val
    },
    goChangePage (url, has, management) {
      if (!has) {
        this.$changePage(url)
      } else {
        this.$changePage(management)
      }
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
