import React, { Component } from 'react';
import { requireNativeComponent, View, UIManager, findNodeHandle, DeviceEventEmitter, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class ClassicsHeader extends Component {

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
            <RNClassicsHeader {...this.props} />
        );
    }
}

ClassicsHeader.propTypes = {
    ...ViewPropTypes, // include the default view properties
};

let RNClassicsHeader = requireNativeComponent('RNClassicsHeader', ClassicsHeader, {
    nativeOnly: { onChange: true }
});

export default ClassicsHeader;
