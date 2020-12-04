import Vue from 'vue'

import _ from 'lodash'
import PreviewImage from './previewImage.vue'
import PreviewPdf from './PreviewPdf.vue'
import PreviewOffice from './previewOffice.vue'

//判断视频
export function isPreviewVideo (extension) {
    return /mp4|avi|wmv|flv|f4v|m3u8/ig.test(extension);
}

//判断图片
export function isPreviewImage (extension) {
    return /png|jpg|jpeg/ig.test(extension);
}

//判断文档
export function isPreviewDoc (extension) {
    return /doc|docx|txt|ppsx|xlsx|xls/ig.test(extension);
}

export function isPreviewPdf (extension) {
    return /pdf/ig.test(extension);
}

//判断音频
export function isPreviewAudio (extension) {
    return /mp3/ig.test(extension);
}

//判断PPT
export function isPreviewPpt (extension) {
    return /ppt|pptx/ig.test(extension);
}

export function $preview ({ fileUrl, title = "" }) {
    try {
        const extension = _.last(fileUrl.split('.'));
        const h = this.$createElement;
        if (isPreviewImage(extension)) {
            this.$msgbox({
                title: title || '图片',
                message: h(PreviewImage, {
                    props: {
                        extension,
                        fileUrl
                    }
                }),
                customClass: 'preview-image',
                showConfirmButton: false,
            }).catch(() => { });
        }
        else if (isPreviewPdf(extension)) {
            // this.$msgbox({
            //     title: title || '预览',
            //     message: h(PreviewPdf, {
            //         props: {
            //             extension,
            //             fileUrl
            //         }
            //     }),
            //     customClass: 'preview-pdf',
            //     showConfirmButton: false,
            // }).catch(() => { });
            window.open(fileUrl, "“_blank”");
        }

        else {
            this.$msgbox({
                title: title || '预览',
                message: h(PreviewOffice, {
                    props: {
                        extension,
                        fileUrl
                    }
                }),
                customClass: 'preview-office',
                showConfirmButton: false,
            }).catch(() => { });
        }
    } catch (error) {
        console.log('error: ', error);

    }
}