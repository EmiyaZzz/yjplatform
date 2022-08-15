 <template>
    <rcyj-page-view>
        <view class="index-wrapper">
            <view class="body">
                <!-- <top-info @getIdentityInfo="getIdentity" /> -->
                <view class="top-title">团队列表</view>
                <view class="box shadowb">
                    <view class="content-panel">
                        <view class="rank-panel">
                            <!-- <view class="points-title">
                <view class="content">
                  <view class="points-img">
                    <img :src=icon1 alt="">
                  </view>
                  总积分:{{ allPoints }}
                </view>
                <view class="content">
                  <view class="points-img">
                    <img :src=icon2 alt="">
                  </view>
                  已使用:{{ consumePoints }}
                </view>
                <view class="content">
                  <view class="points-img">
                    <img :src=icon3 alt="">
                  </view>
                  剩余积分:{{ surplusPoints }}
                </view>
              </view> -->

                            <view class="rank-list-title">
                                <view class="">
                                    成员姓名
                                </view>
                                <view class="">
                                    手机号码
                                </view>
                                <view class="">
                                    操作
                                </view>
                            </view>
                            <view>
                                <view class="scroll_box">
                                    <view class="swiper" circular="true" vertical="true" display-multiple-items='4'
                                        :autoplay="autoplay" :interval="interval" :duration="duration">
                                        <view v-for="(item, index) in memberList" :key="index" class="swiper-l">
                                            <!-- <view class="swiper-item uni-bg-green" style="font-size:14rpx; width:200rpx">{{ item.create_time }}</view> -->
                                            <view class="swiper-item uni-bg-green"
                                                style="font-size: 24rpx;margin-right:50rpx">{{
                                                        item.userName
                                                }}</view>
                                            <view class="swiper-item uni-bg-green">{{ item.mobile }}
                                            </view>
                                            <!-- <view class="swiper-item uni-bg-green">{{ item.real_name }}**</view> -->
                                            <view class="swiper-item uni-bg-green btnl" @click="letleave(item)"
                                                v-if="item.isHeader == '0'">请离
                                            </view>
                                            <view class="swiper-item uni-bg-green btnc" @click="lettuan" v-else>团长
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="top-title">团员邀请</view>
                <view class="box shadowb">
                    <view class="in-box">
                        <view class="in-label"> 手机号码 </view>
                        <view class="flex-group at-row align-center space-between">
                            <u-input v-model="inviteNum" maxlength="20"
                                placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
                                :custom-style="uInputStyle" placeholder="请输入邀请人员手机号码" />
                        </view>
                    </view>
                </view>
                <view class="btn" @click="teamInvite">邀请</view>
                <!-- <view class="top-title">团员请离</view>
                <view class="box shadowb">
                    <view class="in-box">
                        <view class="in-label"> 手机号码 </view>
                        <view class="flex-group at-row align-center space-between">
                            <u-input v-model="inviteNum" maxlength="20"
                                placeholder-style="color:#9094A0;font-size:30rpx" :clearable="false"
                                :custom-style="uInputStyle" placeholder="请输入请离人员手机号码" />
                        </view>
                    </view>
                </view>
                <view class="btn" @click="teamCreate">请离</view> -->
            </view>
        </view>
    </rcyj-page-view>
</template>
<script>
import Vue from "vue";
import { teamMember, teamMemberAdd, teamMemberDelete } from "@/api/common.js";
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

            uInputStyle: {
                color: '#black',
                fontSize: '30rpx',
                textAlign: 'left',
                width: '500rpx'
            },
            inviteNum: '',
            teamId: '',
            memberList: []
        };
    },
    onLoad: function (options) {

        this.teamId = options.id
    },
    onShow() {
        // let dictType = 'identity'
        this.getTeamMember()
    },
    methods: {
        getIdentity(data) {
            this.identity = data.value;
        },
        getTeamMember() {
            teamMember({ teamId: this.teamId }).then((data) => {
                console.log(data)
                this.memberList = data
            })
        },
        teamInvite() {
            const { inviteNum, teamId } = this;
            let params = {
                mobile: inviteNum,
                teamId: teamId
            }
            teamMemberAdd(params).then((data) => {
                uni.showToast({
                    icon: 'none',
                    title: `成员添加成功！`,
                    duration: 1000
                })
                this.getTeamMember()
            })
        },
        lettuan() {

        },
        letleave(item) {
            let that = this
            uni.showModal({
                title: '',
                content: '即将请离人员:' + item.userName,
                success: function (res) {
                    if (res.confirm) {
                        let params = {
                            userIds: item.userId,
                            teamId: that.teamId
                        }
                        console.log(params)
                        teamMemberDelete(params).then((data) => {
                            that.getTeamMember()
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });

        }
    },
});
</script>
   <style lang="scss">
   @import "./index.scss";
   </style>