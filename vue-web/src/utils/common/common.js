/**
 * 
 * @param {string} str 
 * @description 去收尾空格
 */
export function trim(str) {
    return str ? str.replace(/(^\s*)|(\s*$)/g, "") : '';
}

/**
 * 
 * @param {string} fileUrl 
 * @returns  获取文件扩展名
 */
export function getSuffix(fileUrl = "") {
    if (fileUrl === "") {
        return ""
    }
    return /\.([0-9a-z]+)(?:[\?#]|$)/i.exec(fileUrl)[1]
}
