import { PrepareAction, CaseReducerActions, createAction, PayloadActionCreator } from '@reduxjs/toolkit'
import { Action, AnyAction } from 'redux';


const SagaSuffix = '_saga';

export const BaseParamsAction = (params: any, resolved: (value?: unknown) => void, rejected: (value?: unknown) => void) => ({
    payload: { params },
    meta: { resolved, rejected }
})

export function createSagaAction<PA extends PrepareAction<any>>(action: AnyAction, prepareAction?: PA) {
    return createAction(action.type + SagaSuffix, prepareAction);
}

export function createSagaActionByParams(action: AnyAction,) {
    return createAction(action.type + SagaSuffix, BaseParamsAction);
}