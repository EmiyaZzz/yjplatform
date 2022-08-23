 <template>
  <rcyj-page-view>
    <view class="index-wrapper">
      <view class="body">
        <top-info @getIdentityInfo="getIdentity" />
        <view class="box1 shadowb">
          <view class="title-panel">
            <view> 身价档案 </view>
            <!-- <img :src=more alt=""> -->
          </view>
          <view class="content-panel">
            <view class="avatorImg">
              <img :src="avator" alt="" />
            </view>
            <view class="top-data">
              <view>
                {{ docDetail.name }}
              </view>
              <view> 综合身价：{{ complexScore }}万 </view>
            </view>
          </view>
          <view class="doc-panel" v-if="docDetail.name">
            <view>姓名:</view>
            <view>{{ docDetail.name }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.idcard">
            <view>身份证号:</view>
            <view>{{ docDetail.idcard }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.sex">
            <view>性别:</view>
            <view>{{ docDetail.sex }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.mz">
            <view>民族:</view>
            <view>{{ docDetail.mz }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.jg">
            <view>籍贯:</view>
            <view>{{ docDetail.jg }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.birthday">
            <view>出生日期:</view>
            <view>{{ docDetail.birthday }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.zylb">
            <view>职业类别:</view>
            <view>{{ docDetail.zylb }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.gzdw">
            <view>工作单位:</view>
            <view>{{ docDetail.gzdw }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.dwdz">
            <view>单位地址:</view>
            <view>{{ docDetail.dwdz }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.dwsx">
            <view>单位属性:</view>
            <view>{{ docDetail.dwsx }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.szhy">
            <view>所在行业:</view>
            <view>{{ docDetail.szhy }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.city">
            <view>所在城市:</view>
            <view>{{ docDetail.city }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.isPark">
            <view>是否为园区入驻单位:</view>
            <view>{{ docDetail.isPark }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.isHighArea">
            <view>是否在国家级高新区:</view>
            <view>{{ docDetail.isHighArea }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.education">
            <view>学历学位:</view>
            <view>{{ docDetail.education }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.major">
            <view>所学专业:</view>
            <view>{{ docDetail.major }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.school">
            <view>毕业院校:</view>
            <view>{{ docDetail.school }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.post">
            <view>职务职级:</view>
            <view>{{ docDetail.post }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.jszc">
            <view>技术职称:</view>
            <view>{{ docDetail.jszc }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.zyzg">
            <view>职业资格:</view>
            <view>{{ docDetail.zyzg }}</view>
          </view>
          <view class="doc-panel" v-if="zscq">
            <view>知识产权:</view>
            <view class="muti" v-html="zscq"></view>
            <!-- <textarea v-html="zscq" maxlength="200" placeholder-style="color:#9094A0" placeholder=""
              :custom-style="uInputStyleLeft" /> -->

          </view>
          <view class="doc-panel" v-if="kjcg">
            <view>科技成果:</view>
            <view class="muti" v-html="kjcg"></view>
                   <!-- <textarea v-html="zscq" maxlength="200" placeholder-style="color:#9094A0" placeholder=""
              :custom-style="uInputStyleLeft" /> -->
          </view>
          <view class="doc-panel" v-if="cjgx">
            <view>成就贡献:</view>
            <view v-html="cjgx"></view>
          </view>
          <view class="doc-panel"  v-if="rych">
            <view>荣誉称号:</view>
            <view v-html="rych"></view>
          </view>
          <view class="doc-panel" v-if="docDetail.shzw">
            <view>社会职务:</view>
            <view>{{ docDetail.shzw }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.zxwy">
            <view>政协委员:</view>
            <view>{{ docDetail.zxwy }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.rddb">
            <view>人大代表:</view>
            <view>{{ docDetail.rddb }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.ddb">
            <view>党代表:</view>
            <view>{{ docDetail.ddb }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.jk">
            <view>健康状况:</view>
            <view>{{ docDetail.jk }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.hy">
            <view>婚姻状况:</view>
            <view>{{ docDetail.hy }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.by">
            <view>兵役状况:</view>
            <view>{{ docDetail.by }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.dp">
            <view>所属党派:</view>
            <view>{{ docDetail.dp }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.sbjn">
            <view>上年度社保缴纳情况:</view>
            <view>{{ docDetail.sbjn }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.sbsy">
            <view>上年度社保使用情况:</view>
            <view>{{ docDetail.sbsy }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.sds">
            <view>上年度个人所得税缴纳情况:</view>
            <view>{{ docDetail.sds }}</view>
          </view>
          <!-- <view class="doc-panel">
                        <view>学习经历:</view>
                        <view>{{ docDetail.xxjl }}</view>
                    </view>
                      <view class="doc-panel">
                        <view>工作经历:</view>
                        <view>{{ docDetail.gzjl }}</view>
                    </view> -->
          <view class="doc-panel" v-if="docDetail.cyjl">
            <view>创业经历:</view>
            <view>{{ docDetail.cyjl }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.cgjl">
            <view>出国经历:</view>
            <view>{{ docDetail.cgjl }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.jnzz">
            <view>技能资质:</view>
            <view>{{ docDetail.jnzz }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.nsr">
            <view>最高年收入:</view>
            <view>{{ docDetail.nsr }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.zzc">
            <view>总资产:</view>
            <view>{{ docDetail.zzc }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.zfz">
            <view>总负债:</view>
            <view>{{ docDetail.zfz }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.isCredit">
            <view>是否有信用卡:</view>
            <view>{{ docDetail.isCredit }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.isMortgage">
            <view>是否有按揭贷款:</view>
            <view>{{ docDetail.isMortgage }}</view>
          </view>
          <view class="doc-panel" v-if="docDetail.srly">
            <view>主要收入来源:</view>
            <view>{{ docDetail.srly }}</view>
          </view>
          <view class="doc-panel" v-if="bcxx">
            <view>补充信息:</view>
            <view class="muti" v-html="bcxx"></view>
          </view>
          <!-- <view class="doc-panel">
            <view>联系人姓名:</view>
            <view>{{ docDetail.lxr }}</view>
          </view> -->
          <!-- <view class="doc-panel">
            <view>证明人姓名:</view>
            <view>{{ docDetail.zmr }}</view>
          </view> -->
        </view>
      </view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { sjDocDetail, userPicDetail, userScore } from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
export default Vue.extend({
  components: {
    TopInfo,
  },
  data() {
    return {
      identity: "",
      more: this.$OSS_IMAGES_URL + "/20220617/morew.png",
      docDetail: "",
      avator: "",
      complexScore: "",
      zscq: '',
      kjcg: '',
      cjgx: '',
      rych: '',
      bcxx: '',
      uInputStyleLeft: {
        color: '#black',
        fontSize: '28rpx',
        textAlign: 'left'
      },
    };
  },
  methods: {
    getIdentity(data) {
      this.identity = data.value;
    },
  },
  onShow() {
    userPicDetail().then((res) => {
      this.avator = res.certificatePic;
      console.log(res);
    });
    sjDocDetail().then((res) => {
      this.docDetail = res;
      this.zscq = res.zscq.replaceAll('/n', '<br/>');
      this.kjcg = res.kjcg.replaceAll('/n', '<br/>');
      this.cjgx = res.cjgx.replaceAll('/n', '<br/>');
      this.rych = res.rych.replaceAll('/n', '<br/>');
      this.bcxx = res.bcxx.replaceAll('/n', '<br/>');
    });
    userScore().then((data) => {
      if (!data) return;
      console.log(data);
      this.complexScore = data.complexScore;
    });
  },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>