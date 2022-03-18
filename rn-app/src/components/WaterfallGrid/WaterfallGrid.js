import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import PropTypes from 'prop-types';

const WaterfallGrid = ({
    columns = 2,
    transition = CurvedTransition.delay(1000),
    renderItem,
    itemHeight = 200,
    itemMargin = 10,
    data = [],
    /**
     * item的key值
     * key值不要是index
     */
    keyExtractor = (_, index) => index
}) => {
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
        const cardsResult = [];
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
                        backgroundColor: item.color,
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