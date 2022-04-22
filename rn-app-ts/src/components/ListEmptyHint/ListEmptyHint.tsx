import React, { Component } from 'react'
import { View, ActivityIndicator, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native'
import Text from '@/components/CustomText/CustomText'
import { setSize, setSizeText, tabStyle } from '@/utils/common'

const icons = {
    noData: require('@/img/component/bg-noData.png')
}

export const ListEmptyHint = () => (
    <View style={{ flexDirection: 'row', marginTop: setSize(80), justifyContent: 'center', }}>
        <ActivityIndicator size="small" color="#888888" />
        <Text style={{ textAlign: 'center', marginLeft: setSize(10), }}> 数据加载中......</Text>
    </View>
)

export const ErrorHint = ({ onPress }: { onPress?: () => void }) => (
    <Text onPress={onPress} style={{ textAlign: 'center', marginLeft: setSize(10), marginTop: setSize(100) }}> 出错了，请点击重新加载 </Text>
)

type NoDataProps = {
    text?: string
    style?: StyleProp<ViewStyle>
    bgImg?: ImageSourcePropType
}

export const NoData = ({ text = '没有查找到你要的数据', style, bgImg = icons.noData }: NoDataProps) => (
    <View style={[styles.noData, style]} >
        <Image style={styles.noDataImg} source={bgImg} />
        <Text style={styles.noDataText}> {text} </Text>
    </View>
)

const styles = StyleSheet.create({
    noData: {
        alignItems: 'center',
        marginTop: setSize(370)
    },
    noDataImg: {
        width: setSize(242),
        height: setSize(160),
        marginBottom: setSize(30),
    },
    noDataText: {
        fontSize: setSizeText(26),
        color: '#999'
    }
})