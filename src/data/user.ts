

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
    userInfo: dataType.IUserInfo = null;
    accessToken: string = "";


    todaySign: boolean = false;
    quests: dataType.ITaskItem[] = [];
    signs: dataType.ISignItem[] = [];
    async getUserInfo() {
        let myInfo: any = await getUserInfo();
        if (myInfo != null) {
            console.log(myInfo)
            this.userInfo = {
                ...myInfo
            }

            localStorageUtil.setItem("userInfo", this.userInfo)
            localStorageUtil.setItem("infoUpdateTime", Date.now())
            emitter.emit(EEvent.getUserInfo)
        }
    }

    async initUser() {

        let updateTime = localStorageUtil.getItem("infoUpdateTime")

        if (updateTime == null) {
            localStorageUtil.removeItem("userInfo");
            return false;
        }
        let nowTime = Date.now()
        if (nowTime - parseInt(updateTime) > 4 * 60 * 60 * 1000) {
            localStorageUtil.removeItem("userInfo");
            localStorageUtil.removeItem("infoUpdateTime");
            return false;
        }

        let userInfo = localStorageUtil.getItem("userInfo")

        if (userInfo == null || userInfo == "") {
            return false;
        } else {
            this.userInfo = JSON.parse(userInfo);

        }

        emitter.emit(EEvent.getUserInfo)
        return true;
    }

    chinaType: string = "";
    async login(account?, signature?) {
        if (account == null || account == "") {
            account = sWallet.myAddress;
        }
        if (account == null || account == "") {
            return;
        }

        let loginRes: any = await loginFunc({
            walletAddress: account,
            chainType: this.chinaType == "" ? setting.walletType : this.chinaType,
            signature: "signature",
        })

        if (loginRes != null) {
            console.log(loginRes)
            this.accessToken = loginRes.accessToken;
            localStorageUtil.setItem("accessToken", loginRes.accessToken)
        }
    }

    async getTaskList() {
        let taskList: any = await getTaskList()
        if (taskList != null) {
            console.log(taskList)
            if (taskList.signs && taskList.signs.length) {
                this.signs = [...taskList.signs]
            }
            if (taskList.quests && taskList.quests.length) {
                this.quests = [...taskList.quests]
            }
            this.todaySign = taskList.todaySign;

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
        walletEx.loginOut()
        emitter.emit(EEvent.userLoginOut)
    }


}

const userEx = new UserEx()
export default userEx;