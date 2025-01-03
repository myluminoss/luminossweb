<template>
  <div class="agent-content">
    <div class="chat-content">
      <div class="chatList">
        <div v-if="closeStatus.length == 0" class="leftRole roleSize">
          <img :src="leftShowImg" />

          <div class="roleInfo" v-if="false">
            <div class="cardTitle">No.1527</div>
            <div class="nameList" v-if="false" v-for="(item, index) in names">
              <div class="title">{{ item.title }}</div>
              <div class="line"></div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>

        <div v-if="closeStatus.length == 0" class="rightRole roleSize">
          <img :src="rightShowImg" />
        </div>

        <div class="history">
          <div class="history-list" :class="closeStatus" ref="scrollBox">
            <div class="history-list2">
              <div
                class="history-item"
                :class="item.class"
                v-for="(item, index) in msgList"
                :key="index"
              >
                <div class="item-header">
                  <img
                    v-if="item.class == 'other'"
                    src="@/assets/entiry/UI_Bg_Head_02.png"
                  />
                  <img v-else src="@/assets/entiry/UI_Bg_Head_03.png" />
                </div>
                <div class="item-content">
                  <div class="content-text">
                    {{ item.msg }}
                  </div>

                  <!--  -->
                  <div class="contentEx selectAI" v-if="item.isEx">
                    <div
                      class="item"
                      v-for="(item, index) in aiEntityList"
                      @click="onClickSelectAI(item)"
                      :key="index"
                    >
                      {{ index + 1 }}.{{ item.title }}
                      <img class="icon" src="@/assets/entiry/r-arrow.svg" />
                    </div>
                  </div>
                  <!--    -->
                  <div
                    class="contentEx imgUpload"
                    v-if="item?.showUpdate"
                    @click="onClickSelectImg"
                  >
                    <div class="item upload">
                      <img
                        class="icon2"
                        v-if="fileImgShow != ''"
                        :src="fileImgShow"
                      />
                      <img
                        class="icon"
                        v-else
                        src="@/assets/entiry/upload-img.svg"
                      />
                    </div>
                    <input
                      @change="imgChange"
                      ref="fileEle"
                      class="fileEle"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                  <!--   -->
                  <div
                    class="contentEx confirmBtn"
                    v-if="item?.showConfirmBtn"
                    @click="onClickConfirm"
                  >
                    <div class="item">
                      Confirm
                      <img class="icon" src="@/assets/entiry/confirm.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tips" v-if="closeStatus.length > 0 && false">
            <p v-if="initTips[0].msg.length > 0">{{ initTips[0].msg }}</p>
            <p v-if="initTips[1].msg.length > 0">{{ initTips[1].msg }}</p>
          </div>
          <div class="tips2" v-if="closeStatus.length > 0 && false">
            <p v-if="initTips2[0].msg.length > 0">{{ initTips2[0].msg }}</p>
            <p v-if="initTips2[1].msg.length > 0">{{ initTips2[1].msg }}</p>
            <p v-if="initTips2[2].msg.length > 0">{{ initTips2[2].msg }}</p>
          </div>
          <div class="chatInput">
            <div class="_input">
              <input
                ref="inputEx"
                class="inputEx"
                :disabled="inputDisabled"
                @input="handlerInput"
                placeholder="What's bothering you ?"
                v-model="inputValue"
                @keyup.enter="handleEnter"
              />
            </div>
            <div class="iconBox" @click="handleEnter">
              <img
                v-if="!loading"
                class="icon"
                src="@/assets/entiry/UI_Btn_Icon_13.png"
              />
              <img
                v-else
                class="loading"
                src="@/assets/entiry/ui_loading.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <loadingComp v-show="showLoading"></loadingComp>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, watch } from "vue";

import axios from "axios";
import localStorageUtil from "./utils/localStorage";
import UI_Img_02_N from "./assets/entiry/UI_Img_02_D.png";

import UI_Img_02_P from "./assets/entiry/UI_Img_02_P.png";

import UI_Img_03_N from "./assets/entiry/UI_Img_03_N.png";
import UI_Img_03_P from "./assets/entiry/UI_Img_03_P.png";
import { random, sleep } from "./utils";
import loadingComp from "./components/loading.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const router = useRouter();

const loading = ref(false);
const isLeft = ref(true);
const isRight = ref(false);
const closeStatus = ref("");
const inputEx = ref(null);
const showLoading = ref(false);

const leftShowImg = computed(() => {
  if (isLeft.value) {
    return UI_Img_02_P;
  } else {
    return UI_Img_02_N;
  }
});
const initTips = ref([{ msg: "" }, { msg: "" }]);
const initTips2 = ref([{ msg: "" }, { msg: "" }, { msg: "" }]);

