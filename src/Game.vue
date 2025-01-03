<template>
  <div class="game_game__xLvXD22">
    <div class="game_game__xLvXD">
      <div class="game_f1__cuMDo game_gamePart__PigM0">
        <div class="game_banners__uNAU2">
          <swiper
            :loop="true"
            :autoplay="{
              delay: 4400,
              disableOnInteraction: false,
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            @activeIndexChange="activeIndexChangeFunc"
            :modules="[Autoplay, EffectFade]"
            :allowTouchMove="false"
            effect="fade"
            class="mySwiper swiper"
          >
            <swiper-slide
              class="swiper-slide"
              :class="item.id"
              v-for="(item, index) in bannerArray"
              :key="index + 'sss'"
            >
              <div>
                <div
                  class="BannerItem_bannerItem__zaAX9"
                  :style="{
                    backgroundImage: 'url(' + item.img + ')',
                  }"
                >
                  <img
                    src="@/assets/images/bannerMask.png"
                    class="bannerMask"
                  />

                  <div class="BannerItem_linearBg__fwY9N">
                    <div class="BannerItem_logo__XU5YY">
                      <img src="@/assets/icons/good-img.png" />
                    </div>
                    <div class="BannerItem_title__8E9T3">{{ item.title }}</div>
                    <div class="BannerItem_btnBox__sCN3f">
                      <div
                        class="BannerItem_btnGetStarted__jczJ6"
                        @click="goodBuy"
                      >
                        <div
                          class="Button_button__fo9Wi Button_default__ulIdO"
                          style="padding: 12px 16px"
                        >
                          <div class="BannerItem_oCardBtn__A1_lt">
                            <span>Get Started</span
                            ><img
                              src="@/assets/images/game/icon-go.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="BannerItem_description__uBIim">
                      {{ item.subTitle }}
                    </div>
                    <div class="BannerItem_rate__qPeXF">{{ item.desc }}</div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="game_smallBannerBox__8A0rb">
            <div
              @click="clickSwiper(item)"
              v-for="(item, index) in bannerArray"
              :key="index"
              class="SmallBannerItem_smallBannerItem___8kE_"
              :class="
                index == bannerCurrentIndex
                  ? 'SmallBannerItem_smallBannerItem___8kE_active'
                  : ''
              "
              :style="{
                backgroundImage: 'url(' + item.img + ')',
              }"
            >
              <div
                class="SmallBannerItem_opacityBg__lWqnY"
                :class="
                  index == bannerCurrentIndex
                    ? 'SmallBannerItem_opacityAnimation__srOYx'
                    : ''
                "
              ></div>
            </div>
          </div>
        </div>
      </div>

      <footerComp></footerComp>
    </div>

    <loadingComp v-show="showLoading"></loadingComp>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { ref, onMounted } from "vue";
import footerComp from "./components/footer.vue";
import loadingComp from "./components/loading.vue";
import loginComp from "./components/login.vue";

import banner1 from "@/assets/icons/banner1.jpg";
import banner2 from "@/assets/icons/banner2.jpg";
import banner3 from "@/assets/icons/banner3.jpg";
import banner4 from "@/assets/icons/banner4.jpg";
import banner5 from "@/assets/icons/banner5.jpg";
import walletEx from "./utils/wallet";
import { buyGoods } from "./api/apiFunc";
import setting from "./config/config";
import userEx from "./data/user";
import emitter from "./utils/mittEx";
import { EEvent } from "./data/event";

const myInfoObj = ref<dataType.IUserInfo>(null);

