<template>

    <div class="slider sliderOpen">
        <div class="menu">
            <div class="menu-header">
                <div>
                    <img class="menuImg" src="@/assets/entiry/UI_Btn_Icon_05_2.png" />
                </div>
                <div class="right-menu">
                    <img class="serach" src="@/assets/entiry/UI_Btn_Icon_14.png" />
                    <div class="width40"></div>
                    <img class="edit" src="@/assets/entiry/UI_Btn_Icon_15.png" />
                </div>
            </div>
            <div class="menu-list">
                <div class="menu-item" v-for="(item, index) in 6" :key="index">
                    <div class="title">September</div>
                    <div class="subtitle">Game Company Name Ideas</div>
                    <div class="subtitle">Cartoon Candy Translation</div>
                </div>
            </div>

            <div class="openPlus">
                <img class="icon" src="@/assets/entiry/UI_Btn_Icon_16.png" />
                <p>Renewal Plus</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';



</script>

<style lang="scss" scoped>
.slider {
    width: 50px;
    background: #18191B;
    height: 100%;

    .menu {
        padding-top: 14px;
        margin: 0 auto;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .menuImg {
        //  width: 24px;
        cursor: pointer;

        // height: 22px;
    }
}

.sliderOpen {
    width: 290px;
    display: flex;
    flex-direction: column;

    * {
        font-family: "InstrumentSans-Regular";
    }

    .menu-header {
        width: inherit;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 25px;
        height: 50px;

        .right-menu {
            display: flex;

            .serach {
                //  width: 22px;
                // height: 22px;
                cursor: pointer;
            }

            .width40 {
                width: 40px;
            }

            .edit {
                cursor: pointer;

                // width: 20px;
                // height: 20px;
            }
        }
    }

    .openPlus {
        width: 290px;
        height: 60px;
        background: #18191B;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 400;
        font-size: 15px;
        color: #E1E1E1;
        line-height: 60px;

        .icon {
            margin-left: 35px;
        }

        P {
            margin-left: 19px;
        }
    }

    .menu-list {
        padding: 20px 25px 0;
        flex-grow: 1;



        .menu-item {
            color: #fff;
            line-height: 40px;
            margin-bottom: 20px;
            font-weight: 400;

            .title {
                font-size: 16px;
            }

            .subtitle {
                font-size: 16px;
            }
        }
    }
}
</style>