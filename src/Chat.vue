<template>
  <div class="content">
    <div class="line"></div>
    <div class="start" v-if="false">
      <div class="tips">
        Hey, I’m Celeste, I’m Celeste, from an autonomous dream land. <br />
        here to help you navigate the stars and discover your destiny.
      </div>
      <div class="input">
        <div class="input-box"></div>
        <div class="enter">
          <img class="icon" src="@/assets/entiry/UI_Btn_Icon_13.png" />
        </div>
      </div>
    </div>

    <div class="chat-content">
      <div class="chatList">
        <div v-if="closeStatus.length == 0" class="leftRole roleSize">
          <img :src="leftShowImg" />

          <div class="roleInfo">
            <div class="cardTitle">No.1527</div>
            <div class="nameList" v-for="(item, index) in names">
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
                <div class="item-content">{{ item.msg }}</div>
              </div>
            </div>
          </div>
          <div class="tips" v-if="closeStatus.length > 0">
            <p v-if="initTips[0].msg.length > 0">{{ initTips[0].msg }}</p>
            <p v-if="initTips[1].msg.length > 0">{{ initTips[1].msg }}</p>
          </div>
          <div class="tips2" v-if="closeStatus.length > 0">
            <p v-if="initTips2[0].msg.length > 0">{{ initTips2[0].msg }}</p>
            <p v-if="initTips2[1].msg.length > 0">{{ initTips2[1].msg }}</p>
            <p v-if="initTips2[2].msg.length > 0">{{ initTips2[2].msg }}</p>
          </div>
          <div class="chatInput">
            <div class="_input">
              <input
                class="inputEx"
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
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref, nextTick, watch } from "vue";
import localStorageUtil from "./utils/localStorage";
import UI_Img_02_N from "./assets/entiry/UI_Img_02_D.png";
import UI_Img_02_P from "./assets/entiry/UI_Img_02_P.png";

import UI_Img_03_N from "./assets/entiry/UI_Img_03_N.png";
import UI_Img_03_P from "./assets/entiry/UI_Img_03_P.png";

const isInit = ref(false);

const html = ref("");
const htmlText = ref("");
const inputValue = ref("");
const msgList = ref([]);

const loading = ref(false);

const names = ref([
  { title: "Name", name: "Celeste" },
  { title: "Gender", name: "Man" },
  { title: "Specialty", name: "Astrology" },
  { title: "Height", name: "192cm" },
]);

const isLeft = ref(true);
const isRight = ref(false);
const closeStatus = ref("");
const leftShowImg = computed(() => {
  // console.log(isLeft.value)
  if (isLeft.value) {
    return UI_Img_02_P;
  } else {
    return UI_Img_02_N;
  }
});

const rightShowImg = computed(() => {
  if (isRight.value) {
    return UI_Img_03_P;
  } else {
    return UI_Img_03_N;
  }
});

const handlerInput = () => {
  isLeft.value = false;
  isRight.value = true;
};
// const msgList = ref([])
const handleEnter = () => {
  if (loading.value) {
    return;
  }
  if (inputValue.value.length == 0) {
    return;
  }
  if (!isInit.value) {
    isInit.value = true;
    let otherItem = {
      class: "other",
      msg: "I shall reveal what your stars and dreams conceal ",
    };
    msgList.value.push(otherItem);
    closeStatus.value = "";

    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg,
      () => {
        sendTest();
      }
    );
  } else {
    sendTest();
  }
};

watch(
  () => inputValue.value,
  (nv, ov) => {
    if (nv == "") {
      isRight.value = false;
    } else {
      isRight.value = true;
    }
  }
);

const isEmpty = ref(false);
const tips1 = ref(`Hey, I'm Celeste, from an autonomous dream land.`);
const tips2 = ref(
  `here to help you navigate the stars and discover your destiny.`
);
const initTips = ref([{ msg: "" }, { msg: "" }]);
const initTips2 = ref([{ msg: "" }, { msg: "" }, { msg: "" }]);

const tips11 = ref(`${``} Hey`);
const tips22 = ref(`I’m Celeste, I’m Celeste, from an autonomous dream land.`);
const tips33 = ref(
  `here to help you navigate the stars and discover your destiny.`
);

onMounted(() => {
  let _msgList = localStorageUtil.getItem("msgList");

  let isEntityEnter = localStorageUtil.getItem("isEntityEnter");
  if (isEntityEnter != null) {
    localStorageUtil.removeItem("isEntityEnter");
  } else {
  }

  initTipsFunc22();
  initTipsFunc();
  closeStatus.value = "closeStatus";
  handleResize();

  window.addEventListener("resize", handleResize, true);

  updateScrollBottom();
});

const screenWidth = ref(0);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value > 750 && screenWidth.value <= 850) {
  } else if (screenWidth.value >= 850 && screenWidth.value <= 950) {
  } else if (screenWidth.value > 650 && screenWidth.value <= 750) {
  }
};

