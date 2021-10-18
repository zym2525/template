import { Action, AnyAction } from 'redux';
import {
    PrepareAction,
    CaseReducerActions,
    CreateSliceOptions,
    SliceCaseReducers,
    Slice,
    createSlice,
    PayloadAction,
    PayloadActionCreator,
} from '@reduxjs/toolkit'
import {
    call,
    takeLatest,
    takeEvery,
    all,
    CallEffect,
    take,
    fork,
    AllEffect,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

export type CaseSagas<A extends Action = AnyAction> = (
    action: A,
) => Generator<unknown, unknown, SagaIterator>;


export declare type SliceCaseSagas = {
    [K: string]: CaseSagas<PayloadAction<any>>
};

type TpmCaseSaga = {
    [K: string]: () => any
}

export type ValidateSliceSagas<ACR extends SliceCaseSagas> = ACR &
    {
        [T in keyof ACR]: ACR[T] extends {
            saga(action?: infer A): any;
        }
        ? {
            prepare(...a: never[]): Omit<A, 'type'>;
        }
        : {};
    };

export type CreateSagaSliceOptions<State = any, CR extends SliceCaseReducers<State> = SliceCaseReducers<State>, Name extends string = string> = CreateSliceOptions<State, CR, Name> & {
    sagas: TpmCaseSaga
}

const SagaSuffix = '_saga';

const BaseParamsAction = (params: any, resolved: (value?: unknown) => void, rejected: (value?: unknown) => void) => ({
    payload: { params },
    meta: { resolved, rejected }
})

export function createSagaSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
>(options: CreateSagaSliceOptions<State, CaseReducers, Name>): Slice<State, CaseReducers, Name> {
    const { sagas: caseSagas, name } = options;
    const originalSlice = createSlice(options);
    // const caseSagasNames = Object.keys(caseSagas);
    // for (const key in object) {
    //     if (Object.prototype.hasOwnProperty.call(object, key)) {
    //         const element = object[key];

    //     }
    // }
    // originalSlice.actions
    return originalSlice;
}