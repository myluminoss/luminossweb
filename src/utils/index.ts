import moment from "moment"

export const encryStr = (str: string) => {
    if (str == '' || str == null) {
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

export const random2 = (min: number, max: number) => {
    return (Math.random() * (max - min + 1)) + min;
}



import header1 from "@/assets/avatar/UI_Img_Head_1.png"
import header2 from "@/assets/avatar/UI_Img_Head_2.png"
import header3 from "@/assets/avatar/UI_Img_Head_3.png"
import header4 from "@/assets/avatar/UI_Img_Head_4.png"
import header5 from "@/assets/avatar/UI_Img_Head_5.png"
import header6 from "@/assets/avatar/UI_Img_Head_6.png"
import header7 from "@/assets/avatar/UI_Img_Head_7.png"
import header8 from "@/assets/avatar/UI_Img_Head_8.png"
import header9 from "@/assets/avatar/UI_Img_Head_9.png"
import header10 from "@/assets/avatar/UI_Img_Head_10.png"
import header11 from "@/assets/avatar/UI_Img_Head_11.png"
import header12 from "@/assets/avatar/UI_Img_Head_12.png"
import header13 from "@/assets/avatar/UI_Img_Head_13.png"
import header14 from "@/assets/avatar/UI_Img_Head_14.png"
import header15 from "@/assets/avatar/UI_Img_Head_15.png"

const avatarArr = [
    header1, header2, header3, header4, header5,
    header6, header7, header8, header9, header10,
    header11, header12, header13, header14, header15
];
export const getAvatarByIndex = (i) => {
    if (i > -1 && i < avatarArr.length) {
        return avatarArr[i - 1];
    }
}

let randomFactor = 25 + Math.random() * 25;
const samplePoint = i =>
    i *
    (0.5 +
        Math.sin(i / 1) * 0.2 +
        Math.sin(i / 2) * 0.4 +
        Math.sin(i / randomFactor) * 0.8 +
        Math.sin(i / 50) * 0.5) +
    200 +
    i * 2;

export const generateData = (
    numberOfCandles = 500,
    updatesPerCandle = 5,
    startAt = 100
) => {
    const createCandle = (val, time) => ({
        time,
        open: val,
        high: val,
        low: val,
        close: val,
    });

    const updateCandle = (candle, val) => ({
        time: candle.time,
        close: val,
        open: candle.open,
        low: Math.min(candle.low, val),
        high: Math.max(candle.high, val),
    });

    randomFactor = 25 + Math.random() * 25;
    const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
    const numberOfPoints = numberOfCandles * updatesPerCandle;
    const initialData = [];
    const realtimeUpdates = [];
    let lastCandle;
    let previousValue = samplePoint(-1);
    for (let i = 0; i < numberOfPoints; ++i) {
        if (i % updatesPerCandle === 0) {
            date.setUTCDate(date.getUTCDate() + 1);
        }
        const time = date.getTime() / 1000;
        let value = samplePoint(i);
        const diff = (value - previousValue) * Math.random();
        value = previousValue + diff;
        previousValue = value;
        if (i % updatesPerCandle === 0) {
            const candle = createCandle(value, time);
            lastCandle = candle;
            if (i >= startAt) {
                realtimeUpdates.push(candle);
            }
        } else {
            const newCandle = updateCandle(lastCandle, value);
            lastCandle = newCandle;
            if (i >= startAt) {
                realtimeUpdates.push(newCandle);
            } else if ((i + 1) % updatesPerCandle === 0) {
                initialData.push(newCandle);
            }
        }
    }

    return {
        initialData,
        realtimeUpdates,
    };
}
