import Web3 from 'web3';
import setting from '../config/config';
import localStorageUtil from './localStorage';

import myBaseJSON from "../config/SignTask"
import CardMarket from "../config/CardMarket"
import { postSign } from '../api/apiFunc';
import emitter from "../utils/mittEx";
import { EEvent } from '../data/event';

const LOGIN_KEY = "login";

class WalletEx {



    myAddress: string = "";
    signature: string = ""

    detectWallets() {
        const wallets = [];
        if (typeof window.solana != undefined) {
            wallets.push({ name: 'TrustWallet', provider: window.solana });
        }

        if (typeof window.solflare != undefined) {
            wallets.push({ name: 'SolflareWallet', provider: window.solflare });
        }
        return wallets;
    };

    walletIsNull() {
        console.log(window.solflare)
        if (typeof window.solflare === "undefined") {
            return false;
        }
        return true;
    }



    connectWallet() {

    }

    destoryWallet() {
        this.baseWeb3 = null;
    }

    async enableWallet() {

        await window.ethereum.enable(); // 
        await window.ethereum.request({ method: 'eth_requestAccounts' });

    }




    async loginWallet() {
        console.log(!this.walletIsNull())
        if (!this.walletIsNull()) {
            emitter.emit(EEvent.notWallet)
            return;
        }
        try {
            await this.getMyAccounts();
            if (this.myAddress == "" || this.myAddress == null) {
                await this.enableWallet()
            }
            await this.getMyAccounts()
            await this.addBaseNet()
            await this.getAddressSign()
        } catch (err) {
            emitter.emit(EEvent.userCencalWallet)
        }
    }

    async getMyAccounts() {
        if (typeof window.ethereum === "undefined") {
            return ""
        } else {
            try {


                const accounts = await this.baseWeb3.eth.getAccounts();




                if (accounts.length == 0) {
                    let tempAddress = localStorageUtil.getItem("walletAddress")
                    if (tempAddress == "" || tempAddress == null) {
                        localStorageUtil.clear();
                    }
                    let signature = localStorageUtil.getItem("signature")
                    if (signature == "" || signature == null) {
                        localStorageUtil.clear();
                        return;
                    }
                    if (!this.checkSign(signature)) {
                        localStorageUtil.clear();
                        return;
                    }
                    this.myAddress = tempAddress;
                } else {
                    this.myAddress = accounts[0];
                    localStorageUtil.setItem("walletAddress", this.myAddress)

                }
                emitter.emit(EEvent.getWalletAddress)

            } catch (err) {
                console.error(err)
                if (err.code == -32603) {
                    console.warn(' ')
                }
            }
        }



    }

    initEvent() {
        if (typeof window.ethereum === "undefined") {

        } else {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {

                }
            });
            window.ethereum.on("chainChanged", (res: any) => {
                console.log("chainChanged", res);


            });
        }

    }

    async requestAccounts() {
        try {
            const accounts = await this.baseWeb3.provider.request({
                method: 'eth_requestAccounts',
            });
            return accounts
        } catch (err) {
            return []
        }
    }

    xs
    async checkChain() {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log("Current chain ID:", parseInt(chainId, 16));
        return (parseInt(chainId, 16) == setting.chainNum)
    }

    async getAddressSign() {
        let account = this.myAddress

        console.log("account==", account)
        if (account == null || account == "") {
            return;
        }
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [this.baseWeb3.utils.utf8ToHex(LOGIN_KEY), account]
        });
        console.log("Signature:", signature);
        this.signature = signature;
        localStorageUtil.setItem("signature", signature)
        return signature;
    }



    async getBaseContract() {

        let account = this.myAddress

        const contract = new this.baseWeb3.eth.Contract(myBaseJSON.abi, setting.baseAddress, {
            from: account,
        });


        const result3 = await contract.methods.checkIn().send({ from: account })

        return result3;

    }



    async buyGood() {
        const account = this.myAddress;

        const contract = new this.baseWeb3.eth.Contract(CardMarket.abi, setting.SBT_Contract, {
            from: account,
        });
        const result3 = await contract.methods.buy(setting.SBT_ADDRESS).send({ from: account })
        console.log(result3)
        if (result3 && result3.transactionHash) {

        }
        return result3;
    }


    async userSign() {
        let account = this.myAddress

        const contract = new this.baseWeb3.eth.Contract(myBaseJSON.abi, setting.baseAddress, {
            from: account,
        });
        const result3 = await contract.methods.checkIn().send({ from: account })

        return result3;
    }

    get baseWeb3() {
        if (this._baseWeb3 == null) {
            var web3Provider;
            if (window.ethereum) {
                web3Provider = window.ethereum;
                try {

                } catch (error) {
                }
            } else if (window['web3']) {

                web3Provider = window['web3'].currentProvider;
            } else {
            }
            this._baseWeb3 = new Web3(web3Provider);

        }
        return this._baseWeb3;
    }

    set baseWeb3(v: Web3) {
        this._baseWeb3 = v;
    }
    private _baseWeb3: Web3 = null;


    async checkSign(signature) {
        if (signature == "" || signature == null) {
            return
        }
        let account = this.myAddress
        const recoveredAddress = this.baseWeb3.eth.accounts.recover(this.baseWeb3.utils.utf8ToHex(LOGIN_KEY), signature);
        return recoveredAddress.toLowerCase() == account.toLowerCase()
    }

    async addBaseNet() {

        if (!this.checkChain()) {
            return;
        }
        const baseSepoliaChainInfo = {
            ...setting.baseChainInfo, //
        };
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [baseSepoliaChainInfo]
            });
            console.log("Base Sepolia network added to MetaMask.");
        } catch (addError) {
            console.error("Error adding Base Sepolia network:", addError);
        }
    }

    loginOut() {
        this.myAddress = "";
        this.signature = "";
    }


    init() {

    }
}

const walletEx = new WalletEx();

export default walletEx;



