import { PrepareAction, CaseReducerActions, createAction, PayloadActionCreator, PayloadAction } from '@reduxjs/toolkit'
import { Action, AnyAction } from 'redux';


const SagaSuffix = '_saga';

type Fn = (...args: any[]) => void;

export type ParamsAction<P> = PayloadAction<{ params: P }>

export const BaseParamsAction = <P = {}, TData = any>(params: P, resolved?: (res: TData, ...args: any[]) => void, rejected?: Fn) => ({
    payload: { params },
    meta: { resolved, rejected }
})

export function createSagaAction<PA extends PrepareAction<any>>(action: AnyAction, prepareAction: PA) {
    return createAction(action.type + SagaSuffix, prepareAction);
}

export function createSagaActionByParams<P = {}, TData = any>(action: AnyAction,) {
    return createAction(action.type + SagaSuffix, function prepare(params: P, resolved?: (res: TData, ...args: any[]) => void, rejected?: Fn) {
        return BaseParamsAction(params, resolved, rejected)
    });
}