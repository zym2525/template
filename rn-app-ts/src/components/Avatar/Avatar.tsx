import React, { Component } from 'react';
import { setSize } from '@/utils';
import { Image, StyleProp, ImageStyle } from 'react-native'
import { downloadUrl } from '@/constants'

//redux
import { connect } from 'react-redux'

type AvatarProps = {
    user?: Redux.RootState['user']['user']
    width?: number
    height?: number
    url?: string
    style?: StyleProp<ImageStyle>
}

const Avatar = ({ user, width = setSize(72), height = setSize(72), url, style }: AvatarProps) => {

    const avatarUrl = React.useMemo(() => {
        if (url) {
            return { uri: url }
        } else if (user && user.headPortraitUrl) {
            return { uri: downloadUrl + user.headPortraitUrl }
        } else {
            return require('@/img/defaultPortrait.png')
        }
    }, [user, url])

    return (
        <Image
            style={[{ width, height, borderRadius: width / 2 }, style]}
            resizeMode='cover'
            // title={user.name}
            source={avatarUrl}
        />
    )
}

export default Avatar