

import { getTaskList, getUserInfo, loginFunc } from "../api/apiFunc";
import setting from "../config/config";
import * as dataType from "../types/types"
import localStorageUtil from "../utils/localStorage";
import emitter from "../utils/mittEx";
import sWallet from "../utils/sWallet";
import walletEx from "../utils/wallet";
import { EEvent } from "./event";

class UserEx {

    signature: string = "";
    userInfo: dataType.IUserInfo2 = null;
    accessToken: string = "";


    todaySign: boolean = false;
    quests: dataType.ITaskItem[] = [];
    signs: dataType.ISignItem[] = [];


    setUserInfo(data: dataType.IUserInfo2) {
        this.userInfo = {
            ...data
        }
    }
    async getUInfo() {
        let myInfo: any = await getUserInfo();
        if (myInfo != null && myInfo.code == 200 && myInfo.data != null) {
            console.log(myInfo.data)
            const myInfoData = myInfo.data.user;
            this.userInfo = {
                ...myInfoData
            }
            localStorageUtil.setItem("userInfo", this.userInfo)
            emitter.emit(EEvent.getUserInfo)
        }
    }

    async initUser() {

        // let updateTime = localStorageUtil.getItem("infoUpdateTime")

        // if (updateTime == null) {
        //     localStorageUtil.removeItem("userInfo");
        //     return false;
        // }
        // let nowTime = Date.now()
        // if (nowTime - parseInt(updateTime) > 4 * 60 * 60 * 1000) {
        //     localStorageUtil.removeItem("userInfo");
        //     localStorageUtil.removeItem("infoUpdateTime");
        //     return false;
        // }

        let userInfo = localStorageUtil.getItem("userInfo")

        if (userInfo == null || userInfo == "") {
            await this.getUInfo();
        } else {
            this.userInfo = JSON.parse(userInfo);
            emitter.emit(EEvent.getUserInfo)
        }
        // let signature = localStorageUtil.getItem("signature")

        // if (signature == null || signature == "") {
        //     return false;
        // } else {
        //     this.signature = signature;
        // }
        return true;
    }

    chinaType: string = "solana";
    async login(account?, signature?) {
        // if (account == null || account == "") {
        //     account = sWallet.myAddress;
        // }
        // if (account == null || account == "") {
        //     return;
        // }
        // if (!signature) {
        //     signature = walletEx.signature || localStorageUtil.getItem('signature');
        // }

        const accountSrt = sWallet.myAddress;
        const signatureSrt = sWallet.signature;
        console.log(accountSrt)
        console.log(signatureSrt)
        if (accountSrt == null || accountSrt == "" || signatureSrt == null || signatureSrt == "") {
            return;
        }
        let loginRes: any = await loginFunc({
            walletAddress: accountSrt,
            chainType: "solana",
            walletSignature: signatureSrt,
            fullMessage: "Login Request"
        })

        if (loginRes != null && loginRes.code == 200 && loginRes.data != null) {
            console.log(loginRes)

            let loginResData = loginRes.data;
            this.accessToken = loginResData.token;
            userEx.setUserInfo(loginResData.user)
            console.log(loginResData.user)
            localStorageUtil.setItem("userInfo", loginResData.user)
            localStorageUtil.setItem("accessToken", this.accessToken)
            emitter.emit(EEvent.getUserInfo)

        }
    }

    async getTaskList() {
        let taskList: any = await getTaskList()
        if (taskList != null && taskList.code == 200 && taskList.data != null) {
            console.log(taskList)

            let tsakData = taskList.data;
            if (tsakData.signs && tsakData.signs.length) {
                this.signs = [...tsakData.signs]
            }
            if (tsakData.quests && tsakData.quests.length) {
                this.quests = [...tsakData.quests]
            }
            this.todaySign = tsakData.todaySign;

            emitter.emit(EEvent.updateTaskList)
        } else {

        }
    }



    async loginOut() {


        this.signature = "";
        this.accessToken = "";
        this.userInfo = null;
        this.todaySign = false;
        this.quests = [];
        this.signs = [];
        localStorageUtil.clear();
        sWallet.loginOut()
        emitter.emit(EEvent.userLoginOut)
    }


}

const userEx = new UserEx()
export default userEx;