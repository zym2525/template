import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Text } from '@zero-d/rn-components'
import Animated, { FadeInUp, runOnJS } from 'react-native-reanimated'
import { useTimeout } from 'ahooks'
import { useActions } from '@/utils/hooks'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userOriginActions from '@/actions/user';
import { getUserToken } from '@/utils/storage'

const StartUp = (props) => {

    const [finishPageShowTimeout, setFinishPageShowTimeout] = React.useState(undefined);

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

    function refreshUserToken(params) {
        let loginParams = {
            userName: params.userName,
            password: params.password
        }
        userActions.loginSaga(loginParams, (data) => {
            showHomePage();
        }, onCheckUserTokenRejected)
    }

    function onCheckUserTokenRejected() {
        showHomePage();
    }

    function showHomePage() {
        let { navigation } = props;
        navigation.replace('Home');
    }

    function onPageContentShow(finished) {
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
