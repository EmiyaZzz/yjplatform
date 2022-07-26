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
                <view class="btn">创建团队</view>
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { getPointRecord, pointDetail } from "@/api/common.js";
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
            companyName: ''
        };
    },
    onLoad() { },
    onShow() {
        // let dictType = 'identity'
        pointDetail().then((result) => {
            console.log(result)
            this.allPoints = result.allPoints
            this.consumePoints = result.consumePoints
            this.surplusPoints = result.surplusPoints
        })
        getPointRecord().then((result) => {
            this.recodeList = result
        })
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value;
        },
    },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>