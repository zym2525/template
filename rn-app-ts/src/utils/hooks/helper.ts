import React, { useMemo, DependencyList } from 'react'
import { useSafeState, useLockFn, useMemoizedFn } from 'ahooks'
import { LayoutChangeEvent, Animated } from 'react-native'
import { setSize, setSizeText } from '../common/scaleSize'

export function useArray<T = any>(initialValue: T[]) {
    const [state, setState] = useSafeState(initialValue);

    const stableActions = React.useMemo(
        () => ({
            add: (value: T[]) => {
                setState((prevState) => {
                    return prevState.concat(value);
                });
            },
            remove: (index: number) => {
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

    return [state, utils] as const;
}

export function useLayout() {
    const [layout, setLayout] = React.useState({ height: 0, width: 0, measured: false });

    const onLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
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

    return [layout, onLayout] as const;
}

export function useLazyRef<T>(callback: () => T) {
    const lazyRef = React.useRef<T | undefined>();

    if (lazyRef.current === undefined) {
        lazyRef.current = callback();
    }

    return lazyRef as React.MutableRefObject<T>;
}

export function useAnimatedValue(initialValue: number) {
    const { current } = useLazyRef(() => new Animated.Value(initialValue));

    return current;
}

export function useSize(size: number) {
    return React.useMemo(() => setSize(size), [size])
}

export function useSizeText(size: number) {
    return React.useMemo(() => setSizeText(size), [size])
}

export function useCardWidth({ margin = 15, columns = 3, extraWidth = 0 } = {}) {
    const [dims, onLayout] = useLayout();
    const cardWidth = React.useMemo(() => {
        if (dims.width === 0 || dims.height === 0) {
            return 0;
        }
        return (dims.width - columns * 2 * margin - extraWidth) / columns
    }, [dims, margin, columns])
    return [cardWidth, onLayout] as const
}