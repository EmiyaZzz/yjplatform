 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb">
                    <view class="title-panel">
                        <view>
                            身价常识
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="text-panel">
                            <view class="intro-text">
                                身价是人的创造力、影响力和信用度的价值体现。这是说的身价不同于财富排行榜上说的身价，财富排行榜上说的身价是指财富，这里说的身价虽然与财富有一定关系，但更多的是指创造价值、能力和贡献，包括当前价值、潜在价值和未来价值，主要和才能才干、知识技能、能力贡献相关。
                                身价是通过一定规则和标准评估出来的。目前执行的标准是《人力资本服务 术语》（T/CAS462-2021）和《人力资本服务
                                人才价值评估指南》（T/CAS463-2021）。根据评估标准可以对人的综合身价、金融价值、岗位价值、投资价值等进行评估，并形成综合身价报告、金融价值报告、岗位价值报告、投资价值报告、出自能力报告、人才认定报告等，应用于用于人才认定、企业注册、投资融资、岗位定薪、职称评审、双招双引、流动不畅、政策申报等。主要用途如下：
                                <p>（一）获取政策支持的依据：政府为支持人才发展出台了一系列支持政策，身价报告是获得政策支持的重要依据；</p>
                                <p>（二）项目申报和评审的依据：身价报告是项目申报、高企申报、贯标等申报和评审的重要材料；</p>
                                <p>（三）信用评估评级的依据：身价报告是个人信用和企业信用评估评级的依据；</p>
                                <p>（四）人才认定的依据：身价报告是申报和评审各类人才计划的基础材料，是高层次人才认定的重要依据；</p>
                                <p>（五）人才价值交易的依据：身价报告可用于人才价值交易各种场景，如人才招用育留、人才股票、人才众筹、知识产权和科技成果交易等；</p>
                                <p>（六）获取金融支持的依据：身价报告是人才发展中获取以身价为依据的金融服务的依据；</p>
                                <p>（七）人力资本出资的依据：身价报告是人力资本注资、增资、垫资、投资、融资和参与分配的依据；</p>
                                <p>（八）人才流动补偿的依据：身价报告是人才流动过程中对前期培养进行补偿的依据；</p>
                                <p>（九）身价报告是人才选拔培养、定岗定薪、晋级晋升的依据；</p>
                                <p>（十）身价报告是政府、园区、企业遴选人才和团队的依据，也是双招双引的重要参考依据。</p>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="box1 shadowb">
                    <view class="title-panel">
                        <view>
                            身价与身家
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="text-panel">
                            <view class="intro-text">
                                <p>“身价”和“身家”从字面上看相似相近，但在内涵上区别很大。</p>
                                <p>概念不同。“身价”是基于人的过去、现在和将来创造力、影响力和信用度的价值体现。创造力包括知识、技能和能力，影响力包括权威力、吸引力和情感力，信用度包括品德、诚信、信誉、履约能力。“身家”是对自身和家庭的合称，指全部家产。
                                </p>
                                <p>构件不同。“身价”的构件包括“才”“彩”“采”“财”“四要素”，“才”是核心要素，“彩”是加权要素，“采”是印证要素，“财”是辅助要素；“身家”的构件主要集中在“财”上。“身价”强调价值，“身家”强调财富。“身价”反映的是价值，包括当前价值、潜在价值和未来价值；“身家”反映的是财富，主要是当前财富。
                                </p>
                                <p>属性不同。“身价”包含了自身价值和创造价值，是无形资产，属于非物质资本；“身家”是一个人的家产，是有形资产，属于物质资本。</p>
                                <p> 应用不同。“身价”是人力资本产业的核心关键词，是人力资本价值的反映。“身价”分为“个体身价”和“团体身价”，在应用上分为综合价值、金融价值、投资价值、岗位价值等。作为价值，“身价”贯穿人力资本产业生态各个环节。“身家”是一个静态词，没有个体和团体之分，一般用于对财富状态的描述。
                                </p>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- <view class="box1 shadowb">
                    <view class="title-panel">
                        <view>
                            人才分类
                        </view>
                        <img :src=more alt="">
                    </view>
                    <view class="content-panel">
                        <view class="text-panel">
                            <view class="intro-text">
                               <p>人才的概念：人才是指具有一定的专业知识或专门技能，进行创造性劳动并对社会作出贡献的人，是人力资源中能力和素质较高的劳动者。</p> 
                               <p>人才分类：人才主要包括党政人才、企业经营管理人才、专业技术人才、高技能人才、农村实用人才、社会工作人才六支人才队伍。</p> 
                               <p>党政人才：指公务员、参照公务员法管理的群团机关工作人员。包括列入公务员法实施范围的全市各级党委、人大、政府、政协、两院机关、群团组织，以及参照公务员法管理的事业单位中已登记和暂缓登记人员。</p> 
                               <p>企业经营管理人才：指在企业经营管理岗位上工作的人员，主要包括：一是出资人代表：指出资人任命或推荐任职的董事、监事；二是经营管理人员：指具体从事经营管理活动的人员、包括各级经理人以及具体从事规划计划、人力资源、市场营销、资本运营、财务审计、生产管理、法律事务、质量安全环保、行政管理等业务工作的人员；三是党群工作者：指企业中主要从事党务、纪检监察、工会、共青团、老干部、企业文化建设等工作的人员。</p> 
                               <p>专业技术人才：指有专业技术职称和未获得专业技术职称但在专业技术岗位上工作的人员。专业技术人才是我国人才队伍的骨干力量，在建设创新型国家和全面建设小康社会伟大事业中发挥着重要作用。</p> 
                               <p>高技能人才：指在生产或服务等领域岗位一线的从业者中，具有精湛专业技能，关键环节发挥作用，能够解决生产操作难题的人员，包括取得高级技师、技师和高级工职业资格及相应职业技能等级人员。</p> 
                               <p>农村实用人才：指具有一定的知识或技能，能够起到示范和带头作用，为当地农业和农村经济发展作出积极贡献，并得到群众认可的农村劳动者，主要包括五个方面的人员：一是生产型人员，主要有种植能手、养殖能手、捕捞能手和加工能手；二是经营型人员。</p> 
                            </view>
                        </view>
                    </view>
                </view> -->
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { certificateInit } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
export default Vue.extend({
    components: {
        TopInfo
    },
    data() {
        return {
            identity: '',
            more: this.$OSS_IMAGES_URL + '/20220617/morew.png',
        }
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value
        },
    }

})
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>