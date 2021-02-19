import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

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
    multiply,
    greaterOrEq,
    sub,
    decay,
    timing,
    or
} = Animated;

const EasingConfig = {
    Spring: Easing.bezier(0.25, 0.1, 0.25, 1),
    Bounce: Easing.bezier(.19, .89, .87, 1.22)
}

function runTiming(clock, value, dest, easing = EasingConfig.Spring) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 300,
        toValue: new Value(0),
        easing: easing,
    };

    return block([
        cond(
            clockRunning(clock),
            [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
            ],
            [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]
        ),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

// function runSpring(clock, value, velocity, dest) {
//     const state = {
//         finished: new Value(0),
//         velocity: new Value(0),
//         position: new Value(0),
//         time: new Value(0),
//     };

//     const config = {
//         damping: 50,
//         mass: 0.3,
//         stiffness: 121.6,
//         overshootClamping: true,
//         restSpeedThreshold: 0.3,
//         restDisplacementThreshold: 0.3,
//         toValue: new Value(0),
//     };

//     return [
//         cond(clockRunning(clock), 0, [
//             set(state.finished, 0),
//             set(state.velocity, velocity),
//             set(state.position, value),
//             set(config.toValue, dest),
//             startClock(clock),
//         ]),
//         spring(clock, state, config),
//         cond(state.finished, stopClock(clock)),
//         state.position,
//     ];
// }

const BounceLayout = ({
    children,
    style,
    dragRate = 0.5,
    headerMaxDragRate = 2,
    footerMaxDragRate = 2,
    headerHeight = 100,
    footerHeight = 100,
    waitForRef
}) => {

    const contentRef = React.useRef();

    const dragX = new Value(0);
    const dragY = new Value(0);
    const dragYWithRate = multiply(dragY, dragRate);
    const state = new Value(-1);
    const velocityY = new Value(0);

    const transY = new Value();
    const prevDragY = new Value(0);

    const clock = new Clock();

    const _onGestureEvent = event([
        {
            nativeEvent: { translationX: dragX, translationY: dragY, velocityY: velocityY, state: state },
        },
    ]);

    /**
     * 1 向下 0 向上
     */
    const positive = greaterOrEq(debug('velocityY', velocityY), 0);
    const dragYWithLimit = cond(
        // debug('positive', or(positive, greaterThan(velocityY, -0.3))),
        cond(defined(transY), greaterThan(transY, 0), positive),
        min(headerHeight * headerMaxDragRate, debug('dragYWithRate', dragYWithRate)),
        max(-footerHeight * footerMaxDragRate, dragYWithRate)
    );

    const _transY = block([
        cond(
            eq(debug('state', state), State.ACTIVE),
            [
                stopClock(clock),
                set(transY, add(transY, sub(debug('dragYWithLimit', dragYWithLimit), prevDragY))),
                set(prevDragY, dragYWithLimit),
                transY,
            ],
            [
                set(prevDragY, 0),
                cond(
                    and(defined(transY), greaterOrEq(transY, headerHeight)),
                    set(
                        transY,
                        runTiming(clock, transY, headerHeight)
                    ),
                    set(
                        transY,
                        cond(defined(transY), runTiming(clock, transY, 0), 0)
                    )
                ),
                transY
            ]
        ),

    ])

    return (
        <View style={[styles.wrapper, style]}>
            <PanGestureHandler
                // maxPointers={1}
                minDist={10}
                onGestureEvent={_onGestureEvent}
                onHandlerStateChange={_onGestureEvent}
            // waitFor={contentRef}
            // simultaneousHandlers={waitForRef}
            >
                <Animated.View
                    style={[
                        styles.content,
                        {
                            transform: [
                                { translateY: _transY }
                            ]
                        }
                    ]}
                >
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#fff',//transparent
    }
})

export default BounceLayout
