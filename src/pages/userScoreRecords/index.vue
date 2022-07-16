 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb bgw">
                    <view class="title-panel ">
                        <view>
                            评估记录
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="tr">
                            <view class="th">评估时间</view>
                            <view class="th">综合身价</view>
                            <!-- <view class="th">金融身价</view>
                            <view class="th">岗位身价</view>
                            <view class="th">投资身价</view> -->
                        </view>
                        <view class="text-panel">
                            <view class="intro-text" v-for="(item, index) in recordlist" :key="index">
                                <view class="td" style="font-size:20rpx">{{ item.createTime }}</view>
                                <view class="td">{{ item.complexScore }}</view>
                                <!-- <view class="td">{{ item.financeScore }}</view>
                                <view class="td">{{ item.postScore }}</view>
                                <view class="td">{{ item.investScore }}</view> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { userScoreRecords } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
export default Vue.extend({
    components: {
        TopInfo
    },
    data() {
        return {
            identity: '',
            more: this.$OSS_IMAGES_URL + '/20220617/morew.png',
            recordlist: []
        }
    },
    onShow() {
        userScoreRecords().then((res) => {
            console.log(res)
            this.recordlist = res
        })
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