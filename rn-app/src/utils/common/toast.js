import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Toast } from '@ant-design/react-native'

// export const toast = (content, position = ToastAndroid.CENTER) => {
//     ToastAndroid.showWithGravity(content, ToastAndroid.SHORT, position);
// }

export const toast = (content, duration = 0.5, onClose, mask = true) => {
    Toast.info(content, duration, onClose, mask);
}

export function successToast(content) {
    Toast.success(content, 1);
}
export function failToast(content) {
    Toast.fail(content);
}
export function offline(content) {
    Toast.offline(content);
}
export function loadingToast() {
    Toast.loading('Loading...', 1, () => {
        console.log('Load complete !!!');
    });
}