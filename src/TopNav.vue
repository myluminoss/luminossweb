<template>
  <div class="topNav">
    <div class="Top_h__XiNVG Top_flex__z5fMG Top_ane__l1HcL Top_padr30__dW_Yj">
      <div class="Top_flex__z5fMG entity-nav-nav">
        <div class="entity-nav">
          <div class="entity entityBase">
            <div class="left-text">{{ curSelectEntityName }}</div>
            <div class="right-text">
              <span>Choose your agent type</span>
              <img class="arrow" src="@/assets/entiry/UI_Btn_Icon_10.png" />
            </div>

            <div class="entityMenu">
              <div class="title">Options</div>

              <div class="entityList">
                <div
                  class="entityItem"
                  @click="clickEntity(item.i)"
                  :class="item.i == entityIndex ? 'entityItemActive' : ''"
                  v-for="(item, index) in entityArray"
                  :key="index"
                >
                  <h3>{{ item.title }}</h3>
                  <h5>{{ item.desc }}</h5>
                  <img
                    v-if="item.i == entityIndex"
                    class="check"
                    src="@/assets/entiry/UI_Btn_Icon_11.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Top_right__Nkxnr">
        <div
          v-show="myAddress != ''"
          class="Top_newModal__e7YBk Top_flex__z5fMG Top_ane__l1HcL"
        >
          <div class="Top_headerAddress__8Sup4">{{ encryStr(myAddress) }}</div>
          <div class="Top_newcontent__ocWEd">
            <div class="Top_userInfos__kYEP5">
              <div class="Top_uAvater__64PTF">
                <img :src="myAvatar" class="Top_avaterIcon__DHdid" />
                <div
                  class="Dropdown_flex__DKxTG Dropdown_ane__0tQAP Top_dropDwon__PkltW"
                >
                  <div
                    class="Dropdown_newModal__Xubow Dropdown_flex__DKxTG Dropdown_ane__0tQAP"
                  >
                    <div class="Dropdown_newContentWrap__lCQI8">
                      <div class="Dropdown_newcontent__LtZMc"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 class="Top_userName__OXb2U">{{ encryStr(myAddress) }}</h2>
            </div>

            <div class="Top_logout__QbYmS" @click="showConfirm = true">
              <img
                src="data:image/svg+xml,%3csvg%20width='19'%20height='19'%20viewBox='0%200%2019%2019'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M13.5801%2011.465L15.5001%209.545L13.5801%207.625'%20stroke='%23BDBDBF'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.82031%209.54492H15.4478'%20stroke='%23BDBDBF'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9.32031%2015.5C6.00531%2015.5%203.32031%2013.25%203.32031%209.5C3.32031%205.75%206.00531%203.5%209.32031%203.5'%20stroke='%23BDBDBF'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              />
              <span>Disconnect</span>
            </div>
          </div>
        </div>

        <div
          v-show="myAddress == ''"
          @click="onClickLoginWallet"
          class="Top_loginBtn"
        >
          <img class="icon" src="@/assets/img/SolflareWallet.png" />
          <p>CONNECT WALLET</p>
        </div>
      </div>
    </div>

    <div class="Top_mobileHeader__Oe32f">
      <div class="Header_header__G9Trc">
        <div class="menuIcon">
          <img
            class="menuImg"
            @click="openLeftMenu"
            src="@/assets/entiry/UI_Btn_Icon_05_2.png"
          />
        </div>
        <div class="entity-nav">
          <div class="entity">
            <div class="entity2" @click="open2menu">
              <div class="left-text">Astrologer</div>
              <div class="right-text">
                <span>Choose your agent type</span>
                <img class="arrow" src="@/assets/entiry/UI_Btn_Icon_10.png" />
              </div>
            </div>

            <div class="entityMenu">
              <div class="title">Options</div>

              <div class="entityList">
                <div
                  class="entityItem"
                  @click="clickEntity(item.i)"
                  :class="item.i == entityIndex ? 'entityItemActive' : ''"
                  v-for="(item, index) in entityArray"
                  :key="index"
                >
                  <h3>{{ item.title }}</h3>
                  <h5>{{ item.desc }}</h5>
                  <img
                    v-if="item.i == entityIndex"
                    class="check"
                    src="@/assets/entiry/UI_Btn_Icon_11.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="Header_blackHeader__46Gtf">
          <div class="Header_whiteBg__phoEB" style="max-width: 0%"></div>
          <a class="Header_logo__MMfAk Header_open__tcN4y">
            <img src="@/assets/img/UI_Img_Logo.png" />
          </a>
          <div class="Header_rightElements__6suUD">
            <div class="Header_links__nDFIE">
              <a href="/" data-hover="Game" target="_self" class="">Game</a>

              <a
                href="/Reward"
                data-hover="Nodes"
                target="_self"
                class="Header_nodes__HgU4L"
              >
                <div class="Header_nodesIcon__MQ4QV"></div>
              </a>
              <!-- <a href="https://docs.luminoss.ai/" data-hover="Docs" target="_blank" class="">Docs</a> -->

              <div>
                App<img src="@/assets/images/icon/chevron-down.svg" />
                <div class="Header_dropdown__C0CBu">
                  <a href="/" class="">
                    <div class="Header_dropdownDot__W66y8"></div>
                    Discover </a
                  ><a href="/rewards" class="Header_currentRoute__5C8CB">
                    <div class="Header_dropdownDot__W66y8"></div>
                    Rewards </a
                  ><a href="/account" class="">
                    <div class="Header_dropdownDot__W66y8"></div>
                    Account
                  </a>
                </div>
              </div>
            </div>

            <div
              v-show="myAddress == ''"
              @click="onClickLoginWallet"
              class="Header_connectContainer_connect"
            >
              CONNECT
            </div>
            <div class="Header_connectContainer__2VGQF Header_open__tcN4y">
              <div class="Header_newModal__lIrQv">
                <div
                  v-show="myAddress != ''"
                  @click="showInfoPopup"
                  class="Header_headerAddress__g_fc2"
                >
                  {{ myAddress }}
                </div>
                <div
                  class="Header_newcontent__2N_p7"
                  ref="dialogRef"
                  :class="showPopupClass"
                >
                  <div class="Header_userInfos__VhQnj">
                    <div class="Header_uAvater__2kGpY">
                      <img :src="myAvatar" class="Header_avaterIcon__AGCi4" />
                      <div
                        class="Dropdown_flex__DKxTG Dropdown_ane__0tQAP Header_dropDwon__lqLkJ"
                      >
                        <div
                          class="Dropdown_newModal__Xubow Dropdown_flex__DKxTG Dropdown_ane__0tQAP"
                        >
                          <div class="Dropdown_newContentWrap__lCQI8"></div>
                        </div>
                      </div>
                    </div>
                    <h2 class="Header_userName__T5VKC">{{ myAddress }}</h2>
                  </div>

                  <div class="Header_logout__hI53P" @click="showConfirm = true">
                    <img src="@/assets/img/icon-logout.svg" /><span
                      >Disconnect</span
                    >
                  </div>
                </div>
              </div>
              <div
                @click="openMenu"
                class="Header_menuWrap__xypxI"
                :class="isOpen ? 'Header_open__tcN4y' : ''"
              >
                <div
                  class="Header_menu__pRYvp"
                  :class="isOpen ? 'Header_open__tcN4y' : ''"
                >
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div
                class="Header_mobileMenu__XO2xB"
                :class="isOpen ? 'Header_open__tcN4y' : ''"
              >
                <div class="Header_menuItems__RT2HN">
                  <a href="/" data-hover="Home" target="_self" class=""
                    >Discover</a
                  >
                  <a href="/Reward" data-hover="Reward" target="_self" class=""
                    >Reward</a
                  >
                  <a
                    href="/account"
                    data-hover="Account"
                    target="_self"
                    class=""
                    >Account</a
                  >
                </div>
                <div class="Header_socialIcons__J4VZi" v-if="false">
                  <div>
                    <img src="@/assets/images/icon/x.svg" />
                    <div class="Header_mobileMenuItems___VHHM">
                      <a
                        href="https://x.com/BalanceWeb3"
                        target="_blank"
                        class=""
                        ><img src="@/assets/images/icon/x-menu.svg" />Balance
                        Intern</a
                      ><a
                        href="https://x.com/RealBalanceFun"
                        target="_blank"
                        class=""
                        ><img src="@/assets/images/icon/x-menu.svg" />Balance
                        Community</a
                      >
                    </div>
                  </div>
                  <a
                    href="https://discord.com/invite/balance-fun"
                    target="_blank"
                    ><img src="@/assets/images/icon/discord.svg"
                  /></a>
                  <div>
                    <img src="@/assets/images/icon/telegram-circle.svg" />
                    <div class="Header_mobileMenuItems___VHHM">
                      <a
                        href="https://t.me/Balancefun_announcement"
                        target="_blank"
                        class=""
                        ><img
                          src="@/assets/images/icon/telegram-circle-menu.svg"
                        />Telegram Announcement</a
                      ><a
                        href="https://t.me/Balance_Fun"
                        target="_blank"
                        class=""
                        ><img
                          src="@/assets/images/icon/telegram-circle-menu.svg"
                        />Telegram Community</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="react-confirm-alert-overlay undefined" v-show="showConfirm">
      <div class="react-confirm-alert">
        <div class="Top_react-confirm-alert-body__9JCTC">
          <p class="Top_react-confirm-header__GdcTP">
            Sure you want to log out?
          </p>
          <div style="margin-top: 18px">
            <button
              class="Top_react-confirm-cancel__TB5z2"
              @click="showConfirm = false"
            >
              No
            </button>
            <button
              @click="loginOutFunc"
              class="Top_react-confirm-confirm__Lc_H_"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="react-confirm-alert-overlay undefined" v-show="notWallet">
      <div class="react-confirm-alert">
        <div class="Top_react-confirm-alert-body__9JCTC">
          <p class="Top_react-confirm-header__GdcTP">
            Please install the Solflare Wallet or Trust Wallet plugin to Log in.
          </p>
          <div style="margin-top: 18px">
            <button
              @click="notWallet = false"
              class="Top_react-confirm-confirm__Lc_H_"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import walletEx from "./utils/wallet";
