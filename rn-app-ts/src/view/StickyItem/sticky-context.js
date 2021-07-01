import React from 'react';
import Animated from 'react-native-reanimated';

export const StickyContext = React.createContext({
    scrollY: new Animated.Value(0)
});