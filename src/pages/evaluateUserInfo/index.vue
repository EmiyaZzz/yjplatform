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
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 姓名 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="realName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入真实姓名" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 身份证号 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="idCard" maxlength="18" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入身份证号" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 性别 </view>
              <view>
                <view class="select-group" @click="$refs.sexSelect.isShow = true">
                  <view v-if="sexS.label">
                    {{ sexS.label }}
                  </view>
                  <view v-if="!sexS.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 民族 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="nationality" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入民族" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 籍贯 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="hometown" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入籍贯" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 出生日期 </view>
              <!-- <view class="felx-group">
                <assess-date-picker @confirm="confirmbirthday"> <view>请选择</view></assess-date-picker>
              </view> -->
              <view>
                <view class="select-group" @click="$refs.birthday.isShow = true">
                  {{ birthday }}
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 身份证上传 </view>
              <view class="select-group">
                <view class="register-paper-box">
                  <view @click="openSheet('headImg')">
                    <view v-if="idCardPic">已上传</view>
                    <view v-else>请选择身份证照片</view>
                  </view>
                  <!-- <view class="know-in" @click="$refs.pictureKnow.isShow=true">查看拍摄须知</view> -->
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 职业类别 </view>
              <view>
                <view class="select-group" @click="$refs.workSelect.isShow = true">
                  <view v-if="occupationCategoryS.label">
                    {{ occupationCategoryS.label }}
                  </view>
                  <view v-else>请选择职业类别</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 工作单位 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="companyName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入工作单位全称" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 单位地址 </view>
              <view class="select-group">
                <!-- <rcjy-input class="showitem" :disabled="true" placeholder="请选择单位所在省市区" 
                  :inval="companyAreaName">
                </rcjy-input> -->
                  <u-input v-model="companyAreaName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请选择单位所在省市区" />
                <rcyj-picker-districts ref="districts" @confirm="districtsConfirm" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 单位详细地址 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="companyAddress" maxlength="30" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入街道以下详细地址" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 单位属性 </view>
              <view>
                <view class="select-group" @click="$refs.unitProperty.isShow = true">
                  <view v-if="unitPropertyS.label">
                    {{ unitPropertyS.label }}</view>
                  <view v-else>请选择单位属性</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 所在行业 </view>
              <view>
                <view class="select-group" @click="$refs.industryType.isShow = true">
                  <view v-if="industryTypeS.label">
                    {{ industryTypeS.label }}</view>
                  <view v-if="!industryTypeS.label">请选择所在行业</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 所在城市 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="cityIn" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入所在城市" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否为园区入驻单位 </view>
              <view>
                <view class="select-group" @click="$refs.checkPark.isShow = true">
                  <view v-if="isParkUnit.label"> {{ isParkUnit.label }}</view>
                  <view v-if="!isParkUnit.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isParkUnit.value == 0">
              <view class="in-label"> 园区名称 </view>
              <view class="flex-group at-row align-center space-between">
                <u-input v-model="parkName" maxlength="20" placeholder-style="color:#9094A0;font-size:30rpx"
                  :clearable="false" :custom-style="uInputStyle" placeholder="请输入园区名称" />
              </view>
            </view>
            <view class="in-box at-row align-center space-between">
              <view class="in-label"> 是否在国家级高新区 </view>
              <view>
                <view class="select-group" @click="$refs.checkNational.isShow = true">
                  <view v-if="isHighTechArea.label">
                    {{ isHighTechArea.label }}
                  </view>
                  <view v-if="!isHighTechArea.label">请选择</view>
                </view>
              </view>
            </view>
            <view class="in-box at-row align-center space-between" v-if="isHighTechArea.value == 0">
              <view class="in-label"> 国家高新区 </view>
              <view>
                <view class="select-group" @click="$refs.highTechAreas.isShow = true">
                  <view v-if="highTechAreasS.label">
                    {{ highTechAreasS.label }}</view>
                  <view v-else>请选择</view>
                </view>
              </view>
            </view>
            <view class="tips">*请确保填写信息的真实性，否则会影响评估结果和信用</view>
          </view>
          <view class="btn-wrap">
            <view class="btn1" @click="pageBack()">上一页</view>
            <view class="btn1" @click="evaluateSj()">下一页</view>
            <view class="btn1" @click="exitAndSave()">保存退出</view>
          </view>
          <rcyj-picker-single ref="sexSelect" :list="sex" @confirm="sexConfirm" />
          <rcyj-date ref="birthday" @confirm="birthdayConfim" />
          <rcyj-picker-single ref="educationSelect" :list="education" @confirm="educationConfirm" />
          <rcyj-date ref="graduacionTime" @confirm="graduacionTimeConfirm" />
          <rcyj-picker-single ref="workSelect" :list="workType" @confirm="workConfirm" />
          <rcyj-picker-single ref="unitProperty" :list="unitProperty" @confirm="unitPropertyConfirm" />
          <rcyj-picker-single ref="industryType" :list="industryType" @confirm="industryTypeConfirm" />
          <rcyj-picker-single ref="checkPark" :list="check" @confirm="checkParkConfirm" />
          <rcyj-picker-single ref="checkNational" :list="check" @confirm="checkNationalConfirm" />
          <rcyj-picker-single ref="highTechAreas" :list="highTechAreas" @confirm="checkNhighTechAreasConfirm" />
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import {
  getUserInfoApi,
  userInfoAdd,
  queryDictDataByType,
  queryHighArea,
  upload,
  precisoEvaluate
} from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
import MinePop from "../components/mine-pop/mine-pop.vue";
import FunPop from "../components/fun-pop/fun-pop.vue";
import RcyjIcon from "../../components/rcyj-icon/rcyj-icon.vue";
import RcjyInput from "../../components/rcyj-input/rcjy-input.vue";
const config = require("@/config/index");
import { showScore } from '@/utils/utils'
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
        color: "#9094A0",
        fontSize: "30rpx",
        textAlign: "right",
      },
      getToken: this.$ls.get("KEY_ACCESS_TOKEN"),
      userId: "",
      identity: "", //人才类别
      realName: "",
      idCard: "",
      idCardPic: "",
      // 选择的性别
      sexS: "",
      nationality: "",
      hometown: "",
      occupationCategoryS: "", //职业类别
      companyName: "",
      companyCityName: "",
      companyAddress: "",
      companyAreaId: 0,
      companyAreaName: "",
      companyAreaNameA: "",
      cityIn: "",

      unitPropertyS: "", //单位属性
      industryTypeS: "", //所在行业

      isParkUnit: "",
      parkName: "",
      isHighTechArea: "",
      highTechAreas: [],
      highTechAreasS: {}, //所选国家高新区
      highTechZoneId: 0,
      companyCityId: 0, //工作城市id
      companyProvinceId: 0, //工作省份id
      companyProvinceName: "", //工作省份名称

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
      unitProperty: [
        {
          value: "1",
          label: "党政机关",
        },
        {
          value: "2",
          label: "行政事业单位",
        },
        {
          value: "3",
          label: "国有企业",
        },
        {
          value: "4",
          label: "外资企业",
        },
        {
          value: "5",
          label: "民营企业",
        },
        {
          value: "6",
          label: "社会组织",
        },
        {
          value: "7",
          label: "其他",
        },
      ],
      workType: [],
      industryType: [], //行业类别
      // 性别数组
      sex: [
        {
          value: "0",
          label: "男",
        },
        {
          value: "1",
          label: "女",
        },
      ],
      education: [
        {
          value: "5",
          label: "博士研究生",
        },
        {
          value: "4",
          label: "硕士研究生",
        },
        {
          value: "3",
          label: "本科",
        },
        {
          value: "2",
          label: "大专",
        },
        {
          value: "1",
          label: "中专",
        },
      ],
      position: [
        {
          value: "1",
          label: "基层",
        },
        {
          value: "2",
          label: "中层",
        },
        {
          value: "3",
          label: "高层",
        },
        {
          value: "4",
          label: "决策层",
        },
      ],

      birthday: "请选择",
      educationS: {
        value: "5",
        label: "博士研究生",
      },
      graduacionTime: "请选择",
      positionS: {
        value: "1",
        label: "基层",
      },
      //----------------------
    };
  },
  onLoad() {
    this.init();
  },
  onShow() {
    //  let dictType = 'identity'
  },
  methods: {
    async init() {
      this.getToken = this.$ls.get("KEY_ACCESS_TOKEN");
      console.log("token======" + this.getToken);
      await queryDictDataByType({
        dictType: "identity",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.workType.push(temp);
        }
      });
      await queryDictDataByType({
        dictType: "category_ industry",
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let temp = {};
          temp.value = data[i].dictValue;
          temp.label = data[i].dictLabel;
          this.industryType.push(temp);
        }
      });
      if (this.getToken) {
        await getUserInfoApi().then((data) => {
          this.userId = data.id;
          this.realName = data.realName;
          this.idCard = data.idCard;

          this.sex.forEach((element) => {
            if (element.value === data.sex) {
              this.sexS = element;
            }
          });
          this.nationality = data.nationality;
          this.hometown = data.hometown;
          this.birthday = data.birthday;
          this.idCardPic = data.idCardPic;

          this.workType.forEach((element) => {
            if (element.value === data.occupationCategory) {
              this.occupationCategoryS = element;
            }
          });
          this.companyName = data.companyName;

          if (
            data.companyProvinceName &&
            data.companyCityName &&
            data.companyAreaName
          ) {
            this.companyAreaName =
              data.companyProvinceName +
              "-" +
              data.companyCityName +
              "-" +
              data.companyAreaName;
          } else {
            this.companyAreaName = "";
          }

          this.companyProvinceName = data.companyProvinceName;
          this.companyCityName = data.companyCityName;
          this.companyProvinceId = data.companyProvinceId;
          this.companyCityId = data.companyCityId;
          this.companyAreaId = data.companyAreaId;
          this.companyAreaNameA = data.companyAreaName;
          this.companyAddress = data.companyAddress;

          this.unitProperty.forEach((element) => {
            if (element.value === data.unitProperty) {
              this.unitPropertyS = element;
            }
          });
          this.industryType.forEach((element) => {
            if (element.value === data.industry) {
              this.industryTypeS = element;
            }
          });
          this.cityIn = data.city;
          this.check.forEach((element) => {
            if (element.value === data.isParkUnit) {
              {
                this.isParkUnit = element;
              }
            }
            if (element.value === data.isHighTechArea) {
              {
                this.isHighTechArea = element;
              }
            }
          });
          this.parkName = data.parkName;
          //  console.log(this.highTechAreas)
          // this.highTechAreas.forEach(element => {
          //  console.log(element.value )
          //   if (element.value === data.highTechZoneId) {

          //     this.highTechAreasS = element
          //     this.highTechZoneId = element.value
          //   }

          // });

          //查找高新区
          queryHighArea({
            cityId: this.companyCityId,
            provinceId: this.companyProvinceId,
          }).then((dataH) => {
            for (let i = 0; i < dataH.length; i++) {
              let obj = {
                value: dataH[i].area_id,
                label: dataH[i].area_name,
              };
              this.highTechAreas.push(obj);
              if (dataH[i].area_id == data.highTechZoneId) {
                this.highTechAreasS = obj;
                this.highTechZoneId = data.highTechZoneId;
              }
            }
          });
        });
      }
    },
    getIdentity(data) {
      console.log("parent");
      console.log(data);
      this.identity = data.value;
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
        // this.idCardPic = res[1].tempFilePaths[0]
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
      this.file = JSON.parse(res[1].data).data;
      this.idCardPic = this.file.key;
      console.log(this.idCardPic);
    },
    pageBack() {
      this.$changePage({
        params: {
          data: this.identity,
        },
        url: "pages/evaIdentityTypeSelect/index",
      });
    },
    checkIs() {
      if (this.isParkUnit.value == '1') {
        this.parkName = ''
      }
      if (this.isHighTechArea.value == '1') {
        this.highTechZoneId = ''
      }
    },
    evaluateSj() {
      this.checkIs()
      const {
        userId,
        realName,
        idCard,
        idCardPic,
        sexS,
        nationality,
        hometown,
        birthday,
        occupationCategoryS,
        companyName,
        companyAddress,
        companyAreaId,
        companyAreaNameA,
        companyCityId,
        companyCityName,
        companyProvinceId,
        companyProvinceName,
        unitPropertyS,
        industryTypeS,
        cityIn,
        isParkUnit,
        parkName,
        isHighTechArea,
        highTechZoneId,
      } = this;
      const params = {
        id: userId,
        realName: realName,
        idCard: idCard,
        idCardPic: idCardPic,
        sex: sexS.value,
        nationality: nationality,
        hometown: hometown,

        birthday: birthday,
        occupationCategory: occupationCategoryS.value, //职业类别

        companyName: companyName,
        companyAddress: companyAddress, //单位详细地址
        companyAreaId: companyAreaId,
        companyAreaName: companyAreaNameA,
        companyCityId: companyCityId,
        companyCityName: companyCityName,
        companyProvinceId: companyProvinceId,
        companyProvinceName: companyProvinceName,

        unitProperty: unitPropertyS.value, //单位属性
        industry: industryTypeS.value, //所在行业
        city: cityIn, //所在城市
        isParkUnit: isParkUnit.value,
        parkName: parkName,
        isHighTechArea: isHighTechArea.value,
        highTechZoneId: highTechZoneId,
      };
      console.log(params);
      userInfoAdd(params)
        .then((data) => {
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
                url: "pages/evaEducation/index",
              });
            }, 1500);

          });

          //  wx.switchTab({
          //   url:'../evaEducation/index'
          // })
        })
        .catch((err) => { });
    },
    graduacionTimeConfirm(result) {
      this.graduacionTime = result;
    },
    educationConfirm(result) {
      this.educationS = result[0];
    },
    positionConfirm(result) {
      this.positionS = result[0];
    },
    birthdayConfim(result) {
      this.birthday = result;
    },
    sexConfirm(result) {
      this.sexS = result[0];
    },
    workConfirm(result) {
      this.occupationCategoryS = result[0];
    },
    unitPropertyConfirm(result) {
      this.unitPropertyS = result[0];
    },
    industryTypeConfirm(result) {
      this.industryTypeS = result[0];
    },
    districtsConfirm(data) {
      this.companyAreaName =
        data.provinceName + "-" + data.city + "-" + data.areaName;
      this.companyAreaNameA = data.areaName;
      this.companyCityName = data.city;
      this.companyProvinceId = data.provinceId;
      this.companyCityId = data.cityId;
      this.companyProvinceName = data.provinceName;
      this.cityIn = data.city;
      this.companyAreaId = data.areaId;

      this.highTechAreas = [];
      queryHighArea({
        cityId: this.companyCityId,
        provinceId: this.companyProvinceId,
      }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let obj = {
            value: data[i].area_id,
            label: data[i].area_name,
          };
          this.highTechAreas.push(obj);
        }
      });
    },
    checkParkConfirm(result) {
      this.isParkUnit = result[0];
    },
    checkNationalConfirm(result) {
      this.isHighTechArea = result[0];
    },
    checkNhighTechAreasConfirm(result) {
      this.highTechAreasS = result[0];
      this.highTechZoneId = this.highTechAreasS.value;
    },
    exitAndSave() {
      this.checkIs()
      const {
        userId,
        realName,
        idCard,
        idCardPic,
        sexS,
        nationality,
        hometown,
        birthday,
        occupationCategoryS,
        companyName,
        companyAddress,
        companyAreaId,
        companyAreaNameA,
        companyCityId,
        companyCityName,
        companyProvinceId,
        companyProvinceName,
        unitPropertyS,
        industryTypeS,
        cityIn,
        isParkUnit,
        parkName,
        isHighTechArea,
        highTechZoneId,
      } = this;
      if (!this.realName) {
        this.$toast("请输入真实姓名");
        return;
      }
      if (!this.birthday) {
        this.$toast("请选择出生日期");
        return;
      }
      const params = {
        id: userId,
        realName: realName,
        idCard: idCard,
        idCardPic: idCardPic,
        sex: sexS.value,
        nationality: nationality,
        hometown: hometown,

        birthday: birthday,
        occupationCategory: occupationCategoryS.value, //职业类别

        companyName: companyName,
        companyAddress: companyAddress, //单位详细地址
        companyAreaId: companyAreaId,
        companyAreaName: companyAreaNameA,
        companyCityId: companyCityId,
        companyCityName: companyCityName,
        companyProvinceId: companyProvinceId,
        companyProvinceName: companyProvinceName,

        unitProperty: unitPropertyS.value, //单位属性
        industry: industryTypeS.value, //所在行业
        city: cityIn, //所在城市
        isParkUnit: isParkUnit.value,
        parkName: parkName,
        isHighTechArea: isHighTechArea.value,
        highTechZoneId: highTechZoneId,
      };
      console.log(params);
      userInfoAdd(params)
        .then((data) => {
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

        })
        .catch((err) => { });
    },
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>