import React, { Component, FC } from 'react'
import { Text as ZeroDText } from '@zero-d/rn-components'

const myStyle = {
    fontFamily: 'normal',
}

type Props = React.ComponentProps<typeof ZeroDText>

const Text = ({ style, children, ...rest }: Props) => (
    <ZeroDText style={[myStyle, style]} {...rest}>{children}</ZeroDText>
)

export default Text;