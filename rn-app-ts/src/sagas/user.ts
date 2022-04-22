import { put, call, all, fork, takeLatest, take, cancel, delay, cancelled } from 'redux-saga/effects'
import { loginSaga, login } from '@/actions/user'
import { endLoading } from '@/actions/common'
import { loading, load, customCall, pending, } from './help'
import { login as loginService, LoginOutput } from '@/services/userService'
import { updateUserConfig, StorageUserToken } from '@/utils/storage'

function* watchLogin() {
    yield takeLatest<ReturnType<typeof loginSaga>>(loginSaga.type, function* ({ payload: { params }, meta: { resolved, rejected } }) {
        try {

            const result: LoginOutput = yield loading(loginService, params);
            const userInfo = result
            yield put(login(userInfo))
            console.log('result: ', result);
            let value: StorageUserToken = {
                username: params.username,
                password: params.password,
                access_token: userInfo.token,
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