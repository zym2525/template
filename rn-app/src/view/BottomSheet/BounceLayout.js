import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { BounceLayout } from '@/components'
// import { FlatList } from 'react-native-gesture-handler';

const BounceLayoutE = () => {

    const [data, setData] = React.useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const list = React.useRef(null);

    return (
        <BounceLayout waitForRef={list}>
            <FlatList
                ref={list}
                // refreshControl={<BounceLayout />}
                style={{ flex: 1 }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <Text style={{
                        overflow: 'hidden',
                        height: 100,
                        borderBottomWidth: 1,
                        borderBottomColor: '#dcdcdc',
                        fontSize: 28,
                    }}> item {index + 1}</Text>
                }
            />
        </BounceLayout>
    )
}

const styles = StyleSheet.create({})

export default BounceLayoutE
