import React from 'react';
import { Animated } from 'react-native';

export const StickyContext = React.createContext({
    scrollY: new Animated.Value(0)
});