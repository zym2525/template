import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    TextInput,
} from 'react-native'
import BottomSheet from '@/components/Sheet/BottomSheetBehavior'

export default class Example extends React.Component {

    renderInner = () => (
        <View style={styles.panel}>
            <TextInput
                style={styles.search}
                onFocus={() => {
                    this.bs.current.snapTo(1)
                }}
                placeholder="search"
            />
            <Text style={styles.panelTitle}>San Francisco Airport</Text>
            <Text style={styles.panelSubtitle}>
                International Airport - 40 miles away
      </Text>
            <View style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Directions</Text>
            </View>
            <View style={styles.panelButton}>
                <Text style={styles.panelButtonTitle}>Search Nearby</Text>
            </View>
            <Image
                style={styles.photo}
                source={{ uri: 'https://raw.githubusercontent.com/osdnk/react-native-reanimated-bottom-sheet/master/Example/assets/airport-photo.jpg' }}
            />
        </View>
    )

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    )

    bs = React.createRef()

    render() {
        return (
            <View style={styles.container}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[500, 250]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    initialSnap={1}
                // enabledInnerScrolling={false}
                />
                <TouchableWithoutFeedback onPress={() => this.bs.current.snapTo(0)}>
                    <Image style={styles.map} source={{ uri: 'https://aihuifile.oss-cn-hangzhou.aliyuncs.com/2021/Rescourse/Material/20210104/xYFyWFscy2.jpg' }} />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const IMAGE_SIZE = 200

const styles = StyleSheet.create({
    search: {
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    box: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    panel: {
        height: 600,
        padding: 20,
        backgroundColor: '#f7f5ee',
    },
    header: {
        backgroundColor: '#f7f5ee',
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#318bfb',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    map: {
        height: '100%',
        width: '100%',
    },
})