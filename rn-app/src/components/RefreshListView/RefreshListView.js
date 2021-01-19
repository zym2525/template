import React, { PureComponent } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, PanResponder } from 'react-native'
import PropTypes from "prop-types";
import _ from 'lodash';
import Touchable from '@/components/Touchable/Touchable'
import Text from '@/components/CustomText/CustomText'
import { ListEmptyHint, NoData } from '@/components/ListEmptyHint/ListEmptyHint'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
}

/**
 * @deprecated use SmartRefreshLayout instead of
 */
class RefreshListView extends PureComponent {
    static propTypes = {
        footerRefreshingText: PropTypes.string,
        footerFailureText: PropTypes.string,
        footerNoMoreDataText: PropTypes.string,
        footerEmptyDataText: PropTypes.string,
        refreshState: PropTypes.number,
        onHeaderRefresh: PropTypes.func,
        onFooterRefresh: PropTypes.func,
        useSwipeBtn: PropTypes.bool,
        ListHeaderComponent: PropTypes.element,
        ListEmptyHintComponent: PropTypes.node,
        NoDataComponent: PropTypes.node
    }

    static defaultProps = {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '出错了！点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
        footerEmptyDataText: '',
        useSwipeBtn: false,
        ListEmptyHintComponent: <ListEmptyHint />,
        NoDataComponent: <NoData />
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            scrollEnabled: true
        }
        this._rows = {};
        this._initPanResponder()
    }

    _initPanResponder() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, { vx, vy }) => {
                this.setState({
                    scrollEnabled: Math.abs(vy) - Math.abs(vx) > 0
                })
            },
        })
    }

    onHeaderRefresh = () => {
        if (this.shouldStartHeaderRefreshing()) {
            this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
        }
    }

    onEndReached = () => {
        if (this.shouldStartFooterRefreshing()) {
            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
        }
    }

    shouldStartHeaderRefreshing = () => {
        if (this.props.refreshState == RefreshState.HeaderRefreshing ||
            this.props.refreshState == RefreshState.FooterRefreshing) {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing = () => {
        let { refreshState, data } = this.props
        if (data.length == 0) {
            return false
        }

        return (refreshState == RefreshState.Idle)
    }

    onTouchBegin(index, sender) {
        for (let key in this._rows) {
            if (key != index && this._rows[key] && this._rows[key]._scrollToOrigin) this._rows[key]._scrollToOrigin()
        }
    }
    componentDidUpdate(preProps) {
        if (!_.isEqual(this.props.data, preProps.data)) {
            this._rows = {};
        }
    }

    renderListEmptyComponent() {
        let { refreshState, NoDataComponent, ListEmptyHintComponent } = this.props;
        if (refreshState == RefreshState.EmptyData) {
            return NoDataComponent
        } else if (refreshState != RefreshState.Failure && refreshState != RefreshState.FooterRefreshing && refreshState != RefreshState.HeaderRefreshing) {
            return ListEmptyHintComponent
        }
        return null
    }

    render() {
        let { useSwipeBtn,
            renderRight, renderLeft, widthForRightWhenSwipeOut, widthForLeftWhenSwipeOut, maxLeftWidth, maxRightWidth, colorForSwipeOutBgColor, contentBgColor, ListHeaderComponent,
            ...rest } = this.props
        let { scrollEnabled } = this.state;
        return (
            <FlatList
                ref={r => this.list = r}
                onEndReached={this.onEndReached}
                scrollEnabled={scrollEnabled}
                onRefresh={this.onHeaderRefresh}
                refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
                ListEmptyComponent={this.renderListEmptyComponent.bind(this)}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.1}
                extraData={{ state: this.state, props: this.props }}
                //{...this._panResponder.panHandlers}
                {...rest}
            />
        )
    }

    renderFooter = () => {
        let footer = null

        let footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle]
        let footerTextStyle = [styles.footerText, this.props.footerTextStyle]
        let { footerRefreshingText, footerFailureText, footerNoMoreDataText, footerEmptyDataText } = this.props

        switch (this.props.refreshState) {
            case RefreshState.Idle:
                footer = (<View />)
                break
            case RefreshState.Failure: {
                footer = (
                    <Touchable
                        TouchableComponent={TouchableOpacity}
                        style={footerContainerStyle}
                        onPress={() => {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
                    >
                        <Text style={footerTextStyle}>{footerFailureText}</Text>
                    </Touchable>
                )
                break
            }
            case RefreshState.EmptyData: {
                footer = (
                    <Touchable
                        TouchableComponent={TouchableOpacity}
                        style={footerContainerStyle}
                        onPress={() => {
                            this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
                        }}
                    >
                        <Text style={footerTextStyle}>{footerEmptyDataText}</Text>
                    </Touchable>
                )
                break
            }
            case RefreshState.FooterRefreshing: {
                footer = (
                    <View style={footerContainerStyle} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[footerTextStyle, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
                    </View>
                )
                break
            }
            case RefreshState.NoMoreData: {
                footer = (
                    <View style={footerContainerStyle} >
                        <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
                    </View>
                )
                break
            }
        }

        return footer
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: '#a6a6a6'
    }
})

export default RefreshListView