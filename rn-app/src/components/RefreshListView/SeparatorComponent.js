import React, { Component } from 'react';
import { View, Text } from 'react-native';
import theme from '@/style/theme'

export default SeparatorComponent = () => (
    <View style={{ height: theme.border_base_width, backgroundColor: theme.border_base_color }}></View>
)
