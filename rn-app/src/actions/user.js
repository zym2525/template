import {
    WATCH_LOGIN,
    LOGIN_OUT,
    APP_UNMOUNT,
} from '@/constants/actionTypes';
import { getItem, mergeItem, removeItem } from '@/services/storage';

export const login = (params, resolved, rejected) => ({
    type: 'user/login',
    payload: { params },
    meta: { resolved, rejected }
})

export const loginOut = () => ({
    type: LOGIN_OUT,
})

export const getConfig = () => {
    return getItem('USER_TOKEN');
}

export const updateConfig = (value) => {
    return mergeItem('USER_TOKEN', value);
}

export const logOut = () => {
    return removeItem('USER_TOKEN');
}

export function getToken() {
    return getItem('USER_TOKEN');
}

export const appUnmount = () => ({
    type: APP_UNMOUNT,
})