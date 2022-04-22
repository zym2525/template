import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Dialog, TouchableRipple, Button } from 'react-native-paper'
import Text from '../CustomText/CustomText'

type ModalImagePickerProps = {
    onDismiss?: () => any
    launchCamera?: () => any
    launchImageLibrary?: () => any
    customButtons?: any[]
} & Omit<React.ComponentProps<typeof Dialog>, 'visible' | 'onDismiss' | 'children'>

const ModalImagePicker = (props: ModalImagePickerProps) => {

    const { onDismiss, launchCamera, launchImageLibrary, ...rest } = props;

    const [visible, setVisible] = React.useState(false)

    const showDialog = () => setVisible(true);

    // const hideDialog = () => {
    //     setVisible(false);
    //     props.onDismiss?.()
    // };

    React.useEffect(() => {
        showDialog();
    }, [])

    const onLaunchCamera = React.useCallback(() => {
        launchCamera?.();
        onDismiss?.();
    }, [launchCamera])

    const onLaunchImageLibrary = React.useCallback(() => {
        launchImageLibrary?.();
        onDismiss?.();
    }, [launchImageLibrary])

    return (
        <Dialog {...rest} visible={visible} onDismiss={onDismiss} >
            <Dialog.Title>请选择图片</Dialog.Title>
            <Dialog.Content>
                <TouchableRipple style={styles.mb} onPress={onLaunchCamera}>
                    <Text style={[styles.btn]}>拍照</Text>
                </TouchableRipple>
                <TouchableRipple style={styles.mb} onPress={onLaunchImageLibrary}>
                    <Text style={styles.btn}>选择图片</Text>
                </TouchableRipple>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={onDismiss}>取消</Button>
            </Dialog.Actions>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    btn: {
        // marginVertical: 20,
        fontSize: 18
    },
    mb: {
        // marginBottom: 16
        paddingVertical: 8
    }
});

export default ModalImagePicker
