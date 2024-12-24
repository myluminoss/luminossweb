<template>


    <div class="leftNav " ref="leftNav" :class="[openClass, openLeftMenuClass, openAnimaClass]">

        <div class="Left_pad25__PY2FV Left_leftWrap__Ev90K navIcons">
            <div ref="maskEle" class="mask"></div>

            <div class="navIconList">
                <img class="menuImg" @click="openShow" src="@/assets/entiry/UI_Btn_Icon_05_2.png" />

                <a href="/">
                    <img src="@/assets/img/UI_Img_Logo.png" class=" right-logo Left_img1__YKDVC">
                </a>

            </div>

            <ul class="Left_ul1__jtA0x">

                <li class="Left_flex__zMRer Left_ane__9oifu " @click="toPage(index)" v-for="(item, index) in navArr"
                    :key="index" :class="currentIndex == index ? 'Left_active__6JdbD' : ''">
                    <img :src="item.active ? item.icon_p : item.icon">
                    {{ item.text }}
                </li>
            </ul>

            <div class="chats">
                <div class="chat-title">Chats</div>
                <div class="chat-list">
                    <div :class="index == chatEntityIndex ? 'chat-item-active' : ''" @click="toEntityItem(item, index)"
                        class="chat-item" v-for="(item, index) in entityList">
                        <img class="icon" :src="item.img" />
                        <p class="text">{{ item.title }}</p>
                    </div>
                </div>
            </div>



            <div class="create-agent " @click="toAgent" :class="isAgenPage ? 'Left_active__6JdbD' : ''">
                <img class="icon" :src="isAgenPage ? UI_Btn_Icon_062 : UI_Btn_Icon_06" />
                <p class="text">Create Agent</p>
            </div>


            <div class="links">
                <img class="icon1" src="@/assets/entiry/UI_Btn_Icon_07.png" />

                <a href="https://x.com/home" target="_blank" rel="">
                    <img class="icon2" src="@/assets/entiry/UI_Btn_Icon_08.png" />

                </a>

                <a href="https://discord.com/" target="_blank" rel="">
                    <img class="icon3" src="@/assets/entiry/UI_Btn_Icon_09.png" />
                </a>
            </div>



            <div class="myInfo" @click="toLogin">
                <div class="info" @click="onClickTest">
                    <img class="header" :src="myAvatar" />
                    <p class="name">{{ myAddress }}</p>
                    <img v-if="false" class="menuImg" src="@/assets/entiry/UI_Btn_Icon_10.png" />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import slider from "./Slider.vue"

import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, watch, computed } from 'vue';
import UI_Bg_Head_02 from "@/assets/entiry/UI_Bg_Head_02.png"
const currentIndex = ref(-1);
const chatEntityIndex = ref(-1)

const myAddress = ref("CONNECT");
const myAvatar = ref(UI_Bg_Head_02);
const updateUserInfo = () => {
    myAddress.value = userEx.userInfo.nickname || "CONNECT";
    myAvatar.value = userEx.userInfo.avatar || UI_Bg_Head_02;;
}

const isAgenPage = ref(false);

const toLogin = async () => {

    if (myAddress.value == "CONNECT") {
        sWallet.destoryWallet();
        try {
            sWallet.initWallet()

            await sWallet.loginWallet()
            userEx.chinaType = "Solana";
            await userEx.login();
            await userEx.getUserInfo();

            await userEx.getTaskList();
        } catch (err) {
            console.warn('')
        }
    }

}


const router = useRouter();
const clickIndex = ref(0)
const onClickTest = () => {
    if (clickIndex.value == 3) {
        clickIndex.value = 0;
        localStorageUtil.removeItem("msgList")
    } else {
        clickIndex.value++;
    }
}

const toEntityItem = (item, i) => {
    chatEntityIndex.value = i;
    currentIndex.value = -1;
    navArr.value.forEach(item => {
        item.active = false;
    })
    router.push("/Entity")

}


const navArr = ref([


    {
        icon: UI_Btn_Icon_01_N,
        icon_p: UI_Btn_Icon_01_P,
        text: "Discover",
        path: "/Discover",
        active: false
    },
    {
        icon: UI_Btn_Icon_02_N,
        icon_p: UI_Btn_Icon_02_P,
        text: "Reward",
        path: "/Reward",
        active: false
    }, {
        icon: UI_Btn_Icon_03_N,
        icon_p: UI_Btn_Icon_03_P,
        text: "Account",
        path: "/Account",
        active: false
    },
])

import UI_Btn_Icon_04_N from "@/assets/entiry/UI_Btn_Icon_04_N.png"
import UI_Btn_Icon_04_P from "@/assets/entiry/UI_Btn_Icon_04_P.png"

import UI_Btn_Icon_01_P from "@/assets/entiry/UI_Btn_Icon_01_P.png"
import UI_Btn_Icon_01_N from "@/assets/entiry/UI_Btn_Icon_01_N.png"

import UI_Btn_Icon_02_P from "@/assets/entiry/UI_Btn_Icon_02_P.png"
import UI_Btn_Icon_02_N from "@/assets/entiry/UI_Btn_Icon_02_N.png"

