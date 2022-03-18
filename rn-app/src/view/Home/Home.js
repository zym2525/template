import { StyleSheet, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import { widthLoading, Text } from '@/components'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import { BezierRadarHeader, SmartRefreshLayout } from '@zero-d/rn-components'
import { imageUpload } from '@/utils'
import { Button } from 'react-native-paper'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@/actions/user'

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
    },
    {
        router: 'Login',
        name: 'go to Login'
    },
    {
        router: 'Counter',
        name: 'go to Counter'
    },
    {
        router: 'WaterfallGrid',
        name: 'go to WaterfallGrid'
    },
]

@widthLoading(props => props.loading)
class Home extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

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
                <Button onPress={imageUpload} >imageUpload</Button>
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