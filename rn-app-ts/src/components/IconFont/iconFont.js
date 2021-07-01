import React, { Component } from 'react';
import Text from '@/components/CustomText/CustomText'
import { setSize } from '@/utils/common'

export const IconCheck = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#59b8fa' }, style]}>&#xe63d;</Text>
)

export const IconUnCheck = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#c1c1c1' }, style]}>&#xe6af;</Text>
)

export const IconArrowLeft = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#c1c1c1' }, style]}>&#xe606;</Text>
)

export const IconSearch = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#c1c1c1' }, style]}>&#xe6c8;</Text>
)

export const IconDelete = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(54), color: '#c1c1c1' }, style]}>&#xe6ae;</Text>
)

export const IconArrowDown = ({ style }) => (
    <Text style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#dcdcdc' }, style]}>&#xe9d8;</Text>
)

export const IconClose = ({ style, onPress }) => (
    <Text onPress={onPress} style={[{ fontFamily: 'iconfont', fontSize: setSize(42), color: '#848484' }, style]}>&#xe69a;</Text>
)