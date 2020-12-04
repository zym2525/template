import Cookies from 'js-cookie'

const StorageKey = {
    TokenKey: '_Token',
    XSRFTokenKey: 'XSRF-TOKEN',
    UserInfoKey: '_UserInfo '
}

export function getToken() {
    return localStorage.getItem(StorageKey.TokenKey)
}

export function setToken(token) {
    return localStorage.setItem(StorageKey.TokenKey, token)
}

export function setXSRFToken(token) {
    return Cookies.set(StorageKey.XSRFTokenKey, token)
}

export function getXSRFToken() {
    return Cookies.get(StorageKey.XSRFTokenKey,) || ''
}

export function removeXSRFToken() {
    return Cookies.remove(StorageKey.XSRFTokenKey)
}

export function removeToken() {
    return localStorage.removeItem(StorageKey.TokenKey)
}

export function getUserInfo() {
    return localStorage.getItem(StorageKey.UserInfoKey)
}

export function setUserInfo(userInfo) {
    return localStorage.setItem(StorageKey.UserInfoKey, userInfo)
}

export function removeUserInfo() {
    return localStorage.removeItem(StorageKey.UserInfoKey)
}
