<template>
  <div class="Footer_foot__Dhg3y">
    <div
      v-if="false"
      class="Footer_flex__rCHCd Footer_ane__pCzyC Footer_wrap__ALyOV Footer_jus__4WTNr"
    ></div>
    <div class="Footer_fBottom__Rnh5j">
      <div class="Footer_internet__ZTV2_">© 2024 | Luminoss AI</div>
      <div class="Footer_social__BXpEU">
        <div class="Footer_w420__a1tJH">
          <ul
            class="Footer_flex__rCHCd Footer_jus__4WTNr Footer_footerUl__KSOmH"
          >
            <li @click="toPage('Discover')">
              <p>Discover</p>
            </li>
            <li @click="toPage('Reward')">
              <p>Reward</p>
            </li>
            <li @click="toPage('Account')">
              <p>Account</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toPage = (name) => {
  router.push("/" + name);
};
</script>

<style lang="scss" scoped>
.Footer_foot__Dhg3y {
  border-top: 1px #444648 solid;
}
</style>
