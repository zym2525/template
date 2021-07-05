import dataApi from '@/constants/api';
import { post, get } from './request';

export function login(params, resolve, reject) {
    return post(dataApi.user.login, params, resolve, reject);
}

