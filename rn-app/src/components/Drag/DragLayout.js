import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const {
    set,
    cond,
    eq,
    add,
    Value,
    event,
    debug,
    log,
    defined,
    block,
    min,
    max,
    and,
    lessThan,
    greaterThan,
    Clock,
    clockRunning,
    startClock,
    spring,
    stopClock,
    multiply
} = Animated;

function runSpring(clock, value, velocity, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, multiply(velocity, -1)),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ]);
}

const DragLayout = ({ children, initialOffsetX = 0, initialOffsetY = 0, minOffsetX, maxOffsetX, minOffsetY, maxOffsetY }) => {

    const dragX = new Value(0);
    const dragY = new Value(0);
    const state = new Value(-1);
    const dragVX = new Value(0);

    const _onGestureEvent = event([
        {
            nativeEvent: { translationX: dragX, translationY: dragY, velocityY: dragVX, state: state },
        },
    ]);

    const offsetX = new Value(initialOffsetX);

    const _transX = cond(
        eq(state, State.ACTIVE),
        withEnhancedLimit(add(offsetX, dragX), minOffsetX, maxOffsetX),
        set(offsetX, withEnhancedLimit(add(offsetX, dragX), minOffsetX, maxOffsetX))
    );

    const offsetY = new Value(initialOffsetY);

    const _transY = cond(
        eq(state, State.ACTIVE),
        withEnhancedLimit(add(offsetY, dragY), minOffsetY, maxOffsetY),
        set(offsetY, withEnhancedLimit(add(offsetY, dragY), minOffsetY, maxOffsetY))
    );

    function withEnhancedLimit(disV, minV, maxV) {
        return cond(
            and(defined(minV), lessThan(disV, minV)),
            minV,
            cond(
                and(defined(maxV), greaterThan(disV, maxV)),
                maxV,
                disV
            )
        )
    }

    return (
        <PanGestureHandler
            maxPointers={1}
            minDist={10}
            onGestureEvent={_onGestureEvent}
            onHandlerStateChange={_onGestureEvent}
        >
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: _transX }, { translateY: _transY },
                        ],
                    },
                ]}
            >
                {children}
            </Animated.View>
        </PanGestureHandler>

    )
}

export default DragLayout

const styles = StyleSheet.create({})
