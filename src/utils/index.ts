import moment from "moment"

export const encryStr = (str: string) => {
    if (str == '') {
        return;
    }
    const startIndex = 4;
    const endIndex = 12;
    const prefix = str.substring(0, 5);
    const suffix = str.substring(str.length - 5);
    const encryptedString = prefix + "****" + suffix;
    return encryptedString
}


export const sleep = (ms: number) => {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}

export const strToTimestamp = (str: string) => {
    return moment(str).format("yyyy-MM-DD HH:mm:ss")
}


export const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
