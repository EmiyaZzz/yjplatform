<template>
  <rcyj-page-view>
    <view class="information-wrapper pb-70">
      <view class="topbg" :style="{'background-image':'url('+topBg+')'}">
        <view class="h1">添加技能资格</view>
      </view>
      <view class="form-wrapper add-form-wrapper">
        <caption-box title="技能资格名称"></caption-box>
        <view class="content-box line-box">
          <rcjy-input placeholder="填写获得的资格全称" :inval="honorName" @input="honorChange"></rcjy-input>
        </view>
        <caption-box title="资格等级"></caption-box>
        <view class="content-box at-row align-center pt-30 mb-30">
          <view class="single degrees" :class="[item.val === gradeVal ? 'active' : '']" v-for="(item) in professionalCertificateLevel" :key="item.val" @click="changeGrade(item.val)">
            <text>{{ item.name }}</text>
          </view>
        </view>
        <caption-box title="上传证书或证明材料（选填）" mb="40"></caption-box>
        <u-upload
          :action="upload"
          ref="uUpload"
          name="file"
          width="227"
          height="148"
          :show-progress="false"
          :file-list="imgList"
          del-bg-color="#F6F7FB"
          del-color="#9094A0"
          :max-size="5 * 1024 * 1024"
          max-count="2"
          upload-text="点击上传"
          @on-choose-complete="uploadComplete"
          @on-uploaded="uploadSuccess"
          @on-remove="removeSuccess"
          :before-upload="beforeUpload"
        >
        </u-upload>
        <view class="uploadTips mt-30 mb-70">上传的图片请保证字迹清晰、边角完整，证件照片会保存在信息授权模块的身价证件包中。</view>

        <view class="at-row align-center">
          <view class="felx-group ml-16"><rcyj-button height="88rpx" textColor="#fff" @click="addProfessional">添加</rcyj-button></view>
        </view>
      </view>
    </view>
    <u-popup
      v-model="loadShow"
      :mask-close-able="false"
      mode="center"
      width="250rpx"
      height="250rpx"
      border-radius="10">
      <view class="load-style">
        <u-loading size="60"></u-loading>
        <view class="txt">正在上传图片</view>
      </view>
    </u-popup>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import RcjyInput from '../../components/rcyj-input/rcjy-input.vue'
import captionBox from '../components/caption/caption'
import { getBaseInfoApi, addProfessionalApi } from '@/api/common'
export default Vue.extend({
  name: 'AddHonor',
  components: { RcjyInput, captionBox },
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201213/0d5d8bbdce9a411e87393eb6e1a22970.png',
      upload: this.$UploadUrl,
      // 根据身份
      identityType: '',
      // 荣誉名称
      honorName: '',
      // 荣誉级别
      gradeVal: '',
      professionalCertificateLevel: [
        {
          name: '高级技师',
          val: '1'
        },
        {
          name: '技师',
          val: '2'
        },
        {
          name: '高级',
          val: '3'
        },
        {
          name: '中级',
          val: '4'
        },
        {
          name: '初级',
          val: '5'
        },
        {
          name: '其他',
          val: '6'
        }
      ],
      showUploadList: true,
      imgList: [],
      honorCertificateMaterial: [],
      loadShow: false
    }
  },
  onLoad () {
    getBaseInfoApi().then(res => {
      this.identityType = res.identityType
      if (this.identityType !== '7') {
        this.gradeChoose = this.grade
      } else {
        this.gradeChoose = this.gradeStu
      }
    })
  },
  methods: {
    addProfessional () {
      if (!this.honorName) {
        this.$toast('请填写技能资格名称')
        return
      }
      if (!this.gradeVal) {
        this.$toast('请选择资格等级')
        return
      }
      let files = []
      // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
      files = this.$refs.uUpload.lists.filter(val => {
        return val.progress === 100 && val.response
      })
      if (files.length) {
        this.honorCertificateMaterial = []
        files.forEach(element => {
          this.honorCertificateMaterial.push(element.response.url)
        })
      }
      console.log(JSON.stringify(this.honorCertificateMaterial))
      const params = {
        professionalCertificateName: this.honorName,
        professionalCertificateLevel: this.gradeVal,
        professionalCertificateMaterial: this.honorCertificateMaterial.length ? JSON.stringify(this.honorCertificateMaterial) : ''
      }
      addProfessionalApi(params).then(res => {
        this.$toast('添加成功')
        setTimeout(() => {
          this.$pageBack()
        }, 1500)
      })
    },
    honorChange (e) {
      this.honorName = e
    },
    changeGrade (val) {
      this.gradeVal = val
    },
    // 每次选择图片后触发
    uploadComplete () {
      this.loadShow = true
    },
    // 所有图片上传完毕触发
    uploadSuccess (data, index, lists, name) {
      this.loadShow = false
      this.imgList = lists
    },
    removeSuccess (index, lists, name) {
      this.imgList = lists
    }
  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
