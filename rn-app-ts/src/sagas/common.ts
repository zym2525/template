import { put, call, all, fork, takeLatest, take, cancel, delay, cancelled } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit';

function* takeLatestRequest() {
    yield takeLatest<PayloadAction>('sss', function* ({ payload, type }) {

    })
}

export function* commonSaga() {
    yield all([
        takeLatestRequest()
    ])
}