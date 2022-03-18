import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

export const exceptionJshandler = (error, isFatal) => {
    // your error handler function
    console.log(error, isFatal);
    if (isFatal) {

    }
};

export const exceptionNativehandler = exceptionString => {
    // your exception handler code here
    console.log(exceptionString)
};