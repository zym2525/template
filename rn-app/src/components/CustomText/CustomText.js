import React, { Component } from 'react'
import { Text as ZeroDText } from '@zero-d/rn-components'

const myStyle = {
    fontFamily: 'normal',
}

const Text = ({ style, children, ...rest }) => (
    <ZeroDText style={[myStyle, style]} {...rest}>{children}</ZeroDText>
)

export default Text;