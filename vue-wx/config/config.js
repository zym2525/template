module.exports = {

    /**
     * @description 网页title
     */
    title: 'vue-wx',

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     */
    errorLog: 'production',

    /**
     * @description api地址
     */
    BaseApi: process.env.NODE_ENV == 'development' ? '/' : 'https://parkdata.rlwyyun.com/api',

    /**
     * @description OSS地址
     */
    OSSBaseURL: process.env.NODE_ENV == 'development' ? 'https://wwyuserdata.oss-cn-hangzhou.aliyuncs.com' : 'https://wwyuserdata.oss-cn-hangzhou.aliyuncs.com'
}