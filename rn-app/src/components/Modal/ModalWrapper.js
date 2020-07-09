import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Modal } from '@ant-design/react-native'
import { setSize } from '@/utils';

const ModalContext = React.createContext({
    closeModal: () => { }
});

const ModalWrapper = ({ wrapperStyle, bodyStyle, onClose, children, render, ...rest }) => {
    const [visible, setVisible] = useState(true);

    function onAnimationEnd(isVisible) {
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
