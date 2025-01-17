
export interface IRankItem { url: string; address: string; banlance: string; index: number }

export interface IWalletItem {
    title: string,
    // icon: string,
    iconComp: any
    index: number
}

export interface ITaskItem {
    id: number
    type: number
    name: string
    intro: string
    earn: number
    status: number
    link: string
}

export interface ISignItem {
    id: number
    name: string
    earn: number
    day: number
    status: number
}

export interface IUserInfo {
    id: number
    nickname: string
    avatar: string
    walletAddress: string
    chainType: string
    balance: number
    earn: number
    inviteCode: string
    currentRanking: number
    inviteEarn: number
    inviteTotalCount: number
    inviteActivateCount: number
}

export interface IUserInfo2 {

    avatar: string;

    avatarIndex: string;

    balance: number;

    chainType: string;

    currentRanking: number;

    earn: number;

    id: string;

    inviteActivateCount: number;

    inviteCode: string;

    inviteEarn: number;

    inviteTotalCount: number;

    nickname: string;

    walletAddress: string;
}



export interface IAIAgentItem {

    dayChange: null | string;

    decimals: number | null;

    desc: string;

    hash: null | string;

    id: string;

    img: string;

    invokeApi: number | null;

    marketCap: null | string;

    progress: null | string;

    remark: string;

    status: string;

    tags: null | string;

    ticker: string;

    title: string;

    totalTransactions: number | null;

    userId: string;
    user: IAIAgenUser;
}

export interface IAIAgenUser {

    avatar: string;
    avatarIndex: string;

    id: string;

    nickname: string;
}
