import { put, call, all, select, takeLatest, take, cancel, delay, takeEvery } from 'redux-saga/effects'
import { loading, load, _curry, pending } from './help'
// import * as userService from '@/services/userService'
import {
    HOME_INIT,
} from '@/constants/actionTypes';
import _ from 'lodash'

function* watchHomeInit() {
    while (true) {
        const action = yield take(HOME_INIT);
        const { meta: { resolved, rejected } } = action;
        try {
            resolved && resolved()
        } catch (error) {
            rejected && rejected();
        }
    }
}

export function* homeSaga() {
    yield all([
        watchHomeInit(),
    ])
}