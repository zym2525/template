import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { WaterfallGrid } from '@/components'
import { RadioButton } from 'react-native-paper';
import { useMemoizedFn } from 'ahooks'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function createData(pokemons) {
    const poks = [];
    for (let i = 0; i < pokemons; i++) {
        const ratio = 1 + Math.random();
        poks.push({
            ratio,
            address: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
            key: i,
            color: `#${getRandomColor()}`,
        });
    }
    return poks
}

const WaterfallGridScreen = () => {

    const [data, setData] = React.useState(() => createData(20))

    const renderItem = useMemoizedFn(({ item, index, itemWidth, itemHeight }) =>
        <TouchableNativeFeedback
            onPress={() => {
                setData(data.filter((it) => it.key !== item.key));
            }}>
            <Image
                source={{ uri: item.address }}
                style={{ width: itemWidth, height: itemHeight }}
            />
        </TouchableNativeFeedback>
    )

    return (
        <View style={{ flex: 1 }}>
            <WaterfallGrid
                columns={2}
                data={data}
                keyExtractor={(item, index) => item.address}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default WaterfallGridScreen