const names = ref([
  { title: "Name", name: "Jack" },
  { title: "Gender", name: "Man" },
  { title: "Specialty", name: "Dancer" },
  { title: "Height", name: "185cm" },
]);
const msgList = ref([]);

const rightShowImg = computed(() => {
  if (isRight.value) {
    return UI_Img_03_P;
  } else {
    return UI_Img_03_N;
  }
});

const inputValue = ref("");

const handlerInput = () => {
  isLeft.value = false;
  isRight.value = true;
};
const handleEnter = () => {
  if (inputDisabled.value) {
    return;
  }
  sendTest();
};

const onClickSelectImg = () => {};
const progressIndex = ref(0);

const aiEntityList = ref([
  { title: "Astrologer" },
  { title: "Sub Music" },
  { title: "Mini Game" },
  { title: "StoryAl" },
]);

const createProgress = ref([
  {
    class: "other",
    msg: "What would you like to name your AI agent?",
    i: 0,
    isEx: false,
  },
  {
    class: "my",
    msg: "",
    i: 1,
    isEx: false,
  },

  {
    class: "other",
    msg: "Please create a name for your token/ticker.",
    i: 2,
    isEx: false,
  },
  {
    class: "my",
    msg: "",
    i: 3,
    isEx: false,
  },

  {
    class: "other",
    msg: "Please provide a brief description of your AI agent.",
    i: 4,
    isEx: false,
  },

  {
    class: "my",
    msg: "",
    i: 5,
    isEx: false,
  },
  {
    class: "other",
    msg: "Please select an AI agent",
    i: 6,
    isEx: false,
  },

  {
    class: "my",
    msg: "",
    i: 7,

    isEx: false,
  },
  {
    class: "other",
    msg: "Please upload a profile picture or image for your AI agent.",
    i: 8,
    isEx: false,
    showUpdate: false,
  },

  {
    class: "my",
    msg: "",
    i: 9,

    isEx: false,
  },
  {
    class: "other",
    msg: "Confirm the creation of your AI agent.",
    i: 10,
    isEx: false,
    showConfirmBtn: false,
  },

  {
    class: "my",
    msg: "",
    i: 11,

    isEx: false,
  },
  {
    class: "other",
    msg: "Create Finish",
    i: 12,

    isEx: false,
  },
]);

const inputDisabled = ref(false);

onMounted(() => {
  let otherItem = createProgress.value[0];
  msgList.value.push(otherItem);
  addTxt(msgList.value.length - 1, msgList.value[msgList.value.length - 1].msg);
  progressIndex.value++;
});

const isShowSelectAI = ref(false);
const onClickConfirm = async () => {
  const title = createProgress.value[1].msg;
  const ticker = createProgress.value[3].msg;
  const desc = createProgress.value[5].msg;
  const img = fileImgShow.value;
  let sendData = {
    title,
    ticker,
    img,
    desc,
  };
  showLoading.value = true;
  let payRes = await sWallet.pay();
  if (!payRes) {
    console.error("pay errpr");
    showLoading.value = false;
    return;
  }

  createAgentItem(sendData)
    .then((res: any) => {
      if (res.code == 200) {
        emitter.emit(EEvent.updateEntityList);
        router.push("/Entity/" + res.data.id);
      }
    })
    .catch((err) => {})
    .finally(() => {
      showLoading.value = false;
    });
};
const onClickSelectAI = (item) => {
  inputValue.value = item.title;
  sendTest();
};
const sendTest = async (flag = true) => {
  // sWallet.pay();
  if (loading.value) {
    return;
  }
  if (flag && inputValue.value.length == 0) {
    return;
  }

  if (progressIndex.value == 1) {
    let msgItem = createProgress.value[1];
    msgItem.msg = inputValue.value;
    msgList.value.push(msgItem);
    inputValue.value = "";

    loading.value = true;
    await sleep(random(200, 1000));

    isRight.value = false;

    inputDisabled.value = false;
    let otherItem = createProgress.value[2];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  } else if (progressIndex.value == 2) {
    let msgItem = createProgress.value[3];
    msgItem.msg = inputValue.value;
    msgList.value.push(msgItem);
    inputValue.value = "";
    inputDisabled.value = false;

    loading.value = true;
    await sleep(random(200, 1000));

    isRight.value = false;

    let otherItem = createProgress.value[4];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  } else if (progressIndex.value == 3) {
    let msgItem = createProgress.value[5];
    msgItem.msg = inputValue.value;
    msgList.value.push(msgItem);
    inputValue.value = "";

    loading.value = true;
    await sleep(random(200, 1000));
    isRight.value = false;
    inputDisabled.value = true;

    let otherItem = createProgress.value[6];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  } else if (progressIndex.value == 4) {
    let msgItem = createProgress.value[7];
    msgItem.msg = inputValue.value;
    msgList.value.push(msgItem);
    inputValue.value = "";

    loading.value = true;
    await sleep(random(200, 1000));
    isRight.value = false;

    inputDisabled.value = true;

    let otherItem = createProgress.value[8];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  } else if (progressIndex.value == 5) {
    loading.value = true;
    await sleep(random(200, 1000));
    isRight.value = false;
    inputDisabled.value = true;

    let otherItem = createProgress.value[10];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  } else if (progressIndex.value == 6) {
    loading.value = true;
    await sleep(random(200, 1000));
    isRight.value = false;

    inputDisabled.value = true;

    let otherItem = createProgress.value[12];
    msgList.value.push(otherItem);
    isLeft.value = true;
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
    progressIndex.value++;
  }

  updateScrollBottom();
};

