import { AxiosRequestConfig, AxiosResponse } from "axios"
import { deleteRequest, get, post } from "./request"




export const loginFunc = (params: any): Promise<AxiosResponse> => {
    return post("/user/loginByWallet", {
        ...params
    })
}
export const getUserInfo = (): Promise<AxiosResponse> => {
    return get("/getInfo")
}
export const getTaskList = (): Promise<AxiosResponse> => {
    return get("/task/taskInfo")
}

export const getRankList = (): Promise<AxiosResponse> => {
    return get("/api/user/ranking/list")
}

export const getInviteList = (): Promise<AxiosResponse> => {
    return get("/api/user/invite/list")
}

export const postSign = (params: any): Promise<AxiosResponse> => {
    return post("/checkInLog/checkIn", {
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


export const getEntityList = (params?: any): Promise<AxiosResponse> => {
    return get("/aiAgent/getMyAgentList", {
        params: {
            ...params
        }
    })
}
export const delEntityItem = (params: any): Promise<AxiosResponse> => {

    return deleteRequest(`aiAgent/delAgent/${params}`);
}

export const createAgentItem = (params: any): Promise<AxiosResponse> => {
    return post("aiAgent/createAgent", {
        ...params
    })
}

export const addChatHistoryItem = (params: any): Promise<AxiosResponse> => {
    return post("aiMessage/addMessage", {
        ...params
    })
}

export const getChatHistory = (params: any): Promise<AxiosResponse> => {
    return get("aiMessage/getMessageList", {
        params: {
            ...params
        }
    })
}

export const getAgentList = (params: any): Promise<AxiosResponse> => {
    return get("aiAgent/getAgentList", {
        params: {
            ...params
        }
    })
}
export const getAgentDetails = (params: any): Promise<AxiosResponse> => {
    return get("aiAgent/getAgentDetails/" + params.id)
}


export const delChatHistory = (params: any): Promise<AxiosResponse> => {
    return deleteRequest("aiMessage/delMessage/" + params.id)
}