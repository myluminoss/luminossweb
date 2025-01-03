<template>
  <div class="discover-content">
    <!-- <a href="/Discover/buy">ssssss</a> -->

    <div class="discover-list">
      <div
        class="discover-item"
        @click="toDetails(item)"
        v-for="(item, index) in aiAgentList"
        :key="index"
      >
        <div class="cover-box">
          <div
            class="cover"
            :style="{
              background: 'url(' + item.img + ')',
            }"
          >
            <div class="coverImg"></div>

            <div class="tagList">
              <div
                class="tagItem"
                v-for="(tag, i) in item.tags.split(',')"
                :key="i"
              >
                {{ tag }}
              </div>
            </div>
          </div>
          <img class="mask" src="@/assets/entiry/UI_Card_Bg_00.png" />
        </div>
        <div class="info">
          <div class="title">{{ item.title }}</div>

          <div class="head">
            <div class="headImg">
              <img :src="getAvatarPath(item.user.avatarIndex)" />
            </div>
            <div class="headInfo">
              <div class="name">{{ item.ticker }}</div>
              <div class="dosc">Sonala</div>
            </div>
          </div>
          <div class="price">
            <div class="left">
              <div class="left-t">Market Cap</div>
              <div class="left-f">{{ item.marketCap }} SOL</div>
            </div>
            <div class="radio">
              {{ item.marketCap }}
              <img class="img" src="@/assets/entiry/UI_Icon_02.png" />
            </div>
          </div>
          <div class="progress">
            <div
              class="progressBar"
              :style="{
                width: item.progress + '%',
              }"
            ></div>
          </div>
          <div class="cound">
            <div class="l">Bonding Curve</div>
            <!-- <div class="l">{{ item.desc }}</div> -->
            <div class="r">{{ item.progress }} %</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import sWallet from "./utils/sWallet";
import { getAgentList } from "./api/apiFunc";
import { IAIAgentItem } from "./types/types";
import { getAvatarByIndex } from "./utils";
const router = useRouter();

const myAvatar = ref("");

const getAvatarPath = (avatarIndex) => {
  return getAvatarByIndex(avatarIndex);
};

onMounted(() => {
  getAgentList({}).then((res: any) => {
    console.log(res);
    if (res.code == 200 && res.rows != null) {
      for (let i = 0; i < res.rows.length; i++) {
        aiAgentList.value = [...res.rows];
      }
    }
  });
});

const isLoading = ref(false);
const curName = ref("Buy");
const curIndex = ref(0);

const toPay = async () => {
  isLoading.value = true;

  await sWallet.pay();
  isLoading.value = false;
};

const toDetails = (item: IAIAgentItem) => {
  router.push("/Details/" + item.id);
};

const onClickFunc = (i) => {
  curName.value = i == 0 ? "Buy" : "Sell";
  curIndex.value = i;
  isLoading.value = false;
};

const aiAgentList = ref<IAIAgentItem[]>([]);

const itemArray = ref([
  {
    bg: "",
    tags: ["Badge", "Celestial", "Oracle"],
    title: "Soul Guide",
    head: "",
    name: "$  SGe",
    dosc: "Solana",
    price: {
      d: "Market  Cap",
      p: "0.018 SOL",
      n: "+310.11%",
    },
    progress: 54,
    fl: "Bonding  Curve",
    fr: "46%",
  },
]);
</script>

<style lang="scss" scoped>
.discover-content {
  height: calc(100% - 68px - 76px);
  padding: 15px;
  overflow-y: auto;

  .discover-list {
    margin: 0 auto;
    width: 1680px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .discover-item {
    margin: 18px 20px;
    width: 290px;
    height: 420px;
    background: #2c2e30;
    border-radius: 15px;
    position: relative;
    overflow: hidden;

    .cover-box {
      position: absolute;
      width: 100%;
      .mask {
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    .cover {
      height: 255px;
      width: 100%;
      background: url("@/assets/entiry/UI_Card_Bg_10.png") no-repeat;
      background-size: cover !important;
      padding-top: 9px;
      box-sizing: border-box;

      .tagList {
        margin-left: 20px;
        display: flex;

        .tagItem {
          font-family: "InstrumentSans-Regular";
          background: #2c2e30;
          border-radius: 11px;
          color: #fff;
          opacity: 0.7;
          font-size: 10px;
          line-height: 22px;
          padding: 0 10px;
          margin-right: 3px;
        }
      }
    }

    .info {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 165px;
      padding: 0 20px;
      padding-top: 12px;
      box-sizing: border-box;

      .title {
        position: absolute;
        left: 20px;
        top: -27px;
        font-weight: 600;
        font-size: 25px;
        color: #ffffff;
        font-family: "InstrumentSans-SemiBold";
      }

      .head {
        display: flex;

        .headImg {
          width: 38px;
          height: 38px;
          border-radius: 50%;

          img {
            width: inherit;
            height: inherit;
            border-radius: 50%;
          }
        }

        .headInfo {
          margin-left: 8px;

          .name {
            font-weight: 600;
            font-size: 17px;
            line-height: 18px;
            font-family: "InstrumentSans-SemiBold";
            color: #ffffff;
          }

          .dosc {
            margin-top: 4px;
            font-weight: 500;
            font-size: 13px;
            line-height: 14px;
            font-family: "InstrumentSans-Medium";
            color: #929292;
          }
        }
      }

      .progress {
        width: 250px;
        background: #1d1f21;
        border-radius: 3px;
        height: 6px;
        margin-top: 19px;

        .progressBar {
          width: 50%;
          height: 6px;
          background: #ffffff;
          border-radius: 3px;
        }
      }

      .cound {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 13px;
        line-height: 14px;

        .l {
          font-weight: 400;
          font-family: "InstrumentSans-Regular";
          font-size: 13px;
          color: #929292;
        }

        .r {
          font-weight: 500;
          font-size: 13px;
          font-family: "InstrumentSans-Medium";
          color: #ffffff;
        }
      }

      .price {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          .left-t {
            font-weight: 400;
            font-size: 13px;
            line-height: 13px;
            color: #929292;
            font-family: "InstrumentSans-Regular";
          }

          .left-f {
            margin-top: 4px;
            font-family: "InstrumentSans-SemiBold";
            font-weight: 600;
            line-height: 17px;
            font-size: 17px;
            color: #ffffff;
          }
        }

        .radio {
          font-weight: 500;
          font-size: 15px;
          color: #39a855;
          line-height: 15px;
          font-family: "InstrumentSans-Medium";

          .img {
          }
        }
      }
    }
  }
}
</style>
