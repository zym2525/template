import { login, getAntiForgeryToken } from '@/services/userService'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo, setXSRFToken, getXSRFToken, removeXSRFToken } from '@/utils/storage'
import { resetRouter } from '@/router'
import {
    SET_XSRF_TOKEN
} from '@/constants/mutation-types'

const getDefaultState = () => {
    return {
        token: getToken(),
        userInfo: JSON.parse(getUserInfo()) || {},
        XSRFToken: getXSRFToken()
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_INFO: (state, info) => {
        state.userInfo = info
    },
    [SET_XSRF_TOKEN](state, token) {
        state.XSRFToken = token
    },
}

const actions = {
    // user login
    async login({ commit }, params) {
        const { userNameOrEmailAddress, password } = params;


        return new Promise((resolve, reject) =>
            getAntiForgeryToken().then(async (fAntiForgeryTokenresult) => {
                if (fAntiForgeryTokenresult.success) {
                    setXSRFToken(fAntiForgeryTokenresult.result)
                }
                const response = await login({ userNameOrEmailAddress: userNameOrEmailAddress.trim(), password: password, 'rememberClient': true })
                const { result: userInfo } = response;
                commit('SET_TOKEN', userInfo.accessToken);
                commit('SET_USER_INFO', userInfo);
                setToken(userInfo.accessToken);
                setUserInfo(JSON.stringify(userInfo));
                const antiForgeryTokenresult = await getAntiForgeryToken();

                if (antiForgeryTokenresult.success) {
                    commit(SET_XSRF_TOKEN, antiForgeryTokenresult.result);
                    setXSRFToken(antiForgeryTokenresult.result)
                }
                commit('selectIndustrialPark/RESER_ALL_SELECT', null, { root: true })
                resolve()
            }).catch(reject)
        )
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            removeToken() // must remove  token  first
            removeXSRFToken()
            removeUserInfo()
            resetRouter()
            commit('RESET_STATE')

            commit('tagsView/DEL_ALL_VISITED_VIEWS', null, { root: true })
            commit('tagsView/DEL_ALL_CACHED_VIEWS', null, { root: true })
            resolve()
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            removeXSRFToken()
            commit('RESET_STATE')
            resolve()
        })
    },
}

const getters = {
    user: state => state.userInfo,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

