<template>
  <div class="rewards_content">
    <div class="rewards_accountWrap__yZp7R">
      <div class="rewards_f1__Hhz88">
        <loginComp v-if="myInfoObj == null"></loginComp>

        <div class="rewards_div1P___aVFL">
          <div v-if="myInfoObj != null" class="Info_div1P__71N42">
            <div class="Info_div1__Plpc2 Info_jus__mv8hx Info_ane__u3h3O">
              <div class="Info_flex__AFdiV Info_ane__u3h3O">
                <img :src="myAvatar" class="Info_img3__BiJTa" />
                <div>
                  <p
                    class="Info_t3__sTetu Info_flex__AFdiV Info_ane__u3h3O"
                    style="margin-top: 10px"
                  >
                    {{ encryStr(myInfoObj.nickname) }}
                  </p>
                  <div class="Info_flex__AFdiV Info_ane__u3h3O Info_t5__uIFdO">
                    {{ encryStr(myInfoObj.nickname) }}
                    <div class="Tips_tipsWrapper__eu4qJ">
                      <div @click="copyText" class="Info_img5__Y2viq"></div>
                    </div>
                  </div>
                  <!-- <div class="Info_flex__AFdiV Info_ane__u3h3O Info_t7__cOYwE"><span
                                            class="Info_flex__AFdiV Info_ane__u3h3O Info_t6__Uledy Info_tbind__pS426"><img
                                                src="@/assets/img/a15.png" class="Info_img7__IBDvs">Add</span></div> -->
                </div>
              </div>
              <div class="Info_righttxt__mGELN">
                <p
                  class="Info_aend__0xuT52222 Info_aend__0xuT5 Info_flex__AFdiV Info_ane__u3h3O"
                >
                  <img
                    src="@/assets/img/icon-points.svg"
                    width="32"
                    style="margin-right: 8px"
                  />{{ myInfoObj.earn }}
                </p>

                <div class="Info_v-records__RNkjE" @click="toAccount">
                  <span>View records</span>
                  <img src="@/assets/images/arrow-r.png" alt="" />
                </div>
                <p class="Info_t151__wvsvk Info_aend__0xuT5">
                  Current ranking: {{ myInfoObj.currentRanking }}
                </p>
              </div>
            </div>
          </div>
          <ul
            class="rewards_ul2__rGaVC rewards_flex__1bUuD rewards_ane__ewOrF rewards_wrap__hhofu"
          >
            <div style="width: 100%" v-if="false">
              <div class="Nodata_nodata__3n7gZ">
                <div class="Nodata_icon__qSjLQ"></div>
                <div class="Nodata_title__Q__Vk">No Quest Available</div>
              </div>
            </div>

            <li
              v-for="(item, index) in quests"
              :key="index"
              class="rewards_flex__1bUuD rewards_jus__ZMbtH rewards_card__Cfgm8"
            >
              <div style="width: 100%">
                <div class="rewards_flex__1bUuD222">
                  <p class="rewards_t11__sl8sJ">
                    <span class="rewards_s-icon__q5Dxn"
                      ><img
                        class="rewards_discord__59JpK"
                        src="./assets/img/a10.png"
                        width="32"
                    /></span>
                  </p>
                  <div>
                    <p class="rewards_t12__JylBZ rewards_longTitle__4G2Yk">
                      {{ item.name }}
                    </p>
                    <span class="rewards_t13__Vm8IV">{{ item.intro }}</span>
                  </div>
                </div>
                <div
                  class="rewards_t14__dqII6 rewards_flex__1bUuD rewards_ane__ewOrF rewards_jus__ZMbtH"
                >
                  <div>Earn</div>
                  <div class="rewards_flex__1bUuD rewards_ane__ewOrF">
                    <img
                      src="./assets/img/icon-points.svg"
                      width="16"
                      style="margin-right: 8px"
                    />+{{ item.earn }}
                  </div>
                </div>
                <a
                  :class="item.status == 2 ? 'Button_disabled__QUCEs' : ''"
                  :href="item.link"
                  @click="toFinishTask(item)"
                  target="_blank"
                  class="Button_button__fo9Wi Button_default__ulIdO Button_full__ATquN Button_button__aaaa"
                  >Go</a
                >
                <!-- <div class="Button_button__fo9Wi Button_default__ulIdO Button_full__ATquN">Go</div> -->
              </div>
            </li>
          </ul>

          <ul class="Checkin_ul31__uyrVa" v-if="signs.length > 0">
            <li>
              <div class="Checkin_ane__IWzue Checkin_jus__ZVuyQ">
                <div class="Checkin_flex__cQSqh">
                  <div class="Checkin_t15img__WrZhE">
                    <img src="@/assets/icons/a277.png" width="24" />
                  </div>
                  <p class="">
                    <span class="Checkin_ps1__NpZ2U">Weekly check-in</span
                    ><span class="Checkin_ps2__RmC5o"
                      >Unlock the ability to earn more crystals by creating
                      on-chain interactions for 7 consecutive days.</span
                    >
                  </p>
                </div>
              </div>
              <div class="Checkin_checkinList__2dQX3">
                <div
                  class="Checkin_lidiv__ainUr"
                  :class="item.status == 2 ? 'Checkin_active__vE_g9' : ''"
                  v-for="(item, index) in signs"
                >
                  <div class="Checkin_checkinImgCont__cSk5y">
                    <img
                      :src="item.status == 2 ? ionPoints1 : ionPoints2"
                      width="28"
                      alt="Not Checked In"
                    /><span class="Checkin_ps3__S4cD4">+ {{ item.earn }}</span>
                  </div>
                  <div class="Checkin_days__Rb7DI">{{ item.name }}</div>
                </div>
              </div>

              <div style="">
                <div
                  @click="onClickSign"
                  :class="todaySign ? 'Button_disabled__QUCEs' : ''"
                  class="Button_button__fo9Wi Button_default__ulIdO Button_full__ATquN"
                >
                  CHECK-IN
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <loadingComp v-show="showLoading"></loadingComp>

      <!-- <div class="Toastify"></div> -->

      <!-- <footerComp></footerComp> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import * as dataType from "./types/types";

