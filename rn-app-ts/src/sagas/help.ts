import { call, delay, put, race, all, CallEffect, SagaReturnType, takeLatest, StrictEffect } from 'redux-saga/effects'
import { commonActions } from '@/reducers/common'
import Storage, { LoadParams, } from 'react-native-storage'
import _, { Curry } from 'lodash'
import { AnyAction } from 'redux'
import { ActionCreatorWithPreparedPayload, PayloadActionCreator } from '@reduxjs/toolkit'
import { createSagaActionByParams } from '@/reducers/createSagaActions'

const PendTiming = 200;

export function* customCall<T, Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
    try {
        let res: T = yield call(fn, ...args);
        return res
    } catch (error) {
        yield put(commonActions.error_message((error as Error).message))
        // return error
    }
}

export function* pending<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
    const { result } = yield all({
        timeout: delay(PendTiming),
        result: fn(...args),
    });
    return result;

}

export function* loading<T, Fn extends (...args: any[]) => Promise<T>>(fn: Fn, ...args: Parameters<Fn>) {
    console.log('loading')
    yield put(commonActions.startLoading())
    const result: T = yield fn(...args);
    yield put(commonActions.endLoading())
    return result;
}

export function* load<T = any>(args: LoadParams): Generator<StrictEffect, T, any> {
    return yield call([storage, 'load'], args);
}

type Fn = (...args: any[]) => void;

export type createTakeLatestRequestParams<TData = any> = {
    action: ActionCreatorWithPreparedPayload<[params: any, resolved?: ((res: TData, ...args: any[]) => void), rejected?: Fn], {
        params: any;
    }, string, never, {
        resolved: ((res: TData, ...args: any[]) => void) | undefined;
        rejected: Fn | undefined;
    }>
    service: (...arg: any[]) => Promise<TData>
    needLoading?: boolean
}

export function createTakeLatestRequest<TData = any>({ action, service, needLoading }: createTakeLatestRequestParams<TData>) {
    return function* () {
        yield takeLatest<ReturnType<typeof action>>(action.type, function* ({ payload: { params }, meta: { resolved, rejected } }) {
            try {
                if (needLoading) yield put(commonActions.startLoading())
                yield delay(2000)
                const result: TData = yield call(service, params);
                console.log('takeLatest');
                resolved && resolved(result)
                return result;
            } catch (e) {
                rejected && rejected(e)
            } finally {
                yield put(commonActions.endLoading())
            }
        })
    }
}