import sWallet from "./utils/sWallet";
import emitter from "./utils/mittEx";
import { EEvent } from "./data/event";
import { createAgentItem } from "./api/apiFunc";
const fileImgShow = ref("");
const fileEle = ref(null);
const imgChange = (e) => {
  if (fileEle.value) {
    const files = fileEle.value;
    const file = files[0].files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      fileImgShow.value = e.target.result as string;

      sendTest(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
};

const updateProgress = () => {
  if (progressIndex.value) {
  }
};

const addTxt = (num, content) => {
  let i = 0;
  let interval;

  const timerFunc = () => {
    i++;
    const str = content
      .substr(0, i)
      .split("\n")
      .map((item) => `<br/>${item}`)
      .join("");
    if (i > content.length) {
      msgList.value[num].msg = str.replace(/<br\s*\/?>/i, "");

      isLeft.value = false;
      isRight.value = true;
      loading.value = false;
      if (progressIndex.value == 4) {
        isShowSelectAI.value = true;
        msgList.value[6].isEx = true;
      } else if (progressIndex.value == 5) {
        msgList.value[8].showUpdate = true;
      } else if (progressIndex.value == 6) {
        console.log(msgList.value);
        msgList.value[9].showConfirmBtn = true;
      }
      clearInterval(interval);
      updateScrollBottom();
    } else {
      msgList.value[num].msg = str.replace(/<br\s*\/?>/i, "") + " ·";
    }
  };
  if (i > content.length) {
    loading.value = false;

    clearInterval(interval);
  } else {
    isLeft.value = true;
    timerFunc();
    interval = setInterval(timerFunc, 30);
  }
};

const scrollBox = ref<HTMLDivElement | null>(null);

const updateScrollBottom = async () => {
  nextTick(() => {
    if (scrollBox.value) {
      // console.log(scrollBox.value.scrollHeight);
      scrollBox.value.scrollTop = scrollBox.value.scrollHeight;
      // console.log(scrollBox.value.scrollTop);
    }
  });
};
</script>

<style lang="scss" scoped>
.agent-content {
  height: calc(100% - 68px - 76px);

  .chat-content {
    display: flex;
    height: 100%;
    // width: 700px;
    margin: 0 auto;

    .chatList {
      display: flex;
      width: 100%;
      flex-direction: column;
      // border: 1px red solid;
      position: relative;
    }

    .history {
      // padding-top: 50px;

      flex-grow: 1;
      // height: calc(100% - 66px);
      overflow: hidden;
      position: relative;
      z-index: 3;
      padding-bottom: 100px;

      .closeStatus {
        height: 37% !important;
      }

      .history-list {
        height: 100%;
        // height: calc(100% - 66px);
        // padding: 30px 0;
        overflow: auto;
        overflow-y: scroll;
        position: relative;
        z-index: 2;
        scrollbar-width: auto;

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          background: #18191b;
        }

        &::-webkit-scrollbar-thumb {
          background: #2e3134;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: #2e3134;
          border-radius: 10px;
        }
      }

      .history-list2 {
        width: 840px;
        margin: 0 auto;
        display: flex;
        height: auto;
        flex-direction: column;
        position: relative;
        z-index: 4;
        overflow: auto;
      }

      .history-item {
        display: flex;
        font-size: 21px;
        color: #1d1f21;
        margin: 10px 0;
        position: relative;

        .selectAI {
          width: 208px;
        }

        .confirmBtn {
          width: 120px;
        }

        .contentEx {
          // position: absolute;
          margin-top: 5px;

          .item {
            background: #f5f5f5;
            color: rgba(0, 0, 0, 0.7);
            padding: 7px 16px 7px 16px;
            font-size: 14px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            width: fit-content;
            margin-bottom: 6px;
            cursor: pointer;

            .icon {
              margin-left: 10px;
            }
          }

          .upload {
            width: 100px;
            height: 100px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
              margin-left: 0px;
            }
          }
        }

        .imgUpload {
          width: 100px;
          height: 100px;
          position: relative;

          .fileEle {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }

          .icon {
          }

          .icon2 {
            width: 100px;
            height: 100px;
            border-radius: 8px;
          }
        }

        .item-header {
          width: 60px;
          height: 60px;
          margin-right: 23px;

          img {
            width: inherit;
            height: inherit;
          }
        }

        .item-content {
          // min-width: 332px;
          //  background: #FFFFFF;

          border-radius: 10px;

          .content-text {
            padding: 12px 10px;

            max-width: 600px;
          }
        }
      }

      .my {
        // flex-direction: row-reverse;
        align-self: flex-end;

        .item-header {
          order: 1;
          margin-left: 23px;
        }

        .item-content {
          border-radius: 10px;
          background: #e5a168;
          order: 0;
          height: 50px;
          text-align: right;
        }
      }

      .other {
        // flex-direction: row-reverse;
        align-self: flex-start;

        .item-header {
          order: 0;
        }

        .content-text {
          border-radius: 10px;
          background-color: #fff;
        }

        .item-content {
          order: 1;
        }
      }
    }

    .tips {
      width: 940px;
      font-size: 37px;
      color: #ffffff;
      font-family: "InstrumentSans-Bold";
      text-align: center;
      line-height: 60px;
      height: 120px;
      margin: 0 auto 30px;
    }

    .tips2 {
      // visibility: hidden;
      display: none;
    }

    .chatInput {
      width: 840px;
      height: 66px;
      margin: 0 auto 33px;
      background: #ffffff;
      border-radius: 33px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-sizing: border-box;

      position: relative;
      z-index: 3;

      ._input {
        width: 90%;

        &::placeholder {
          color: #929292;
          font-family: "InstrumentSans-Medium";
        }
      }

      .inputEx {
        height: 66px;
        width: 100%;
        font-weight: 500;
        font-size: 21px;
        color: #929292;
        resize: none;
        border-radius: 33px;
        font-family: "InstrumentSans-Medium";

        border: none;
        padding-left: 20px;
        background-color: #fff;

        &:focus {
          outline: none;
        }
      }

      .iconBox {
        cursor: pointer;
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .loading {
          width: 30px;
          height: 30px;
          animation: rotate 3s linear infinite;
        }
      }

      /* 定义动画关键帧 */
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }

    .roleSize {
      // width: 795px;
      // height: 897px;
      width: 815px;
      height: 905px;

      position: absolute;
      z-index: 2;

      .roleInfo {
        position: absolute;
        left: 44%;
        top: 74%;
        transform: translate(-50%, -50%);
        width: 319px;
        height: 184px;
        border-radius: 10px;
        border: 1px solid #ffffff;
        background: url("@/assets/entiry/UI_Bg_02.png") no-repeat;
        background-size: cover;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;

        .cardTitle {
          position: absolute;
          left: 0;
          top: -28px;
          width: 132px;
          height: 28px;
          font-family: "InstrumentSans-Bold";
          font-weight: bold;
          font-size: 36px;
          color: #ffaf6c;
          text-shadow: 3px 3px 1px black;
        }

        .nameList {
          display: flex;
          // display: grid;
          align-items: center;
          font-size: 21px;
          flex-direction: row;
          color: #ffffff;
          // grid-template-columns: repeat(auto - fit, minmax(60px, 1fr));
          // grid-gap: 10px;
          text-shadow: 3px 3px 1px black;
          font-family: "InstrumentSans-SemiBold";

          .title {
            font-family: Instrument Sans;
            font-weight: 600;
            line-height: 37px;
          }

          .line {
            border-top: 2px dashed #e7a269;
            // grid-column-span: auto;
            height: 1px;
            flex-grow: 1;
            margin: 0 20px;
            // background-color: lightgreen;
          }

          .name {
            font-weight: 500;
          }
        }
      }

      &:hover {
        filter: drop-shadow(0px 0 30px var(--c))
          drop-shadow(0px 0 10px var(--c));
        transition: all 250ms ease;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .chatList {
    }

    .leftRole {
      left: -10px;
      bottom: -35px;

      &:hover {
        filter: drop-shadow(0px 0 30px var(--c))
          drop-shadow(0px 0 10px var(--c));
        transition: all 250ms ease;
      }
    }

    .rightRole {
      bottom: -35px;

      right: -10px;
      z-index: 2;
    }
  }
}
</style>