import TokenPocketIcon from "./assets/img/TokenPocket.png";
import TronLinkIcon from "./assets/img/TronLink.png";
import Bybit from "./assets/img/Bybit.png";
import Petra from "./assets/img/Petra.png";
import Martian from "./assets/img/Martian.png";
import OKX_Wallet from "./assets/img/OKX Wallet.png";
import Gate from "./assets/img/Gate.png";
import MetaMask from "./assets/img/MetaMask.png";
import walletEx from "./utils/wallet";
import { getUserInfo, postSign, postTask } from "./api/apiFunc";
import userEx from "./data/user";
import emitter from "./utils/mittEx";
import { EEvent } from "./data/event";

// import footerComp from "./components/footer.vue"
import loadingComp from "./components/loading.vue";
import loginComp from "./components/login.vue";

import ionPoints1 from "@/assets/img/icon-points.svg";
import ionPoints2 from "@/assets/img/icon-points-h.svg";
import { getAvatarByIndex, sleep } from "./utils";
import localStorageUtil from "./utils/localStorage";
import router from "./router";
import sWallet from "./utils/sWallet";
import { encryStr } from "./utils/index";
const curWalletItem = ref<dataType.IWalletItem>(null);
const quests = ref<dataType.ITaskItem[]>([]);
const signs = ref<dataType.ISignItem[]>([]);
const todaySign = ref(false);
const myInfoObj = ref<dataType.IUserInfo2>(null);

const showLoading = ref(false);
const showSelectWallet = ref(false);
const showWalletNet = ref(false);
const onClickLoginWallet = () => {
  showSelectWallet.value = true;
};
const curWalletIndex = ref(-1);
const myAvatar = computed(() => {
  return getAvatarByIndex(userEx.userInfo?.avatarIndex);
});

