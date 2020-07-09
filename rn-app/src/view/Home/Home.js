import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import { Text, widthLoading } from '@/components'
import StyleConfig from '@/style/config'
import _compose from 'recompact/compose';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@/actions/user'
import * as userService from '@/services/userService'

@widthLoading(props => props.loading)
class Home extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        let r1 = await userService.testGet({})
        console.log('r1: ', r1);

    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: StyleConfig.status_height }}>
                <Text>this is a home</Text>
            </View>
        );
    }

}

export default connect((state, props) => ({
    loading: state.common.loading,
    // user: state.user.user,
}), (dispatch) => ({
    userActions: bindActionCreators(userActions, dispatch),
}))(Home)
