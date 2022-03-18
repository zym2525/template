import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper';
import { useLayout } from '@/utils/hooks'

function CustomNavigationBar({ navigation, back, options, route }) {
    const title =
        typeof options.headerTitle === 'string'
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : route.name;

    return (
        <Appbar.Header style={{ backgroundColor: '#fff' }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
}

export default CustomNavigationBar

const styles = StyleSheet.create({})
