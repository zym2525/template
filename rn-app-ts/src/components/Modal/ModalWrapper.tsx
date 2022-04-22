import React, { useState, FC, ReactNode } from 'react'
import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Modal } from '@zero-d/rn-components'
import { setSize } from '@/utils';

const ModalContext = React.createContext({
    closeModal: () => { }
});

type ModalWrapperProps = {
    wrapperStyle?: StyleProp<ViewStyle>
    bodyStyle?: StyleProp<ViewStyle>
    onClose?: () => any
    render?: ((closeFn: () => any) => ReactNode)
} & Omit<React.ComponentProps<typeof Modal>, 'visible'>

const ModalWrapper: FC<ModalWrapperProps> = ({ wrapperStyle, bodyStyle, onClose, children, render, ...rest }) => {
    const [visible, setVisible] = useState(true);

    function onAnimationEnd(isVisible: boolean) {
        console.log('isVisible: ', isVisible);
        if (!isVisible) {
            onClose && onClose();
        }
    }

    function handleClose() {
        setVisible(false)
    }

    return (
        <Modal
            transparent
            visible={visible}
            maskClosable
            style={[styles.wrapperStyle, wrapperStyle]}
            bodyStyle={[styles.bodyStyle, bodyStyle]}
            onAnimationEnd={onAnimationEnd}
            onClose={handleClose}
            {...rest}
        >
            {render ? render(handleClose) : null}
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapperStyle: {
        width: setSize(600),
        backgroundColor: '#fff',
        paddingTop: setSize(20),
        paddingBottom: setSize(20)
    },
    bodyStyle: {
        paddingHorizontal: setSize(20)
    },
})

export default ModalWrapper
