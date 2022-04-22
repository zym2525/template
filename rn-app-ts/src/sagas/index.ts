import { put, call, all, select, takeEvery, take, cancel, delay } from 'redux-saga/effects'
import { userSaga } from './user'
import { commonSaga } from './common'

export function* rootSaga() {
    yield all([
        userSaga(),
        commonSaga(),
    ])
}