<template>


    <div class="cards-content">
        <div class="card-list">
            <div class="card-item" @click="toDetails(index)" v-for="(item, index) in imgs">
                <img class="card-img" :src="item" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import img07 from "@/assets/entiry/07.png"
import img08 from "@/assets/entiry/08.png"
import img09 from "@/assets/entiry/09.png"
import img10 from "@/assets/entiry/10.png"
import img11 from "@/assets/entiry/11.png"
import img12 from "@/assets/entiry/12.png"
import img13 from "@/assets/entiry/13.png"
import img14 from "@/assets/entiry/14.png"
import img15 from "@/assets/entiry/15.png"
import img16 from "@/assets/entiry/16.png"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
const router = useRouter();

const imgs = ref([
    img07, img08, img09, img10, img11,
    img12, img13, img14, img15, img16
])


const toDetails = (i) => {
    router.push("/Details")
}

</script>


<style lang="scss" scoped>
.cards-content {
    height: calc(100% - 68px - 76px);
    padding: 15px;
    overflow-y: auto;


    .card-list {
        margin: 0 auto;
        width: 1440px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .card-item {
            margin: 15px 13px;

            .card-img {
                width: 290 *0.9px;
                height: 420 *0.9px;
            }


        }

    }
}
</style>