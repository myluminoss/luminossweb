<template>
  <div class="content">
    <div class="line"></div>
    <div class="start" v-if="false">
      <div class="tips">
        " Hello! Ready to unlock the power of AI? <br />
        " Hello! Ready to unlock the power of AI? Together, we can turn your
        imagination into reality!"
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

          <div class="roleInfo" v-if="false">
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

    <loadingComp v-show="showLoading"></loadingComp>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref, nextTick, watch } from "vue";
import localStorageUtil from "./utils/localStorage";
import UI_Img_02_N from "./assets/entiry/UI_Img_02_D.png";
import UI_Img_02_P from "./assets/entiry/UI_Img_02_P.png";
import loadingComp from "./components/loading.vue";

import UI_Img_03_N from "./assets/entiry/UI_Img_03_N.png";
import UI_Img_03_P from "./assets/entiry/UI_Img_03_P.png";
import {
  addChatHistoryItem,
  getChatHistory,
  delEntityItem,
} from "./api/apiFunc";
import { useRoute } from "vue-router";

const html = ref("");
const htmlText = ref("");
const inputValue = ref("");
const msgList = ref([]);

const loading = ref(false);

const names = ref([
  { title: "Name", name: "Jack" },
  { title: "Gender", name: "Man" },
  { title: "Specialty", name: "Dancer" },
  { title: "Height", name: "185cm" },
]);
const showLoading = ref(false);

const isLeft = ref(true);
const isRight = ref(false);
const closeStatus = ref("");
const leftShowImg = computed(() => {
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
    // let otherItem = {
    //     class: 'other', msg: "I shall reveal what your stars and dreams conceal "
    // }
    // msgList.value.push(otherItem)
    // closeStatus.value = "";
    // addTxt(msgList.value.length - 1, msgList.value[msgList.value.length - 1].msg, () => {
    //     sendTest();
    // })
  } else {
  }
  sendTest();

  // addTxt(msgList.value.length - 1, msgList.value[msgList.value.length - 1].msg)
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
const tips1 = ref(`${`"`} Hello! Ready to unlock the power of AI? `);
const tips2 = ref(
  `Together, we can turn your imagination into reality! ${`"`}`
);
const initTips = ref([{ msg: "" }, { msg: "" }]);
const initTips2 = ref([{ msg: "" }, { msg: "" }, { msg: "" }]);

const tips11 = ref(`${`"`} Hello! `);
const tips22 = ref(`Ready to unlock the power of AI? ${`"`}`);
const tips33 = ref(
  `Together, we can turn your imagination into reality! ${`"`}`
);

const isInit = ref(false);

const route = useRoute();

const aiAgentId = ref("");

watch(
  () => route.params.id,
  (nv, ov) => {
    // console.log("nv", nv);
    aiAgentId.value = nv as string;
    initEntityHistory();
  }
);

onMounted(async (option) => {
  let _msgList = localStorageUtil.getItem("msgList");

  let isEntityEnter = localStorageUtil.getItem("isEntityEnter");
  if (isEntityEnter != null) {
    // localStorageUtil.removeItem("isEntityEnter");
  } else {
    // initTipsFunc();
    // closeStatus.value = "closeStatus";
  }
  // console.log(route.params);
  if (route.params && route.params.id) {
    const id = route.params.id;
    // console.log(id);
    aiAgentId.value = id as string;
  }

  // if (_msgList != null && _msgList != "") {
  //     _msgList = JSON.parse(_msgList);
  //     if (_msgList.length > 0) {
  //         msgList.value = [..._msgList];
  //         console.log(msgList.value)
  //         isEmpty.value = false;

  //     } else {
  //         initTipsFunc();
  //         initTipsFunc22();

  //         closeStatus.value = "closeStatus";
  //     }
  // } else {
  //     initTipsFunc();
  //     initTipsFunc22();
  //     closeStatus.value = "closeStatus";

  // }

  // if (!isInit.value) {
  // isInit.value = true;

  await initEntityHistory();

  // } else {
  //     addTxt(msgList.value.length - 1, msgList.value[msgList.value.length - 1].msg)
  // }
});

const initEntityHistory = async () => {
  //   delEntityItem("1873647907884941313");

  msgList.value = [];
  clearInterval(interval);
  let historyData: any = await getChatHistory({ aiAgentId: aiAgentId.value });
  if (historyData.code == 200 && historyData.rows.length > 0) {
    let rows = historyData.rows;
    rows.reverse();
    for (let i = 0; i < rows.length; i++) {
      let item = rows[i];
      let otherItem = {
        class: item.role,
        msg: item.data,
      };
      msgList.value.push(otherItem);
    }
  } else {
    let otherItem = {
      class: "other",
      msg: "I shall reveal what your stars and dreams conceal ",
    };
    msgList.value.push(otherItem);
    closeStatus.value = "";
    addTxt(
      msgList.value.length - 1,
      msgList.value[msgList.value.length - 1].msg
    );
  }
  updateScrollBottom();
  // .then((res: any) => {
  //   console.log(res);
  //   if (res.code == 200 && res.rows.length > 0) {
  //     let rows = res.rows;
  //     for (let i = 0; i < rows.length; i++) {
  //       let item = rows[i];

  //       let otherItem = {
  //         class: item.role,
  //         msg: item.data,
  //       };
  //       msgList.value.push(otherItem);
  //     }
  //   }
  // })
  // .catch((err) => {});
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
  let currentTipIndex = 0; //
  let interval: any = null; // xs
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

let interval = null;
const addTxt = (num, content, cb?: () => void) => {
  let i = 0;

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
        // let res = await axios.post('https://api3.lotuscity.fun/chat', {
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
  addChatHistoryItem({
    aiAgentId: aiAgentId.value,
    data: inputValue.value,
    role: "my",
  });
  addChatHistoryItem({
    aiAgentId: aiAgentId.value,
    data: res.data.msg,
    role: "other",
  });
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
  (nv, ov) => {
    // ();
  }
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
  // padding-left: 190px;

  // position: fixed;
  //top: 68px;
  //bottom: 0;
  //right: 0;
  // left: 240px;
  //z-index: 1100;

  .iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>
