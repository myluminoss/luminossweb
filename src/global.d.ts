
export { };

declare global {
    interface Window {
        ethereum: any
        tronWeb: any
        solana: any
        solflare: any
        tokenpocket: any
    }
}