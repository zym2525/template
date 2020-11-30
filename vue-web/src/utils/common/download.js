import { regFileName, FileMime } from "@/constants";
import moment from 'moment'
import { getSuffix } from "./common";

export function downloadFile(data, fileName, fileSuffix) {
    const blob = new Blob([data], { type: FileMime[fileSuffix] });

    if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName + '_' + moment().format('YYYYMMDDHHmmss') + '.' + fileSuffix; //命名下载名称
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob); //表示一个指定的file对象或Blob对象
        document.body.appendChild(elink);
        elink.click(); //点击触发下载
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName + '_' + moment().format('YYYYMMDDHHmmss') + '.' + fileSuffix);
    }
}

export function downloadFileByUrl(fileUrl, fileName) {
    const suffix = getSuffix(fileUrl);
    let name = fileName ? fileName : fileUrl.replace(regFileName, "$2");
    name += `.${suffix}`
    if (/pdf/ig.test(suffix)) {
        handlePdfLink(fileUrl, name)
    } else {
        handleFileDownload(fileUrl, name)
    }
}

export let handleFileDownload = (url, filename) => {
    // 创建 a 标签
    const elink = document.createElement("a"); // 创建a标签
    elink.style.display = "none";
    elink.download = filename;// 设置下载文件的文件名

    elink.href = url; // content为后台返回的下载地址
    document.body.appendChild(elink);
    elink.click();// 设置点击事件
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
}

export let handlePdfLink = (url, filename) => {
    fetch(url, {
        method: 'get',
        responseType: 'arraybuffer',
    })
        .then(function (res) {
            if (res.status !== 200) {
                return res.json()
            }
            return res.arrayBuffer()
        })
        .then((blobRes) => {
            // 生成 Blob 对象，设置 type 等信息
            const e = new Blob([blobRes], {
                type: 'application/octet-stream',
                'Content-Disposition': 'attachment'
            })
            // 将 Blob 对象转为 url
            const link = window.URL.createObjectURL(e)
            handleFileDownload(link, filename)
        }).catch(err => {
            console.error(err)
        })
}