import emitter from "./utils/mittEx";
import { EEvent } from "./data/event";
import { useRoute } from "vue-router";
import { encryStr, getAvatarByIndex } from "./utils/index";
import userEx from "./data/user";
import sWallet from "./utils/sWallet";
const myAddress = ref("");
const myAvatar = ref("");

// computed(() => {
//     const avatar = getAvatarByIndex(userEx.userInfo?.avatarIndex);
//     console.log(avatar)
//     return avatar
// })

const showConfirm = ref(false);
const showPopupClass = ref("");
const notWallet = ref(false);
const curSelectEntityName = ref("Astrologer");
const entityIndex = ref(0);
const entityArray = ref([
  {
    title: "Astrologer",
    desc: "Astrology & Dream Interpretation",
    i: 0,
  },
  {
    title: "Sub Music",
    desc: "Guided relaxation experience",
    i: 1,
  },
  {
    title: "Mini Game",
    desc: "Casual Gaming Zone",
    i: 2,
  },
  {
    title: "StoryAl",
    desc: "Fantasy Worid Explorer",
    i: 3,
  },
]);

const updateUserInfo = () => {
  myAddress.value = userEx.userInfo.nickname;
  myAvatar.value = getAvatarByIndex(userEx.userInfo?.avatarIndex);
};

