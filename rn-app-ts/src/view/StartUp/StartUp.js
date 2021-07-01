import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Text } from '@/components'
import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserAction from '../../actions/user';
import * as homeActions from '../../actions/home';

class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillUnmount() {
        this.timer && TimerMixin.clearTimeout(this.timer)
    }

    // checkUserToken() {
    //     console.log('checkUserToken')
    //     UserAction.getConfig().then((data) => {
    //         console.log('User data: ', data);
    //         if (data && data.access_token && data.username && data.password) {
    //             this.refreshUserToken(data);
    //         } else {
    //             this.onCheckUserTokenRejected();
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         this.onCheckUserTokenRejected();
    //     })
    // }

    // refreshUserToken(params) {
    //     let { userActions } = this.props;
    //     let loginParams = {
    //         LoginName: params.username,
    //         Password: params.password
    //     }
    //     if (params.isFromNBEduPlat) {
    //         // loginParams.IsFromNBEduPlat = true
    //     }
    //     userActions.watchLogin(loginParams, (data) => {
    //         this.showHomePage();
    //     }, this.onCheckUserTokenRejected.bind(this))
    // }

    // onCheckUserTokenRejected() {
    //     this.showLoginPage();
    // }

    // showHomePage() {
    //     let { homeActions, navigation } = this.props;
    //     homeActions.homeInit([], () => {
    //         navigation.navigate('AppStack')
    //     }, () => {
    //         navigation.navigate('AppStack')
    //     })
    // }

    // showLoginPage() {
    //     let { homeActions, navigation } = this.props;
    //     homeActions.homeInit([], () => {
    //         navigation.navigate('Auth');
    //         // navigation.navigate('LoginModifyUserInfo', {
    //         //     userId: 'de44b9bc-648c-4e9d-bed0-7e22733e0215',
    //         //     phoneNumber: '1885841840'
    //         // });
    //     }, () => {
    //         navigation.navigate('Auth')
    //     })
    // }

    onPageContentShow() {
        this.timer = TimerMixin.setTimeout(() => {
            // this.checkUserToken()
            this.props.navigation.navigate('App');
        }, 300);
    }

    render() {
        return (
            <View>
                <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
                <Animatable.View
                    onAnimationEnd={() => this.onPageContentShow()}
                    style={{ alignItems: 'center' }}
                    animation="fadeInDown">
                    <Text style={{ fontSize: 60 }}>this is a start up page</Text>
                </Animatable.View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#999',
        paddingVertical: 20,
        marginBottom: 10,
        fontSize: 60
    },
    startImg: {
        width: '100%',
        height: '100%'
    }
})

export default connect((state, props) => ({
}), dispatch => ({
    userActions: bindActionCreators(UserAction, dispatch),
    homeActions: bindActionCreators(homeActions, dispatch),
}))(StartUp);
