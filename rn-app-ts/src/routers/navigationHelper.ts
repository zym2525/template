import * as React from 'react';
import { StackActions, NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<ReactNavigation.RootParamList>();

export const isReadyRef = React.createRef<boolean>();

export function navigate<T extends keyof ReactNavigation.RootParamList>(name: T, params?: ReactNavigation.RootParamList[T]) {
    if (navigationRef.isReady()) {
        // Perform navigation if the react navigation is ready to handle actions
        navigationRef.navigate(name, params);
    } else {
        // You can decide what to do if react navigation is not ready
        // You can ignore this, or add these actions to a queue you can call later
    }
}

// export function push(...args) {
//     navigationRef.current?.dispatch(StackActions.push(...args));
// }