import { call, delay, put, race, all } from 'redux-saga/effects'
import { ERROR_MESSAGE, LOADING } from '@/constants/actionTypes'

const PendTiming = 200;

export function handeSagaError(store, messages) {
    console.log(messages[0].stack)
    store.dispatch({ type: ERROR_MESSAGE, payload: messages[0].message })
}

export function* customCall(...args) {
    try {
        return yield call(...args)
    } catch (error) {
        yield put({ type: ERROR_MESSAGE, payload: error.message })
        // return error
    }
}

export function callWithFunc({ needPending, needLoading, pendingTiming } = { needPending: false, needLoading: false, pendingTiming: PendTiming }) {
    console.log('needPending, needLoading, pendingTiming: ', needPending, needLoading, pendingTiming);
    return function* (fn, ...args) {
        if (needLoading) yield put({ type: LOADING, payload: true })
        if (!needPending) pendingTiming = 0
        const result = yield pending(fn, ...args)
        yield put({ type: LOADING, payload: false })
        return result;
    }
}

export function* pending(fn, ...args) {
    const { result } = yield all({
        timeout: delay(PendTiming),
        result: fn(...args),
    });
    return result;

}

export function* loading(fn, ...args) {
    console.log('loading')
    yield put({ type: LOADING, payload: true })
    const result = yield fn(...args);
    yield put({ type: LOADING, payload: false })
    return result;
}

export function* load(args) {
    return yield call([storage, 'load'], args);
}

export function _curry(func, _args) {
    let args = _args || [];
    return function () {
        let _args = args.concat([].slice.call(arguments));
        if (typeof arguments[0] == 'function' && arguments.length == 1) {
            return _curry.call(this, func, _args);
        } else {
            return func.apply(null, _args);
        }
    }
}

