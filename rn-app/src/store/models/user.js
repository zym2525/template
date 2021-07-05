// import { all, take, takeEvery, takeLatest, put, call, delay } from '@zero-d/dva-core/saga'
import { all, take, takeEvery, takeLatest, put, call, delay } from 'redux-saga/effects'
import { login } from '@/services/userService'
import * as userActions from '@/actions/user';
import { loading } from '@/sagas/help'

export default {
    namespace: 'user',
    state: {
        user: null
    },
    reducers: {
        loginSuccess(state, action) {
            return {
                ...state,
                user: action.payload
            }
        }
    },
    effects: {
        login: [function* ({ payload: { params }, meta: { resolved, rejected } }, { put }) {
            try {
                const result = yield loading(login, params);
                const userInfo = result.result
                yield put({ type: 'loginSuccess', payload: userInfo })
                console.log('result: ', result);
                let value = {
                    username: params.userName,
                    password: params.password,
                    access_token: userInfo.accessToken,
                }
                userActions.updateConfig(value);
                resolved && resolved(result)
                return result;
            } catch (e) {
                yield put({ type: 'common/loading', payload: false })
                rejected && rejected()
            }
        }, { type: 'takeLatest' }]
    },
    // subscriptions: {
    //     handleLogin({ history, dispatch }){

    //     }
    // },
}