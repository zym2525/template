import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import sync from './storeSync';

export function mergeItem(key, value) {
    if (key && value) {
        return AsyncStorage.mergeItem(key, JSON.stringify(value));
    }
}

export function getItem(key) {
    return AsyncStorage.getItem(key)
        .then(function (value) {
            return JSON.parse(value)
        });
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