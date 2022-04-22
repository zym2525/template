import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button } from 'react-native-paper'
import ContactItem from './ContactItem'
import { useFocusEffect } from '@react-navigation/native';
import Mock from 'mockjs'
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import type { StackScreenProps } from '@react-navigation/stack';

type NameListItem = {
    name: string
    jobTitle: string
}

const data: {
    items: NameListItem[]
} = Mock.mock({
    'items|10-20': [{
        name: '@name',
        jobTitle: '@city(true)',
    }]
})

type Props = StackScreenProps<ReactNavigation.RootParamList, 'BottomSheet'>;

const BottomSheetPage = () => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '90%', '100%'], []);

    const handleSnapPress = useCallback((index: number) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleExpandPress = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);
    const handleCollapsePress = useCallback(() => {
        bottomSheetRef.current?.collapse();
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderScrollViewItem = useCallback(
        (item: NameListItem, index: number) => (
            <ContactItem
                key={`${item.name}.${index}`}
                title={`${index}: ${item.name}`}
                subTitle={item.jobTitle}
            // onPress={onItemPress}
            />
        ),
        []
    );

    const animatedIndex = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        console.log('animatedIndex: ', animatedIndex);
        return {}
    })

    return (
        <View style={styles.container}>
            <Button style={styles.button} mode="contained" onPress={() => handleSnapPress(3)} >Snap To 100%</Button>
            <Button style={styles.button} mode="contained" onPress={() => handleSnapPress(2)} >Snap To 90%</Button>
            <Button style={styles.button} mode="contained" onPress={() => handleSnapPress(1)} >Snap To 50%</Button>
            <Button style={styles.button} mode="contained" onPress={() => handleSnapPress(0)} >Snap To 25%</Button>
            <Button style={styles.button} mode="contained" onPress={handleExpandPress} >Expand</Button>
            <Button style={styles.button} mode="contained" onPress={handleCollapsePress} >Collapse</Button>
            <Button style={styles.button} mode="contained" onPress={handleClosePress} >Close</Button>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                animateOnMount={true}
            >
                <BottomSheetScrollView
                    style={{ overflow: 'visible', flex: 1, }}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        overflow: 'visible',
                    }}
                    bounces={true}
                    focusHook={useFocusEffect}
                >
                    {data.items.map(renderScrollViewItem)}
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 24,
    },
    photo: {
        width: '100%',
        height: 225,
        marginTop: 30,
    },
    button: {
        marginBottom: 20
    }
})

export default BottomSheetPage