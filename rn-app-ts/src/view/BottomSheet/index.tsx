import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<ReactNavigation.RootParamList, 'BottomSheetIndex'>;

const BottomSheetIndex = ({ navigation }: Props) => {

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
