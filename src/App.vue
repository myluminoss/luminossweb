<script setup lang="ts">
import { onMounted } from "vue";
import leftNav from "./LeftNav.vue"
import topNav from "./TopNav.vue"
import pageFooter from "./Footer.vue"
import sWallet from './utils/sWallet';
import userEx from "./data/user";


onMounted(() => {
    // sWallet.getMyAccounts()

    // sWallet.initAccount();
    // console.log(sWallet.isInit)
    // if (!sWallet.isInit) {
    //     userEx.login();
    // }
})
</script>

<template>
    <div class="root">
        <leftNav></leftNav>
        <div class="rightContent">
            <topNav></topNav>
            <router-view></router-view>
            <pageFooter></pageFooter>
        </div>
    </div>
</template>


<style>
@import url(./styles/6946c4a235b26d23.css);
@import url(./styles/6d4714f10df77352.css);
@import url(./styles/6fed64959a01670f.css);
@import url(./styles/33a8a2b20993833f.css);

@import url(./styles/64926da413eda511.css);
@import url(./styles/b6b4c79639cbad82.css);
@import url(./styles/2b03a1ffab2e4866.css);
@import url(./styles/cb9205d61d484a5a.css);
@import url(./styles/fc47993e903df61d.css);
</style>
<style lang="scss">
@use "./styles/app.scss";

@use "./styles/media.scss";
</style>
