import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BottomSheetIndex = ({ navigation }) => {

    return (
        <View>
            <Text style={styles.listItem} onPress={() => navigation.navigate('BottomSheet')}>BottomSheet</Text>
            <Text style={styles.listItem} onPress={() => navigation.navigate('BlurToolbar')}>BlurToolbar</Text>
        </View>
    )
}

export default BottomSheetIndex

const styles = StyleSheet.create({
    listItem: {
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        fontSize: 28,
        textAlign: 'center'
    }
})
