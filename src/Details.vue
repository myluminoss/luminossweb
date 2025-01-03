<template>
  <div class="details-content">
    <div class="d-topNav">
      <div class="p">Discover</div>
      <div class="m">></div>
      <div class="c">{{ aiAgentDetails.title }}</div>
    </div>

    <div class="d-intro">
      <div class="d-intro-left">
        <div class="intro-img">
          <img :src="aiAgentDetails.img" />
        </div>
        <div class="intro-text">
          <div class="intro-title">{{ aiAgentDetails.title }}</div>
          <div class="intro-tags">
            <div
              class="intro-tag"
              v-for="(item, index) in aiAgentDetails.tags.split(',')"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="line"></div>
          <div class="intro-details">
            <div class="intro-details-t">
              <div class="intro-details-logo">
                <img src="@/assets/avatar/UI_Img_Head_10.png" />
                <!-- <img src="@/assets/entiry/UI_Head_Img_01.png" /> -->
              </div>
              <div class="intro-details-name">
                <div class="intro-details-name-t">Solana</div>
                <div class="intro-details-name-text">
                  $ {{ aiAgentDetails.ticker }}
                </div>
              </div>
              <div class="intro-details-cap">
                <div class="intro-details-name-t">Market Cap</div>
                <div class="intro-details-name-text">$ 26624</div>
              </div>
              <div class="intro-details-pp">
                +{{ aiAgentDetails.progress }}%
              </div>
            </div>

            <div class="intro-details-text">
              {{ aiAgentDetails.desc }}
            </div>
            <div class="intro-details-links">
              <div
                class="intro-details-links-item"
                v-for="(item, index) in linkList"
                :key="index"
              >
                <div class="intro-details-links-item-icon">
                  <img :src="item.icon" />
                </div>
                <div class="intro-details-links-item-text">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-user" v-if="false">
        <div class="intro-user-img">
          <img src="@/assets/entiry/UI_Icon_03.png" />
        </div>
        <div class="intro-user-name">User Rating</div>
        <div class="intro-user-flower">18.7K +</div>
        <div class="intro-user-text1">Total Healing Sessions by AstralSage</div>
        <div class="intro-user-text2">
          95%
          <img
            src="@/assets/entiry/UI_Img_star_01.png"
            v-for="(item, index) in 5"
            :key="index"
          />
        </div>
      </div>

      <div class="d-intro-right">
        <div class="d-intro-right-top">
          <div class="d-intro-right-top-item" v-for="(item, index) in links">
            <div class="icon"></div>
            <span class="text">{{ item.name }}</span>
            <img class="back" src="@/assets/links/back.svg" />
          </div>
        </div>
        <div class="intro-user">
          <div class="intro-cover"></div>
          <div class="intro-cover-filter"></div>
          <div class="intro-cover-title">
            Created on Spirit Realm<br />
            by {{ aiAgentDetails.title }}
          </div>
          <div class="intro-cover-datas">
            <div class="data-item">
              <span>Story</span>
              <span>18,922 words</span>
            </div>
            <div class="data-item">
              <span>Sub Music</span>
              <span>221,262 mins</span>
            </div>
            <div class="data-item">
              <span>Mini games</span>
              <span>892,211 mins</span>
            </div>
          </div>
          <a href="https://sr.luminoss.ai" target="_blank">
            <div class="intro-cover-btn">Enter Spirit Realm</div>
          </a>
        </div>
      </div>
    </div>

    <div class="d-price">
      <div class="d-price-div">
        <div class="d-price-div-t">MarketCap</div>
        <div class="d-price-div-n">$ {{ numbers[0] }} M</div>
      </div>
      <div class="d-price-div">
        <div class="d-price-div-t">1 Day Change</div>
        <div class="d-price-div-n">+ {{ numbers[1] }} %</div>
      </div>
      <div class="d-price-div">
        <div class="d-price-div-t">Total Tranctions</div>
        <div class="d-price-div-n">{{ numbers[2] }} K</div>
      </div>
      <div class="d-price-div">
        <div class="d-price-div-t">Invoke APIs</div>
        <div class="d-price-div-n">{{ numbers[3] }} K</div>
      </div>
    </div>

    <div class="d-btn-container">
      <div class="d-btn">
        <div class="d-btn-item d-btn-item-active">SGe/SOL</div>
        <div class="d-btn-item">Chat</div>
      </div>
    </div>

    <div class="d-buy">
      <div class="chart" id="container"></div>
      <div class="buy-sell">
        <div class="buy-btns">
          <div
            class="buy-btn-item"
            @click="onClickFunc(0)"
            :class="curIndex == 0 ? 'buy-btn-item-active' : ''"
          >
            Buy
          </div>
          <div
            class="buy-btn-item"
            @click="onClickFunc(1)"
            :class="curIndex == 1 ? 'buy-btn-item-active2' : ''"
          >
            Sell
          </div>
        </div>
        <div class="buy-input">
          <div class="input-item">
            <input
              class="inputEx"
              v-model="amountValue"
              placeholder="Enter"
              type="text"
            />
          </div>
          <div class="icon">
            <img src="@/assets/entiry/UI_Icon_06.png" />
            SOL
          </div>
        </div>
        <div class="buy-balance">
          <div class="balance"><span>Balance:</span> 0.00 SOL</div>
          <div class="refresh">
            <img src="@/assets/entiry/UI_refresh_Icon_07.png" />
            Switch to SGe
          </div>
        </div>
        <div class="buy-priceBtn">
          <div class="numberBtn">
            <div class="item btnBase" @click="onClickInputAmount(30)">
              30 SOL
            </div>
            <div class="item btnBase" @click="onClickInputAmount(90)">
              90 SOL
            </div>
            <div class="item btnBase" @click="onClickInputAmount(270)">
              270 SOL
            </div>
          </div>
          <div class="resetBtn btnBase" @click="amountValue = 0">Reset</div>
        </div>
        <div
          class="buy-submit"
          :class="
            curIndex == 0 ? 'buy-btn-item-active' : 'buy-btn-item-active2'
          "
        >
          {{ curName }}
        </div>
        <div class="margin">
          <div class="margin-title">
            <span> Bonding Curve Progress </span>
            <span>63%</span>
          </div>
          <div class="margin-progress">
            <div class="progressBar"></div>
          </div>
          <div class="margin-text">
            Graduate this coin to raydium at $75,219 market cap.<br />
            There is 59.335 SOL in the bonding curve.
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="record-title">
        <div
          class="record-title-item"
          v-for="(item, index) in tableTitle"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div class="record-list">
        <div
          class="record-item"
          v-for="(item, index) in tableData"
          :key="index"
        >
          <div class="info itemBase">
            <img :src="item.head" />
            {{ item.name }}
          </div>
          <div
            class="type itemBase"
            :class="index % 2 == 0 ? 'redType' : 'greenType'"
          >
            {{ index % 2 == 0 ? "Sell" : "Buy" }}
          </div>
          <div class="sol itemBase">{{ item.SOL }}</div>
          <div class="sge itemBase">{{ item.SGe }}</div>
          <div class="date itemBase">{{ item.DateTime }}</div>
          <div class="tran itemBase">
            <img src="@/assets/entiry/UI_wrong_Icon_09.png" alt="" />
            {{ item.Transaction }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import sWallet from "./utils/sWallet";
import { createChart } from "lightweight-charts";
import linkIcon1 from "@/assets/entiry/UI_Btn_Icon_04.png";
import linkIcon2 from "@/assets/entiry/UI_Btn_Icon_03.png";
import linkIcon3 from "@/assets/entiry/UI_Btn_Icon_02.png";
import UI_Head_Img_06 from "@/assets/entiry/UI_Head_Img_06.png";
import { generateData, random, random2 } from "./utils";
import { useRoute } from "vue-router";
import { getAgentDetails } from "./api/apiFunc";
import { IAIAgentItem } from "./types/types";
import defaultHade from "@/assets/avatar/default-head.svg";
const route = useRoute();

const isLoading = ref(false);
const curName = ref("Buy");
const curIndex = ref(0);

const links = ref([
  { name: "Twitter", path: "" },
  { name: "Youtube", path: "" },
  { name: "Music", path: "" },
  { name: "Dreame", path: "" },
]);

const numbers = ref([
  random2(1, 2).toFixed(1),
  random2(1, 2).toFixed(2),
  random2(1, 2).toFixed(1),
  random2(1, 2).toFixed(1),
  random2(1, 2).toFixed(1),
]);
const toPay = async () => {
  isLoading.value = true;

  await sWallet.pay();
  isLoading.value = false;
};

const aiAgentDetails = ref<IAIAgentItem>({
  dayChange: "",
  decimals: 0,
  desc: "",
  hash: "",
  id: "",
  img: defaultHade,
  invokeApi: 0,
  marketCap: "",
  progress: "",
  remark: "",
  status: "",
  tags: "",
  ticker: "",
  title: " ",
  totalTransactions: 0,
  userId: "",
  user: {
    avatar: "",
    avatarIndex: "",
    id: "",
    nickname: "",
  },
});

const tagList = ref([
  { name: "Astrology", index: 0 },
  { name: "Dream Reader", index: 1 },
  { name: "AI  Agent", index: 2 },
]);

const linkList = ref([
  { name: "Star  Reading", index: 0, icon: linkIcon1 },
  { name: "Soul  Healing", index: 1, icon: linkIcon2 },
  { name: "Dream  Guide", index: 2, icon: linkIcon3 },
]);

const tableTitle = ref([
  "Account",
  "Type ",
  "SOL",
  "SGe",
  "Date",
  "Transaction",
]);

const tableData = ref([
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
  {
    i: 0,
    head: UI_Head_Img_06,
    name: "Tony",
    type: "Sell",
    SOL: "0.0004",
    SGe: "3.60m",
    DateTime: "Sep 16 5:06:05 pm",
    Transaction: "10wBQX...h2n4",
  },
]);

const aiAgentId = ref("");

const amountValue = ref(0);
const onClickInputAmount = (number) => {
  amountValue.value = number;
};

onMounted(() => {
  const chartOptions = {
    layout: {
      textColor: "#adb0b8",
      background: { type: "solid", color: "#2c2e30" },
    },
  };
  const chart = createChart(document.getElementById("container"), chartOptions);
  const areaSeries = chart.addAreaSeries({
    lineColor: "#2962FF",
    topColor: "#2962FF",
    bottomColor: "rgba(41, 98, 255, 0.28)",
  });
  // areaSeries.setData([
  //     { time: '2018-12-22', value: 32.51 },
  //     { time: '2018-12-23', value: 31.11 },
  //     { time: '2018-12-24', value: 27.02 },
  //     { time: '2018-12-25', value: 27.32 },
  //     { time: '2018-12-26', value: 25.17 },
  //     { time: '2018-12-27', value: 28.89 },
  //     { time: '2018-12-28', value: 25.46 },
  //     { time: '2018-12-29', value: 23.92 },
  //     { time: '2018-12-30', value: 22.68 },
  //     { time: '2018-12-31', value: 22.67 },
  // ]);

  let setData2 = [];

  const candlestickSeries = chart.addCandlestickSeries({
    // upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
    // wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  });

  let SeriesData = [];
  const data = generateData(2500, 20, 1000);

  for (let i = 1; i <= 27; i++) {
    SeriesData.push({
      time: "2024-12-" + (i < 10 ? "0" + i : i),
      open: random(40, 100),
      high: random(40, 100),
      low: random(40, 100),
      close: random(40, 100),
    });

    // setData2.push(
    //     { time: '2024-12-' + (i < 10 ? '0' + i : i), value: random(40, 100) },

    // )
  }
  // console.log(SeriesData)
  // console.log(setData2)
  chart.timeScale().fitContent();
  chart.timeScale().scrollToPosition(5, true);
  // series.setData(data.initialData);
  areaSeries.setData(setData2);
  // candlestickSeries.setData(SeriesData)
  candlestickSeries.setData(data.initialData);

  chart.timeScale().fitContent();
  const streamingDataProvider = getNextRealtimeUpdate(data.realtimeUpdates);

  const intervalID = setInterval(() => {
    const update = streamingDataProvider.next();
    if (update.done) {
      clearInterval(intervalID);
      return;
    }
    candlestickSeries.update(update.value);
  }, 1000);

  window.addEventListener("resize", () => {
    // chart.applyOptions({ height: 200 });
  });

  if (route.params && route.params.id) {
    const id = route.params.id;
    console.log(id);
    aiAgentId.value = id as string;

    getAgentDetails({
      id,
    }).then((res: any) => {
      console.log(res);
      if (res.code == 200 && res.data != null) {
        aiAgentDetails.value = {
          ...res.data,
        };
      }
    });
  }
});

function* getNextRealtimeUpdate(realtimeData) {
  for (const dataPoint of realtimeData) {
    yield dataPoint;
  }
  return null;
}

const onClickFunc = (i) => {
  curName.value = i == 0 ? "Buy" : "Sell";
  curIndex.value = i;
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.details-content {
  height: calc(100% - 68px - 76px);
  padding: 30px;
  overflow-y: auto;

  .d-topNav {
    display: flex;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #929292;

    * {
      font-family: "InstrumentSans-Medium";
    }

    .p {
      cursor: pointer;
    }

    .m {
      margin: 0 8px;
    }

    .c {
      cursor: pointer;

      color: #fff;
    }
  }

  .d-intro {
    display: flex;
    justify-content: space-between;
    width: 1680px;
    margin: 0 auto;
    margin-top: 30px;

    .d-intro-left {
      padding: 20px;
      border-radius: 16px;
      display: flex;
      flex: 1;
      // width: 930px;
      margin-right: 20px;
      box-sizing: border-box;
      background: #2d2e30;
    }

    .d-intro-right {
      .d-intro-right-top {
        width: 300px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .d-intro-right-top-item {
          width: 142px;
          height: 38px;
          border-radius: 10px;
          font-size: 14px;
          opacity: 1;
          display: flex;
          align-items: center;
          color: #ffffff;
          text-align: center;
          padding-left: 8px;
          box-sizing: border-box;
          line-height: 38px;
          background: #2d2e30;
          position: relative;
          margin-bottom: 14px;
          cursor: pointer;

          .icon {
            width: 20px;
            height: 20px;
            background-position: center center;
            background-size: cover;
          }
          .text {
            margin-left: 7px;
          }
          .back {
            position: absolute;
            right: 5px;
            top: 10px;
          }
        }

        .d-intro-right-top-item:nth-child(1) {
          .icon {
            background: url("@/assets/links/twitter.svg") no-repeat;
          }
          &:hover {
            .icon {
              background: url("@/assets/links/twitter1.svg") no-repeat;
            }
          }
        }
        .d-intro-right-top-item:nth-child(2) {
          .icon {
            background: url("@/assets/links/Youtube.svg") no-repeat;
          }
          &:hover {
            .icon {
              background: url("@/assets/links/Youtube1.svg") no-repeat;
            }
          }
        }
        .d-intro-right-top-item:nth-child(3) {
          .icon {
            background: url("@/assets/links/Music.svg") no-repeat;
          }
          &:hover {
            .icon {
              background: url("@/assets/links/Music1.svg") no-repeat;
            }
          }
        }
        .d-intro-right-top-item:nth-child(4) {
          .icon {
            background: url("@/assets/links/Dreame.svg") no-repeat;
          }
          &:hover {
            .icon {
              background: url("@/assets/links/Dreame1.svg") no-repeat;
            }
          }
        }
      }
    }

    .intro-img {
      width: 310px;
      height: 310px;
      background: #fff8ee;
      border-radius: 15px;
      // margin-right: 30px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }

    .intro-text {
      // margin: 0 15px;
      margin-left: 30px;
      //flex: 1;
      // width: 48%;
      display: flex;
      flex-direction: column;
      flex: 1;

      .intro-title {
        // padding-top: 16px;

        font-weight: 600;
        font-size: 32px;
        line-height: 39px;
        height: 39px;
        font-family: "InstrumentSans-SemiBold";
        color: #ffffff;
        margin-bottom: 9px;
      }

      .intro-tags {
        display: flex;
        height: 32px;

        .intro-tag {
          background: #444648;
          border-radius: 6px;
          font-weight: 500;
          font-size: 14px;
          line-height: 18px;
          padding: 4px 8px;
          color: #ffffff;

          font-family: "InstrumentSans-Medium";
          margin-right: 10px;
        }
      }
      .line {
        margin-top: 24px;
        margin-bottom: 24px;
        width: 100%;
        height: 1px;
        opacity: 1;
        border: 1px solid rgba(210, 210, 215, 0.2);
      }

      .intro-details {
        // margin-top: 34px;
        width: auto;
        // height: 320px;
        flex: 1;
        background: #2c2e30;
        border-radius: 15px;
        // padding: 30px 19px 0 27px;
        position: relative;

        .intro-details-t {
          display: flex;

          .intro-details-logo {
            width: 60px;
            height: 60px;

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }

          .intro-details-name {
            margin-left: 20px;
          }

          .intro-details-name,
          .intro-details-cap {
            width: 200px;

            .intro-details-name-t {
              font-weight: 500;
              font-size: 14px;
              color: #929292;
              line-height: 19px;
              margin-top: 6px;
              font-family: "InstrumentSans-Medium";
            }

            .intro-details-name-text {
              font-weight: bold;
              margin-top: 3px;
              font-size: 20px;
              font-family: "InstrumentSans-Bold";
              line-height: 26px;
              color: #ffffff;
            }
          }

          .intro-details-pp {
            width: 80px;
            height: 33px;
            background: #e5f7eb;
            border-radius: 40px;
            position: absolute;
            right: 0px;
            top: 4px;
            font-weight: 600;
            text-align: center;
            font-size: 16px;
            font-family: "InstrumentSans-SemiBold";
            color: #28c450;
            line-height: 36px;
          }
        }
      }

      .intro-details-text {
        width: 500px;
        // height: 71px;
        font-weight: 500;
        font-size: 14px;
        color: #898989;
        font-family: "InstrumentSans-Medium";
        margin-top: 18px;
      }

      .intro-details-links {
        // margin-top: 36px;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;

        .intro-details-links-item {
          line-height: 16px;
          font-weight: 500;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          background: #444648;
          border-radius: 4px;
          padding: 6px 8px;
          margin-right: 16px;

          .intro-details-links-item-icon {
            img {
              display: block;
            }
          }

          .intro-details-links-item-text {
            margin-left: 5px;
            font-family: "InstrumentSans-Medium";
          }
        }
      }
    }

    .intro-user {
      width: 300px;
      height: 247px;
      background: #2c2e30;
      border-radius: 15px;
      text-align: center;
      // margin-top: 150px;
      position: relative;

      * {
        font-family: "InstrumentSans-Medium";
      }

      .intro-cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 300px;
        height: 247px;
        background: url("@/assets/entiry/image (1).png") no-repeat;
        border-radius: 16px;

        z-index: 1;
      }

      .intro-cover-filter {
        width: 300px;
        backdrop-filter: blur(0.8999999761581421px);
        height: 247px;
        border-radius: 16px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        background: rgba(0, 0, 0, 0.7);
      }

      .intro-cover-title {
        position: relative;
        z-index: 3;
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        width: 242px;
        margin: 0 auto 0;
        padding-top: 20px;
      }

      .intro-cover-datas {
        width: 202px;
        margin: 30px auto;
        position: relative;
        z-index: 3;

        .data-item {
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          width: 202px;
          display: flex;
          color: #fff !important;
          line-height: 17px;
          margin-bottom: 9px;
          justify-content: space-between;
        }
      }

      .intro-cover-btn {
        position: relative;
        z-index: 3;
        width: 202px;
        height: 43px;
        border-radius: 22px;
        line-height: 43px;
        text-align: center;
        cursor: pointer;
        margin: 0 auto;
        background: linear-gradient(90deg, #f79644 3.68%, #f4691e 103.68%);
      }

      .intro-user-img {
        width: 90px;
        height: 90px;
        background: #444648;
        border-radius: 50%;
        margin: 24px auto 26px;

        img {
          border-radius: 50%;
          width: 90px;
          height: 90px;
        }
      }

      .intro-user-name {
        font-weight: 500;
        font-size: 17px;
        line-height: 18px;
        color: #929292;
        margin-bottom: 22px;
      }

      .intro-user-flower {
        line-height: 26px;
        font-weight: bold;
        font-size: 33px;
        margin-bottom: 27px;
        color: #ffffff;
      }

      .intro-user-text1 {
        line-height: 18px;
        font-weight: 500;
        font-size: 17px;
        margin-bottom: 27px;
        color: #929292;
      }

      .intro-user-text2 {
        line-height: 14px;
        font-weight: 500;
        font-size: 17px;
        color: #f79643;

        img {
          margin-right: 4px;
        }
      }
    }
  }

  .d-price {
    display: flex;
    // justify-content: space-around;
    height: 96px;
    width: 1680px;
    box-sizing: border-box;
    padding: 16px;
    margin: 25px auto;
    background: #2c2e30;
    border-radius: 12px;
    align-items: center;

    .d-price-div {
      text-align: center;
      position: relative;
      width: 351px;
      height: 64px;
      &::after {
        content: "";
        width: 1px;
        height: 24px;
        background: #d2d2d7;
        position: absolute;
        right: 0;
        top: 20px;
      }

      .d-price-div-t {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #929292;
        font-family: "InstrumentSans-Medium";
      }

      .d-price-div-n {
        margin-top: 4px;
        font-weight: bold;
        font-size: 28px;
        line-height: 39px;
        font-family: "InstrumentSans-Bold";
        color: #ffffff;
      }
    }

    .d-price-div:last-child {
      &::after {
        opacity: 0;
      }
    }
  }

  .d-btn-container {
    width: 1680px;
    margin: 0 auto;
  }
  .d-btn {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    background: #2d2e30;
    width: 300px;
    border-radius: 80px;
    height: 50px;
    padding: 4px 2px;
    .d-btn-item {
      font-family: "InstrumentSans-Medium ";
      border-radius: 23px;
      height: 42px;
      margin-right: 4px;
      width: 145px;
      color: #929292;
      line-height: 42px;
      text-align: center;
      background: #2c2e30;
      cursor: pointer;
    }

    .d-btn-item-active {
      background: linear-gradient(270deg, #f56b20 0%, #f79644 100%);
      color: #ffffff;
    }
  }

  .d-buy {
    display: flex;
    justify-content: space-between;
    width: 1680px;
    margin: 18px auto 0;

    .chart {
      width: auto;
      height: 514px;
      background: #2c2e30;
      border-radius: 15px;
      overflow: hidden;
      flex: 1;
      margin-right: 20px;
    }

    .buy-sell {
      width: 440px;
      padding: 24px;
      box-sizing: border-box;
      background: #2c2e30;
      border-radius: 15px;

      .buy-btns {
        width: 392px;
        height: 50px;
        background: #1d1f21;
        border-radius: 30px;
        margin: 0 auto;
        display: flex;
        padding: 4px;
        box-sizing: border-box;
        // margin-top: 37px;

        .buy-btn-item {
          width: 188px;
          height: 42px;
          border-radius: 80px;
          font-weight: 600;
          line-height: 42px;
          font-family: "InstrumentSans-Medium";
          text-align: center;
          font-size: 16px;
          cursor: pointer;
          color: #929292;
        }
      }

      .buy-input {
        margin-top: 24px;
        width: 392px;
        height: 64px;
        background: #1d1f21;
        border-radius: 12px;
        display: flex;

        .input-item {
          width: 280px;
          height: 64px;

          .inputEx {
            font-family: "InstrumentSans-Medium";
            padding-left: 30px;
            outline: none;
            background: none;
            border: none;
            width: inherit;
            height: inherit;
            font-size: 20px;
            font-weight: 500;
            color: #ffffff;
          }
        }

        .icon {
          width: 120px;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
          justify-content: center;
          font-family: "InstrumentSans-Medium";

          img {
            margin-right: 8px;
          }
        }
      }

      .buy-balance {
        display: flex;
        justify-content: space-between;
        margin-top: 17px;
        font-family: "InstrumentSans-Regular";

        .balance {
          font-weight: 400;
          font-size: 12px;
          color: #929292;

          span {
            color: #ffffff;
          }
        }

        .refresh {
          display: flex;
          align-items: center;

          img {
            margin-right: 6px;
          }

          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }
      }

      .buy-priceBtn {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        margin-top: 26px;

        .btnBase {
          padding: 6px 12px;
          background: #444648;
          border-radius: 20px;
          line-height: 16px;
          cursor: pointer;
        }

        .numberBtn {
          display: flex;
          cursor: pointer;
          font-family: "InstrumentSans-SemiBold";

          .item {
            margin-right: 10px;
          }
        }

        .resetBtn {
        }
      }

      .buy-submit {
        width: 392px;
        height: 56px;
        font-family: "InstrumentSans-SemiBold";
        border-radius: 30px;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        line-height: 56px;
        margin: 24px auto 34px;
        cursor: pointer;
      }

      .buy-btn-item-active {
        color: #ffffff !important;
        background: #39a955;
      }

      .buy-btn-item-active2 {
        color: #ffffff !important;
        background: #c94c4c;
      }

      .margin {
        .margin-title {
          font-family: "InstrumentSans-Medium";
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }

        .margin-progress {
          width: 392px;
          height: 8px;
          background: #1d1f21;
          border-radius: 8px;
          margin-top: 30px;
          margin-bottom: 34px;

          .progressBar {
            height: 8px;
            width: 63%;
            background-color: #fff;
            border-radius: 4px;
          }
        }

        .margin-text {
          font-weight: 400;
          font-family: "InstrumentSans-Regular ";
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }

  .record {
    background: #2c2e30;
    border-radius: 15px;
    padding: 0 15px;
    width: 1680px;
    margin: 18px auto;

    .record-title {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px rgba(210, 210, 215, 0.4) solid;
      font-family: "InstrumentSans-Medium";

      .record-title-item {
        width: 200px;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
        line-height: 70px;
      }

      .record-title-item:nth-child(5) {
        text-align: center;
      }

      .record-title-item:nth-child(6) {
        text-align: center;
      }
    }

    .record-list {
      .record-item {
        display: flex;
        justify-content: space-between;
        line-height: 70px;
        border-bottom: 1px rgba(210, 210, 215, 0.4) solid;

        &:last-child {
          border-bottom: none !important;
        }
        .itemBase {
          width: 200px;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          font-family: "InstrumentSans-Regular";
        }

        .info {
          display: flex;
          align-items: center;

          img {
            width: 24px;
            height: 24px;
            margin-right: 6px;
          }
        }

        .date,
        .tran {
          text-align: center;
        }

        .redType {
          color: #c94c4c;
        }

        .greenType {
          color: #44b661;
        }

        .tran {
          color: #39adff;
        }
      }
    }
  }
}
</style>
