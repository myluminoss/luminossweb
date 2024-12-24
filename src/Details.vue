<template>
    <div class="discover-content">
        <div class="list-img">
            <img class="item-img img01" src="@/assets/entiry/01.png" />
            <img class="item-img img02" src="@/assets/entiry/02.png" />
            <img class="item-img img03" src="@/assets/entiry/03.png" />

            <div class="item2">
                <img class="item-img img04" src="@/assets/entiry/04.png" />
                <div class="border">
                    <img class="item-img img05" src="@/assets/entiry/05.png" />
                    <div class="input">
                        <input class="inputEle" placeholder="Enter the number of Tokens" type="text" />
                    </div>
                    <div class="btns">
                        <div class="btn-item   normal" :class="curIndex == 0 ? 'btn-item-active2' : ''"
                            @click="onClickFunc(0)">Buy</div>
                        <div class="btn-item " :class="curIndex == 1 ? 'btn-item-active' : ''" @click="onClickFunc(1)">
                            Sell
                        </div>
                    </div>

                    <div class="btn1" @click="toPay" :class="curIndex == 1 ? 'btn-item-active' : 'btn-item-active2'">
                        {{
                            curName }}
                        <img v-show="isLoading" class="loading" src="@/assets/entiry/whire-Loading.png" />
                    </div>
                </div>
            </div>
            <img class="img06" src="@/assets/entiry/06.png" />
        </div>
    </div>

</template>


<script setup lang="ts">
import { ref } from 'vue';
import sWallet from './utils/sWallet';


const isLoading = ref(false);
const curName = ref("Buy");
const curIndex = ref(0);

const toPay = async () => {
    isLoading.value = true;

    await sWallet.pay();
    isLoading.value = false;

}

const onClickFunc = (i) => {
    curName.value = i == 0 ? "Buy" : "Sell";
    curIndex.value = i;
    isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.discover-content {
    height: calc(100% - 68px - 76px);
    padding: 15px;
    overflow-y: auto;

    .list-img {
        margin: 0 auto;
        width: 1440px;

        .item-img {
            display: block;
            margin: 15px 0;
        }

        .loading {
            width: 30px;
            height: 30px;
            animation: rotate 3s linear infinite;
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

        .img01 {
            width: 1661*0.8px;
            height: 517 *0.8px;
        }

        .img02 {
            width: 1661*0.8px;
            height: 145 *0.8px;
        }

        .img03 {
            width: 318*0.8px;
            height: 46 *0.8px;
        }

        .img04 {
            width: 1010*0.8px;
            height: 770 *0.8px;
        }

        .img05 {
            width: 626* 0.8px;
            height: 770 * 0.8px;
        }

        .img06 {
            width: 1661* 0.8px;
            height: 1050 * 0.8px;
        }

        .item2 {
            display: flex;
            justify-content: space-between;
            width: 1661* 0.8px;

            .border {
                position: relative;
                border-radius: 15px;
                width: 500px;

                .input {
                    position: absolute;
                    z-index: 111;
                    height: 50px;
                    left: 29px;
                    top: 129px;

                    .inputEle {
                        line-height: 50px;
                        background-color: #1d1f21;
                        border: none;
                        outline: none;
                        font-size: 18px;
                        color: #fff !important;

                        *:focus {
                            outline: none;
                        }
                    }
                }

                .item-img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }

                font-size: 22px;

                .btns {
                    background: #1d1f21;
                    height: 50px;
                    border-radius: 35px;
                    position: absolute;
                    z-index: 2;
                    display: flex;
                    width: inherit;
                    left: 50%;
                    width: 476px;
                    top: 10%;
                    transform: translate(-50%, -50%);
                    margin: 0 auto;

                    .btn-item {
                        width: 50%;
                        cursor: pointer;
                        text-align: center;
                        border-radius: 35px;

                        line-height: 50px;
                    }

                }

                .btn-item-active {
                    background-color: #c94c4c !important;
                    color: #fff !important;

                }

                .btn-item-active2 {
                    background-color: #39a855 !important;
                    color: #fff !important;
                }

                .btn1 {
                    border-radius: 25px;
                    width: inherit;
                    background: #1d1f21;
                    position: absolute;
                    line-height: 50px;
                    cursor: pointer;
                    left: 50%;
                    top: 55%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    font-family: "InstrumentSans-Medium";
                    height: 50px;
                    width: 476px;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .loading {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}
</style>
