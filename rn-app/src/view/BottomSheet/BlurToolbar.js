import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native'
import BottomSheet from '@/components/Sheet/BottomSheetBehavior'
import Animated, { debug, interpolate, Extrapolate, max, multiply, add } from 'react-native-reanimated'

export default class Example extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerShown: false
    });

    constructor(props) {
        super(props);
    }


    titleHeight = 60;

    headerHeight = 240;

    fullScreenHeight = Dimensions.get('screen').height - StatusBar.currentHeight - this.titleHeight;

    secScreenHeight = this.fullScreenHeight - this.headerHeight;

    initHeight = 400;

    secScreenPoint = this.headerHeight / (this.fullScreenHeight - this.initHeight)

    componentDidMount() {
        console.log(this.headerHeight, this.secScreenHeight, this.fullScreenHeight);
    }

    renderInner = () => (
        <View style={[styles.content]}>
            {
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>
                    <View style={styles.panelButton} key={index}>
                        <Text style={styles.panelButtonTitle}>renderInner{index + 1}</Text>
                    </View>
                )
            }

        </View>
    )

    renderHeader = () => {
        let opacity = interpolate(this.fall, {
            inputRange: [0, this.secScreenPoint, 1],
            outputRange: [1, 1, 0],
            extrapolate: Extrapolate.CLAMP
        })

        let translateY = interpolate(this.fall, {
            inputRange: [0, this.secScreenPoint, 1],
            outputRange: [-this.headerHeight, 0, 0],
            extrapolate: Extrapolate.CLAMP
        })

        let needY = (this.headerHeight + this.titleHeight) / 2;

        let breakPoint = (this.headerHeight - needY) / (this.fullScreenHeight - this.initHeight);

        // let needY = (this.headerHeight + this.titleHeight) / 2;

        let titleTranslateY = interpolate(this.fall, {
            inputRange: [breakPoint, this.secScreenPoint, 1],
            outputRange: [0, needY, needY],
            extrapolate: Extrapolate.CLAMP
        })

        let titleTranslateX = interpolate(this.fall, {
            inputRange: [breakPoint, this.secScreenPoint, 1],
            outputRange: [0, -100, -100],
            extrapolate: Extrapolate.CLAMP
        })

        let titleScale = interpolate(this.fall, {
            inputRange: [breakPoint, this.secScreenPoint, 1],
            outputRange: [1, 1.5, 1.5],
            extrapolate: Extrapolate.CLAMP
        })

        return <View style={styles.headerWrapper}>
            <Animated.View style={styles.title}>
                <Text style={styles.arrow} onPress={() => this.props.navigation.goBack()}>&#xe606;</Text>
                <Animated.Text
                    style={[
                        styles.headerText,
                        {
                            position: 'absolute',
                            zIndex: 2000,
                            opacity: opacity,
                            transform: [{ translateX: titleTranslateX }, { translateY: titleTranslateY }, { scale: titleScale }],
                        }
                    ]}
                >this is header</Animated.Text>
            </Animated.View>
            <Animated.View
                style={[
                    styles.header,
                    {
                        height: this.headerHeight + this.titleHeight,
                        opacity: opacity,
                        transform: [{ translateY: translateY }],
                    }]
                } >

            </Animated.View>

        </View>
    }

    fall = new Animated.Value(1)


    render() {

        let imageOpacity = interpolate(this.fall, {
            inputRange: [0, this.secScreenPoint, 1],
            outputRange: [0, 0, 1],
            extrapolate: Extrapolate.CLAMP
        })

        return (
            <View style={styles.container}>
                {
                    this.renderHeader()
                }
                <BottomSheet
                    snapPoints={[this.fullScreenHeight, this.secScreenHeight, this.initHeight]}
                    renderContent={this.renderInner}
                    // renderHeader={this.renderHeader}
                    initialSnap={2}
                    callbackNode={this.fall}
                    enabledBottomInitialAnimation
                // enabledInnerScrolling={false}
                />
                <Animated.View
                    style={{
                        alignItems: 'center',
                        opacity: imageOpacity,
                    }}
                >
                    <Animated.Image
                        style={
                            [
                                styles.map,
                                {

                                    transform: [{ scale: max(1, multiply(this.fall, 0.8)) }],
                                }
                            ]

                        }
                        source={{ uri: 'https://aihuifile.oss-cn-hangzhou.aliyuncs.com/2021/Rescourse/Material/20210104/xYFyWFscy2.jpg' }}
                    />
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#59b8fa',
    },
    map: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    content: {
        padding: 20,
        backgroundColor: '#f7f5ee',
    },
    headerWrapper: {
        position: 'absolute',
        width: Dimensions.get('screen').width
    },
    title: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        backgroundColor: '#fff',
        padding: 20,
        height: 60,
        zIndex: 1000,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#59b8fa',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60
    },
    headerText: {
        fontSize: 28,
        height: 40
    },
    panelButton: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    panelButtonTitle: {
        fontSize: 20
    },
    arrow: {
        fontFamily: 'iconfont',
        fontSize: 30,
        color: '#c1c1c1',
        position: 'absolute',
        left: 20,
        top: 15
    }
})