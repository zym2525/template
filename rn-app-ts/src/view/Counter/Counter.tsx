import React from 'react'
import { StyleSheet, Text, View, ScrollView, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, selectCounter } from '@/reducers/counter'
import { TextInput, Button } from 'react-native-paper'
import type { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<ReactNavigation.RootParamList, 'Counter'>;

const WhiteSpace = () => (
    <View style={{ height: 20 }}></View>
)

const Counter = () => {

    const count = useSelector(selectCounter)
    const dispatch = useDispatch()

    function onSubmitEditing({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
        dispatch(incrementByAmount(Number(text)))
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <WhiteSpace />
            <Text>count : {count}</Text>
            <WhiteSpace />
            <Button mode="contained" onPress={() => dispatch(increment())}>Increment value</Button>
            <WhiteSpace />
            <Button mode="contained" onPress={() => dispatch(decrement())}>Decrement value</Button>
            <WhiteSpace />
            <TextInput
                mode='outlined'
                label="input count"
                onSubmitEditing={onSubmitEditing}
            />
        </ScrollView>
    )
}

export default Counter

const styles = StyleSheet.create({})
