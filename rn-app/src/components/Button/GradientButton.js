import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { setSize, setSizeText } from '@/utils/common';
import Text from '@/components/CustomText/CustomText'
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ onPress, children, wrapperStyle, buttonTextStyle }) => (
    <LinearGradient start={{ x: 0.3, y: 0 }} end={{ x: 0.6, y: 0 }} colors={['#27c4fe', '#1797eb']} style={wrapperStyle}>
        <Text onPress={onPress} style={[styles.buttonText, buttonTextStyle]}>{children}</Text>
    </LinearGradient>
)

const styles = StyleSheet.create({
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
        height: setSize(80),

    }
})

export default GradientButton;
