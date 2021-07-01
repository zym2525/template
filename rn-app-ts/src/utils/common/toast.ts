import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { Toast } from '@ant-design/react-native'

// export const toast = (content, position = ToastAndroid.CENTER) => {
//     ToastAndroid.showWithGravity(content, ToastAndroid.SHORT, position);
// }

export const toast = (content: string, duration: number = 0.5, onClose?: (() => void), mask = true) => {
    Toast.info(content, duration, onClose, mask);
}

export function successToast(content: string) {
    Toast.success(content, 1);
}
export function failToast(content: string) {
    Toast.fail(content);
}
export function offline(content: string) {
    Toast.offline(content);
}
export function loadingToast() {
    Toast.loading('Loading...', 1, () => {
        console.log('Load complete !!!');
    });
}