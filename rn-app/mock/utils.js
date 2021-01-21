/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) {
        return {}
    }
    const obj = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
        const index = v.indexOf('=')
        if (index !== -1) {
            const name = v.substring(0, index)
            const val = v.substring(index + 1, v.length)
            obj[name] = val
        }
    })
    return obj
}

const AjaxResponseBase = {
    result: null,
    error: null,
    loginUrl: null,
    needLogIn: false,
    success: false,
    targetUrl: null,
    unAuthorizedRequest: false,
    __HJ: true,
}

const ajaxResponse = ({ data }) => ({
    ...AjaxResponseBase,
    result: data,
    success: true
})

module.exports = {
    param2Obj,
    ajaxResponse
}
