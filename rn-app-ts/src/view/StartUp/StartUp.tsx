import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Text } from '@zero-d/rn-components'
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated'
import { useTimeout } from 'ahooks'
import { useActions } from '@/utils/hooks'
import type { StackScreenProps } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userOriginActions from '@/actions/user';
import { getUserToken, StorageUserToken } from '@/utils/storage'
import { LoginInput } from '@/services/userService'

type StartUpProps = StackScreenProps<ReactNavigation.RootParamList, 'StartUp'>;

const StartUp = (props: StartUpProps) => {

    const [finishPageShowTimeout, setFinishPageShowTimeout] = React.useState<undefined | number>(undefined);

    const userActions = useActions(userOriginActions);

    useTimeout(() => {
        checkUserToken();
    }, finishPageShowTimeout)

    function checkUserToken() {
        getUserToken().then((data) => {
            if (data && data.access_token && data.username && data.password) {
                refreshUserToken(data);
            } else {
                onCheckUserTokenRejected()
            }
        }).catch(error => {
            onCheckUserTokenRejected()
        })
    }

    async function refreshUserToken(params: StorageUserToken) {
        try {
            let loginParams: LoginInput = {
                username: params.username,
                password: params.password,
                imei: '111',
                Mac: await DeviceInfo.getMacAddress(),
                Version: DeviceInfo.getVersion(),
                Model: DeviceInfo.getModel()
            }
            userActions.loginSaga(loginParams, (data) => {
                showHomePage();
            }, onCheckUserTokenRejected)
        } catch (error) {

        }
    }

    function onCheckUserTokenRejected() {
        showHomePage();
    }

    function showHomePage() {
        let { navigation } = props;
        navigation.replace('Home');
    }

    function onPageContentShow(finished: boolean) {
        'worklet';
        if (finished) {
            runOnJS(setFinishPageShowTimeout)(300)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
            <Animated.View entering={FadeInUp.duration(1000).withCallback(onPageContentShow)} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 60 }}>this is a start up page</Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default StartUp
