import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const debounceMillisecond = 500;

class Touchable extends Component {
    constructor(props, context) {
        super(props, context);
    }
    debouncePress() {
        let { onPress } = this.props;
        const clickTime = Date.now();
        if ((!this.lastClickTime ||
            Math.abs(this.lastClickTime - clickTime) > debounceMillisecond)) {
            this.lastClickTime = clickTime
            onPress && onPress()
        }
    }
    render() {
        let { TouchableComponent = TouchableWithoutFeedback, children, onPress, ...rest } = this.props;
        return (
            <TouchableComponent
                {...rest}
                onPress={this.debouncePress.bind(this)}>
                {children}
            </TouchableComponent>
        )
    }
}

export default Touchable;