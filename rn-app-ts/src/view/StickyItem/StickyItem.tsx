import React, { Component } from 'react';
import { View, FlatList, Text, UIManager } from 'react-native';
import { SmartRefreshLayout, StickyItem, SmartRefreshLayoutOnFooterMovingEvent } from '@zero-d/rn-components'
import Animated from 'react-native-reanimated'

type Props = {

}

type State = {
    scrollY: Animated.Value<number>
    headHeight: number
    smartRefreshFooterOffset: Animated.Value<number>
}

class StickyDemo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            headHeight: -1,
            smartRefreshFooterOffset: new Animated.Value(0),
        };
    }

    onFooterMoving({ nativeEvent: { offset } }: SmartRefreshLayoutOnFooterMovingEvent) {
        console.log('offset: ', offset);
        this.state.smartRefreshFooterOffset.setValue(offset / 2);
    }

    render() {
        return (
            <Animated.ScrollView
                refreshControl={<SmartRefreshLayout
                    enableRefresh={false}
                    onFooterMoving={this.onFooterMoving.bind(this)}
                    footerMaxDragRate={0}
                />}
                stickyHeaderIndices={[6]}
                style={{ flex: 1 }}
                onScroll={
                    Animated.event(
                        [{
                            nativeEvent: { contentOffset: { y: this.state.scrollY } } // 记录滑动距离
                        }],
                        { useNativeDriver: true }) // 使用原生动画驱动
                }
                scrollEventThrottle={1}
            >

                <View onLayout={(e) => {
                    let { height } = e.nativeEvent.layout;
                    this.setState({ headHeight: height });  // 给头部高度赋值
                }}>
                    {/* // 里面放入第一部分组件 */}
                    <Text style={{ fontSize: 20 }}>文字</Text>
                    <Text style={{ fontSize: 20 }}>文字</Text>
                    <Text style={{ fontSize: 20 }}>文字</Text>
                    <Text style={{ fontSize: 20 }}>文字</Text>
                </View>

                <StickyItem
                    stickyHeaderY={this.state.headHeight} // 把头部高度传入
                    stickyScrollY={this.state.scrollY}    // 把滑动距离传入
                >
                    {/* // 里面放入第二部分组件 */}
                    <Text style={{ fontSize: 30, backgroundColor: 'yellow' }}>我会吸顶</Text>
                </StickyItem>

                {
                    new Array(60).fill('').map((item, index) =>
                        <Text key={index} style={{ fontSize: 20 }}>文字</Text>
                    )
                }

            </Animated.ScrollView>

        );
    }
}

export default StickyDemo;
