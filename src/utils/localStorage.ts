class LocalStorageUtil {
    private prefix: string = '';

    private _getPrefixedKey(key: string): string {
        return this.prefix + key;
    }

    setItem(key: string, value: any): void {
        try {
            const prefixedKey = this._getPrefixedKey(key);
            localStorage.setItem(prefixedKey, typeof value == "string" ? value : JSON.stringify(value));
        } catch (error) {
            console.error('Error setting item in localStorage:', error);
        }
    }

    getItem(key: string): any | null {
        try {
            const prefixedKey = this._getPrefixedKey(key);
            const item = localStorage.getItem(prefixedKey);
            return item;
        } catch (error) {
            console.error('Error getting item from localStorage:', error);
            return null;
        }
    }

    removeItem(key: string): void {
        try {
            const prefixedKey = this._getPrefixedKey(key);
            localStorage.removeItem(prefixedKey);
        } catch (error) {
            console.error('Error removing item from localStorage:', error);
        }
    }

    clear(): void {
        try {
            const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix));
            keys.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}

const localStorageUtil = new LocalStorageUtil();

export default localStorageUtil;