import UI_Btn_Icon_03_P from "@/assets/entiry/UI_Btn_Icon_03_P.png"
import UI_Btn_Icon_03_N from "@/assets/entiry/UI_Btn_Icon_03_N.png"

import UI_Btn_Icon_N_01 from "./assets/icons/UI_Btn_Icon_N_01.png"
import UI_Btn_Icon_N_02 from "@/assets/icons/UI_Btn_Icon_N_02.png"
import UI_Btn_Icon_N_03 from "@/assets/icons/UI_Btn_Icon_N_03.png"
import UI_Btn_Icon_N_07_x2 from "@/assets/icons/UI_Btn_Icon_N_07_x2.png"

import UI_Btn_Icon_P_01 from "@/assets/icons/UI_Btn_Icon_P_01.png"
import UI_Btn_Icon_P_02 from "@/assets/icons/UI_Btn_Icon_P_02.png"
import UI_Btn_Icon_P_03 from "@/assets/icons/UI_Btn_Icon_P_03.png"
import UI_Btn_Icon_P_07_x2 from "@/assets/icons/UI_Btn_Icon_P_07_x2.png"


import UI_Btn_Icon_06 from "@/assets/entiry/UI_Btn_Icon_06.png"
import UI_Btn_Icon_062 from "@/assets/entiry/UI_Btn_Icon_06_2.png"



import userEx from "./data/user";
import emitter from "./utils/mittEx";
import { EEvent } from "./data/event";
import localStorageUtil from "./utils/localStorage";
import sWallet from "./utils/sWallet";
import axios from "axios";

const route = useRoute();

const openClass = ref("");
const openAnimaClass = ref("");
onMounted(() => {

    emitter.on(EEvent.getUserInfo, updateUserInfo)
    emitter.on(EEvent.clickLeftMenu, clickLeftMenuFunc)
    emitter.on(EEvent.userLoginOut, userLoginOutFunc)
    emitter.on(EEvent.updateEntityList, updateEntityListFunc)


    handleResize();
    // 监听屏幕宽度和高度变化
    window.addEventListener('resize', handleResize, true)

    document.addEventListener('click', handleClickOutside);

    getEntityList();
    setTimeout(() => {
        changeCurrentIndex();
    }, 100)
})


const updateEntityListFunc = () => {
    console.log("update entity list")
    getEntityList();

}


const toAgent = async () => {

    // sWallet.connectToWallet();
    if (myAddress.value == "CONNECT") {
        sWallet.destoryWallet();
        try {
            sWallet.initWallet()

            await sWallet.loginWallet()
            userEx.chinaType = "Solana";
            await userEx.login();
            await userEx.getUserInfo();

            await userEx.getTaskList();
        } catch (err) {
            console.warn('2')
        }
    } else {
        router.push("/Agent")
    }


}

const entityList = ref([]);
const getEntityList = async () => {
    axios.get("https://srv.luminoss.ai/aiAgent/getMyAgentList").then((res) => {
        console.log(res)
        if (res.status == 200 && res.data != null) {
            entityList.value = [...res.data.data];
            console.log(entityList.value)

            // for (let i = 0; i < entityList.value.length; i++) {

            //     axios.delete(`https://srv.luminoss.ai/aiAgent/delAgent/${entityList.value[i].id}`)
            // }
        }
    }).catch(err => {

    })
}


const userLoginOutFunc = () => {
    myAvatar.value = "";
    myAddress.value = "";
}

const handleClickOutside = (event) => {
    if (event.target.className == "leftNav" || event.target.className == "menuIcon" || event.target.className == "menuImg") {
        return;
    }
    if (isClickOpenLeft.value && openLeftMenuClass.value == "navToLeft0") {
        if (leftNav.value && !leftNav.value.contains(event.target)) {
            openLeftMenuClass.value = "navToLeft190";
            isClickOpenLeft.value = !isClickOpenLeft.value;
        }
    }



};

let isClickOpenLeft = ref(false);
let openLeftMenuClass = ref("");

const clickCloseLeftMenuFunc = () => {
}
const clickLeftMenuFunc = () => {

    if (screenWidth.value <= 750) {

        if (isClickOpenLeft.value) {
            openLeftMenuClass.value = "navToLeft190";

        } else {

            openLeftMenuClass.value = "navToLeft0";
        }
        isClickOpenLeft.value = !isClickOpenLeft.value;
    }
}

const isOpen = ref(true);
const openStyle = ref({
    // animation: "width50"
})
const animationName = ref('fadeInOut 2s ease-in-out infinite');
const leftNav = ref(null)
const maskEle = ref(null)
const screenWidth = ref(0);

const handleResize = () => {
    screenWidth.value = window.innerWidth;
    // console.log(screenWidth.value)
    if (screenWidth.value > 750 && screenWidth.value <= 850) {
        isOpen.value = false;
        openAnimaClass.value = "openAnimaClass";
        maskEle.value.style.display = "block";
    } else if (screenWidth.value >= 850 && screenWidth.value <= 950) {
        openAnimaClass.value = "closeAnimaClass";
        maskEle.value.style.display = "none";
        isOpen.value = true;
    } else if (screenWidth.value > 650 && screenWidth.value <= 750) {
    }
}
const openShow = () => {



    if (isOpen.value) {
        openAnimaClass.value = "openAnimaClass";
        maskEle.value.style.display = "block";

    } else {
        openAnimaClass.value = "closeAnimaClass";
        maskEle.value.style.display = "none";
    }

    isOpen.value = !isOpen.value;
}

