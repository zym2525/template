import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import sync from './storeSync';

export function mergeItem(key: string, value: any) {
    if (key && value) {
        return AsyncStorage.mergeItem(key, JSON.stringify(value));
    }
}

export async function getItem<T = any>(key: string): Promise<T> {
    const value = await AsyncStorage.getItem(key);
    return value == null ? null : JSON.parse(value);
}

export const removeItem = AsyncStorage.removeItem;

var storage = new Storage({
    storageBackend: AsyncStorage,
    // 数据过期时间 10分钟
    defaultExpires: 1000 * 60 * 10,
    enableCache: true,
    sync: sync

})

export default storage;