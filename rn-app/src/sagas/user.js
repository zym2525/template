import { put, call, all, fork, takeLatest, take, cancel, delay, cancelled } from 'redux-saga/effects'
import { loginSaga, login } from '@/actions/user'
import { endLoading } from '@/actions/common'
import { loading, load, customCall, _curry, pending, } from './help'
import * as userService from '@/services/userService'
import { updateUserConfig } from '@/utils/storage'

function* watchLogin() {
    yield takeLatest(loginSaga.type, function* ({ payload: { params }, meta: { resolved, rejected } }) {
        try {
            const result = yield loading(userService.login, params);
            const userInfo = result.result
            yield put(login(userInfo))
            console.log('result: ', result);
            let value = {
                username: params.userName,
                password: params.password,
                access_token: userInfo.accessToken,
            }
            updateUserConfig(value);
            resolved && resolved(result)
            return result;
        } catch (e) {
            yield put(endLoading())
            rejected && rejected()
        }
    })
}

export function* userSaga() {
    yield all([
        watchLogin()
    ])
}