import {
    View,
    Animated,
    TouchableWithoutFeedback,
    TouchableWithoutFeedbackProps,
    StyleSheet,
    StyleProp,
    Platform,
    Keyboard,
    ViewStyle,
    ColorValue,
    Image
} from 'react-native';
import React from 'react'
import { Text } from '@zero-d/rn-components'
import { TouchableRipple, withTheme, overlay, Colors, Badge } from 'react-native-paper'
import color from 'color';
import { Route, NavigationState } from './TabHorizontalView'
import { setSize, setSizeText } from '@/utils';
import theme from '@/style/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export type TouchableProps = TouchableWithoutFeedbackProps & {
    key?: string;
    route?: Route;
    children: React.ReactNode;
    borderless?: boolean;
    centered?: boolean;
    rippleColor?: string;
};

export type TabBarProps = {
    labeled?: boolean;
    approxBackgroundColor: ColorValue | Animated.Value;
    navigationState: NavigationState;
    getBadge?: (props: { route: Route }) => boolean | number | string | undefined;
    renderTouchable?: (props: TouchableProps) => React.ReactNode;
    activeColor?: string;
    inactiveColor?: string;
    handleTabPress: (index: number) => void;
    jumpTo: (key: string) => void;
    renderIcon?: (props: {
        route: Route;
        focused: boolean;
        color: string;
    }) => React.ReactNode;

    renderLabel?: (props: {
        route: Route;
        focused: boolean;
        color: string;
    }) => React.ReactNode;

    getLabelText?: (props: { route: Route }) => string | undefined;
}

export type BaseTabBarItemType = {
    route: Route;
    labeled?: boolean;
    getLabelText?: (props: { route: Route }) => string | undefined;
    activeTintColor: string
    renderLabel?: (props: {
        route: Route;
        focused: boolean;
        color: string;
    }) => React.ReactNode;
    focused: boolean;
    badge?: string | number | boolean;
}

export const Touchable = ({
    route: _0,
    style,
    children,
    borderless,
    centered,
    rippleColor,
    ...rest
}: TouchableProps) =>
    TouchableRipple.supported ? (
        <TouchableRipple
            {...rest}
            disabled={rest.disabled || undefined}
            borderless={borderless}
            centered={centered}
            rippleColor={rippleColor}
            style={style}
        >
            {children}
        </TouchableRipple>
    ) : (
        <TouchableWithoutFeedback {...rest}>
            <View style={style}>{children}</View>
        </TouchableWithoutFeedback>
    );

const TabBar = ({
    approxBackgroundColor,
    navigationState,
    getBadge = ({ route }: { route: Route }) => route.badge,
    renderTouchable = (props: TouchableProps) => <Touchable {...props} />,
    activeColor,
    inactiveColor,
    handleTabPress,
    renderIcon,
    labeled = true,
    getLabelText = ({ route }: { route: Route }) => route.title,
}: TabBarProps) => {
    const { routes } = navigationState;

    const backgroundColor = approxBackgroundColor;
    const isDark =
        typeof approxBackgroundColor === 'string'
            ? !color(approxBackgroundColor).isLight()
            : true;

    const textColor = isDark ? Colors.white : Colors.black;
    const activeTintColor = typeof activeColor !== 'undefined' ? activeColor : textColor;
    const inactiveTintColor =
        typeof inactiveColor !== 'undefined'
            ? inactiveColor
            : color(textColor).alpha(0.5).rgb().string();

    const touchColor = color(activeColor || activeTintColor)
        .alpha(0.12)
        .rgb()
        .string();

    return <Animated.View style={[styles.barContent, { backgroundColor }]}>
        {
            routes.map((route, index) => {
                const focused = navigationState.index === index;

                const badge = getBadge({ route });

                return renderTouchable({
                    key: route.key,
                    route,
                    // borderless: true,
                    // centered: true,
                    rippleColor: touchColor,
                    onPress: () => handleTabPress(index),
                    // testID: getTestID({ route }),
                    // accessibilityLabel: getAccessibilityLabel({ route }),
                    // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
                    accessibilityTraits: focused
                        ? ['button', 'selected']
                        : 'button',
                    accessibilityComponentType: 'button',
                    accessibilityRole: 'button',
                    accessibilityState: { selected: focused },
                    style: styles.item,
                    children: (
                        <BaseTabBarItem
                            focused={focused}
                            route={route}
                            labeled={labeled}
                            activeTintColor={activeTintColor}
                            getLabelText={getLabelText}
                            badge={badge}
                        />
                    )
                })
            })
        }
    </Animated.View>
}

const BaseTabBarItem = ({
    route,
    labeled,
    getLabelText = ({ route }: { route: Route }) => route.title,
    activeTintColor,
    renderLabel,
    focused,
    badge
}: BaseTabBarItemType) => {
    return <View style={styles.tabBarItemWrapper} pointerEvents="none">
        <View style={styles.tabBarItem}>
            {labeled && (
                <View style={{ flex: 1 }}>
                    {renderLabel ? (
                        renderLabel({
                            route,
                            focused: true,
                            color: activeTintColor,
                        })
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Text
                                style={[styles.label, { color: activeTintColor }]}
                            >
                                {getLabelText({ route })}
                            </Text>
                            <TabBarBadge badge={badge} />
                        </View>
                    )}
                </View>
            )}
            {/* {
                focused &&
                <Image style={styles.rightArrow} source={require('@/img/personInfo/icon_more.png')}
                />
            } */}
        </View>
    </View>
}

type TabBarBadgeType = {
    badge?: string | number | boolean;
    style?: StyleProp<ViewStyle>;
    booleanSize?: number;
    numberSize?: number;
}

export const TabBarBadge = ({ badge, style, booleanSize = 8, numberSize = 16 }: TabBarBadgeType) => {
    return <View
        style={[
            styles.badgeContainer,
            {
                right:
                    (badge != null && typeof badge !== 'boolean'
                        ? String(badge).length * -2
                        : 0) - 2,
            },
            style
        ]}
    >
        {typeof badge === 'boolean' ? (
            <Badge visible={badge} size={booleanSize} />
        ) : (
            <Badge visible={badge != null} size={numberSize}>
                {badge}
            </Badge>
        )}
    </View>
}

const styles = StyleSheet.create({
    barContent: {
        // alignItems: 'center',
        overflow: 'hidden',
    },
    item: {
    },
    tabBarItemWrapper: {
        paddingHorizontal: setSize(30),
    },
    tabBarItem: {
        height: setSize(120),
        borderBottomWidth: theme.border_base_width,
        borderColor: theme.border_base_color,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        height: 24,
        width: 24,
        marginTop: 2,
        marginHorizontal: 12,
        alignSelf: 'center',
    },
    iconWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    label: {
        fontSize: setSizeText(28),
        color: theme.color_text_base,
    },
    rightArrow: {
        width: setSize(22),
        height: setSize(40),
        marginRight: setSize(10)
    },
    badgeContainer: {
        // position: 'absolute',
        // left: 10,
        // top: -2,
    }
});

export default TabBar