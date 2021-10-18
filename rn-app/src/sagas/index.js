import { put, call, all, select, takeEvery, take, cancel, delay } from 'redux-saga/effects'
import { userSaga } from './user'

export function* rootSaga() {
    yield all([
        userSaga(),
    ])
}