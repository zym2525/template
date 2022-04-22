import { getItem, mergeItem, removeItem } from '@/services/storage';

const StorageKey = {
    USER_TOKEN: '__USER_TOKEN__',
}

export type StorageUserToken = {
    username: string
    password: string
    access_token: string
}

export const getConfig = () => {
    return getItem<StorageUserToken>(StorageKey.USER_TOKEN);
}

export const updateUserConfig = (value: StorageUserToken) => {
    return mergeItem(StorageKey.USER_TOKEN, value);
}

export const removeUserToken = () => {
    return removeItem(StorageKey.USER_TOKEN);
}

export function getUserToken() {
    return getItem<StorageUserToken>(StorageKey.USER_TOKEN);
}