import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SmartRefreshLayout, BezierRadarHeader, ClassicsHeader } from '@/components'

class RefreshList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 1]
        };
        this.refreshList = React.createRef();
    }

    componentDidMount() {

    }

    onRefresh() {
        console.log('onRefresh');
        setTimeout(() => {
            // this.setState(preState => ({
            //     data: [1, 1, 1, 1]// preState.data.concat()
            // }), () => {
            this.refreshList.current.finishRefresh({ success: false })
            // })
        }, 2000)
    }

    onLoadMore() {
        console.log('onLoadMore');
        setTimeout(() => {
            this.setState(preState => ({
                data: preState.data.concat([1, 1, 1, 1])
            }), () => {
                if (this.state.data.length > 7) {
                    this.refreshList.current.finishLoadMoreWithNoMoreData()
                } else {
                    this.refreshList.current.finishLoadMore()
                }

            })
        }, 2000)
    }

    render() {
        console.log(this.state.data);
        return (
            <View style={{ flex: 1 }}>
                <SmartRefreshLayout
                    style={{ flex: 1, }}
                    onRefresh={this.onRefresh.bind(this)}
                    // onLoadMore={this.onLoadMore.bind(this)}
                    enableAutoLoadMore={false}
                    ref={this.refreshList}
                    enableLoadMore
                    HeaderComponent={() => <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.Scale} primaryColor='#59b8fa' />}
                // enableRefresh={false}
                >
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Text style={{
                                height: 100,
                                borderBottomWidth: 1,
                                borderBottomColor: '#dcdcdc',
                                fontSize: 28,
                            }}> RefreshList {index + 1}</Text>
                        }
                    />
                </SmartRefreshLayout>
            </View>
        );
    }
}

export default RefreshList;
