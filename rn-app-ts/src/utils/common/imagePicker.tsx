import React, { Component } from 'react';
import { launchCamera, launchImageLibrary, Callback, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker'
import uuid from 'uuid';
import moment from 'moment'
import ImageCropPicker from 'react-native-image-crop-picker';
import ModalImagePicker from '@/components/Modal/ModalImagePicker'
import { showModal } from './showModal'
import { PermissionsAndroid } from "react-native";

type showImagePickerOptions = {
    customButtons?: any[]
    cameraOptions?: CameraOptions
    imageLibraryOptions?: ImageLibraryOptions
}

async function showImagePicker(options: showImagePickerOptions, callback: Callback) {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const { customButtons, cameraOptions = { mediaType: 'photo' }, imageLibraryOptions = { mediaType: 'photo' } } = options;
            const node = showModal(
                <ModalImagePicker
                    onDismiss={() => node.destroy()
                    }
                    launchCamera={() => launchCamera(cameraOptions, callback)
                    }
                    launchImageLibrary={() => launchImageLibrary(imageLibraryOptions, callback)
                    }
                    customButtons={customButtons}
                />
            )
        } else {
            console.log("Camera permission denied");
        }
    } catch (error) {
        console.log('error: ', error);
    }
}


type imageUploadExtra = {
    success?: () => void
}

/**
 * @enum '@constants/oss'
 * @param {oss保存基础路径} ossBasePath
 * @param {额外参数} extra 
 */
export function imageUpload(ossBasePath: string, extra: imageUploadExtra = {}) {
    let { success } = extra;
    var options = {
        maxWidth: 907,
        /**
         * 故意写的很大 为了图片缩放的时候根据maxWidth来缩放
         * @see \node_modules\react-native-image-picker\android\src\main\java\com\imagepicker -> getImageDimensBasedOnConstraints
         */
        maxHeight: 5000,
        quality: 0.9,
        customButtons: [],
    };
    showImagePicker(options, async (response) => {
        if (response.didCancel) {
        }
        else if (response.errorMessage) {
        }
        else {
            try {
                let assets = response.assets![0];
                let image = await ImageCropPicker.openCropper({
                    path: assets.uri ?? "",
                    cropping: true,
                    compressImageMaxWidth: assets.width,
                    compressImageMaxHeight: assets.height,
                    freeStyleCropEnabled: true,
                    mediaType: 'photo'
                    // enableRotationGesture:true,
                })
                console.log('image: ', image);
                // let path = createOssPath(ossBasePath);
                // let fileRelativeName = await upload({
                //     ossSavePath: path,
                //     sourceFilePath: image.path
                // });
                // let source = { uri: fileRelativeName, path };
                // success?.(source);
            } catch (err) {
                console.log(err);
            }
        }
    });
}

export function createOssPath(ossBasePath: string) {
    let fileName = `${uuid.v4()}.png`;
    let nowDate = moment(new Date()).format('YYYY-MM-DD');
    return `${ossBasePath + nowDate}/${fileName}`;
}