/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src'
// import App from './App'
import { name as appName } from './app.json';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { exceptionJshandler, exceptionNativehandler } from '@/utils/exceptionHandler'
import Storge from '@/services/storage'
import { enableScreens } from 'react-native-screens'
import { setConfig } from '@zero-d/rn-components'
// import StorybookUIRoot from './storybook'

setConfig({
    portraitWidth: 750,
    landScapeWidth: 1334,
    defaultPixel: 2
})

enableScreens();
setJSExceptionHandler(exceptionJshandler, true);
setNativeExceptionHandler(
    exceptionNativehandler,
    false
);

global.storage = Storge;

if (!__DEV__) {
    global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        error: () => { },
        debug: () => { },
        assert: () => { },
    };
}
YellowBox.ignoreWarnings(['Require cycle', 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long period of time, i.e. multiple minutes', 'Warning: componentWillReceiveProps']);

AppRegistry.registerComponent(appName, () => App);