const initTipsFunc22 = () => {
  isEmpty.value = true;
  let currentTipIndex = 0; //
  let interval: any = null; //
  const executeTypingEffect = (text: string) => {
    let i = 0;
    const timerFunc = () => {
      i++;
      const str = text
        .substr(0, i)
        .split("\n")
        .map((item) => `<br/>${item}`)
        .join("");
      if (i > text.length) {
        initTips2.value[currentTipIndex].msg = str.replace(/<br\s*\/?>/i, "");
        if (interval) {
          clearInterval(interval);
          interval = null;
          if (currentTipIndex === 0) {
            currentTipIndex++;
            startTypingEffect();
          } else if (currentTipIndex === 1) {
            currentTipIndex++;
            startTypingEffect();
          }
        }
      } else {
        initTips2.value[currentTipIndex].msg =
          str.replace(/<br\s*\/?>/i, "") + " ·";
      }
    };

    if (i > text.length) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    } else {
      timerFunc();
      interval = setInterval(timerFunc, 30);
    }
  };

  const startTypingEffect = () => {
    if (currentTipIndex === 0) {
      executeTypingEffect(tips11.value);
    } else if (currentTipIndex === 1) {
      executeTypingEffect(tips22.value);
    } else if (currentTipIndex === 2) {
      executeTypingEffect(tips33.value);
    }
  };

  startTypingEffect();
};

const initTipsFunc = () => {
  isEmpty.value = true;
  let currentTipIndex = 0;
  let interval: any = null;
  const executeTypingEffect = (text: string) => {
    let i = 0;
    const timerFunc = () => {
      i++;
      const str = text
        .substr(0, i)
        .split("\n")
        .map((item) => `<br/>${item}`)
        .join("");
      if (i > text.length) {
        initTips.value[currentTipIndex].msg = str.replace(/<br\s*\/?>/i, "");
        if (interval) {
          clearInterval(interval);
          interval = null;
          if (currentTipIndex === 0) {
            currentTipIndex++;
            startTypingEffect();
          }
        }
      } else {
        initTips.value[currentTipIndex].msg =
          str.replace(/<br\s*\/?>/i, "") + " ·";
      }
    };

    if (i > text.length) {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    } else {
      timerFunc();
      interval = setInterval(timerFunc, 30);
    }
  };

  const startTypingEffect = () => {
    if (currentTipIndex === 0) {
      executeTypingEffect(tips1.value);
    } else if (currentTipIndex === 1) {
      executeTypingEffect(tips2.value);
    }
  };

  startTypingEffect();
};

const addTxt = (num, content, cb?: () => void) => {
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
      cb && cb();
      clearInterval(interval);
    } else {
      msgList.value[num].msg = str.replace(/<br\s*\/?>/i, "") + " ·";
    }
  };
  if (i > content.length) {
    cb && cb();

    clearInterval(interval);
  } else {
    isLeft.value = true;
    timerFunc();
    interval = setInterval(timerFunc, 50);
  }
};

const sendTest = async () => {
  if (loading.value) {
    return;
  }
  if (inputValue.value.length == 0) {
    return;
  }

  loading.value = true;
  isRight.value = true;
  let res: any = await axios
    .post(
      "https://ai.luminoss.ai/chat",
      {
        msg: inputValue.value,
      },
      {
        headers: {
          "content-Type": "application/json",
        },
      }
    )
    .catch(() => {
      loading.value = false;
      isRight.value = false;
      isLeft.value = false;
    });

  if (res == null || res.status != 200) {
    return;
  }
  closeStatus.value = "";
  loading.value = false;
  isRight.value = false;

  let msgItem = { class: "my", msg: inputValue.value };
  msgList.value.push(msgItem);
  inputValue.value = "";

  addMsgItem(msgItem);
  if (res.data.type == 0) {
    let otherItem = {
      class: "other",
      msg: res.data.msg,
    };
    isLeft.value = true;
    msgList.value.push(otherItem);
    addMsgItem(otherItem);
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
  }
  updateScrollBottom();
};

watch(
  () => msgList.value,
  (nv, ov) => {}
);

const scrollBox = ref<HTMLDivElement | null>(null);
const updateScrollBottom = async () => {
  nextTick(() => {
    if (scrollBox.value) {
      scrollBox.value.scrollTop = scrollBox.value.scrollHeight;
    }
  });
};

const addMsgItem = (msg) => {
  if (msg == null || msg == "") {
    return;
  }
  let msgList = localStorageUtil.getItem("msgList");
  if (msgList == null || msgList == "") {
    msgList = [];
  } else {
    msgList = JSON.parse(msgList);
  }
  msgList.push(msg);
  localStorageUtil.setItem("msgList", msgList);
};
</script>

<style lang="scss" scoped>
.content {
  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