const changeCurrentIndex = () => {
    const _path = route.fullPath;
    navArr.value.forEach(item => {
        item.active = false;
    })
    currentIndex.value = -1;
    for (let i = 0; i < navArr.value.length; i++) {
        if (navArr.value[i].path == _path) {
            currentIndex.value = i;
            navArr.value[i].active = true;
            break;
        }
    }
    if (currentIndex.value == -1) {
        if (_path == "/Details") {
            currentIndex.value = 0;
            navArr.value[currentIndex.value].active = true;
        }
    }
    isAgenPage.value = _path == "/Agent";
}

watch(() => route.fullPath, (nv, ov) => {
    changeCurrentIndex()
})


const toPage = (index: number) => {

    for (let i = 0; i < navArr.value.length; i++) {
        navArr.value[i].active = false
    }
    currentIndex.value = index;
    navArr.value[index].active = true
    router.push(navArr.value[index].path)
}
</script>


<style lang="scss" scoped>
.openNav {}

@keyframes width50 {
    from {
        width: 190px;
    }

    to {
        width: 50px;
    }
}

@keyframes width_50 {
    from {
        width: 50px;
    }

    to {
        width: 190px;
    }
}


@keyframes toLeft0 {
    from {
        left: -190px;
    }

    to {
        left: 0;
    }
}



@keyframes toLeft190 {
    from {
        left: 0px;
    }

    to {
        left: -190px;
    }
}

.navToLeft0 {
    animation: toLeft0 0.4s;
}

.navToLeft190 {
    animation: toLeft190 0.4s;
}

.openAnimaClass {
    animation: width50 0.4s;
}

.closeAnimaClass {
    animation: width_50 0.4s;
}


.leftNav {
    // position: fixed;
    //top: 0;
    //bottom: 0;
    //left: 0;
    z-index: 3;
    overflow: hidden;
    position: relative;

    width: 190px;
    display: flex;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    .fullMask {
        position: absolute;
        left: 0;
        width: 750px;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        background: rgba($color: #000000, $alpha: 0.4);
    }



    .mask {
        position: absolute;
        left: 0;
        top: 0;
        height: 103%;
        width: 103%;
        background-color: #151719;
        z-index: 2;
    }

    .chats {
        padding: 22px 0;
        border-top: #444648 1px solid;

        .chat-title {
            width: 47px;
            font-weight: 500;
            font-size: 17px;
            color: #929292;
        }

        .chat-list {
            margin-top: 22px;

            .chat-item {
                width: 162px;
                height: 42px;
                background: none;
                border-radius: 21px;
                margin: 10px 0;
                display: flex;
                font-weight: 500;
                text-align: center;
                align-items: center;
                color: #929292;
                padding-left: 20px;
                box-sizing: border-box;
                cursor: pointer;
                font-family: "InstrumentSans-Regular";

                .icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 10px;
                }

                .text {
                    font-weight: 600;
                    font-size: 16px;
                    color: #929292;
                }
            }


            .chat-item-active {
                background: linear-gradient(-90deg, #F79744, #F5691E);

                .text {
                    color: #fff;
                }
            }
        }
    }

    .Left_pad25__PY2FV {
        position: relative;



    }



    .line {
        border-top: #444648 1px solid;

    }

    .create-agent {
        width: 162px;
        height: 42px;
        background: #2E3134;
        border-radius: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        cursor: pointer;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 180px;


        .icon {
            width: 20px;
            height: 17px;
        }

        .text {
            font-family: "InstrumentSans-Medium";

            font-weight: 500;
            font-size: 16px;
            color: #929292;
            margin-left: 4px;
        }

    }

    .links {
        display: flex;
        justify-content: space-around;
        margin-bottom: 12px;
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 80px;

        .icon1,
        .icon2,
        .icon3 {
            cursor: pointer;
        }
    }

    .myInfo {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        bottom: 0;
        height: 76px;
        width: 90%;
        left: 11px;

        border-top: #444648 1px solid;

        .info {
            display: flex;
            align-items: center;
            height: 76px;
            padding-left: 15px;
        }

        .header {
            width: 40px;
            height: 40px;
            background: #929292;
            border-radius: 50%;

        }

        .menuImg {
            position: absolute;
            right: 06px;
            top: 36px;
            width: 11px;
            height: 7px;
            z-index: 1;
        }

        .name {
            margin-left: 13px;
            font-family: Instrument Sans;
            font-weight: 500;
            font-size: 17px;
            width: 100px;
            color: #929292;
            white-space: nowrap;
            /* 文本不换行，强制在一行内显示 */
            overflow: hidden;
            /* 超出元素宽度的内容隐藏起来 */
            text-overflow: ellipsis;
        }
    }
}
</style>