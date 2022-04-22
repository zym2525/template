import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper';
import { StackHeaderProps } from '@react-navigation/stack'

function CustomNavigationBar({ navigation, back, options, route }: Pick<StackHeaderProps, 'back' | 'navigation' | 'options' | 'route'>) {
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
