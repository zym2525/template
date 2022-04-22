import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SmartRefreshLayout, BezierRadarHeader, ClassicsHeader, ClassicsFooter, SmartRefreshLayoutWithoutTheme } from '@zero-d/rn-components'
import Animated, { useAnimatedStyle, useSharedValue, interpolate, Extrapolate, runOnJS, useAnimatedGestureHandler } from 'react-native-reanimated'
import { GestureDetector, Gesture, createNativeWrapper, NativeViewGestureHandler, PanGestureHandler, FlatList, GestureUpdateEvent } from 'react-native-gesture-handler';
import { useArray, useLayout } from '@/utils/hooks'
import { useMemoizedFn } from 'ahooks'
import { CustomNavigationBar } from '@/components'
// import {DEFAULT_APPBAR_HEIGHT} from 'react-native-paper';
import { Button } from 'react-native-paper';


const RefreshList = () => {

    const nativeGestureRef = React.useRef(null)

    const [data, { add: addData }] = useArray([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

    const titleHeight = 60;
    const titleCollapseHeight = 200;
    const maxHeaderTextTransY = (titleHeight + titleCollapseHeight) / 2;

    const [layout, onLayout] = useLayout()
    console.log('layout: ', layout);

    const translationY = useSharedValue(0);
    const startY = useSharedValue(0);

    const [gestureEnabled, setGestureEnabled] = React.useState(true);
    console.log('gestureEnabled: ', gestureEnabled);
    const flatList = React.useRef<FlatList>()
    const [didStart, setDidStart] = React.useState(false)
    const [gestureSource, setGestureSource] = React.useState(-1)
    const gesture = Gesture.Pan()
        .enabled(gestureEnabled)
        // .onStart((_, ctx) => {

        // })
        .onUpdate((event) => {
            // if (!didStart) {
            //     runOnJS(setDidStart)(true)
            //     runOnJS(setGestureSource)(1);
            //     return
            // }

            // if (gestureSource != 1) {
            //     return
            // }

            let resY = startY.value + event.translationY;
            // if (gestureSource == 1 && (resY == 0 || resY == -titleCollapseHeight)) {
            //     return
            // }
            if (resY >= 0) {
                translationY.value = 0;
            } else if (resY <= -titleCollapseHeight) {
                translationY.value = -titleCollapseHeight;
            } else {
                translationY.value = resY;
            }
            console.log(translationY.value)
        })
        .onEnd(() => {
            // if (gestureSource !== 1) {
            //     return;
            // }
            // runOnJS(setDidStart)(false)
            // runOnJS(setGestureSource)(-1);
            startY.value = translationY.value;
        })
        .onFinalize(() => {
            // if (gestureSource !== 1) {
            //     return;
            // }
            // runOnJS(setDidStart)(false)
            // runOnJS(setGestureSource)(-1);
        })



    const headerTextAnimatedStyles = useAnimatedStyle(() => {
        const headerTextTranslateX = interpolate(translationY.value, [-titleCollapseHeight, 0], [0, -120], Extrapolate.CLAMP)
        const headerTextTranslateY = interpolate(translationY.value, [-titleCollapseHeight, 0], [0, maxHeaderTextTransY], Extrapolate.CLAMP)
        return {
            transform: [{ translateY: headerTextTranslateY }, { translateX: headerTextTranslateX }]
        }
    })

    const titleCollapseAnimatedStyles = useAnimatedStyle(() => {
        const height = interpolate(translationY.value, [-titleCollapseHeight, 0], [0, titleCollapseHeight], Extrapolate.CLAMP)
        return {
            // transform: [{ translateY: translationY.value }],
            height
        }
    })

    const refreshList = React.useRef<SmartRefreshLayoutWithoutTheme>()

    const onRefresh = useMemoizedFn(() => {
        console.log('onRefresh');
        setTimeout(() => {
            refreshList.current!.finishRefresh({ success: false })
        }, 2000)
    })
    const onLoadMore = useMemoizedFn(() => {
        console.log('onLoadMore');
        setTimeout(() => {
            addData([1, 1, 1, 1])
            if (data.length > 7) {
                refreshList.current!.finishLoadMoreWithNoMoreData()
            } else {
                refreshList.current!.finishLoadMore()
            }

        }, 2000)
    })

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={() => setGestureEnabled(p => !p)}>toggle</Button>
            {/* @ts-ignore */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={{ flex: 1 }} collapsable={false}>
                    <Animated.View style={[styles.title, { height: titleHeight }]}>
                        {/* <Text style={styles.arrow} onPress={() => this.props.navigation.goBack()}>&#xe606;</Text> */}
                        <Animated.Text
                            style={[
                                styles.headerText,
                                headerTextAnimatedStyles
                            ]}
                        >this is header</Animated.Text>
                    </Animated.View>
                    {/* <View style={{ flex: 1 }} onLayout={onLayout}>
                <Animated.ScrollView
                    contentContainerStyle={{ height: layout.height + titleCollapseHeight }}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View
                        style={[{ backgroundColor: '#59b8fa', height: titleCollapseHeight }]}
                    >
                    </Animated.View>
                </Animated.ScrollView>
            </View> */}
                    <Animated.View
                        style={[{ backgroundColor: '#59b8fa', height: titleCollapseHeight }, titleCollapseAnimatedStyles]}
                    >
                    </Animated.View>
                    <View style={{ flex: 1, overflow: 'hidden' }} >
                        {/* <NativeViewGestureHandler > */}
                        <FlatList
                            // refreshControl={<SmartRefreshLayout
                            //     style={{ flex: 1 }}
                            //     onRefresh={onRefresh}
                            //     onLoadMore={onLoadMore}
                            //     enableAutoLoadMore={false}
                            //     ref={refreshList}
                            //     enableLoadMore
                            //     primaryColor='#59b8fa'
                            // />}
                            style={{ flex: 1, backgroundColor: '#fff' }}
                            data={data}
                            //@ts-ignore
                            ref={flatList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <Text
                                    style={{
                                        height: 100,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#dcdcdc',
                                        fontSize: 28,
                                    }}
                                > RefreshList {index + 1}</Text>
                            }
                        />
                        {/* </NativeViewGestureHandler> */}
                    </View>
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        // position: 'absolute',
        // width: Dimensions.get('window').width,
        backgroundColor: '#fe1200',
        padding: 20,
        height: 60,
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 30,
        color: '#c1c1c1',
        position: 'absolute',
        left: 20,
        top: 15
    },
    headerText: {
        fontSize: 28,
        height: 40,
        position: 'absolute',
    },
})

export default RefreshList
