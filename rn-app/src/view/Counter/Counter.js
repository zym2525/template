import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from '@/reducers/counter'
import { TextInput, Button } from 'react-native-paper'

const WhiteSpace = () => (
    <View style={{ height: 20 }}></View>
)

const Counter = () => {

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    function onSubmitEditing({ nativeEvent: { text, eventCount, target } }) {
        dispatch(incrementByAmount(Number(text)))
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <WhiteSpace size="lg" />
            <Text>count : {count}</Text>
            <WhiteSpace size="lg" />
            <Button mode="contained" onPress={() => dispatch(increment())}>Increment value</Button>
            <WhiteSpace size="lg" />
            <Button mode="contained" onPress={() => dispatch(decrement())}>Decrement value</Button>
            <WhiteSpace size="lg" />
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
