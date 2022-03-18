import React, { Component } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import uuid from 'uuid';
import moment from 'moment'

const pendingTime = 5000;

export function upload(path, filepath, callBack, error) {

}

//oss路径生成img
export function convertToImageUri(ossPath, imageClass = '') {
    if (imageClass != '') {
        return `<img class='${imageClass}' src="${ossPath}"/>`;
    }
    else {
        return `<img src="${ossPath}"/>`;
    }
}

export function createReadOssPath(ossBasePath) {
    let fileName = `${uuid.v4()}.aac`;
    let nowDate = moment(new Date()).format('YYYY-MM-DD');
    return `${ossBasePath + nowDate}/${fileName}`;
}