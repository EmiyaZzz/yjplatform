 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <!-- <top-info @getIdentityInfo="getIdentity" /> -->
                <view class="box shadowb">
                    <view class="logo">
                        <view class="img-panel">
                            <img :src=imgAvator alt="">
                        </view>
                        <view>选择团队logo</view>
                    </view>
                    <view class="in-box">
                        <view class="in-label"> 公司名称（选填） </view>
                        <view class="flex-group at-row align-center space-between">
                            <u-input v-model="companyName" maxlength="20"
                                placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
                                :custom-style="uInputStyle" placeholder="请输入" />
                        </view>
                    </view>
                </view>
                <view class="btn" @click="teamCreate">创建团队</view>
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { teamAdd } from "@/api/common.js";
import TopInfo from "../components/top-info/top-info.vue";
export default Vue.extend({
    components: {
        TopInfo,
    },
    data() {
        return {
            identity: "",
            more: this.$OSS_IMAGES_URL + '/20220617/more.png',
            interval: 1000,
            duration: 1000,
            autoplay: true,
            recodeList: '',
            allPoints: '',
            consumePoints: '',
            surplusPoints: '',
            icon1: this.$OSS_IMAGES_URL + '/20220617/jf1.png',
            icon2: this.$OSS_IMAGES_URL + "/20220617/syjf-1.png",
            icon3: this.$OSS_IMAGES_URL + "/20220617/ysy-1.png",
            additem: this.$OSS_IMAGES_URL + "/20220617/additem.png",
            imgAvator: this.$OSS_IMAGES_URL + '/20220617/avator.png',
            companyName: '',

            uInputStyle: {
                color: '#black',
                fontSize: '30rpx',
                textAlign: 'left',
                width: '500rpx'
            }
        };
    },
    onLoad() { },
    onShow() {
        // let dictType = 'identity'

    },
    methods: {
        getIdentity(data) {
            this.identity = data.value;
        },
        teamCreate() {
            const { companyName } = this;
            let params = {
                enterpriseName: companyName,
            }
            teamAdd(params).then((data) => {
                console.log(data)
                uni.showToast({
                    icon: 'none',
                    title: '团队创建成功！',
                    duration: 1000
                })
                setTimeout(() => {
                    this.$changePage({
                        params: {
                            id: data.id,
                        },
                        url: "pages/teamInfoMe/index",
                    });
                }, 1000);
                // this.$changePage({
                //     params: {
                //         id: item.id,
                //     },
                //     url: "pages/teamInfoOther/index",
                // });
            })
        }
    },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>