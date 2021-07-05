import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Text } from '@/components'
import * as Animatable from 'react-native-animatable';
import TimerMixin from 'react-timer-mixin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '@/actions/user';

class StartUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log(this.props.dispatch);
    }

    componentWillUnmount() {
        this.timer && TimerMixin.clearTimeout(this.timer)
    }

    checkUserToken() {
        userActions.getConfig().then((data) => {
            if (data && data.access_token && data.username && data.password) {
                this.refreshUserToken(data);
            } else {
                this.onCheckUserTokenRejected()
            }
        }).catch(error => {
            this.onCheckUserTokenRejected()
        })
    }

    refreshUserToken(params) {
        let { userActions, navigation } = this.props;
        let loginParams = {
            userName: params.userName,
            password: params.password
        }
        userActions.login(loginParams, (data) => {
            this.showHomePage();
        }, this.onCheckUserTokenRejected.bind(this))
    }

    onCheckUserTokenRejected() {
        this.showHomePage();
    }

    onPageContentShow() {
        this.timer = TimerMixin.setTimeout(() => {
            // this.checkUserToken()
            this.checkUserToken();
        }, 300);
    }

    showHomePage() {
        let { navigation } = this.props;
        navigation.replace('Home');
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
    userActions: bindActionCreators(userActions, dispatch),
}))(StartUp);
