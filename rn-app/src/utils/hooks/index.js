import React from 'react'
import { useSafeState, useLockFn, usePersistFn } from 'ahooks'
import { commonActions } from '@/reducers/common'
import { useDispatch } from 'react-redux'

export function useLoadingCall() {
    let dispatch = useDispatch();
    return usePersistFn(async (fn, ...args) => {
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

export function useArray(initialValue) {
    const [state, setState] = useSafeState(initialValue);

    const stableActions = React.useMemo(
        () => ({
            add: (value) => {
                setState((prevState) => {
                    return prevState.concat(value);
                });
            },
            remove: (index) => {
                setState((prevState) => prevState.filter((_, i) => i != index));
            },
            reset: () => setState(initialValue),
        }),
        [state, initialValue],
    );

    const utils = {
        set: setState,
        ...stableActions,
    };

    return [state, utils];
}