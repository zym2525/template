import request, { post, get } from './request'
import dataApi from './api'

export function login(data) {
    return post(dataApi.user.authenticate, data)
}

export function getAntiForgeryToken() {
    return get(dataApi.user.antiForgeryGetToken)
}