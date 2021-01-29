import React, { Component } from 'react'
import { createStackNavigator, } from 'react-navigation-stack';
import { horizontalNavigationOptions, transparencyStatusBarHeaderConfig, transparencyNoHeaderConfig } from './config'

// import { AppStack } from './tabNavigator'
import HomeScreen from '@/view/Home/Home'
import TestScreen from '@/view/Test/Test'
import RefreshListScreen from '@/view/RefreshList/RefreshList'
import StickyItemScreen from '@/view/StickyItem/StickyItem'
import ParallaxHeaderScreen from '@/view/ParallaxHeader/ParallaxHeader'
import BottomSheetScreen from '@/view/BottomSheet/BottomSheet'
import BottomSheetIndexScreen from '@/view/BottomSheet/index'
import BlurToolbarScreen from '@/view/BottomSheet/BlurToolbar'
import BounceLayoutScreen from '@/view/BottomSheet/BounceLayout'

// AppStack.navigationOptions = { headerShown: false }

export const AppNavigator = createStackNavigator(
    {
        // AppStack: AppStack,
        Home: HomeScreen,
        Test: TestScreen,
        RefreshList: RefreshListScreen,
        StickyItem: StickyItemScreen,
        ParallaxHeader: ParallaxHeaderScreen,
        BottomSheetIndex: BottomSheetIndexScreen,
        BottomSheet: BottomSheetScreen,
        BlurToolbar: BlurToolbarScreen,
        BounceLayout: BounceLayoutScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            ...transparencyStatusBarHeaderConfig,
            ...horizontalNavigationOptions
        }
    },
)