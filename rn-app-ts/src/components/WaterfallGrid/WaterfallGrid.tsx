import React, { useEffect, useState, useCallback, useMemo, FC } from 'react';
import { View, Text, LayoutChangeEvent, Image, FlatList } from 'react-native';
import { ScrollView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, {
    BaseAnimationBuilder,
    BounceOut,
    combineTransition,
    CurvedTransition,
    FadingTransition,
    JumpingTransition,
    Layout,
    LightSpeedInLeft,
    LightSpeedInRight,
    PinwheelOut,
    SequencedTransition,
    LayoutAnimationFunction
} from 'react-native-reanimated';
import { useLayout } from '@/utils/hooks'

type ListRenderItemInfo<ItemT> = {
    item: ItemT
    index: number
    itemWidth: number
    itemHeight: number
}

type WaterfallGridRenderItemProps<ItemT> = (info: ListRenderItemInfo<ItemT>) => React.ReactElement | null;

type WaterfallGridProps<ItemT> = {
    columns?: number
    transition?: BaseAnimationBuilder
    renderItem: WaterfallGridRenderItemProps<ItemT>
    itemHeight?: number | ((index: number) => number)
    itemMargin?: number
    data: ReadonlyArray<ItemT>
    /**
     * item的key值
     * key值不要是index
     */
    keyExtractor?: (item: ItemT, index: number) => any
}

const WaterfallGrid = <ItemT,>({
    columns = 2,
    transition = CurvedTransition.delay(1000),
    renderItem,
    itemHeight = 200,
    itemMargin = 10,
    data = [],
    keyExtractor = (_, index) => index
}: WaterfallGridProps<ItemT>) => {
    const [dims, onLayout] = useLayout();
    const margin = itemMargin;
    const width = (dims.width - (columns + 1) * margin) / columns;
    useEffect(() => {
        if (dims.width === 0 || dims.height === 0) {
            return;
        }
    }, [dims]);
    const [cardsMemo, height] = useMemo(() => {
        if (data.length === 0) {
            return [[], 0];
        }
        const layoutTransition = transition;
        const cardsResult: React.ReactNode[] = [];
        const heights = new Array(columns).fill(0);
        data.forEach((item, index) => {
            const cur = index % columns;
            const targetItemHeight = typeof itemHeight == 'function' ? itemHeight(index) : itemHeight;
            const key = keyExtractor(item, index)
            heights[cur] += targetItemHeight + margin / 2;
            const Item = renderItem({
                item,
                index,
                itemWidth: width,
                itemHeight: targetItemHeight,
            })
            cardsResult.push(
                <Animated.View
                    entering={LightSpeedInRight.delay(cur * 200 * 2).springify()}
                    exiting={BounceOut}
                    key={key}
                    layout={layoutTransition}
                    style={{
                        width: width,
                        height: targetItemHeight,
                        alignItems: 'center',
                        // backgroundColor: item.color,
                        justifyContent: 'center',
                        position: 'absolute',
                        left: cur * width + (cur + 1) * margin,
                        top: heights[cur] - targetItemHeight,
                    }}>
                    {Item}
                </Animated.View>
            );
        })

        return [cardsResult, Math.max(...heights) + margin / 2];
    }, [data, columns, transition]);
    return (
        <View onLayout={onLayout} style={{ flex: 1 }}>
            {cardsMemo.length === 0 && <Text> Loading </Text>}
            {cardsMemo.length !== 0 && (
                <ScrollView>
                    <View style={{ height: height }}>{cardsMemo}</View>
                </ScrollView>
            )}
        </View>
    );
}

export default WaterfallGrid