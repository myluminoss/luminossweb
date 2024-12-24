import { AxiosRequestConfig, AxiosResponse } from "axios"
import { get, post } from "./request"




export const loginFunc = (params: any): Promise<AxiosResponse> => {
    return post("/api/auth/login", {
        ...params
    })
}

export const getUserInfo = (): Promise<AxiosResponse> => {
    return get("/api/user/info")
}

export const getTaskList = (): Promise<AxiosResponse> => {
    return get("/api/task/list")
}

export const getRankList = (): Promise<AxiosResponse> => {
    return get("/api/user/ranking/list")
}

export const getInviteList = (): Promise<AxiosResponse> => {
    return get("/api/user/invite/list")
}


export const postSign = (params: any): Promise<AxiosResponse> => {
    return post("/api/task/checkIn", {
        ...params
    })
}


export const postTask = (params: any): Promise<AxiosResponse> => {
    return post("/api/task/complete", {
        ...params
    })
}

export const getOrderList = (params: any): Promise<AxiosResponse> => {
    return get("/api/user/order/list", {
        params: {
            ...params
        }
    })
}

export const getPointList = (params: any): Promise<AxiosResponse> => {
    return get("/api/user/point/list", {
        params: {
            ...params
        }
    })
}

export const getRewardList = (params: any): Promise<AxiosResponse> => {
    return get("/api/user/reward/list", {
        params: {
            ...params
        }
    })
}

export const buyGoods = (params: any): Promise<AxiosResponse> => {
    return post("/api/trade/item/buy", {

        ...params

    })
}