import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle, DeviceEventEmitter, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { SpinnerStyle } from '@/constants/enum'

class ClassicsFooter extends Component {

    /**
     * @description 不支持：MatchLayout
     */
    static SpinnerStyle = SpinnerStyle

    static propTypes = {
        /**
         * @param 设置主题颜色
         * @example '#59b8fa'
         */
        primaryColor: PropTypes.string,
        /**
         * @param 设置强调颜色
         */
        accentColor: PropTypes.string,
        /**
         * @param 设置移动样式
         */
        spinnerStyle: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <RNClassicsFooter {...this.props} />
        );
    }
}

ClassicsFooter.propTypes = {
    ...ViewPropTypes, // include the default view properties
};

let RNClassicsFooter = requireNativeComponent('RNClassicsFooter', ClassicsFooter, {
    nativeOnly: { onChange: true }
});

export default ClassicsFooter;