const clickEntity = (i) => {
  // console.log(i)
  entityIndex.value = i;
  curSelectEntityName.value = entityArray.value[i].title;
};

const notWalletFunc = () => {
  notWallet.value = true;
};
onMounted(async () => {
  // console.log(sWallet.isInit)
  // if (!sWallet.isInit) {
  //     userEx.login();
  // }

  emitter.on(EEvent.getUserInfo, updateUserInfo);
  emitter.on(EEvent.userLoginOut, userLoginOutFunc);
  emitter.on(EEvent.notWallet, notWalletFunc);
  emitter.on(EEvent.getWalletAddress, getWalletAddressFunc);
  // emitter.on(EEvent.getWalletAddress, () => {
  //     myAddress.value = walletEx.myAddress
  // })
  // if (userEx.initUser) {

  // } else {
  //     // myAddress
  //     // await sWallet.getMyAccounts();
  //     // myAddress.value = walletEx.myAddress;
  //     // await userEx.getUserInfo();
  // }
  sWallet.initAccount();
  if (sWallet.isInit) {
    userEx.getUInfo();
  }
  document.addEventListener("click", handleClickOutside);
});

const getWalletAddressFunc = () => {
  userEx.login();
};

const dialogRef = ref(null);
const handleClickOutside = (event) => {
  if (event.target.className == "Header_headerAddress__g_fc2") {
    return;
  }
  if (dialogRef.value && !dialogRef.value.contains(event.target)) {
    showPopupClass.value = "";
  }
};

