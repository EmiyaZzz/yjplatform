<template>
  <rcyj-page-view>
    <view class="identity-note-wrapper">
      <view class="topbg" :style="{'background-image':'url('+list[identityType].image+')'}">
        <view class="h1">{{ list[identityType].title }}</view>
        <view class="h6">身份类型说明</view>
      </view>
      <view class="content">{{ list[identityType].content }}</view>
    </view>
  </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IDENTITYNOTE',
  data () {
    return {
      topBg: this.$OSS_IMAGES_URL + '/20201212/e9b8fa0504ea4fd793f20bdc456064d4.png',
      interval: 2000,
      duration: 500,
      current: 0,
      identityType: '',
      // 1 党政人才 2企业经管人才 3专业技术人才 4 高技能人才 5农村实用人才 6 社会工作人才 7 在校大学生 8 高层次人才
      list: {
        1: {
          id: '1',
          image: this.$OSS_IMAGES_URL + '/20201213/82ec3c0ed662498a9aeda7499cd23ae5.png',
          title: '党政人才',
          content: '指在国家党政机关、群团组织中从事行政管理或事务管.理工作，具有一-定知识或技能，取得一-定工作业绩，得到群众认可的国家公务员和参照公务员法管理的群团机关工作人员。公务员:指列入公务员法实施范围的中国共产党各级机关、各级人民代表大会及其常务委员会机关、各级行政机关、中国人民政治协商会议各级委员会机关、各级审判机关、各级检察机关、各民主党派和工商联的各级机关中已登记和暂缓登记人员。参照公务员法管理的群团机关工作人员:指列入参照公务员法管理范围的人民团体和群众团体中参照公务员法管理的工作人员。参照公务员法管理的事业单位工作人员:指列入公务员法实施范围的事业单位中已进:行登记或暂缓登记人员。'
        },
        2: {
          id: '2',
          image: this.$OSS_IMAGES_URL + '/20201213/1a9dfc3bbbf845acb649777cf3afef17.png',
          title: '企业经营人才',
          content: '指具有专业技术资格或学历，能为企业运营进行谋划、决策、管理、实施等的各层负责人员。经营人才指企业的单位负责人和部门负责人；包括董事、监事、经理人以及具体从事规划计划、人力资源、市场营销、资本运营、财务审计、生产管理、法律事务、质量安全环保、行政管理、党务、纪检监察、工会、共青团、老干部、企业文化建设等工作的人员。'
        },
        3: {
          id: '3',
          image: this.$OSS_IMAGES_URL + '/20201213/0241e6347c4a452fa00e2826d2f8f392.png',
          title: '专业技术人才',
          content: '指依照国家人才法律法规，经过国家人事部门全国统考合格，并经国家主管部委注册备案，颁发注册执业证书。在企业或事业单位从事专业技术工作的技术人员及具有前述执业证书并从事专业技术管理工作，在1983年以前评定了专业技术职称或在1984年以后考取了国家执行资格并具有专业技术执业证书的人员。'
        },
        4: {
          id: '4',
          image: this.$OSS_IMAGES_URL + '/20201213/9bdff3ed22fc484eb802792a3fcaee49.png',
          title: '高技能人才',
          content: '指在生产、运输和服务等领域岗位一线，熟练掌握专门知识和技术，具备精湛的操作技能，并在工作实践中能够解决关键技术和工艺的操作性难题的人员。'
        },
        5: {
          id: '5',
          image: this.$OSS_IMAGES_URL + '/20201213/7f9aee0e4c5b4e2db555cab9fc025a96.png',
          title: '农村实用人才',
          content: '指户口所在地属于农村，具有一定知识和技能，为农村经济和科技、教育、文化、卫生等各项事业发展提供服务、做出贡献、起到示范和带头作用的农村劳动者。包括农村种植养殖能手、加工和捕捞能手、农村经纪人、各类能工巧匠和科技带头人等，但不包括在农村地区服务的国家机关、事业单位、国有企业在编在职人员。'
        },
        6: {
          id: '6',
          image: this.$OSS_IMAGES_URL + '/20201213/42103fca58c141c18dfa5e7d48412d27.png',
          title: '社会工作人才',
          content: '指具有一定社会工作专业知识和技能，在社会福利、社会救助、慈善事业、社区建设、婚姻家庭、精神卫生、残障康复、教育辅导、就业援助、职工帮扶、犯罪预防、禁毒戒毒、矫治帮教、人口计生、纠纷调解、应急处置等领域运用社会工作专业理念、知识和技能，提供社会服务、协调社会关系、解决社会问题的专门人才。主要包括：取得助理社会工作师及以上职业水平证书、具有社会工作专业本科及以上学历（学位）、以及在社会工作领域从事科研、教学的专业人员。'
        },
        8: {
          id: '8',
          image: this.$OSS_IMAGES_URL + '/20201213/7ac267ee7aa64c01ba624c1435ed8ef3.png',
          title: '高层次人才',
          content: '指在人才队伍各个领域中层次比较高的优秀人才，在某一学科或专业领域有较深造诣或较高威望，在重要岗位上工作，承担重要任务，能对经济社会发展和科技创新发挥较大作用的人才。如两院院士;国家级学术、技术带头人;享受国务院、省、州政府特殊津贴的专业技术人员;国家或省、州中青年突出贡献专家;拥有处于国际、国内领先水平的专利、发明或专有技术的人员;获得博士或硕士学位的人员;具有高级专业技术职务任职资格的人员。'
        },
        7: {
          id: '7',
          image: this.$OSS_IMAGES_URL + '/20201213/4be302dd6988470dbbeb1386d481885d.png',
          title: '在校大学生',
          content: '在校大学生是具备普通全日制学籍的在校生。具体包括专科生、本科生、研究生(硕博）。即在大学注册入学和接受教育的群体统称，包括全日制和在职业余学习两类。'
        }
      },
      chooseItem: {
        image: '',
        title: ''
      }
    }
  },
  created () {
    this.chooseItem.image = this.list[0].image
    this.chooseItem.title = this.list[0].title
  },
  onLoad (options) {
    if (options.identityType) {
      this.identityType = options.identityType
    }
  },
  methods: {

  }
})
</script>
<style lang="scss">
	@import "./index.scss";
</style>
