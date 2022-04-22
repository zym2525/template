import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import { Text } from '@/components'
import { toast } from '@/utils';
import DeviceInfo from 'react-native-device-info';

import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import * as userActions from '@/actions/user';

type Props = {

} & PropsFromRedux

type State = {
    userName: string
    password: string
}

class Login extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            // showPassword: false
        };
    }

    async handleLogin() {
        let { userName, password } = this.state;
        if (userName == '') {
            toast('用户名不能为空');
            return;
        }
        if (password == '') {
            toast('密码不能为空');
            return;
        }
        this.props.userActions.loginSaga({
            username: userName,
            password,
            imei: '111',
            Mac: await DeviceInfo.getMacAddress(),
            Version: DeviceInfo.getVersion(),
            Model: DeviceInfo.getModel()
        })
    }

    render() {
        let { userName, password } = this.state;
        return (
            <ScrollView style={{ flex: 1, paddingHorizontal: 100 }}>
                <Text style={{ fontSize: 40, textAlign: 'center' }}>登录</Text>
                <TextInput
                    style={styles.textInput}
                    label="用户名"
                    value={userName}
                    onChangeText={text => this.setState({ userName: text })}
                />
                <TextInput
                    style={styles.textInput}
                    label="密码"
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />
                <Button mode="contained" onPress={this.handleLogin.bind(this)}>
                    Press me
                </Button>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        margin: 20
    }
});

const connector = connect((state, props) => ({
}), dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
}))

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Login);
