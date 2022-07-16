<template>
  <informationWrapper :progressNum="progressNum">
    <view class="form-wrapper" slot="formWrapper">
      <caption-box :title="identityType==='7' ? '当前学历':'最高学历'"></caption-box>
      <view class="content-box at-row align-center pt-30 mb-30">
        <view class="single degrees" :class="[item.val === degreesVal ? 'active' : '']" v-for="(item, index) in degrees" :key="item.val" @click="changeDegrees(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="当前状态" v-if="identityType!='7'"></caption-box>
      <view class="content-box at-row align-center pt-30 mb-30" v-if="identityType!='7'">
        <view class="single degrees" :class="[item.val === learnVal ? 'active' : '']" v-for="(item, index) in learnStatus" :key="item.val" @click="changeLearnStatus(index)">
          <text>{{ item.name }}</text>
        </view>
      </view>
      <caption-box title="院校名称"></caption-box>
      <view class="content-box line-box academy-box">
        <rcjy-input
          placeholder="请查找选择院校"
          :disabled="true"
          :inval="academy"
          @click="chooseSchool">
        </rcjy-input>
      </view>
      <caption-box title="院校层次"></caption-box>
      <view class="content-box line-box">
        <rcjy-input
          :disabled="true"
          placeholder="请根据院校办学层次选择"
          :inval="levelVal"
          @click="$refs.level.isShow=true">
        </rcjy-input>
      </view>
      <caption-box title="所学专业" v-if="identityType==='7'"></caption-box>
      <view class="content-box line-box academy-box" v-if="identityType==='7'">
        <rcjy-input placeholder="请填写所学专业名称" :inval="majjor" @input="majorChange"></rcjy-input>
      </view>
      <view class="at-row align-center">
        <view class="felx-group mr-16">
          <rcyj-button
            height="88rpx"
            bgColor="#fff"
            textColor="#A26E15"
            border="1px solid #A26E15"
            @click="backPage">
            上一步
          </rcyj-button>
        </view>
        <view class="felx-group ml-16">
          <rcyj-button height="88rpx" textColor="#fff" @click="updateBaseInfo">下一步</rcyj-button>
        </view>
      </view>
    </view>
    <view slot="picker">
      <rcyj-picker-single ref="level" :list="levelList" @confirm="levelConfirm"/>
    </view>
  </informationWrapper>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import informationWrapper from '../components/informationWrapper/informationWrapper'
import captionBox from '../components/caption/caption'
import { getBaseInfoApi, updateBaseInfoApi, queryPerfectProportionApi } from '@/api/common.js'
import { encode, decode } from 'js-base64'
export default Vue.extend({
  components: { RcjyInput, informationWrapper, captionBox },
  name: 'INFORMATIONI',
  data () {
    return {
      caption: this.$OSS_IMAGES_URL + '/20201213/18299a60cdd44b1ba814201fc4e82afb.png',
      // 根据身份
      identityType: '',
      // 填写进度
      progressNum: 0,
      // 学历
      degrees: [
        {
          name: '博士',
          val: '1'
        },
        {
          name: '研究生',
          val: '2'
        },
        {
          name: '本科',
          val: '3'
        },
        {
          name: '专科',
          val: '4'
        },
        {
          name: '中专',
          val: '5'
        },
        {
          name: '其他',
          val: '6'
        }
      ],
      degreesVal: '',
      // 现在状态
      learnStatus: [
        {
          name: '毕业',
          val: '1'
        },
        {
          name: '在读',
          val: '2'
        }
      ],
      learnVal: '',
      // 院校
      academy: '',
      // 院校层次
      levelVal: '',
      // 高职（高专）院校1、省属本科院校2、中央部属本科院3、“211工程”院校4、985工程”院校5、双一流6、其它0
      levelList: [
        {
          value: '1',
          label: '高职（高专）院校'
        },
        {
          value: '2',
          label: '省属本科院校'
        },
        {
          value: '3',
          label: '中央部属本科院'
        },
        {
          value: '4',
          label: '“211工程”院校'
        },
        {
          value: '5',
          label: '“985工程”院校'
        },
        {
          value: '6',
          label: '双一流'
        },
        {
          value: '0',
          label: '其它'
        }
      ],
      // 所学专业
      majjor: ''
    }
  },
  onShow () {
    queryPerfectProportionApi().then(res => {
      this.progressNum = res
    })
    getBaseInfoApi().then(res => {
      this.identityType = res.identityType
      this.degreesVal = res.educationLevel
      this.learnVal = res.educationStatus
      this.academy = res.schoolName
      this.levelVal = res.schoolLevel
      this.majjor = res.major

      if (this.$ls.get('addAcademy_options')) {
        const params = JSON.parse(decode(decodeURIComponent(this.$ls.get('addAcademy_options'))))
        this.degreesVal = params.degreesVal
        this.learnVal = params.learnVal
        this.academy = params.academy
        this.levelVal = params.levelVal
        this.majjor = params.majjor
      }

      if (this.$ls.get('school')) {
        this.academy = this.$ls.get('school')
      }
    })
  },
  methods: {
    changeDegrees (index) {
      this.degreesVal = this.degrees[index].val
    },
    changeLearnStatus (index) {
      this.learnVal = this.learnStatus[index].val
    },
    levelConfirm (e) {
      this.levelVal = e[0].label
    },
    majorChange (e) {
      this.majjor = e
    },
    chooseSchool () {
      const addAcademyOptions = {
        degreesVal: this.degreesVal,
        learnVal: this.learnVal,
        academy: this.academy,
        levelVal: this.levelVal,
        majjor: this.majjor
      }
      const params = encodeURIComponent(encode(JSON.stringify(addAcademyOptions)))
      this.$ls.set('addAcademy_options', params)
      this.$changePage('pagesCalibration/academy/addAcademy')
    },
    backPage () {
      this.$ls.remove('school')
      this.$ls.remove('addAcademy_options')
      this.$pageBack()
    },
    updateBaseInfo () {
      if (!this.degreesVal) {
        this.$toast(this.identityType === '7' ? '请选择当前学历' : '请选择最高学历')
        return
      }
      if (this.identityType !== '7' && !this.learnVal) {
        this.$toast('请选择当前状态')
        return
      }
      if (!this.academy) {
        this.$toast('请选择院校名称')
        return
      }
      if (!this.levelVal) {
        this.$toast('请选择院校层次')
        return
      }
      if (this.identityType === '7' && !this.majjor) {
        this.$toast('请输入所学专业')
        return
      }
      const params = {
        educationLevel: this.degreesVal,
        educationStatus: this.learnVal,
        schoolName: this.academy,
        schoolLevel: this.levelVal,
        major: this.majjor
      }
      updateBaseInfoApi(params).then(res => {
        this.$toast('更新成功')
        setTimeout(() => {
          this.$ls.remove('school')
          this.$ls.remove('addAcademy_options')
          if (this.identityType === '7') {
            this.$changePage('pagesCalibration/fillInformation/informationIIIStu')
          } else {
            this.$changePage('pagesCalibration/fillInformation/informationIII')
          }
        }, 1500)
      })
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
