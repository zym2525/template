import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle, DeviceEventEmitter, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import ClassicsFooter from './ClassicsFooter'

export const RefreshEventType = {
    OnStateChanged: 1,
    OnRefresh: 2,
    OnLoadMore: 3,
    onFooterMoving: 4,
    onHeaderMoving: 5,
}

const RefreshState = {
    None: 'None',
    PullDownToRefresh: 'PullDownToRefresh',
    PullDownCanceled: 'PullDownCanceled',
    ReleaseToRefresh: 'ReleaseToRefresh',
    ReleaseToTwoLevel: 'ReleaseToTwoLevel',
    RefreshReleased: 'RefreshReleased',
    Refreshing: 'Refreshing',
    RefreshFinish: 'RefreshFinish',
    PullUpToLoad: 'PullUpToLoad',
    PullUpCanceled: 'PullUpCanceled',
    ReleaseToLoad: 'ReleaseToLoad',
    TwoLevelReleased: 'TwoLevelReleased',
    LoadReleased: 'LoadReleased',
    Loading: 'Loading',
    LoadFinish: 'LoadFinish',
    TwoLevel: 'TwoLevel',
    TwoLevelFinish: 'TwoLevelFinish',
}

class SmartRefreshLayout extends Component {

    static RefreshState = RefreshState;

    static propTypes = {
        /**
         * @param 主题颜色
         */
        primaryColor: PropTypes.string,
        /**
         * @param 显示下拉高度/手指真实下拉高度=阻尼效果
         */
        dragRate: PropTypes.number,
        /**
         * @param 回弹动画时长（毫秒）
         */
        reboundDuration: PropTypes.number,
        /**
         * @param Header标准高度（显示下拉高度>=标准高度 触发刷新）
         */
        headerHeight: PropTypes.number,
        /**
         * @param Footer标准高度（显示上拉高度>=标准高度 触发加载）
         */
        footerHeight: PropTypes.number,
        /**
        * @param 设置 Header 起始位置偏移量
        */
        headerInsetStart: PropTypes.number,
        /**
        * @param 设置 Footer 起始位置偏移量
        */
        footerInsetStart: PropTypes.number,
        /**
         * @param 最大显示下拉高度/Header标准高度
         */
        headerMaxDragRate: PropTypes.number,
        /**
         * @param 最大显示下拉高度/Footer标准高度
         */
        footerMaxDragRate: PropTypes.number,
        /**
        * @param 触发刷新距离 与 HeaderHeight 的比率
        */
        headerTriggerRate: PropTypes.number,
        /**
        * @param 触发加载距离 与 FooterHeight 的比率
        */
        footerTriggerRate: PropTypes.number,
        /**
         * @param 是否启用下拉刷新功能
         */
        enableRefresh: PropTypes.bool,
        /**
         * @param 是否启用上拉加载功能
         */
        enableLoadMore: PropTypes.bool,
        /**
         * @param 是否启用列表惯性滑动到底部时自动加载更多
         * @description 如果是true 滑动到底部时会直接触发onLoadeMore 如果是false 需要手动下滑到释放加载更多
         */
        enableAutoLoadMore: PropTypes.bool,
        /**
         * @param 是否启用纯滚动模式
         */
        enablePureScrollMode: PropTypes.bool,
        /**
         * @param 是否启用嵌套滚动
         */
        enableNestedScroll: PropTypes.bool,
        /**
         * @param 是否启用越界回弹
         */
        enableOverScrollBounce: PropTypes.bool,
        /**
         * @param 是否在加载完成时滚动列表显示新的内容
         */
        enableScrollContentWhenLoaded: PropTypes.bool,
        /**
         * @param 是否下拉Header的时候向下平移列表或者内容
         */
        enableHeaderTranslationContent: PropTypes.bool,
        /**
         * @param 是否上拉Footer的时候向上平移列表或者内容
         */
        enableFooterTranslationContent: PropTypes.bool,
        /**
         * @param 是否在列表不满一页时候开启上拉加载功能
         */
        enableLoadMoreWhenContentNotFull: PropTypes.bool,
        /**
         * @param 是否在全部加载结束之后Footer跟随内容
         */
        enableFooterFollowWhenNoMoreData: PropTypes.bool,
        /**
         * @param 是否在刷新的时候禁止列表的操作
         */
        disableContentWhenRefresh: PropTypes.bool,
        /**
         * @param 是否在加载的时候禁止列表的操作
         */
        disableContentWhenLoading: PropTypes.bool,
        /**
         * @param 是否启用越界拖动
         */
        enableOverScrollDrag: PropTypes.bool,
        /**
         * @param 上拉刷新回调
         */
        onRefresh: PropTypes.func,
        /**
         * @param 下拉加载回调
         */
        onLoadMore: PropTypes.func,

        onStateChanged: PropTypes.func,
    }

    static defaultProps = {
        dragRate: 0.5,
        reboundDuration: 300,
        headerHeight: 100,
        footerHeight: 100,
        headerInsetStart: 0,
        footerInsetStart: 0,
        headerMaxDragRate: 2,
        footerMaxDragRate: 2,
        headerTriggerRate: 1,
        footerTriggerRate: 1,
        enableRefresh: true,
        enableLoadMore: false,
        enableAutoLoadMore: true,
        enablePureScrollMode: false,
        enableNestedScroll: false,
        enableOverScrollBounce: true,
        enableScrollContentWhenLoaded: true,
        enableHeaderTranslationContent: true,
        enableFooterTranslationContent: true,
        enableLoadMoreWhenContentNotFull: true,
        enableFooterFollowWhenNoMoreData: false,
        disableContentWhenRefresh: true,
        disableContentWhenLoading: true,
        enableOverScrollDrag: true,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.subscriptions = [];
        this.state = {
            refreshState: 'null'
        }
    }

