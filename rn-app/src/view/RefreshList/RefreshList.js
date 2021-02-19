import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, StatusBar, Image, ImageBackground, ScrollView } from 'react-native';
import { SmartRefreshLayout, BezierRadarHeader, ClassicsHeader } from '@/components'
import Animated, { debug, Value, clockRunning, startClock, timing, set, cond, Clock, event, sub, min, Easing, block, stopClock, divide, add, max, interpolate, Extrapolate } from 'react-native-reanimated'
import { px2dp } from './../../utils/common/scaleSize';
import { PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';

class RefreshList extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerShown: false
    });





    constructor(props) {
        super(props);
        this.state = {
            data: [1, 1, 1, 1,]
        };
        this.refreshList = React.createRef();
        this.titleHeight = 60;
        this.titleCollapseHeight = 200;
        this.clock = new Clock();
        this.dragY = new Value(0);
        this.preDragY = new Value(0);
        this.velocityY = new Value(0);
        this.gestureState = new Value(-1);
        this._onGestureEvent = event([
            {
                nativeEvent: { translationY: this.dragY, velocityY: this.velocityY, state: this.gestureState },
            },
        ]);



        let maxTransY = (this.titleCollapseHeight + this.titleHeight) / 2;
        this.translateY = interpolate(this.dragY, {
            inputRange: [-maxTransY, 0],
            outputRange: [0, maxTransY],
            extrapolate: Extrapolate.CLAMP
        })

        // new Value((this.titleCollapseHeight + this.titleHeight) / 2);
        this.translateX = new Value(-120);
    }

    componentDidMount() {

    }

    onRefresh() {
        console.log('onRefresh');
        setTimeout(() => {
            // this.setState(preState => ({
            //     data: [1, 1, 1, 1]// preState.data.concat()
            // }), () => {
            this.refreshList.current.finishRefresh({ success: false })
            // })
        }, 2000)
    }

    onLoadMore() {
        console.log('onLoadMore');
        setTimeout(() => {
            this.setState(preState => ({
                data: preState.data.concat([1, 1, 1, 1])
            }), () => {
                if (this.state.data.length > 7) {
                    this.refreshList.current.finishLoadMoreWithNoMoreData()
                } else {
                    this.refreshList.current.finishLoadMore()
                }

            })
        }, 2000)
    }

    render() {
        console.log(this.state.data);
        return (
            <PanGestureHandler
                enabled={false}
                minDist={10}
                onGestureEvent={this._onGestureEvent}
                onHandlerStateChange={this._onGestureEvent}
            >
                <Animated.View style={{ flex: 1 }} collapsable={false}>
                    <Animated.View style={[styles.title, { height: this.titleHeight }]}>
                        <Text style={styles.arrow} onPress={() => this.props.navigation.goBack()}>&#xe606;</Text>
                        <Animated.Text
                            style={[
                                styles.headerText,
                                {
                                    position: 'absolute',
                                    transform: [{ translateY: this.translateY }, { translateX: this.translateX }]
                                }
                            ]}
                        >this is header</Animated.Text>
                    </Animated.View>
                    <Animated.View
                        style={{
                            height: this.titleCollapseHeight,
                            backgroundColor: '#59b8fa'
                        }}
                    >

                    </Animated.View>
                    <SmartRefreshLayout
                        style={{ flex: 1, }}
                        onRefresh={this.onRefresh.bind(this)}
                        onLoadMore={this.onLoadMore.bind(this)}
                        enableAutoLoadMore={false}
                        ref={this.refreshList}
                        enableLoadMore
                        primaryColor='#59b8fa'
                        HeaderComponent={() => <ClassicsHeader accentColor='#ffffff' spinnerStyle={ClassicsHeader.SpinnerStyle.Scale} />}
                    // enableRefresh={false}
                    >
                        <FlatList
                            style={{ flex: 1, backgroundColor: '#fff' }}
                            data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <Text
                                    style={{
                                        height: 100,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#dcdcdc',
                                        fontSize: 28,
                                    }}
                                > RefreshList {index + 1}</Text>
                            }
                        />
                        {/* <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                        {
                            this.state.data.map((item, index) =>
                                <Text
                                    key={index}
                                    style={{
                                        height: 100,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#dcdcdc',
                                        fontSize: 28,
                                    }}
                                > RefreshList {index + 1}</Text>
                            )
                        }
                    </ScrollView> */}
                    </SmartRefreshLayout>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        // position: 'absolute',
        // width: Dimensions.get('window').width,
        backgroundColor: '#fe1200',
        padding: 20,
        height: 60,
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 30,
        color: '#c1c1c1',
        position: 'absolute',
        left: 20,
        top: 15
    },
    headerText: {
        fontSize: 28,
        height: 40,
    },
})

export default RefreshList;
