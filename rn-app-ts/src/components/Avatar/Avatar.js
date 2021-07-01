import React, { Component } from 'react';
import { setSize } from '@/utils';
import { Image } from 'react-native'
import { downloadUrl } from '@/constants'

//redux
import { connect } from 'react-redux'

class Avatar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    render() {
        let { user, width = setSize(72), height = setSize(72), url, style } = this.props;
        return (
            <Image
                style={[{ width, height, borderRadius: width / 2 }, style]}
                resizeMode='cover'
                // title={user.name}
                source={getAvatarUrl(user, url)}
            />
        )
    }
}

function getAvatarUrl(user, url) {
    if (url) {
        return { uri: url }
    } else if (user && user.headPortraitUrl) {
        return { uri: downloadUrl + user.headPortraitUrl }
    } else {
        // return require('@/img/personal/defaultPortrait.png')
        return null
    }
}

export default Avatar