const showLoading = ref(false);
const bannerCurrentIndex = ref(-1);
const bannerArray = ref([
  {
    img: banner1,
    i: 0,
    title: "Spirit Realm: Passcard",
    icon: "",
    id: "banner1",
    subTitle: "Your Gateway to a Fantasy Journey",
    desc: "With a Passcard, explore the infinite possibilities of Spirit Realm. More than just a pass, it's your key to entering a world of fantasy.",
  },
  {
    img: banner2,
    i: 1,
    title: "Spirit Realm: AI Astrologer",
    id: "banner2",
    icon: "",
    subTitle: "Your Exclusive AI Astrologer",
    desc: "In this mystical cluster of oriental architecture, the AI Astrologer will interpret the language of stars, reveal your destiny's path, and initiate a spiritual dialogue uniquely yours.",
  },
  {
    img: banner3,
    id: "banner3",
    i: 2,
    title: "Spirit Realm: AI Fantasy World",
    icon: "",
    subTitle: "A Magical Chapter Painted by AI",
    desc: "In this mysterious realm created by AI, sunlight filters through lush canopies while butterflies dance in the air. Every scene is a unique piece of art, every step forward a new adventure.",
  },
  {
    img: banner4,
    id: "banner4",
    i: 3,
    title: "Spirit Realm: Meditation Music Space",
    icon: "",
    subTitle: "A Healing Space Woven by AI Music",
    desc: "In this fascinating realm, experience the healing music created by AI. Every note is tailored for your soul, letting your thoughts drift freely in this magical atmosphere.",
  },
  {
    img: banner5,
    id: "banner5",
    i: 4,
    title: "Spirit Realm: Fortune Game",
    icon: "",
    subTitle: "Gather Blessings, Embrace Fortune",
    desc: "In every corner of Spirit Realm, unique fairy cards and mysterious treasures await. Each card carries beautiful wishes, each treasure brings you special blessings. Let's collect these shining fortune trinkets together.",
  },
]);

const updateUserInfo = () => {
  console.log(userEx.userInfo);
  myInfoObj.value = { ...userEx.userInfo };
};

const userLoginOutFunc = () => {
  myInfoObj.value = null;
};

onMounted(() => {
  emitter.on(EEvent.getUserInfo, updateUserInfo);
  emitter.on(EEvent.userLoginOut, userLoginOutFunc);
});
const goodBuy = async () => {
  showLoading.value = true;
  try {
    let hashRes = await walletEx.buyGood();
    if (!hashRes || hashRes.transactionHash == "") {
      return;
    }

    let buyRes = await buyGoods({
      transactionHash: hashRes.transactionHash,
      tokenAddress: setting.SBT_ADDRESS,
    });
    if (buyRes) {
      alert("Buy Success");
    }
  } catch (err) {
    showLoading.value = false;
  }
  showLoading.value = false;
};

const renderBullet = (index) => {};
const onSwiper = (swiper) => {
  // swiper.activeIndex = 0;
  _swiper.value = swiper;

  swiper.on("slideChange", (v) => {
    _swiper.value = v;
  });
  bannerCurrentIndex.value = 0;
  autoTimer();
};

const _swiper = ref(null);
const activeIndexChangeFunc = (v) => {};

const activeIndex = ref(0);
const onSlideChange = (v) => {
  return;
  const _swiper = v;
  let index = -1;
  for (let i = 0; i < _swiper.slides.length; i++) {
    let childItem = _swiper.slides[i];

    if (childItem.className.indexOf("swiper-slide-visible") > -1) {
      index = i;
      break;
    }
  }
  console.log(index);
};

const timer = ref(null);
const autoTimer = () => {
  timer.value = setInterval(() => {
    if (bannerCurrentIndex.value + 1 >= bannerArray.value.length) {
      bannerCurrentIndex.value = 0;
    } else {
      bannerCurrentIndex.value++;
    }
  }, 4700);
};

const clickSwiper = (item) => {
  if (item.i == bannerCurrentIndex.value) {
    return;
  }
  bannerCurrentIndex.value = item.i;
  clearInterval(timer.value);

  for (let i = 0; i < _swiper.value.slides.length; i++) {
    let childItem = _swiper.value.slides[i];
    if (childItem.className.indexOf(item.id) > -1) {
      let ii = _swiper.value.slides.indexOf(childItem);
      _swiper.value.slideTo(ii);
    }
  }
  autoTimer();
};

const autoplayPlay = ref(true);
</script>

<style>
@import url("swiper/css");
@import url("swiper/css/effect-fade");
</style>
<style lang="sass" scoped></style>
