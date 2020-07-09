import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import StyleConfig from '@/style/config'
import Orientation from '@/utils/orientation';

const initial = Orientation.getInitialOrientation();

const contentHeight = initial == 'PORTRAIT' ? StyleConfig.screen_width : StyleConfig.screen_height

class RefreshableLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        let { refreshFn } = this.props;
        this.setState({ refreshing: true });
        refreshFn && refreshFn();
    }

    _endRefresh = () => {
        this.setState({ refreshing: false });
    }

    render() {
        let { refreshFn } = this.props;
        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ height: contentHeight - StyleConfig.status_height }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                scrollEnabled={false}
                refreshControl={
                    refreshFn ?
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        /> : null
                }

            >
                {this.props.children}
            </ScrollView>
        );
    }
}

export default RefreshableLayout