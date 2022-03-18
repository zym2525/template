import React, { useMemo } from 'react'
import { useSafeState, useLockFn, useMemoizedFn } from 'ahooks'
import { commonActions } from '@/reducers/common'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { bindActionCreators } from 'redux'

export function useLoadingCall() {
    let dispatch = useDispatch();
    return useMemoizedFn(async (fn, ...args) => {
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

export function useActions(actions, deps) {
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

export function useShallowEqualSelector(selector) {
    return useSelector(selector, shallowEqual)
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

export function useLayout() {
    const [layout, setLayout] = React.useState({ height: 0, width: 0, measured: false });

    const onLayout = React.useCallback(
        (e) => {
            const { height, width } = e.nativeEvent.layout;

            if (height === layout.height && width === layout.width) {
                return;
            }

            setLayout({
                height,
                width,
                measured: true,
            });
        },
        [layout.height, layout.width]
    );

    return [layout, onLayout];
}