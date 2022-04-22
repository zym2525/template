import { StyleSheet, Text, View, Animated, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { TabBar, NavigationState, Route, TabBarItemProps } from 'react-native-tab-view'
import { useTheme, TouchableRipple, Surface, Badge } from 'react-native-paper'
import color from 'color';
import { useLayout, useAnimatedValue } from '@/utils/hooks'
import { setSize, setSizeText } from '@/utils'

export type TabTopBarRoute = Route & {
    badge?: string | number | boolean;
}

type TabTopBarProps = {
    navigationState: NavigationState<TabTopBarRoute>
    // position: Animated.AnimatedInterpolation
    onIndexChange?: (index: number) => any
    getBadge?: (props: { route: TabTopBarRoute }) => boolean | number | string | undefined
    getLabelText?: (props: { route: TabTopBarRoute }) => string | undefined;
    style?: StyleProp<ViewStyle>
}

const TabTopBar = ({
    navigationState,
    // position,
    onIndexChange,
    getBadge,
    getLabelText,
    style
}: TabTopBarProps) => {


    const [layout, setLayout] = useLayout();

    const { colors } = useTheme();

    const activeColor = colors.text;
    const inactiveColor = color(activeColor).alpha(0.5).rgb().string();

    const position = useAnimatedValue(navigationState.index);

    const jumpTo = function (key: string) {
        const { routes } = navigationState;
        const index = routes.findIndex(r => r.key == key)
        Animated.timing(position, {
            toValue: index,
            duration: 300,
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished) {
                onIndexChange?.(index)
            }
        })
    }

    return (
        <Surface onLayout={setLayout} style={[styles.wrapper, style]}>
            <TabBar
                navigationState={navigationState}
                scrollEnabled
                bounces
                // ref={ref}
                activeColor={colors.primary}
                inactiveColor={inactiveColor}
                layout={layout}
                position={position}
                jumpTo={jumpTo}
                indicatorStyle={{ backgroundColor: '#3598dc', height: setSize(5) }}
                /**
                 * width: undefined 防止scrollview计算tabwidth
                 */
                contentContainerStyle={{ width: undefined }}
                tabStyle={{ width: 'auto', }}
                style={{
                    backgroundColor: '#fff', elevation: 0,
                    // opacity: layout.measured ? 1 : 0
                }}
                getLabelText={getLabelText}
                renderTabBarItem={(props) => <TabTopBarItem  {...props} getBadge={getBadge} />}
            // renderBadge
            />
        </Surface>

    )
}

type TabTopBarItemProps = TabBarItemProps<TabTopBarRoute> & {
    key: string,
    getBadge?: (props: { route: TabTopBarRoute }) => boolean | number | string | undefined
}

const TabTopBarItem = ({
    route,
    position,
    navigationState,
    renderLabel: renderLabelCustom,
    renderIcon,
    renderBadge,
    getLabelText,
    getTestID,
    getAccessibilityLabel,
    getAccessible,
    activeColor: activeColorCustom,
    inactiveColor: inactiveColorCustom,
    pressColor,
    pressOpacity,
    labelStyle,
    style,
    onLayout,
    onPress,
    onLongPress,
    getBadge = ({ route }: { route: TabTopBarRoute }) => route.badge
}: TabTopBarItemProps) => {

    const labelText = getLabelText({ route });
    const badge = getBadge({ route })
    const badgeIsNumber = badge != null && typeof badge !== 'boolean';

    const { colors } = useTheme();

    const rippleColor = color(colors.text).alpha(0.12)
        .rgb()
        .string()

    return <TouchableRipple
        borderless
        centered
        rippleColor={rippleColor}
        style={style}
        delayPressIn={0}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={onLongPress}
    >
        <View style={styles.subjectItem}>
            <Text style={styles.subjectItemText}>{labelText}</Text>
            <View style={[
                styles.badgeContainer,
                {
                    right:
                        (badgeIsNumber
                            ? String(badge).length * -2
                            : 0) + setSize(16),
                    top: badgeIsNumber ? setSize(16) : setSize(24)
                }
            ]}>
                {typeof badge === 'boolean' ? (
                    <Badge visible={badge} size={setSize(16)} />
                ) : (
                    <Badge visible={badge != null} size={setSize(32)}>
                        {badge}
                    </Badge>
                )}
            </View>
        </View>
    </TouchableRipple>
}

export default TabTopBar

const styles = StyleSheet.create({
    wrapper: {
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subjectItem: {
        height: setSize(108),
        paddingHorizontal: setSize(32),
        paddingBottom: setSize(5),
        justifyContent: 'center',
    },
    subjectItemText: {
        color: '#000',
        fontSize: setSizeText(30),
        textAlignVertical: 'center',
        includeFontPadding: false
    },
    badgeContainer: {
        position: 'absolute',
        top: setSize(12)
    }
})