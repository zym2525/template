// import React, { Component } from 'react';
// import { Modal, ActivityIndicator } from 'react-native';
// import { AliyunOSS } from '@zero-d/rn-components'
// import { downloadUrl } from '@/constants/oss'
// import { toast } from './toast';
// import uuid from 'uuid';
// import moment from 'moment'

// const pendingTime = 5000;

// export function upload(path, filepath, callBack, error) {
//     AliyunOSS.initWithPlainTextAccessKey();
//     AliyunOSS.asyncUpload({
//         objectKey: path,
//         filepath,
//     })
//     AliyunOSS.addEventListener('uploadProgress', handleUpLoaded);
//     function handleUpLoaded({ status, exception }) {
//         if (status === 'success') {
//             // clearTimeout(timer);
//             let uri = `${downloadUrl}/${path}?${new Date().getTime()}`;
//             callBack && callBack(uri);
//         } else {
//             console.log(exception);
//             error && error()
//             // clearTimeout(timer);
//             toast('出问题了！！');
//         }
//         // this.Mask.destroy();
//         // this.Mask = null;
//         AliyunOSS.removeEventListener(handleUpLoaded);
//     }
// }

// //oss路径生成img
// export function convertToImageUri(ossPath, imageClass = '') {
//     if (imageClass != '') {
//         return `<img class='${imageClass}' src="${ossPath}"/>`;
//     }
//     else {
//         return `<img src="${ossPath}"/>`;
//     }
// }

// export function createReadOssPath(ossBasePath) {
//     let fileName = `${uuid.v4()}.aac`;
//     let nowDate = moment(new Date()).format('YYYY-MM-DD');
//     return `${ossBasePath + nowDate}/${fileName}`;
// }