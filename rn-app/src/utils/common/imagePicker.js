import ImagePicker from 'react-native-image-picker'
import uuid from 'uuid';
import moment from 'moment'
import { upload } from './upload'
import ImageCropPicker from 'react-native-image-crop-picker';

export function imageUpload(ossBasePath, extra = {}, fn) {
    let { useUpload = true } = extra;
    var options = {
        title: '请选择图片',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择图片',
        cancelButtonTitle: '取消',
        maxWidth: 907,
        quality: 0.8,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        },
        customButtons: []
    };
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
        }
        else if (response.error) {
        }
        else if (response.customButton) {
            // microSolutionFn && microSolutionFn()
        }
        else {
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            //let path=createOssPath(ossPath);
            ImageCropPicker.openCropper({
                path: response.uri,
                cropping: true,
                compressImageMaxWidth: response.width,
                compressImageMaxHeight: response.height,
                width: response.width,
                height: response.height,
                freeStyleCropEnabled: true
                // enableRotationGesture:true,
            }).then(image => {
                if (useUpload) {
                    let path = createOssPath(ossBasePath);
                    upload(path, image.path, fileRelativeName => {
                        let source = { uri: fileRelativeName, path };
                        fn && fn(source);
                    });
                } else {
                    fn && fn(image);
                }
            }).catch(err => {
                console.log(err);
            })
            // upload(path,response.uri,fileRelativeName=>{
            //     let source = { uri:fileRelativeName};
            //     fn&&fn(source);
            // });
        }
    });
}

export function createOssPath(ossBasePath) {
    let fileName = `${uuid.v4()}.png`;
    let nowDate = moment(new Date()).format('YYYY-MM-DD');
    return `${ossBasePath + nowDate}/${fileName}`;
}