const walletList = ref<dataType.IWalletItem[]>([]);
const notConnectWallet = () => {
  showSelectWallet.value = false;
  curWalletIndex.value = -1;
  curWalletItem.value = null;
};

watch(
  () => walletEx.myAddress,
  (nv, ov) => {
    console.log(nv);
  }
);
const myAddress = computed(() => {
  console.log("walletEx.myAddress", walletEx.myAddress);
  return walletEx.myAddress || "";
});
// const myAddress = ref("");
onMounted(async () => {
  emitter.on(EEvent.getUserInfo, updateUserInfo);
  emitter.on(EEvent.updateTaskList, updateTaskList);
  emitter.on(EEvent.userCencalWallet, userCencalWalletFunc);
  emitter.on(EEvent.userLoginOut, userLoginOutFunc);

  // let wallets = walletEx.detectWallets();
  // for (let i = 0; i < wallets.length; i++) {
  //     if (wallets[i].name == "MetaMask") {
  //         walletList.value.push({
  //             title: "MetaMask",
  //             iconComp: MetaMask,
  //             index: 0,
  //         })
  //     } else if (wallets[i].name == "TokenPocket") {
  //         walletList.value.push({
  //             title: "TokenPocket",
  //             iconComp: TokenPocketIcon,
  //             index: 1,
  //         })
  //     }
  // }

  // if (userEx.initUser()) {

  // } else {
  //     // myAddress
  //     await walletEx.getMyAccounts();
  //     // myAddress.value = walletEx.myAddress;
  //     getUserInfoEx();
  // }

  console.log(sWallet.isInit);
  console.log(userEx.userInfo);
  if (!sWallet.isInit) {
    await userEx.login();
  } else {
    if (userEx.userInfo != null) {
      myInfoObj.value = {
        ...userEx.userInfo,
      };
    }

    await userEx.getTaskList();
  }
});

const userLoginOutFunc = () => {
  quests.value = [];
  signs.value = [];
  myInfoObj.value = null;
  todaySign.value = showLoading.value = false;
};

const updateTaskList = () => {
  quests.value = [...userEx.quests];
  signs.value = [...userEx.signs];
  todaySign.value = userEx.todaySign;
};
const updateUserInfo = () => {
  myInfoObj.value = { ...userEx.userInfo };

  // userEx.getTaskList()
};

const userCencalWalletFunc = () => {
  showSelectWallet.value = false;
  curWalletIndex.value = -1;
  curWalletItem.value = null;
};

const toFinishTask = async (item) => {
  if (item.status == 2) {
    return;
  }
  showLoading.value = true;
  await sleep(1400);
  let taskRes = await postTask({ taskId: item.id });
  if (taskRes) {
    // userEx.getTaskList()
    // userEx.getUserInfo()
  }
  showLoading.value = false;
};

const onClickSign = async () => {
  if (todaySign.value) {
    return;
  }

  console.log("vtodaySign.value==", todaySign.value);
  // await walletEx.getAddressSign()
  let result3 = await walletEx.userSign();
  if (result3 == null || !result3.transactionHash) {
    return;
  }

  try {
    showLoading.value = true;
    let signRes = await postSign({
      transactionHash: result3.transactionHash,
    });
    if (signRes) {
    }
    userEx.getUInfo();
    userEx.getTaskList();
    showLoading.value = false;
  } catch (err) {}
};

const toAccount = () => {
  router.push("/Account");
};

const copyText = () => {
  let textToCopy = sWallet.myAddress;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {})
      .catch((err) => {
        fallbackCopyTextToClipboard(textToCopy);
      });
  } else {
    fallbackCopyTextToClipboard(textToCopy);
  }
};

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "absolute";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
  } finally {
    document.body.removeChild(textArea);
  }
};

const getUserInfoEx = async () => {
  await userEx.getUInfo();
};
</script>

<style lang="sass" scoped></style>
