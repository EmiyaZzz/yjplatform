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
            <view
              class="in-box at-row align-center space-between"
              v-if="identity == '1'"
            >
              <view class="in-label"> 职务 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.postPSSelect.isShow = true"
                >
                  <view v-if="postPS.label">{{ postPS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-else>
              <view class="in-label"> 职务 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="postPI"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入职务"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 职级 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.postRankSelect.isShow = true"
                >
                  <view v-if="postRankS.label">{{ postRankS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 技术职称 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.technicalTitlesLevelSelect.isShow = true"
                >
                  <view v-if="technicalTitlesLevelS.label">{{
                    technicalTitlesLevelS.label
                  }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="technicalTitlesLevelS"
            >
              <view class="in-label"> 技术职称名称 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="technicalTitlesName"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入技术职称名称"
                />
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="technicalTitlesLevelS"
            >
              <view class="in-label"> 技术职称证书 </view>
              <view class="select-group">
                <view class="register-paper-box">
                  <view @click="openSheetTec('headImg')">
                    <view v-if="technicalTitlesPic">已上传</view>
                    <view v-else>请选择证书照片</view>
                  </view>
                  <!-- <view class="know-in" @click="$refs.pictureKnow.isShow=true">查看拍摄须知</view> -->
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 职业资格 </view>
              <view>
                <view
                  class="select-group"
                  @click="
                    $refs.vocationalQualificationLevelSelect.isShow = true
                  "
                >
                  <view v-if="vocationalQualificationLevelS.label">
                    {{ vocationalQualificationLevelS.label }}
                  </view>
                  <view v-if="!vocationalQualificationLevelS.label"
                    >请选择</view
                  >
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="vocationalQualificationLevelS"
            >
              <view class="in-label"> 职业资格名称 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="vocationalQualificationName"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入职业资格名称"
                />
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="vocationalQualificationLevelS"
            >
              <view class="in-label"> 职业资格证书 </view>
              <view class="select-group">
                <view class="register-paper-box">
                  <view @click="openSheetVoc('headImg')">
                    <view v-if="vocationalQualificationPic">已上传</view>
                    <view v-else>请选择证书照片</view>
                  </view>
                  <!-- <view class="know-in" @click="$refs.pictureKnow.isShow=true">查看拍摄须知</view> -->
                </view>
              </view>
            </view>

            <view class="tips"
              >*请确保填写信息的真实性，否则会影响评估结果和信用</view
            >
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
          <rcyj-picker-single
            ref="postRankSelect"
            :list="postRankList"
            @confirm="postRankConfirm"
          />
          <rcyj-picker-single
            ref="postPSSelect"
            :list="postPList"
            @confirm="postPConfirm"
          />
          <rcyj-picker-single
            ref="technicalTitlesLevelSelect"
            :list="technicalTitlesLevelList"
            @confirm="technicalTitlesLevelListConfirm"
          />
          <rcyj-picker-single
            ref="vocationalQualificationLevelSelect"
            :list="vocationalQualificationLevelList"
            @confirm="vocationalQualificationLevelConfirm"
          />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  dutyDetail,
  postAdd,
  queryDictDataByType,
  queryHighArea,
  upload,
} from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
import MinePop from "../components/mine-pop/mine-pop.vue";
import FunPop from "../components/fun-pop/fun-pop.vue";
import RcyjIcon from "../../components/rcyj-icon/rcyj-icon.vue";
import RcjyInput from "../../components/rcyj-input/rcjy-input.vue";
const config = require("@/config/index");
export default Vue.extend({
  components: {
    MinePop,
    FunPop,
    RcjyInput,
    RcyjIcon,
    TopInfo,
  },
  data() {
    return {
      action: config.gatewayUrl + "/assess/oss/uploadReturnUrl",
      current: 0,
      uInputStyle: {
        color: "#black",
        fontSize: "30rpx",
        textAlign: "right",
      },
      getToken: this.$ls.get("KEY_ACCESS_TOKEN"),
      identity: "",
      userId: "",
      postRankS: "",
      postRankList: [],
      postPS: "", //选择的职务
      postPI: "", //输入的职务
      dutyName: "",
      postPList: [],
      technicalTitlesLevelS: "",
      technicalTitlesLevelList: [],
      technicalTitlesName: "",
      technicalTitlesPic: "",
      vocationalQualificationLevelS: "",
      vocationalQualificationLevelList: [],
      vocationalQualificationName: "",
      vocationalQualificationPic: "",

      educationPic: "",
      educationList: [],
      degreeS: "", //是否取得学位
      degreeName: "",
      degreePic: "",
      major: "", //所学专业
    };
  },
  onLoad() {},
  onShow() {
    // let dictType = 'identity'
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);

      await queryDictDataByType({
        dictType: "technical_titles",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.technicalTitlesLevelList.push(temp);
        }
      });
      await queryDictDataByType({
        dictType: "qualification_level",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.vocationalQualificationLevelList.push(temp);
        }
      });
      if (this.getToken) {
        await dutyDetail().then((data) => {
          if (!data) return;
          this.userId = data.id;

          if (this.identity == "1") {
            this.postPList.forEach((element) => {
              if (element.value === data.postName) {
                this.postPS = element;
              }
            });
          } else {
            this.postPI = data.postName;
          }

          this.postRankList.forEach((element) => {
            if (element.value === data.postRank) {
              this.postRankS = element;
            }
          });

          this.technicalTitlesLevelList.forEach((element) => {
            if (element.value === data.technicalTitlesLevel) {
              this.technicalTitlesLevelS = element;
            }
          });
          this.technicalTitlesName = data.technicalTitlesName;
          this.technicalTitlesPic = data.technicalTitlesPic;
          this.vocationalQualificationLevelList.forEach((element) => {
            if (element.value === data.vocationalQualificationLevel) {
              this.vocationalQualificationLevelS = element;
            }
          });
          this.vocationalQualificationName = data.vocationalQualificationName;
          this.vocationalQualificationPic = data.vocationalQualificationPic;
        });
      }
    },
    getIdentity(data) {
      this.identity = data.value;

      let searchRank;
      let searcPosition;
      switch (this.identity) {
        case "1":
          searchRank = "party_policy_rank";
          searcPosition = "party_policy_position";
          break;
        case "2":
          searchRank = "management_rank";
          searcPosition = "";
          break;
        case "3":
          searchRank = "professional_technology_rank";
          searcPosition = "";
          break;
        case "4":
          searchRank = "senior_talents_rank";
          searcPosition = "";
          break;
        case "5":
          searchRank = "rural_practical_talents_rank";
          searcPosition = "";
          break;
        case "6":
          searchRank = "social_work_talents_rank";
          searcPosition = "";
          break;
        case "7":
          searchRank = "high_level_talents_rank";
          searcPosition = "";
          break;
        case "99":
          searchRank = "common_talents_rank";
          searcPosition = "";
          break;
      }
      if (searcPosition) {
        queryDictDataByType({
          dictType: searcPosition,
        }).then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = {};
            temp.value = data[i].dictValue;
            temp.label = data[i].dictLabel;
            this.postPList.push(temp);
          }
        });
      }
      if (searchRank) {
        queryDictDataByType({
          dictType: searchRank,
        }).then((data) => {
          for (let i = 0; i < data.length; i++) {
            let temp = {};
            temp.value = data[i].dictValue;
            temp.label = data[i].dictLabel;
            this.postRankList.push(temp);
          }
        });
      }
      this.init();
    },
    postRankConfirm(result) {
      this.postRankS = result[0];
    },
    postPConfirm(result) {
      this.postPS = result[0];
    },
    technicalTitlesLevelListConfirm(result) {
      this.technicalTitlesLevelS = result[0];
    },
    vocationalQualificationLevelConfirm(result) {
      this.vocationalQualificationLevelS = result[0];
    },

    degreeConfirm(result) {
      this.degreeS = result[0];
    },
    graduatedSchoolTypeConfirm(result) {
      this.graduatedSchoolTypeS = result[0];
    },
    schoolLevelConfirm(result) {
      this.schoolLevelS = result[0];
    },
    educationalNatureConfirm(result) {
      this.educationalNatureS = result[0];
    },
    rankCountryConfirm(result) {
      this.rankCountryS = result[0];
    },
    rankInternationalConfirm(result) {
      this.rankInternationalS = result[0];
    },
    exitAndSave() {
      const {
        userId,
        postRankS,
        postPS,
        dutyName,
        postPI,
        technicalTitlesLevelS,
        technicalTitlesName,
        technicalTitlesPic,
        vocationalQualificationLevelS,
        vocationalQualificationName,
        vocationalQualificationPic,
      } = this;
      if (this.postPS != "") {
        this.dutyName = this.postPS.value;
      } else {
        this.dutyName = this.postPI;
      }
      const params = {
        id: userId,
        postRank: postRankS.value,
        postName: this.dutyName,
        technicalTitlesLevel: technicalTitlesLevelS.value,
        technicalTitlesName: technicalTitlesName,
        technicalTitlesPic: technicalTitlesPic,
        vocationalQualificationLevel: vocationalQualificationLevelS.value,
        vocationalQualificationName: vocationalQualificationName,
        vocationalQualificationPic: vocationalQualificationPic,
      };
      postAdd(params)
        .then((data) => {
          this.postPS = "";
          this.postPI = "";

          wx.switchTab({
            url: "../index/index",
          });
        })
        .catch((err) => {});
    },
    async openSheetTec(type) {
      const params = {
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      };
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params);
      this[type] = res[1].tempFilePaths[0];
      if (type === "headImg") {
        this.uploadAvatarTec(res[1].tempFilePaths[0]);
        this.technicalTitlesPic = res[1].tempFilePaths[0];
      }
    },
    async openSheetVoc(type) {
      const params = {
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      };
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params);
      this[type] = res[1].tempFilePaths[0];
      if (type === "headImg") {
        this.uploadAvatarVoc(res[1].tempFilePaths[0]);
        this.vocationalQualificationPic = res[1].tempFilePaths[0];
      }
    },
    async uploadAvatarTec(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: "files",
        header: {
          Authorization: Vue.ls.get("KEY_ACCESS_TOKEN"),
          site: "client",
        },
      });
      this.file = JSON.parse(res[1].data).data;
      this.technicalTitlesPic = this.file.key;
      console.log(this.technicalTitlesPic);
    },
    async uploadAvatarVoc(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: "files",
        header: {
          Authorization: Vue.ls.get("KEY_ACCESS_TOKEN"),
          site: "client",
        },
      });
      this.file = JSON.parse(res[1].data).data;
      this.vocationalQualificationPic = this.file.key;
      console.log(this.vocationalQualificationPic);
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaEducation/index",
      });
    },
    evaluateSj() {
      const {
        userId,
        postRankS,
        postPS,
        dutyName,
        postPI,
        technicalTitlesLevelS,
        technicalTitlesName,
        technicalTitlesPic,
        vocationalQualificationLevelS,
        vocationalQualificationName,
        vocationalQualificationPic,
      } = this;
      if (this.postPS != "") {
        this.dutyName = this.postPS.value;
      } else {
        this.dutyName = this.postPI;
      }
      const params = {
        id: userId,
        postRank: postRankS.value,
        postName: this.dutyName,
        technicalTitlesLevel: technicalTitlesLevelS.value,
        technicalTitlesName: technicalTitlesName,
        technicalTitlesPic: technicalTitlesPic,
        vocationalQualificationLevel: vocationalQualificationLevelS.value,
        vocationalQualificationName: vocationalQualificationName,
        vocationalQualificationPic: vocationalQualificationPic,
      };
      postAdd(params)
        .then((data) => {
          this.postPS = "";
          this.postPI = "";
          this.$changePage({
            params: {},
            url: "/pages/evaIntellectual/index",
          });
          //  wx.switchTab({
          //   url:'../index/index'
          // })
        })
        .catch((err) => {});
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>