import React, { useState } from 'react'
import { StyleSheet, Animated, View } from 'react-native'
import PropTypes from 'prop-types';


/**
 * 
 * @description scrollView定义stickyHeaderIndices也有类似效果 SectionList的stickySectionHeadersEnabled
 */
const StickyItem = (props) => {

    const [stickyLayoutY, setStickyLayoutY] = useState(0);

    const _onLayout = (event) => {
        setStickyLayoutY(
            event.nativeEvent.layout.y,
        );
    }

    const { stickyHeaderY = -1, stickyScrollY = new Animated.Value(0), children, style } = props;

    const y = stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;

    const translateY = stickyScrollY.interpolate({
        inputRange: [-1, 0, y, y + 1],
        outputRange: [0, 0, 0, 1],
    });
    return (
        <Animated.View
            onLayout={_onLayout}
            style={
                [
                    style,
                    { zIndex: 9999, transform: [{ translateY }] }
                ]}
        >
            { children}

        </Animated.View>
    )
}

StickyItem.propTypes = {
    /**
     * 外层ScrollView滚动高度
     */
    stickyScrollY: PropTypes.object.isRequired,
    /**
     * 吸顶组件前面滚动多少高度后固定
     */
    stickyHeaderY: PropTypes.number
}

export default StickyItem