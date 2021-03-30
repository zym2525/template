import React, { Component } from 'react';
import { NativeModules } from 'react-native'
import { Provider } from 'react-redux';
import { Store } from './store/store';
import AppContainer from '@/routers/rootNavigator'
import { Provider as AntProvider } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as ZeroDProvider } from '@zero-d/rn-components'

const persistenceKey = "persistenceKey"
const persistNavigationState = async (navState) => {
    try {
        await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
    } catch (err) {
        // handle the error according to your needs
    }
}
const loadNavigationState = async () => {
    const jsonString = await AsyncStorage.getItem(persistenceKey)
    return JSON.parse(jsonString)
}

function getPersistenceFunctions() {
    return __DEV__ ? {
        persistNavigationState: persistNavigationState,
        loadNavigationState: loadNavigationState,
    } : undefined;
}

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <AntProvider>
                    {/* <ZeroDProvider> */}
                    <AppContainer
                    // {...getPersistenceFunctions()}
                    />
                    {/* </ZeroDProvider> */}
                </AntProvider>
            </Provider>
        );
    }
}