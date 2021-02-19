import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle, DeviceEventEmitter, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export const TwoLevelHeaderEventType = {
    OnTwoLevel: 8,
}

class TwoLevelHeader extends Component {

    static propTypes = {
        /**
         * @param 设置下拉 Header 的最大高度比值
         */
        maxRate: PropTypes.number,
        /**
         * @param 是否禁止在二极状态是上滑关闭状态回到初态
         */
        enablePullToCloseTwoLevel: PropTypes.bool,
        /**
         * @param 设置是否开启刷新功能
         */
        enableRefresh: PropTypes.bool,
        /**
         * @param 设置触发二楼的白百分比
         */
        floorRate: PropTypes.number,
        /**
         * @param 设置触发刷新的百分比
         */
        refreshRate: PropTypes.number,
        /**
         * @param 设置是否开启二级刷新
         */
        enableTwoLevel: PropTypes.bool,
        /**
         * @param 设置二楼展开动画持续的时间
         */
        floorDuration: PropTypes.number,
        /**
         * @param 设置二路底部上划关闭所占高度比率
         */
        bottomPullUpToCloseRate: PropTypes.number,
    }

    static defaultProps = {
        maxRate: 2.5,
        enablePullToCloseTwoLevel: true,
        enableRefresh: true,
        floorRate: 1.9,
        refreshRate: 1,
        enableTwoLevel: true,
        floorDuration: 1000,
        bottomPullUpToCloseRate: 1 / 6,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
        this.onChange = this.onChange.bind(this);
    }

    /**
     * @description 结束二级刷新
     */
    finishTwoLevel() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNTwoLevelHeaderManager.Commands.finishTwoLevel,
            [],
        );
    }

    /**
     * @description 主动打开二楼
     * @param {boolean} withOnTwoLevelListener 是否触发 OnTwoLevelListener 监听器
     */
    openTwoLevel(withOnTwoLevelListener = true) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.RNTwoLevelHeaderManager.Commands.openTwoLevel,
            [withOnTwoLevelListener],
        );
    }

    onChange(event) {
        // console.log('event: ', event.nativeEvent);
        switch (event.nativeEvent.type) {
            case TwoLevelHeaderEventType.OnTwoLevel:
                this.onTwoLevel(event.nativeEvent.event);
                break;
            default:
                break;
        }
    }

    onTwoLevel(data) {
        let { onTwoLevel } = this.props;
        onTwoLevel && onTwoLevel(data);
    }

    render() {
        return (
            <RNTwoLevelHeaderManager {...this.props} onChange={this.onChange} />
        );
    }
}

TwoLevelHeader.propTypes = {
    ...ViewPropTypes, // include the default view properties
};

let RNTwoLevelHeaderManager = requireNativeComponent('RNTwoLevelHeaderManager', TwoLevelHeader, {
    nativeOnly: { onChange: true }
});

export default TwoLevelHeader;
