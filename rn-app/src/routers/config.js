import React, { Component } from 'react'
import { setSizeText, setSize } from '@/utils/common';
import { Image, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import StyleConfig from '@/style/config'


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

export const HeaderLeft = React.memo((props) => {
    let { navigation, arrowType = 'dark', wrapperStyle, onPress } = props;
    return (
        <TouchableWithoutFeedback onPress={() => onPress ? onPress() : navigation.goBack()}>
            <View style={[styles.backIconWrapper, wrapperStyle]}>
                {/* <Image style={styles.backIcon} source={icons[arrowType]} /> */}
            </View>
        </TouchableWithoutFeedback >
    )
})

export function transparencyStatusBarHeaderConfig({ navigation, route }) {
    return {
        headerStyle: {
            elevation: 0,
            height: setSize(88) + StyleConfig.status_height,
        },
        headerTitleContainerStyle: {
            justifyContent: 'center',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
            color: '#333',
            fontSize: setSizeText(36),
        },
        // headerLeft: props => <HeaderLeft {...props} navigation={navigation} route={route} />,
        headerLeftContainerStyle: {
            flex: 1
        },
        headerRight: () => null,
    }
}

export const nativeStackConfig = ({ navigation, route }) => ({
    stackAnimation: 'slide_from_right',
    replaceAnimation: 'push',
    // headerHideShadow:true,
    // headerLeft: props => <HeaderLeft {...props} navigation={navigation} route={route} />,
    // headerTintColor: '#999',
    headerTitleStyle: {
        fontWeight: 'normal',
        color: '#333',
        fontSize: setSizeText(36),
    },
})

export function NativeStackTitle() {
    const navigation = useNavigation();
    return (
        <View style={nativeStyles.headerStyle}>

        </View>
    )
}

const nativeStyles = StyleSheet.create({
    headerStyle: {
        height: setSize(88) + StyleConfig.status_height,
    }
})