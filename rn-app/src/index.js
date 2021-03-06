import React, { Component } from 'react';
import { NativeModules } from 'react-native'
import { Provider } from 'react-redux';
import { dvaStore } from './store/store';
import AppContainer from '@/routers/rootNavigator'
import { Provider as AntProvider } from '@ant-design/react-native';
import { Provider as ZeroDProvider } from '@zero-d/rn-components'

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends Component {
    render() {
        return (
            <Provider store={dvaStore}>
                <AntProvider>
                    {/* <ZeroDProvider> */}
                    <AppContainer
                    />
                    {/* </ZeroDProvider> */}
                </AntProvider>
            </Provider>
        );
    }
}