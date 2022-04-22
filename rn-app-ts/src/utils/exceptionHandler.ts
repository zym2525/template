import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

export const exceptionJshandler = (error: Error, isFatal: boolean) => {
    // your error handler function
    console.log(error, isFatal);
    if (isFatal) {

    }
};

export const exceptionNativehandler = (exceptionString: string) => {
    // your exception handler code here
    console.log(exceptionString)
};