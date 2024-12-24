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

    async connectToWallet() {
        if (!window.solflare || !window.solflare.isSolflare) {
            throw new Error('Solflare Wallet is not installed.');
        }

        await window.solflare.connect();
        console.log('Wallet connected:', window.solflare.publicKey.toBase58());

        return window.solflare;
    }

    async pay() {


        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const wallet = await this.connectToWallet();

        const recipientPublicKey = new PublicKey('8Ar2GBXupWRKkFH3nrAs47jqoGXgfMCtQfsL5F8nruwZ');

        const lamportsToSend = 0.1 * LAMPORTS_PER_SOL;

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



        return;
        if (connection) {
            this.destoryWallet();
            await this.initWallet();
            await this.loginWallet();
            const payerPublicKey = await this.walletObject.publicKey; // 
            const sender = Keypair.generate();

            const accountInfo = await connection.getAccountInfo(sender.publicKey);
            const recipientPublicKey = new PublicKey('3LexCLo8zXGBZXz69abr3CgJs4nGzps6w2BYjNWEvmFo'); // 
            const lamportsToSend = 0.1 * LAMPORTS_PER_SOL;; // 
            const senderAccountInfo = await connection.getAccountInfo(sender.publicKey);
            if (!senderAccountInfo) {
                console.error('Sender account is not initialized or not found.');
                return;
            }
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: sender.publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: lamportsToSend
                })
            );

            const signature = await connection.sendTransaction(transaction, [sender]);

            console.log('Transaction Signature:', signature);

            const confirmation = await connection.confirmTransaction(signature, 'confirmed');
            console.log('Transaction Confirmation:', confirmation);
        } else {
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
            console.log(this.walletObject)
            if (this.walletObject == null) {
                let tempAddress = localStorageUtil.getItem("walletAddress")
                if (tempAddress == "" || tempAddress == null) {
                    localStorageUtil.clear();
                }
            } else {
                console.log(this.walletObject)
                const address = this.walletObject.publicKey.toString()
                this.myAddress = address;
                localStorageUtil.setItem("walletAddress", this.myAddress)
            }
            console.log("this.myAddress", this.myAddress)


        } catch (err) {
            if (err.code == -32603) {
                console.warn('one more')
            }
        }


    }

    loginOut() {
        this.myAddress = "";
    }

}

const sWallet = new SWalletEx();
export default sWallet;