<template>

    <div class="account-content">
        <div class="asset_assetWrap__UrcWK">


            <loginComp v-if="myInfoObj == null"></loginComp>


            <div v-if="myInfoObj != null" class="asset_content__Y7cYF">
                <div class="asset_cards__DvwL2">

                    <div class="asset_card__QFGy1 asset_card2__Y0AxO">
                        <div class="asset_cLeft__5SCPu">
                            <div class="asset_lTitle__zReuz">
                                <div class="asset_tHeader__kJTjU">
                                    <span>My point</span>
                                    <!-- <img src="@/assets/img/icon-eye.svg" alt=""> -->
                                </div>
                                <div class="asset_buttons__Xn8QN asset_pcButtons__1EFYv" v-show="false">
                                    <div style="opacity: 0;" class="asset_button__vitgO asset_deposit__8ep8l">
                                        <img src="@/assets/img/icon-deposit-w.svg" alt="">
                                        <span>Deposit</span>
                                    </div>

                                </div>
                            </div>
                            <div class="asset_rNodes__hC4GU"><strong>{{ myInfoObj?.earn || 0 }}</strong></div>
                        </div>
                        <div class="asset_mobilePurchaseButton__SjUVY" v-show="false">
                            <div class="Button_button__fo9Wi Button_default__ulIdO Button_large__lOuOH"
                                style="width: 100%; height: 36px; border-radius: 10px; padding: 11px 0px; font-size: 14px; font-weight: 400;">
                                <img src="@/assets/images/icon/wallet.svg" alt="">Buy
                            </div>
                        </div>
                    </div>
                    <div class="asset_card__QFGy1 asset_card1__oE3Kk">
                        <div class="asset_cLeft__5SCPu">
                            <div class="asset_lTitle__zReuz">
                                <div class="asset_tHeader__kJTjU">
                                    <span>Estimated Balance </span>

                                </div>
                                <div class="asset_buttons__Xn8QN asset_pcButtons__1EFYv" v-show="false">
                                    <div class="asset_button__vitgO asset_deposit__8ep8l">
                                        <img src="@/assets/img/icon-deposit-w.svg" alt="">
                                        <span>Deposit</span>
                                    </div>
                                    <div class="asset_button__vitgO asset_widthdraw__sRog3">
                                        <img src="@/assets/img/icon-withdraw-w.svg" alt="">
                                        <span>Withdraw</span>
                                    </div>
                                </div>
                            </div>
                            <div class="asset_lAmount__zF3cw">
                                <strong>{{ myInfoObj?.balance || 0 }}</strong>
                                <span>USD</span>
                            </div>
                            <div class="asset_buttons__Xn8QN asset_mobileButtons__Tvacf" v-show="false">
                                <div class="asset_button__vitgO asset_deposit__8ep8l"><img
                                        src="@/assets/img/icon-deposit-w.svg" alt=""><span>Deposit</span></div>
                                <div class="asset_button__vitgO asset_widthdraw__sRog3"><img
                                        src="@/assets/img/icon-withdraw-w.svg" alt=""><span>Withdraw</span></div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="asset_tableList__4lotE">
                    <div class="stab_tabsWrap__pHwOO">
                        <div class="stab_tabsContent__X1Lhe">

                            <div v-for="(item, index) in tabArr  " @click="clickTab(index)"
                                :class="index == activeIndex ? 'stab_active__hccBq' : ''" :key="index"
                                class="stab_item__H4RdD"><span>{{ item.name }}</span></div>

                        </div>
                        <div class="stab_content__rJH_2">
                            <div class="">
                                <div>
                                    <div class="account_folowsContent__YT5IZ">
                                        <table
                                            v-show="orderDatas.length > 0 || pointDatas.length > 0 || rewardDatas.length > 0"
                                            cellpadding="10" cellspacing="0" class="account_fTable__YgCX7">
                                            <thead>
                                                <tr>
                                                    <td v-for="(item, index) in theadArr" :key="index"
                                                        class="account_hide__v_xRX">{{ item.name }}</td>

                                                </tr>
                                            </thead>


                                            <tbody v-if="orderDatas.length > 0 && activeIndex == 0">
                                                <tr v-for="(item, index) in orderDatas " :key="index">
                                                    <td>
                                                        {{ item.kind == 1 ? "Buy" : "Unknown" }}
                                                    </td>


                                                    <td>
                                                        {{ item.itemName }}
                                                    </td>
                                                    <td>
                                                        {{ item.payCurrency }}
                                                    </td>
                                                    <td>
                                                        {{ item.payAmount }}
                                                    </td>

                                                    <td>
                                                        {{ orderStatusHandler(item.status) }}
                                                    </td>

                                                    <td>
                                                        {{ strToTimestamp(item.transactionTime) }}
                                                    </td>
                                                </tr>
                                            </tbody>


                                            <tbody v-if="rewardDatas.length > 0 && activeIndex == 1">
                                                <tr v-for="(item, index) in rewardDatas " :key="index">
                                                    <td>
                                                        {{ item.type == 10 ? "Follow" : "Sign" }}
                                                    </td>
                                                    <td>
                                                        {{ item.name }}
                                                    </td>

                                                    <td>
                                                        {{ item.status == 1 ? 'incomplete' : 'Completed' }}
                                                    </td>

                                                    <td>
                                                        {{ strToTimestamp(item.completeTime) }}
                                                    </td>
                                                </tr>
                                            </tbody>

                                            <tbody v-if="pointDatas.length > 0 && activeIndex == 2">
                                                <tr v-for="(item, index) in pointDatas " :key="index">
                                                    <td>
                                                        {{ pointStatusHandler(item.kind) }}
                                                    </td>
                                                    <td>
                                                        {{ item.change }}
                                                    </td>
                                                    <td>
                                                        {{ strToTimestamp(item.changeTime) }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>






                                        <div class="Nodata_nodata__3n7gZ" v-show="dataCount == 0">
                                            <div class="Nodata_icon__qSjLQ"></div>
                                            <div class="Nodata_title__Q__Vk">No records</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { strToTimestamp } from "./utils/index"
import * as dataType from "./types/types"
import { getOrderList, getPointList, getRewardList } from './api/apiFunc';
import userEx from './data/user';
import { EEvent } from './data/event';
import emitter from './utils/mittEx';
import loginComp from "./components/login.vue"
import walletEx from './utils/wallet';
import footerComp from "./components/footer.vue"


const myInfoObj = ref<dataType.IUserInfo>(null)

const activeIndex = ref(0)
const isLoading = ref(false)
const tabArr = ref([
    {
        name: "Transaction",
        index: 0,
        active: true,
    },
    {
        name: "Rewards",
        index: 1,
        active: false,
    },
    {
        name: "Point",
        index: 2,
        active: false,
    },

])
const myAddress = computed(() => {
    console.log('walletEx.myAddress', walletEx.myAddress)
    return walletEx.myAddress || "";
})

const pointStatusHandler = (status) => {
    switch (status) {
        case 10:
            return "Follow"
            break;
        case 2:
            return "Sign"
            break;
        case 3:
            return "Invite users"
            break;
        case 4:
            return "Bind invitation code"
            break;
    }
    return "Unknown"
}
const updateUserInfo = () => {
    console.log(userEx.userInfo)
    myInfoObj.value = { ...userEx.userInfo }
}

const orderStatusHandler = (status) => {
    switch (status) {
        case 1:
            return "In the transaction"
            break;
        case 2:
            return "Successful"
            break;
        case 3:
            return "Fail"
            break;
        case 4:
            return "Abnormal"
            break;
    }
    return "Unknown"
}

const clickTab = (index: number) => {
    console.log("clickTab", index)
    if (activeIndex.value == index) {
        return;
    }
    if (isLoading.value) {
        return;
    }
    for (let i = 0; i < tabArr.value.length; i++) {
        tabArr.value[i].active = false
    }
    tabArr.value[index].active = true
    activeIndex.value = index;


    if (activeIndex.value == 0) {

        orderList()
    } else if (activeIndex.value == 1) {

        rewardList()
    } else {

        pointList()

    }
}


const page = ref(1)
const pageSize = ref(10)
const total = ref(0)


// const list = ref([])
const dataCount = ref(0)

const pointDatas = ref([])
const rewardDatas = ref([])
const orderDatas = ref([])

const theadArr = ref([])


onMounted(async () => {
    orderList()
    emitter.on(EEvent.getUserInfo, updateUserInfo)
    emitter.on(EEvent.userLoginOut, userLoginOutFunc)

    if (userEx.initUser()) {

    } else {

        await userEx.getUserInfo();
    }
})
const userLoginOutFunc = () => {
    myInfoObj.value = null;
    activeIndex.value = 0;
    isLoading.value = false;
    dataCount.value = 0;
    rewardDatas.value = rewardDatas.value = orderDatas.value = pointDatas.value = []
}

const getList = async () => {


}

const pointList = async () => {
    isLoading.value = true;
    theadArr.value = [
        { i: 0, name: "type" },
        { i: 1, name: "mask" },
        { i: 2, name: "time" },
    ]
    pointDatas.value = [];
    let listRes: any = await getPointList({ page: page.value, size: pageSize.value }).catch((err) => {
        console.error(err)
    })
    if (listRes) {
        console.log(listRes)
        if (listRes.count > 0) {
            pointDatas.value = [...listRes.points];

        } else {

        }

        dataCount.value = pointDatas.value.length;
    }
    isLoading.value = false;

}

const rewardList = async () => {
    isLoading.value = true;
    theadArr.value = [
        { i: 0, name: "type" },
        { i: 1, name: "quest" },
        { i: 2, name: "state" },
        { i: 3, name: "time" },
    ]
    rewardDatas.value = []
    let listRes: any = await getRewardList({ page: page.value, size: pageSize.value }).catch((err) => {
        console.error(err)
    })
    if (listRes) {

        if (listRes.count > 0) {
            rewardDatas.value = [...listRes.rewards];
        } else {

        }
        dataCount.value = rewardDatas.value.length;


    }
    isLoading.value = false;

}


const orderList = async () => {
    isLoading.value = true;
    theadArr.value = [
        { i: 0, name: "type" },
        { i: 1, name: "contents" },
        { i: 2, name: "crypto coin" },
        { i: 3, name: "quantity" },
        { i: 4, name: "state" },
        { i: 5, name: "time" },
    ]
    orderDatas.value = [];
    let listRes: any = await getOrderList({ page: page.value, size: pageSize.value }).catch((err) => {
        console.error(err)
    })
    if (listRes) {
        if (listRes.count > 0) {
            orderDatas.value = [...listRes.orders];
        } else {

        }
        dataCount.value = orderDatas.value.length;

    }
    isLoading.value = false;

}

</script>


<style lang="sass" scoped></style>