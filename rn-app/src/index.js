import React, { Component } from 'react';
import { NativeModules, View, Text } from 'react-native'
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import AppContainer from '@/routers/rootNavigator'
import { Provider as ZeroDProvider } from '@zero-d/rn-components'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CombinedDefaultTheme } from '@/style/theme'
// import StartUpScreen from '@/view/StartUp/StartUp'
import { selectDevComponentMode } from '@/reducers/common'
// import StorybookUIRoot from '../storybook'
import Config from '@config/config'
console.log('Config: ', Config, process.env);

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

// const AppWrapper = () => {
//     const devComponentMode = useSelector(selectDevComponentMode);
//     console.log('devComponentMode: ', devComponentMode);
//     return devComponentMode
//         ? <StorybookUIRoot />
//         : <ZeroDProvider theme={CombinedDefaultTheme}>
//             <AppContainer
//             />
//         </ZeroDProvider>
// }

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <ZeroDProvider theme={CombinedDefaultTheme}>
                    <AppContainer
                    />
                </ZeroDProvider>
            </Provider>
        </GestureHandlerRootView>
    )
}

export default App