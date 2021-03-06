import React, { ReactNode, ReactElement } from 'react';
// import { Portal } from '@zero-d/rn-components'
import { Portal } from '@ant-design/react-native'

export function showModal(node: ReactElement) {
    let key = 0;
    if (React.isValidElement(node)) {
        key = Portal.add(node)
    }
    return {
        destroy: () => {
            if (key) Portal.remove(key)
        }
    }
}