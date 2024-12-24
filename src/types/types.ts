
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