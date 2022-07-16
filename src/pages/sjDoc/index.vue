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
          <view class="doc-panel">
            <view>姓名:</view>
            <view>{{ docDetail.name }}</view>
          </view>
          <view class="doc-panel">
            <view>身份证号:</view>
            <view>{{ docDetail.idcard }}</view>
          </view>
          <view class="doc-panel">
            <view>性别:</view>
            <view>{{ docDetail.sex }}</view>
          </view>
          <view class="doc-panel">
            <view>民族:</view>
            <view>{{ docDetail.mz }}</view>
          </view>
          <view class="doc-panel">
            <view>籍贯:</view>
            <view>{{ docDetail.jg }}</view>
          </view>
          <view class="doc-panel">
            <view>出生日期:</view>
            <view>{{ docDetail.birthday }}</view>
          </view>
          <view class="doc-panel">
            <view>职业类别:</view>
            <view>{{ docDetail.zylb }}</view>
          </view>
          <view class="doc-panel">
            <view>工作单位:</view>
            <view>{{ docDetail.gzdw }}</view>
          </view>
          <view class="doc-panel">
            <view>单位地址:</view>
            <view>{{ docDetail.dwdz }}</view>
          </view>
          <view class="doc-panel">
            <view>单位属性:</view>
            <view>{{ docDetail.dwsx }}</view>
          </view>
          <view class="doc-panel">
            <view>所在行业:</view>
            <view>{{ docDetail.szhy }}</view>
          </view>
          <view class="doc-panel">
            <view>所在城市:</view>
            <view>{{ docDetail.city }}</view>
          </view>
          <view class="doc-panel">
            <view>是否为园区入驻单位:</view>
            <view>{{ docDetail.isPark }}</view>
          </view>
          <view class="doc-panel">
            <view>是否在国家级高新区:</view>
            <view>{{ docDetail.isHighArea }}</view>
          </view>
          <view class="doc-panel">
            <view>学历学位:</view>
            <view>{{ docDetail.education }}</view>
          </view>
          <view class="doc-panel">
            <view>所学专业:</view>
            <view>{{ docDetail.major }}</view>
          </view>
          <view class="doc-panel">
            <view>毕业院校:</view>
            <view>{{ docDetail.school }}</view>
          </view>
          <view class="doc-panel">
            <view>职务职级:</view>
            <view>{{ docDetail.post }}</view>
          </view>
          <view class="doc-panel">
            <view>技术职称:</view>
            <view>{{ docDetail.jszc }}</view>
          </view>
          <view class="doc-panel">
            <view>职业资格:</view>
            <view>{{ docDetail.zyzg }}</view>
          </view>
          <view class="doc-panel">
            <view>知识产权:</view>
            <view v-html="docDetail.zscq"></view>
          </view>
          <view class="doc-panel">
            <view>科技成果:</view>
            <view v-html="docDetail.kjcg"></view>
          </view>
          <view class="doc-panel">
            <view>成就贡献:</view>
            <view v-html="docDetail.cjgx"></view>
          </view>
          <view class="doc-panel">
            <view>荣誉称号:</view>
            <view v-html="docDetail.rych "></view>
          </view>
          <view class="doc-panel">
            <view>社会职务:</view>
            <view>{{ docDetail.shzw }}</view>
          </view>
          <view class="doc-panel">
            <view>政协委员:</view>
            <view>{{ docDetail.zxwy }}</view>
          </view>
          <view class="doc-panel">
            <view>人大代表:</view>
            <view>{{ docDetail.rddb }}</view>
          </view>
          <view class="doc-panel">
            <view>党代表:</view>
            <view>{{ docDetail.ddb }}</view>
          </view>
          <view class="doc-panel">
            <view>健康状况:</view>
            <view>{{ docDetail.jk }}</view>
          </view>
          <view class="doc-panel">
            <view>婚姻状况:</view>
            <view>{{ docDetail.hy }}</view>
          </view>
          <view class="doc-panel">
            <view>兵役状况:</view>
            <view>{{ docDetail.by }}</view>
          </view>
          <view class="doc-panel">
            <view>所属党派:</view>
            <view>{{ docDetail.dp }}</view>
          </view>
          <view class="doc-panel">
            <view>社保缴纳情况:</view>
            <view>{{ docDetail.sbjn }}</view>
          </view>
          <view class="doc-panel">
            <view>社保使用情况:</view>
            <view>{{ docDetail.sbsy }}</view>
          </view>
          <view class="doc-panel">
            <view>个人所得税:</view>
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
          <view class="doc-panel">
            <view>创业经历:</view>
            <view>{{ docDetail.cyjl }}</view>
          </view>
          <view class="doc-panel">
            <view>出国经历:</view>
            <view>{{ docDetail.cgjl }}</view>
          </view>
          <view class="doc-panel">
            <view>技能资质:</view>
            <view>{{ docDetail.jnzz }}</view>
          </view>
          <view class="doc-panel">
            <view>最高年收入:</view>
            <view>{{ docDetail.nsr }}</view>
          </view>
          <view class="doc-panel">
            <view>总资产:</view>
            <view>{{ docDetail.zzc }}</view>
          </view>
          <view class="doc-panel">
            <view>总负债:</view>
            <view>{{ docDetail.zfz }}</view>
          </view>
          <view class="doc-panel">
            <view>是否有信用卡:</view>
            <view>{{ docDetail.isCredit }}</view>
          </view>
          <view class="doc-panel">
            <view>是否有按揭贷款:</view>
            <view>{{ docDetail.isMortgage }}</view>
          </view>
          <view class="doc-panel">
            <view>主要收入来源:</view>
            <view>{{ docDetail.srly }}</view>
          </view>
          <view class="doc-panel">
            <view>补充信息:</view>
            <view>{{ docDetail.bcxx }}</view>
          </view>
          <view class="doc-panel">
            <view>联系人姓名:</view>
            <view>{{ docDetail.lxr }}</view>
          </view>
          <view class="doc-panel">
            <view>证明人姓名:</view>
            <view>{{ docDetail.zmr }}</view>
          </view>
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