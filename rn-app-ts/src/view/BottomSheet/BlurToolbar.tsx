import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, Extrapolate, useDerivedValue } from 'react-native-reanimated'
import ContactItem from './ContactItem'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Mock from 'mockjs'
import { CustomNavigationBar } from '@/components'
import { useLayout } from '@/utils/hooks'
import type { StackScreenProps } from '@react-navigation/stack';

type NameListItem = {
    name: string
    jobTitle: string
}

const data: {
    items: NameListItem[]
} = Mock.mock({
    'items|10-20': [{
        name: '@name',
        jobTitle: '@city(true)',
    }]
})

const AppBarHeight = 56;

type Props = StackScreenProps<ReactNavigation.RootParamList, 'BlurToolbar'>;

const BlurToolbar = ({ navigation }: Props) => {

    const [{ height: contentHeight }, onLayout] = useLayout()

    const fullScreenHeight = Dimensions.get('screen').height - StatusBar.currentHeight! - AppBarHeight;

    const headerContentHeight = 200;

    const headerHeight = fullScreenHeight - headerContentHeight;

    const initHeight = '45%';

    const snapPoints = useMemo(() => [initHeight, headerHeight, fullScreenHeight], [headerHeight]);

    const initHeightIndex = snapPoints.findIndex(x => x == initHeight);

    const headerHeightIndex = snapPoints.findIndex(x => x == headerHeight);

    const fullScreenHeightIndex = snapPoints.findIndex(x => x == fullScreenHeight);

    const renderScrollViewItem = useCallback(
        (item: NameListItem, index: number) => (
            <ContactItem
                key={`${item.name}.${index}`}
                title={`${index}: ${item.name}`}
                subTitle={item.jobTitle}
            // onPress={onItemPress}
            />
        ),
        []
    );


    const animatedIndex = useSharedValue(0);

    const contentBgStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animatedIndex.value, [initHeightIndex, headerHeightIndex], [1, 0], Extrapolate.CLAMP),
        }
    })

    const mapScale = useAnimatedStyle(() => {
        let scale = animatedIndex.value >= 0 ? 1 : animatedIndex.value * -1 + 1;
        return {
            transform: [{ scale: scale }]
        }
    })

    const headerTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(animatedIndex.value, [initHeightIndex, headerHeightIndex], [0, 1], Extrapolate.CLAMP)
        const translateX = interpolate(animatedIndex.value, [headerHeightIndex, fullScreenHeightIndex], [-120, 0], Extrapolate.CLAMP)
        const translateY = interpolate(animatedIndex.value, [headerHeightIndex, fullScreenHeightIndex], [(headerContentHeight + 20) / 2, (AppBarHeight - 40) / 2], Extrapolate.CLAMP)
        return {
            opacity: opacity,
            transform: [{ translateX: translateX }, { translateY: translateY }, { scale: 1 }],
        }
    })

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(animatedIndex.value, [initHeightIndex, headerHeightIndex], [0, 1], Extrapolate.CLAMP)
        const translateY = interpolate(animatedIndex.value, [headerHeightIndex, fullScreenHeightIndex], [0, -headerContentHeight], Extrapolate.CLAMP)
        return {
            opacity: opacity,
            transform: [{ translateY: translateY }],
        }
    })

    const renderHeader = () => {
        return <View style={styles.headerWrapper}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
                <CustomNavigationBar navigation={navigation} back={{ title: '' }} options={{ title: '' }} route={{ name: '', key: '' }} />
            </View>
            <Animated.View
                style={[
                    styles.header,
                    {
                        // backgroundColor: 'red',
                        height: headerContentHeight,
                        marginTop: AppBarHeight
                    },
                    headerAnimatedStyle
                ]
                } >
                <Text>djkfhjkdshfjkdh</Text>
            </Animated.View>
            <Animated.Text
                style={
                    [
                        styles.headerText,
                        {
                            position: 'absolute',
                            zIndex: 2000,
                        },
                        headerTextStyle
                    ]}
            >this is header</Animated.Text >
        </View >
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container} onLayout={onLayout}>
                {
                    renderHeader()
                }
                <Animated.View
                    style={[
                        {
                            alignItems: 'center',
                            overflow: 'hidden',
                            marginTop: AppBarHeight
                        },
                        contentBgStyle
                    ]}
                >
                    <Animated.Image
                        style={
                            [
                                styles.map,
                                mapScale
                            ]

                        }
                        source={{ uri: 'https://aihuifile.oss-cn-hangzhou.aliyuncs.com/2021/Rescourse/Material/20210104/xYFyWFscy2.jpg' }}
                    />
                </Animated.View>
                <BottomSheet
                    snapPoints={snapPoints}
                    animateOnMount={true}
                    animatedIndex={animatedIndex}
                >
                    <BottomSheetScrollView
                        style={{ overflow: 'visible', flex: 1, }}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            overflow: 'visible',
                        }}
                        bounces={true}
                    >
                        {data.items.map(renderScrollViewItem)}
                    </BottomSheetScrollView>
                </BottomSheet>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#59b8fa',
    },
    map: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    headerWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        overflow: 'visible',
        zIndex: 1
    },
    headerText: {
        fontSize: 28,
        height: 40,
        textAlignVertical: 'center',
        alignSelf: 'center'
    },
    header: {
        // backgroundColor: '#59b8fa',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
})

export default BlurToolbar