    onChange(event) {
        // console.log('event: ', event.nativeEvent);
        // if (event.nativeEvent.type == 8) {
        //     console.log('event222: ', event.nativeEvent);
        // }
        switch (event.nativeEvent.type) {
            case RefreshEventType.OnStateChanged:
                this.onStateChanged(event.nativeEvent.event);
                break;
            case RefreshEventType.OnRefresh:
                this._handleOnRefresh();
                break;
            case RefreshEventType.OnLoadMore:
                this._handleOnLoadMore();
                break;
            case RefreshEventType.onFooterMoving:
                this._handeOnFooterMoving(event.nativeEvent.event);
                break;
            case RefreshEventType.onHeaderMoving:
                this._handeOnHeaderMoving(event.nativeEvent.event);
                break;
            default:
                break;
        }
    }

    _handleOnRefresh() {
        let { onRefresh } = this.props;
        if (onRefresh) {
            onRefresh();
        } else {
            this.finishRefresh({ delayed: 2000 })
        }
    }

    _handleOnLoadMore() {
        let { onLoadMore } = this.props;
        if (onLoadMore) {
            onLoadMore();
        } else {
            this.finishLoadMore({ delayed: 2000 })
        }
    }

    /**
     * 
     * @param {object} data 
     * @example data:{percent: 0.019999999552965164, maxDragHeight: 400, footerHeight: 200, offset: 4, isDragging: false}
     */
    _handeOnFooterMoving(data) {
        let { onFooterMoving } = this.props;
        onFooterMoving && onFooterMoving(data);
    }

    _handeOnHeaderMoving(data) {
        let { onHeaderMoving } = this.props;
        onHeaderMoving && onHeaderMoving(data);
    }

    onStateChanged(event) {
        // console.log('event: ', event);
        let { onStateChanged } = this.props;
        this.setState({
            refreshState: event.newState
        })
        /**
         * @example {newState: 'ReleaseToRefresh', oldState: 'PullDownToRefresh'}
         */
        onStateChanged && onStateChanged(event);
    }

    getCurrentState() {
        return this.state.refreshState;
    }

    /**
     * @description 自动刷新
     * @param {number} delayed 延迟毫秒 
     */
    autoRefresh(delayed = 0) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.autoRefresh,
            [delayed],
        );
    }

    /**
     * @description 自动加载
     * @param {number} delayed 延迟毫秒 
     */
    autoLoadMore(delayed = 0) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.autoLoadMore,
            [delayed],
        );
    }

    /**
     * @description 结束刷新
     * @param {number} delayed 延迟毫秒 
     * @param {boolean} success 刷新失败
     */
    finishRefresh({ delayed = 0, success = true } = {}) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.finishRefresh,
            [delayed, success],
        );
    }

    /**
     * @description 结束加载
     * @param {number} delayed 延迟毫秒 
     * @param {boolean} success 刷新失败
     */
    finishLoadMore({ delayed = 0, success = true } = {}) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.finishLoadMore,
            [delayed, success],
        );
    }

    /**
     * @description 完成加载并标记没有更多数据
     */
    finishLoadMoreWithNoMoreData() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.finishLoadMoreWithNoMoreData,
            [],
        );
    }

    /**
     * @description 关闭 Header 或者 Footer
     */
    closeHeaderOrFooter() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.closeHeaderOrFooter,
            [],
        );
    }

    /**
     * @description 设置更多数据状态
     * @param {boolean} delayed 延迟毫秒
     */
    setNoMoreData(hasMoreData = false) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNSmartRefreshLayout.Commands.setNoMoreData,
            [hasMoreData],
        );
    }


    _renderHeader() {
        let { HeaderComponent } = this.props;
        if (HeaderComponent && typeof HeaderComponent == 'function') {
            let header = HeaderComponent();
            if (React.isValidElement(header)) return header;
        } else {
            return <View collapsable={false}></View>
        }
    }

    _renderFooter() {
        let { FooterComponent } = this.props;
        if (FooterComponent && typeof FooterComponent == 'function') {
            let footer = FooterComponent();
            if (React.isValidElement(footer)) return footer;
        } else {
            return <ClassicsFooter accentColor='#333333' /> //<View collapsable={false}></View>
        }
    }

    render() {
        let { children, style, ...rest } = this.props;
        return (
            <RNSmartRefreshLayout style={[{ zIndex: -1, }, style]} {...rest} onChange={this.onChange} >
                {this._renderHeader()}
                {React.Children.only(children)}
                {this._renderFooter()}
            </RNSmartRefreshLayout>
        );
    }
}

SmartRefreshLayout.propTypes = {
    ...ViewPropTypes, // include the default view properties
    ...SmartRefreshLayout.propTypes,
};

let RNSmartRefreshLayout = requireNativeComponent('RNSmartRefreshLayout', SmartRefreshLayout, {
    nativeOnly: { onChange: true }
});

export default SmartRefreshLayout;
