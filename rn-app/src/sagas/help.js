import { call, delay, put, race, all } from 'redux-saga/effects'
import { commonActions } from '@/reducers/common'

const PendTiming = 200;

export function handeSagaError(store, messages) {
    console.log(messages[0].stack)
    store.dispatch(commonActions.error_message(messages[0].message))
}

export function* customCall(...args) {
    try {
        return yield call(...args)
    } catch (error) {
        yield put(commonActions.error_message(error.message))
        // return error
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
    yield put(commonActions.startLoading())
    const result = yield fn(...args);
    yield put(commonActions.endLoading())
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