const showInfoPopup = () => {
  showPopupClass.value = "Header_newcontentHover__sbcLI";
};

const openLeftMenu = () => {
  emitter.emit(EEvent.clickLeftMenu);
};
const route = useRoute();

const onClickLoginWallet = async () => {
  // showSelectWallet.value = true;
  const _path = route.fullPath;
  // if (_path == "/") {

  let loginBool = await sWallet.loginEx();
  if (loginBool) {
    await userEx.login();
  }
  // sWallet.destoryWallet();
  // try {
  //     sWallet.initWallet()

  //     // await sWallet.loginWallet()
  //     userEx.chinaType = "Solana";
  //     await userEx.login();
  //     await userEx.getUserInfo();

  //     await userEx.getTaskList();
  // } catch (err) {
  //
  // }
  // return
  // }
  // emitter.emit(EEvent.showSelectWallet)
};

const userLoginOutFunc = () => {
  myAvatar.value = "";
  myAddress.value = "";
};

const loginOutFunc = async () => {
  await userEx.loginOut();
  showConfirm.value = false;
};

const isOpen = ref(false);
const openMenu = () => {
  isOpen.value = !isOpen.value;
};

const isOpenEmenu = ref(false);
const open2menu = () => {};
</script>

<style lang="scss" scoped>
.topNav {
  // position: fixed;
  //top: 0;
  //right: 0;
  //left: 240px;
  // z-index: 1200;
}

.entity-nav-nav {
  height: inherit;
}

.entity-nav {
  height: inherit;
  display: flex;
  align-items: center;

  &:hover {
    .entityMenu {
      visibility: visible !important;
      opacity: 1 !important;
    }
  }
}

.entityBase {
  padding: 0 18px;
  font-size: 17px;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entity {
  width: 458px;
  //  height: 42px;
  line-height: 42px;
  background: #151719;
  border-radius: 21px;

  cursor: pointer;
  position: relative;

  .entity2 {
    padding: 0 18px;
    font-size: 17px;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-text {
    font-family: "InstrumentSans-Medium";
    font-weight: 500;
  }

  .right-text {
    color: #444648;
    font-family: "InstrumentSans-Regular";
  }

  .arrow {
    width: 11px;
    height: 7px;
    margin-left: 16px;
  }

  .entityMenu {
    position: absolute;
    left: 0;
    top: 52px;
    visibility: hidden;
    opacity: 0;
    width: 458px;
    z-index: 555;
    // height: 254px;
    background: #2c2e30;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    border: 1px solid #444648;
    overflow: hidden;

    .title {
      width: 63px;
      height: 17px;
      font-weight: 500;
      font-size: 17px;
      color: #929292;
      height: 45px;
      padding: 0 17px;
      font-family: "InstrumentSans-Medium";
    }

    .entityList {
      .entityItemActive {
        background: #444648;

        h3 {
          color: #ffffff !important;
        }
      }

      .entityItem {
        &:last-child {
        }

        &:hover {
          background: #444648;
        }

        padding: 0 17px;

        width: inherit;
        position: relative;
        background: #2c2e30;
        padding-top: 10px;
        padding-bottom: 10px;

        .check {
          width: 14px;
          height: 10px;
          position: absolute;
          right: 17px;
          top: 18px;
        }

        h3 {
          font-size: 17px;
          color: #929292;
          line-height: 17px;
          font-family: "InstrumentSans-Medium";
        }

        h5 {
          font-size: 13px;
          color: #929292;
          line-height: 13px;
          margin-top: 4px;
          font-family: "InstrumentSans-Regular";
        }

        .itemActive {
          h3 {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
