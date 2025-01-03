import * as web3 from "@solana/web3.js";
import emitter from "./mittEx";
import { EEvent } from "../data/event";
import localStorageUtil from "./localStorage";
import userEx from "../data/user";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    Keypair
} from '@solana/web3.js';

class SWalletEx {
    myAddress: string = "";

    signature: string = ""

    walletObject: any = null;


    destoryWallet() {
        this.walletObject = null;
    }

    walletIsNull() {
        if (!window.solflare || !window.solflare.isSolflare) {
            return false;
        }
        return true;
    }

    initWallet(title?) {
        if (title == "" || title == null) {
            this.walletObject = window.solflare;
            return;
        }
        if (title == "SolflareWallet") {
            this.walletObject = window.solflare;
        } else {
            this.walletObject = window.solana;
        }
    }

    isInit = false;
    initAccount() {
        const signature = localStorageUtil.getItem("signature")
        const walletAddress = localStorageUtil.getItem("walletAddress")
        if (signature == "" || signature == null || walletAddress == "" || walletAddress == null) {
            this.isInit = false;
            console.log("not signature and walletAddress")
            localStorageUtil.clear();
        } else {
            this.isInit = true;
            this.signature = signature;
            this.myAddress = walletAddress;
        }

    }

    solflareObj = null;

    async connectToWallet() {
        if (!window.solflare || !window.solflare.isSolflare) {
            throw new Error('Solflare Wallet is not installed.');
        }

        // try {
        await window.solflare.connect();
        console.log('Wallet connected:', window.solflare.publicKey.toBase58());
        this.myAddress = window.solflare.publicKey.toBase58();
        localStorageUtil.setItem("walletAddress", this.myAddress)


        return window.solflare;
        // } catch (err) {
        //     console.error(err);
        // }
    }


    async loginEx() {
        if (this.isInit) {
            return true;
        }
        const signature = localStorageUtil.getItem("signature")
        const walletAddress = localStorageUtil.getItem("walletAddress")

        try {
            this.solflareObj = await this.connectToWallet();
        } catch (err) {
            console.error(err)
            return false;
        }

        try {
            await this.getSignedMessage()
        } catch (err) {
            console.error(err)
            return false;
        }
        this.isInit = true;
        emitter.emit(EEvent.getWalletAddress)

        return true;
    }


    // 获取签名字符串
    async getSignedMessage() {
        if (this.solflareObj == null) {
            return;
        }

        const LOGIN_KEY = "Login Request";



        const encodedMessage = new TextEncoder().encode(LOGIN_KEY)
        const signedMessage = await this.solflareObj.signMessage(encodedMessage, "utf8");
        this.signature = signedMessage.signature.toString('hex');

        console.log('signedMessage', signedMessage)
        localStorageUtil.setItem("signature", this.signature)




        return this.signature;

    }
    async pay() {

        let loginRes = await this.loginEx();
        if (loginRes) {
            const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
            let wallet = this.solflareObj;
            console.log(this.solflareObj)

            if (wallet == null) {
                try {
                    wallet = this.solflareObj = await this.connectToWallet();
                } catch (err) {
                    console.error(err)

                    return false;
                }
            }

            // console.log(this.solflareObj)

            const recipientPublicKey = new PublicKey('8Ar2GBXupWRKkFH3nrAs47jqoGXgfMCtQfsL5F8nruwZ');

            const lamportsToSend = 0.01 * LAMPORTS_PER_SOL;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: lamportsToSend,
                })
            );

            const { blockhash } = await connection.getRecentBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = wallet.publicKey;

            try {
                const signedTransaction = await wallet.signTransaction(transaction); // 
                const signature = await connection.sendRawTransaction(signedTransaction.serialize());
                console.log('Transaction Signature:', signature);

                const confirmation = await connection.confirmTransaction(signature, 'confirmed');
                console.log('Transaction Confirmation:', confirmation);
                return true;
            } catch (error) {
                console.error('Transaction failed:', error);
                return false;
            }


        } else {
            return false;
        }


    }

    async loginWallet() {
        console.log(!this.walletIsNull())
        if (!this.walletIsNull()) {
            emitter.emit(EEvent.notWallet)
            return;
        }
        console.log('==============')
        try {
            await this.getMyAccounts();
            if (this.myAddress == "" || this.myAddress == null) {
                await this.connectToWallet()
            }

            await this.getMyAccounts()
            await this.getSignedMessage()
        } catch (err) {
            emitter.emit(EEvent.userCencalWallet)
        }
    }
    async enableWallet() {

        try {
            let connectRes = await this.walletObject.connect(); // 

            if (connectRes == false) {
                emitter.emit(EEvent.userCencalWallet)
            }
        } catch (err) {
            console.error(err)
            if (err.code == 4001) {
                emitter.emit(EEvent.userCencalWallet)

            }
        }
    }





    async getMyAccounts() {

        try {
            // console.log(this.walletObject)
            // if (this.walletObject == null) {

            // } else {
            //     console.log(this.walletObject)
            //     const address = this.walletObject.publicKey.toString()
            //     this.myAddress = address;
            //     localStorageUtil.setItem("walletAddress", this.myAddress)
            // }
            let tempAddress = localStorageUtil.getItem("walletAddress")
            if (tempAddress == "" || tempAddress == null) {
                localStorageUtil.clear();

                await this.connectToWallet()
            }
            console.log("this.myAddress", this.myAddress)


        } catch (err) {
            if (err.code == -32603) {
                console.warn('one more')
            }
        }


    }

    loginOut() {
        console.log('loginOut')
        this.myAddress = "";
        this.signature = "";
        this.walletObject = null;
        this.isInit = false;
    }

}

const sWallet = new SWalletEx();
export default sWallet;