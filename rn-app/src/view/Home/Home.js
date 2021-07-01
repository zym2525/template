import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, FlatList, ScrollView } from 'react-native';
import { Text, widthLoading } from '@/components'
import StyleConfig from '@/style/config'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import { BezierRadarHeader, SmartRefreshLayout } from '@zero-d/rn-components'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@/actions/user'
import * as userService from '@/services/userService'
import { showModal } from './../../utils/common/showModal';

const TestModal = ({ onClose }) => {
    return <ModalWrapper
        onClose={onClose}
        render={() =>
            <Text style={{ fontSize: 40 }}>TestModalTestModalTestModalTestModal</Text>
        }

    />
}

TestModal.displayName = 'TestModal'

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
        router: 'BottomSheetIndex',
        name: 'go to BottomSheet'
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
        // showModal(<TestModal />)
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
                {/* <TestModal /> */}
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
