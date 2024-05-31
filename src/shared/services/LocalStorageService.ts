export class LocalStorageService {
    static setItem<T>(key: string, value: T): void {
        try {
            const stringValue = JSON.stringify(value);
            localStorage.setItem(key, stringValue);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    static getItem<T>(key: string): T | null {
        try {
            const stringValue = localStorage.getItem(key);
            return stringValue ? (JSON.parse(stringValue) as T) : null;
        } catch (error) {
            console.error('Error retrieving from localStorage', error);
            return null;
        }
    }

    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage', error);
        }
    }

    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage', error);
        }
    }
}
