import React, { Component } from 'react'
import { createStackNavigator, } from 'react-navigation-stack';
import { horizontalNavigationOptions, transparencyStatusBarHeaderConfig, transparencyNoHeaderConfig } from './config'

// import { AppStack } from './tabNavigator'
import HomeScreen from '@/view/Home/Home'
import TestScreen from '@/view/Test/Test'

// AppStack.navigationOptions = { headerShown: false }

export const AppNavigator = createStackNavigator(
    {
        // AppStack: AppStack,
        Home: HomeScreen,
        Test: TestScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            ...transparencyStatusBarHeaderConfig,
            ...horizontalNavigationOptions
        }
    },
)