import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle, DeviceEventEmitter, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class BezierRadarHeader extends Component {

    static propTypes = {
        /**
         * @example '#59b8fa'
         */
        primaryColor: PropTypes.string,
        accentColor: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <RNBezierRadarHeader {...this.props} />
        );
    }
}

BezierRadarHeader.propTypes = {
    ...ViewPropTypes, // include the default view properties
};

let RNBezierRadarHeader = requireNativeComponent('RNBezierRadarHeader', BezierRadarHeader, {
    nativeOnly: { onChange: true }
});

export default BezierRadarHeader;
