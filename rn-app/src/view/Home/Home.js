import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, FlatList, ScrollView } from 'react-native';
import { Text, widthLoading, SmartRefreshLayout, BezierRadarHeader } from '@/components'
import StyleConfig from '@/style/config'
import _compose from 'recompact/compose';

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@/actions/user'
import * as userService from '@/services/userService'


const List = [
    {
        router: 'RefreshList',
        name: 'go to RefreshList'
    },
    {
        router: 'StickyItem',
        name: 'go to StickyItem'
    },
    {
        router: 'ParallaxHeader',
        name: 'go to ParallaxHeader'
    }
]

@widthLoading(props => props.loading)
class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerShown: false
    });

    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // let r1 = await userService.testGet({})
        // console.log('r1: ', r1);

    }



    render() {
        let { navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }}>
                <FlatList
                    refreshControl={<SmartRefreshLayout HeaderComponent={() => <BezierRadarHeader />} />}
                    data={List}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <Text style={styles.listItem} onPress={() => navigation.navigate(item.router)}>{item.name}</Text>
                    }
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    listItem: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        fontSize: 28,
        textAlign: 'center'
    }
})

export default connect((state, props) => ({
    loading: state.common.loading,
    // user: state.user.user,
}), (dispatch) => ({
    userActions: bindActionCreators(userActions, dispatch),
}))(Home)
