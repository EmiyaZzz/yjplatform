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
              <view class="in-label"> 第一学历 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.educationFSelect.isShow = true"
                >
                  <view v-if="educationSelectSF.label">
                    {{ educationSelectSF.label }}</view
                  >
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 最高学历 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.educationSelect.isShow = true"
                >
                  <view v-if="educationSelectS.label">
                    {{ educationSelectS.label }}</view
                  >
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="degreeS.value == 0"
            >
              <view class="in-label"> 学历证上传 </view>
              <view class="select-group">
                <view class="register-paper-box">
                  <view @click="openSheetEdu('headImg')">
                    <view v-if="educationPic">已上传</view>
                    <view v-else>请选择学历证照片</view>
                  </view>
                  <!-- <view class="know-in" @click="$refs.pictureKnow.isShow=true">查看拍摄须知</view> -->
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="educationSelectS.value > 2"
            >
              <view class="in-label"> 是否取得学位 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.degreeSelect.isShow = true"
                >
                  <view v-if="degreeS.label">
                    {{ degreeS.label }}
                  </view>
                  <view v-if="!degreeS.label">请选择</view>
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="degreeS.value == 0"
            >
              <view class="in-label"> 学位名称 </view>
              <!-- <view class="felx-group at-row align-center space-between">
                <u-input v-model="degreeName" maxlength="11" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入学位名称" />
              </view> -->
              <view>
                <view
                  class="select-group"
                  @click="$refs.degreeNameSelect.isShow = true"
                >
                  <view v-if="degreeNameS.label">
                    {{ degreeNameS.label }}
                  </view>
                  <view v-if="!degreeNameS.label">请选择</view>
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="degreeS.value == 0"
            >
              <view class="in-label"> 学位证上传 </view>
              <view class="select-group">
                <view class="register-paper-box">
                  <view @click="openSheet('headImg')">
                    <view v-if="degreePic">已上传</view>
                    <view v-else>请选择学位证照片</view>
                  </view>
                  <!-- <view class="know-in" @click="$refs.pictureKnow.isShow=true">查看拍摄须知</view> -->
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 所学专业 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="major"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入所学专业"
                />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 毕业时间 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.graduacionTime.isShow = true"
                >
                  <view v-if="graduacionTime">
                    {{ graduacionTime }}
                  </view>
                  <view v-if="!graduacionTime">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 毕业院校 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.graduatedSchoolTypeSelect.isShow = true"
                >
                  <view v-if="graduatedSchoolTypeS.label">
                    {{ graduatedSchoolTypeS.label }}</view
                  >
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 1"
            >
              <view class="in-label"> 院校名称 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input
                  v-model="graduatedSchool"
                  maxlength="18"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入院校名称"
                />
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 1"
            >
              <view class="in-label"> 办学层次 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.schoolLevelSelect.isShow = true"
                >
                  <view v-if="schoolLevelS.label">
                    {{ schoolLevelS.label }}
                  </view>
                  <view v-if="!schoolLevelS.label">请选择</view>
                </view>
              </view>
            </view>
            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 1"
            >
              <view class="in-label"> 教育性质 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.educationalNatureSelect.isShow = true"
                >
                  <view v-if="educationalNatureS.label">
                    {{ educationalNatureS.label }}
                  </view>
                  <view v-if="!educationalNatureS.label">请选择</view>
                </view>
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 2"
            >
              <view class="in-label"> 国别 </view>
              <view class="felx-group at-row align-center space-between">
                <u-input
                  v-model="country"
                  maxlength="20"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入学校所属国别"
                />
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 2"
            >
              <view class="in-label"> 院校名称 </view>
              <view class="felx-group at-row align-center space-between">
                <u-input
                  v-model="graduatedSchoolForeignName"
                  maxlength="18"
                  placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false"
                  :custom-style="uInputStyle"
                  placeholder="请输入国外院校名称"
                />
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 2"
            >
              <view class="in-label"> 院校本国排名 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.rankCountrySelect.isShow = true"
                >
                  <view v-if="rankCountryS.label">
                    {{ rankCountryS.label }}
                  </view>
                  <view v-if="!rankCountryS.label">请选择</view>
                </view>
              </view>
            </view>

            <view
              class="in-box at-row align-center space-between"
              v-if="graduatedSchoolTypeS.value == 2"
            >
              <view class="in-label"> 院校国际排名 </view>
              <view>
                <view
                  class="select-group"
                  @click="$refs.rankInternationalSelect.isShow = true"
                >
                  {{ rankInternationalS.label
                  }}<view v-if="!rankInternationalS.label">请选择</view>
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
            ref="educationSelect"
            :list="educationList"
            @confirm="educationConfirm"
          />
          <rcyj-picker-single
            ref="educationFSelect"
            :list="educationList"
            @confirm="educationFConfirm"
          />
          <rcyj-picker-single
            ref="degreeSelect"
            :list="check"
            @confirm="degreeConfirm"
          />
          <rcyj-picker-single
            ref="degreeNameSelect"
            :list="degreeList"
            @confirm="degreeNameConfirm"
          />
          <rcyj-picker-single
            ref="graduatedSchoolTypeSelect"
            :list="graduatedSchoolTypeList"
            @confirm="graduatedSchoolTypeConfirm"
          />
          <rcyj-picker-single
            ref="schoolLevelSelect"
            :list="schoolLevelList"
            @confirm="schoolLevelConfirm"
          />
          <rcyj-picker-single
            ref="educationalNatureSelect"
            :list="educationalNatureList"
            @confirm="educationalNatureConfirm"
          />
          <rcyj-picker-single
            ref="rankCountrySelect"
            :list="rankCountryList"
            @confirm="rankCountryConfirm"
          />
          <rcyj-picker-single
            ref="rankInternationalSelect"
            :list="rankInterationalList"
            @confirm="rankInternationalConfirm"
          />
          <rcyj-date ref="graduacionTime" @confirm="graduacionTimeConfirm" />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  eduDetail,
  eduAdd,
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
      fileEdu: "",
      file: "",
      getToken: this.$ls.get("KEY_ACCESS_TOKEN"),
      userId: "",
      educationSelectSF: "",
      educationSelectS: "",
      educationPic: "",
      educationList: [],
      educationFList: [],
      degreeS: "", //是否取得学位
      // degreeName: '',
      degreeList: [],
      degreeNameS: "",
      degreePic: "",
      major: "", //所学专业
      graduacionTime: "",

      graduatedSchoolTypeS: "", //1中国 2非中国
      graduatedSchool: "",
      schoolLevelS: "", //办学层次
      schoolLevelList: [],
      educationalNatureS: "", //教育性质
      educationalNatureList: [],
      country: "", //国别
      graduatedSchoolForeignName: "", //国外院校名称
      rankCountryS: "",
      rankInternationalS: "",
      rankCountryList: [
        {
          value: "1",
          label: "100名内",
        },
        {
          value: "2",
          label: "100名外",
        },
      ],
      rankInterationalList: [
        {
          value: "1",
          label: "500名内",
        },
        {
          value: "2",
          label: "500名外",
        },
      ],
      graduatedSchoolTypeList: [
        {
          value: "1",
          label: "中国院校",
        },
        {
          value: "2",
          label: "非中国院校",
        },
      ],
      check: [
        {
          value: "0",
          label: "是",
        },
        {
          value: "1",
          label: "否",
        },
      ],
      //----------------------
    };
  },
  onLoad() {
    this.init();
  },
  onShow() {
    // let dictType = 'identity'
    // console.log(this.$route.params)
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);
      //学历查询
      await queryDictDataByType({
        dictType: "education",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.educationList.push(temp);
        }
      });
      await queryDictDataByType({
        dictType: "degree",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.degreeList.push(temp);
        }
      });
      await queryDictDataByType({
        dictType: "school_Level",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.schoolLevelList.push(temp);
        }
      });
      await queryDictDataByType({
        dictType: "educational_Nature",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.educationalNatureList.push(temp);
        }
      });
      if (this.getToken) {
        await eduDetail().then((data) => {
          console.log(data);
          if (!data) return;
          this.userId = data.id;
          this.educationList.forEach((element) => {
            if (element.value === data.firstEducation) {
              this.educationSelectSF = element;
            }
          });
          this.educationList.forEach((element) => {
            if (element.value === data.education) {
              this.educationSelectS = element;
            }
          });
          this.educationPic = data.educationPic;
          this.check.forEach((element) => {
            if (element.value === data.isAcquireDegree) {
              this.degreeS = element;
            }
          });
          this.degreeList.forEach((element) => {
            if (element.value === data.degreeName) {
              this.degreeNameS = element;
            }
          });

          // this.degreeName = data.degreeName
          this.degreePic = data.degreePic;
          this.major = data.major;
          this.graduacionTime = data.graduatedTime;

          this.graduatedSchoolTypeList.forEach((element) => {
            if (element.value === data.graduatedSchoolType) {
              this.graduatedSchoolTypeS = element;
              console.log(this.graduatedSchoolTypeS);
            }
          });
          this.graduatedSchool = data.graduatedSchool;
          this.schoolLevelList.forEach((element) => {
            if (element.value === data.schoolLevel) {
              this.schoolLevelS = element;
            }
          });
          this.educationalNatureList.forEach((element) => {
            if (element.value === data.educationalNature) {
              this.educationalNatureS = element;
            }
          });

          this.country = data.country;
          this.graduatedSchoolForeignName = data.graduatedSchoolForeignName;
          this.rankCountryList.forEach((element) => {
            if (element.value === data.rankCountry) {
              this.rankCountryS = element;
            }
          });

          this.rankInterationalList.forEach((element) => {
            if (element.value === data.rankInternational) {
              this.rankInternationalS = element;
            }
          });
        });
      }
    },

    educationConfirm(result) {
      this.educationSelectS = result[0];
    },
    educationFConfirm(result) {
      this.educationSelectSF = result[0];
    },
    degreeConfirm(result) {
      this.degreeS = result[0];
    },
    degreeNameConfirm(result) {
      this.degreeNameS = result[0];
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
    graduacionTimeConfirm(result) {
      this.graduacionTime = result;
    },
    exitAndSave() {
      const {
        userId,
        educationSelectS,
        educationPic,
        degreeS,
        degreeNameS,
        degreePic,
        major,
        graduatedSchoolTypeS,
        graduatedSchool,
        schoolLevelS,
        educationalNatureS,
        country,
        graduatedSchoolForeignName,
        rankCountryS,
        rankInternationalS,
        graduacionTime,
      } = this;
      const params = {
        id: userId,
        education: educationSelectS.value,
        educationPic: educationPic,
        isAcquireDegree: degreeS.value,
        degreeName: degreeNameS.value,
        degreePic: degreePic,
        major: major,
        graduatedSchoolType: graduatedSchoolTypeS.value,
        graduatedSchool: graduatedSchool,
        schoolLevel: schoolLevelS.value,
        educationalNature: educationalNatureS.value,
        country: country,
        graduatedSchoolForeignName: graduatedSchoolForeignName,
        rankCountry: rankCountryS.value,
        rankInternational: rankInternationalS.value,
        graduatedTime: graduacionTime,
      };
      console.log(params);
      eduAdd(params)
        .then((data) => {
          wx.switchTab({
            url: "../index/index",
          });
        })
        .catch((err) => {});
    },
    async openSheetEdu(type) {
      const params = {
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      };
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params);
      this[type] = res[1].tempFilePaths[0];
      if (type === "headImg") {
        this.uploadAvatarEdu(res[1].tempFilePaths[0]);
        // this.educationPic = res[1].tempFilePaths[0]
        console.log(this.degreePic);
      }
    },
    async openSheet(type) {
      const params = {
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      };
      // eslint-disable-next-line no-undef
      const res = await uni.chooseImage(params);
      this[type] = res[1].tempFilePaths[0];
      if (type === "headImg") {
        this.uploadAvatar(res[1].tempFilePaths[0]);
        // this.degreePic = res[1].tempFilePaths[0]
        console.log(this.educationPic);
      }
    },
    async uploadAvatar(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: "files",
        header: {
          Authorization: Vue.ls.get("KEY_ACCESS_TOKEN"),
          site: "client",
        },
      });
      console.log(res);
      this.file = JSON.parse(res[1].data).data;
      this.degreePic = this.file.key;
    },
    async uploadAvatarEdu(filePath) {
      const res = await uni.uploadFile({
        url: this.action,
        filePath: filePath,
        name: "files",
        header: {
          Authorization: Vue.ls.get("KEY_ACCESS_TOKEN"),
          site: "client",
        },
      });

      this.fileEdu = JSON.parse(res[1].data).data;
      this.educationPic = this.fileEdu.key;
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaluateUserInfo/index",
      });
    },
    evaluateSj() {
      const {
        userId,
        educationSelectS,
        educationPic,
        degreeS,
        educationSelectSF,
        degreeNameS,
        degreePic,
        major,
        graduatedSchoolTypeS,
        graduatedSchool,
        schoolLevelS,
        educationalNatureS,
        country,
        graduatedSchoolForeignName,
        rankCountryS,
        rankInternationalS,
        graduacionTime,
      } = this;
      const params = {
        id: userId,
        education: educationSelectS.value,
        educationPic: educationPic,
        isAcquireDegree: degreeS.value,
        degreeName: degreeNameS.value,
        firstEducation: educationSelectSF.value,
        degreePic: degreePic,
        major: major,
        graduatedSchoolType: graduatedSchoolTypeS.value,
        graduatedSchool: graduatedSchool,
        schoolLevel: schoolLevelS.value,
        educationalNature: educationalNatureS.value,
        country: country,
        graduatedSchoolForeignName: graduatedSchoolForeignName,
        rankCountry: rankCountryS.value,
        rankInternational: rankInternationalS.value,
        graduatedTime: graduacionTime,
      };
      console.log(params);
      eduAdd(params)
        .then((data) => {
          this.$changePage({
            // params: {
            //   data: this.identityType
            // },
            url: "/pages/evaDuty/index",
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