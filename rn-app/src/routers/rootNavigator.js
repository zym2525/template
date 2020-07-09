import { createSwitchNavigator, createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

import StartUpScreen from '@/view/StartUp/StartUp'
import { AppNavigator } from './appNavigator'

export const homeAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'AppStack' })
    ]
})

export default createAppContainer(createSwitchNavigator(
    {
        StartUp: StartUpScreen,
        App: {
            screen: AppNavigator,
            path: '',
        },
    },
    {
        initialRouteName: 'StartUp',
    }
))