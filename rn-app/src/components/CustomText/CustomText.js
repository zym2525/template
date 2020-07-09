import React, { Component } from 'react'
import { Text as RNText, View } from 'react-native'
import _ from 'lodash';

const myStyle = {
    fontFamily: 'normal',
    includeFontPadding: false,
    textAlignVertical: 'center',
}

export default class Text extends Component {
    constructor(props) {
        super(props);
        // if (this.props.onPress) {
        //     this.onPressDebounced = _.debounce(this.props.onPress, 100, { leading: true, trailing: false });
        // }
    }
    render() {
        let { style, children, ...rest } = this.props;
        return (
            <RNText style={[myStyle, style]} {...rest}>{children}</RNText>
        )
    }
}