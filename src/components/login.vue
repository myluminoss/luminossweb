<template>
    <div class="Connect_flex__viPdX Connect_fixContent__gf23w">
        <div class="Connect_hoemFix__YKQdo" v-show="!showSelectWallet">
            <div class="Connect_homechjild__oZDRZ">
                <h3 v-if="walletList.length > 0">{{ loginText }}</h3>
                <h4 v-else>{{ loginText }}</h4>
                <div v-if="walletList.length > 0" class="Connect_btnLogin__30gGV" @click="onClickLoginWallet">connect
                </div>
            </div>
        </div>


        <div v-show="showSelectWallet" class="Connect_fixbody__gjmu9">
            <div class="Connect_fix__t7tI5 Connect_flex__viPdX Connect_ane__JhBa9 Connect_jus__L_4Qi">
                <div @click="notConnectWallet" class="Connect_div2__uK_Mt"><img src="@/assets/img/plus.png"
                        class="Connect_img32__U_UaC"></div>
                <div class="Connect_leftDiv__aKyUD">
                    <div class="Connect_t16__RXEQ_">Link wallet</div>
                    <ul class="Connect_ul3__fN76W"><span class="Connect_t17__uzcpo">Wallet installed</span>
                        <li @click="onClickWalletItem(item)" :key="index" v-for="(item, index) in walletList"
                            class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8">

                            <img v-show="curWalletIndex == item.index" :data-index="index"
                                src="@/assets/img/icon-loading.png" alt="" class="Connect_icon-loading__u0quz">
                            <img :src="item.iconComp" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY"> {{ item.title }}</p><span class="Connect_t19__68KDr">{{
                                    item.title
                                    }}</span>
                            </div>
                        </li>

                    </ul>
                </div>

                <div class="Connect_rightDiv__nfkg7" v-show="curWalletIndex > -1 && curWalletItem != null">
                    <div style="padding: 20px;"><img :src="curWalletItem?.iconComp" width="64"></div>
                    <div class="Connect_loading1__gPdwS">Opening {{ curWalletItem?.title }}</div>
                    <div class="Connect_loading2___Tfa3">Confirm the link in the extension center</div>
                    <div><img src="@/assets/img/loading.gif" width="64"></div>
                </div>
            </div>
        </div>

        <!-- <div class="Connect_fixbody__gjmu9" v-show="showWalletNet">
            <div class="Connect_fix__t7tI5 Connect_ane__JhBa9 Connect_jus__L_4Qi">
                <div class="Connect_leftDiv__aKyUD">
                    <div class="Connect_t16__RXEQ_">Switch networks</div>
                    <ul class="Connect_ul3__fN76W">
                        <li class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8"><img
                                src="@/assets/img/ETH.svg" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY">ETH</p><span
                                    class="Connect_t19__68KDr">Ethereum(ERC20)</span>
                            </div>
                        </li>
                        <li class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8"><img
                                src="@/assets/img/APT.svg" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY">APT</p><span class="Connect_t19__68KDr">Aptos
                                    chain</span>
                            </div>
                        </li>
                        <li class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8"><img
                                src="@/assets/img/BNB.svg" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY">BNB</p><span class="Connect_t19__68KDr">BNB
                                    Smart Chain (BEP20)</span>
                            </div>
                        </li>
                        <li class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8"><img
                                src="@/assets/img/TRX.svg" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY">TRX</p><span class="Connect_t19__68KDr">Tron(TRC20)</span>
                            </div>
                        </li>
                        <li class="Connect_flex__viPdX Connect_ane__JhBa9 Connect_wallet-item__1D_i8"><img
                                src="@/assets/img/SOL.svg" class="Connect_img12__T3xLu">
                            <div>
                                <p class="Connect_t18__2dWvY">SOL</p><span class="Connect_t19__68KDr">Solana
                                    Mainnet</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="Connect_logout__eZUnL"><img src="@/assets/img/icon-logout.svg"
                        alt=""><span>Disconnect</span></div>
            </div>
        </div> -->
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import * as dataType from "../types/types"
import walletEx from '../utils/wallet';

import MetaMask from '../assets/img/MetaMask.png'
import TokenPocketIcon from '../assets/img/TokenPocket.png'
import userEx from '../data/user';
import { EEvent } from '../data/event';
import emitter from '../utils/mittEx';

import SolflareWallet from '../assets/img/SolflareWallet.png'
import TrustWallet from '../assets/img/TrustWallet.png'
import sWallet from '../utils/sWallet';


const curWalletItem = ref<dataType.IWalletItem>(null);
const showSelectWallet = ref(false)

const showWalletNet = ref(false)
const curWalletIndex = ref(-1);

const loginText = ref("Link your wallet to log in");
const walletList = ref<dataType.IWalletItem[]>([]);

const showSelectWalletFunc = () => {
    onClickLoginWallet()
}
const getSolanaWalletAddressFunc = () => {

}
onMounted(() => {

    emitter.on(EEvent.userCencalWallet, userCencalWalletFunc)
    emitter.on(EEvent.showSelectWallet, showSelectWalletFunc)
    emitter.on(EEvent.getSolanaWalletAddress, getSolanaWalletAddressFunc)



    let wallets = walletEx.detectWallets();
    if (wallets.length == 0) {

        loginText.value = "Please install the Solflare Wallet or Trust Wallet plugin to Log in.";
        return;
    }
    for (let i = 0; i < wallets.length; i++) {
        if (wallets[i].name == "MetaMask") {
            walletList.value.push({
                title: "MetaMask",
                iconComp: MetaMask,
                index: 0,
            })
        } else if (wallets[i].name == "TokenPocket") {
            walletList.value.push({
                title: "TokenPocket",
                iconComp: TokenPocketIcon,
                index: 1,
            })
        } else if (wallets[i].name == "TrustWallet") {
            // walletList.value.push({
            //     title: "Trust Wallet",
            //     iconComp: TrustWallet,
            //     index: 2,
            // })
        } else if (wallets[i].name == "SolflareWallet") {
            walletList.value.push({
                title: "Solflare Wallet",
                iconComp: SolflareWallet,
                index: 3,
            })
        }
    }
})
const userCencalWalletFunc = () => {
    showSelectWallet.value = false;
    curWalletIndex.value = -1;
    curWalletItem.value = null;
}
const onClickLoginWallet = () => {
    showSelectWallet.value = true;
}
const notConnectWallet = () => {
    showSelectWallet.value = false;
    curWalletIndex.value = -1;
    curWalletItem.value = null;
}

const onClickWalletItem = async (item: dataType.IWalletItem) => {



    if (curWalletIndex.value == item.index) {
        return;
    }
    curWalletIndex.value = item.index;
    curWalletItem.value = item;
    if (item.index > 1) {
        sWallet.destoryWallet();
        sWallet.initWallet(item.title)
        await sWallet.loginWallet()
        userEx.chinaType = "Solana";
        await userEx.login();
        await userEx.getUserInfo();
        await userEx.getTaskList()
        return;
    }


}
</script>