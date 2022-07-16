 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <top-info @getIdentityInfo='getIdentity' />
                <view class="box1 shadowb" v-for="(item, index) in cardList" :key="index">
                    <view class="title-panel ">
                        <view>
                            {{item.name}}
                        </view>
                        <!-- <img :src=more alt=""> -->
                    </view>
                    <view class="content-panel">
                        <view class="cardImg">
                            <img :src=item.url alt="">
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from 'vue'
import { sjCard, getCardBagData } from '@/api/common.js'
import TopInfo from '../components/top-info/top-info.vue'
export default Vue.extend({
    components: {
        TopInfo
    },
    data() {
        return {
            identity: '',
            more: this.$OSS_IMAGES_URL + '/20220617/morew.png',
            cardImg: this.$OSS_IMAGES_URL + '/20220617/morew.png',
            cardList: []
        }
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value
        },
    },
    onShow() {
        // sjCard({ type:0}).then((res)=>{
        //     this.cardImg = res
        //     console.log(res)
        // })
        getCardBagData().then((res) => {
            console.log(res)
            this.cardList = res
        })
    }

})
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>