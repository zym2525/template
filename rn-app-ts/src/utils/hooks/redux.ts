import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { commonActions } from '@/reducers/common'
import { bindActionCreators, AnyAction, ActionCreator, ActionCreatorsMapObject } from 'redux'
import { useMemoizedFn } from 'ahooks'
import React, { useMemo, DependencyList } from 'react'

export const useAppDispatch = () => useDispatch<Redux.AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<Redux.RootState> = useSelector

// export function useShallowEqualSelector(selector) {
//     return useSelector(selector, shallowEqual)
// }

export function useLoadingCall<T, Fn extends (...args: any[]) => Promise<T>>() {
    let dispatch = useAppDispatch();
    return useMemoizedFn(async (fn: Fn, ...args: Parameters<Fn>) => {
        try {
            dispatch(commonActions.startLoading())
            let res = await fn(...args);
            return res;
        } catch (e) {
            console.log('e: ', e);
        } finally {
            dispatch(commonActions.endLoading())
        }
    })
}

export function useActions<A, M extends ActionCreatorsMapObject<A>>(actions: M, deps?: DependencyList): M
export function useActions<A, M extends ActionCreatorsMapObject<A>>(actions: M[], deps?: DependencyList): M[]
export function useActions<A, M extends ActionCreatorsMapObject<A>>(actions: M | M[], deps?: DependencyList) {
    const dispatch = useDispatch()
    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map(a => bindActionCreators(a, dispatch))
            }
            return bindActionCreators(actions, dispatch)
        },
        deps ? [dispatch, ...deps] : [dispatch]
    )
}

export interface TakeLatestRequestOptions<TData, TParams extends any[]> {
    defaultParams?: TParams;
}

export type TakeLatestRequestService<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;

export function useTakeLatestRequest<TData, TParams extends any[]>(fn: TakeLatestRequestService<TData, TParams>, options: TakeLatestRequestOptions<TData, TParams>) {

}