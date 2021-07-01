//判断视频
export function isPreviewVideo(extension: string) {
    return /mp4|avi|wmv|flv|f4v|m3u8/ig.test(extension);
}

//判断图片
export function isPreviewImage(extension: string) {
    return /png|jpg|jpeg/ig.test(extension);
}

//判断文档
export function isPreviewDoc(extension: string) {
    return /doc|docx|txt|ppsx|pdf|xlsx|xls/ig.test(extension);
}

//判断音频
export function isPreviewAudio(extension: string) {
    return /mp3/ig.test(extension);
}

//判断PPT
export function isPreviewPpt(extension: string) {
    return /ppt|pptx/ig.test(extension);
}