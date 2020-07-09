import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { Alert } from 'react-native';
import RNRestart from 'react-native-restart';

export const exceptionJshandler = (error, isFatal) => {
    // your error handler function
    console.log(error, isFatal);
    if (isFatal) {
        if (error.message.toLocaleLowerCase().includes('signalr')) return
        Alert.alert(
            '发生错误了',
            `
            Error: ${(isFatal) ? 'Fatal:' : ''} ${error.name} ${error.message}
    
            `,
            [{
                text: '重启App',
                onPress: () => {
                    RNRestart.Restart();
                }
            }, {
                text: '关闭',
            }]
        );
    }
};

export const exceptionNativehandler = exceptionString => {
    // your exception handler code here
    console.log(exceptionString)
};