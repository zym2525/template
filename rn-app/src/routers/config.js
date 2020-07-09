import React, { Component } from 'react'
import { TransitionPresets } from 'react-navigation-stack';
import theme from '@/style/theme'
import { setSizeText, setSize } from '@/utils/common';
import { Image, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import StyleConfig from '@/style/config'
import LinearGradient from 'react-native-linear-gradient';

// const icons = {
//     dark: require('@/img/common/icon-header-arrow-left.png'),
//     light: require('@/img/common/icon-header-arrow-left-light.png'),
// }

const styles = StyleSheet.create({
    backIconWrapper: {
        flex: 1,
        padding: setSize(20),
        marginLeft: setSize(6),
        paddingRight: setSize(40),
        justifyContent: 'center'
    },
    backIcon: {
        width: setSize(36),
        height: setSize(36)
    }
})

export const HeaderLeft = ({ scene, arrowType = 'light', wrapperStyle, onPress }) => (
    <TouchableWithoutFeedback onPress={() => onPress ? onPress() : scene.descriptor.navigation.goBack(scene.descriptor.key)}>
        <View style={[styles.backIconWrapper, wrapperStyle]}>
            {/* <Image style={styles.backIcon} source={icons[arrowType]} /> */}
        </View>
    </TouchableWithoutFeedback >
)

export const horizontalNavigationOptions = {
    cardOverlayEnabled: true,
    // gestureEnabled: true,
    cardStyle: {
        backgroundColor: '#fff'
    },
    ...TransitionPresets.SlideFromRightIOS
}

export const defaultHeaderConfig = {
    // headerLayoutPreset: 'center',
    headerStyle: {
        height: setSize(88),
        elevation: 0,
        // borderBottomColor: theme.border_base_color,
        // borderBottomWidth: theme.border_base_width,
    },
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
        justifyContent: 'center',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontSize: setSizeText(30),
    },
    headerLeft: HeaderLeft,
    headerLeftContainerStyle: {
        flex: 1,
    },
    headerRight: () => <View></View>
}

export const transparencyStatusBarHeaderConfig = {
    ...defaultHeaderConfig,
    headerStyle: {
        ...defaultHeaderConfig.headerStyle,
        // paddingTop: StyleConfig.status_height,
        height: setSize(128),
    },
    headerBackground: () => <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#5BA6FB', '#3776E9']} style={StyleSheet.absoluteFill} />
}

export const transparencyNoHeaderConfig = {
    ...defaultHeaderConfig,
    headerStyle: {
        ...defaultHeaderConfig.headerStyle,
        // paddingTop: StyleConfig.status_height,
        height: setSize(128),
    },
    // headerBackground: () => <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#5BA6FB', '#3776E9']} style={StyleSheet.absoluteFill} />

}