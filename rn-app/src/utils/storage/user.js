import { getItem, mergeItem, removeItem } from '@/services/storage';

const StorageKey = {
    USER_TOKEN: '__USER_TOKEN__',
}

export const getConfig = () => {
    return getItem(StorageKey.USER_TOKEN);
}

export const updateUserConfig = (value) => {
    return mergeItem(StorageKey.USER_TOKEN, value);
}

export const removeUserToken = () => {
    return removeItem(StorageKey.USER_TOKEN);
}

export function getUserToken() {
    return getItem(StorageKey.USER_TOKEN);
}