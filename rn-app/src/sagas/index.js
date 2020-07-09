import { all } from 'redux-saga/effects'
// import { userSaga } from './user'
import { homeSaga } from './home'

export function* rootSaga() {
    yield all([
        // userSaga(),
        homeSaga(),
    ])
}