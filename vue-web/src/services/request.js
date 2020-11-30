import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getXSRFToken, setXSRFToken } from '@/utils/storage'
import { Message, Loading } from "element-ui";
import { BaseApi } from '@config/config'

import { getAntiForgeryToken } from '@/services/userService'

import router from '@/router'

let loadingQueue = [];
let loadingInstance = null

function startLoading() {
    if (!loadingQueue.length) {
        loadingInstance = Loading.service({
            fullscreen: true,
            lock: true,
            background: 'transparent',
        });
    }
    loadingQueue.push(1);
}

function endLoading() {
    loadingQueue.shift();
    if (!loadingQueue.length && loadingInstance != null) {
        loadingInstance.close();
    }
}

axios.defaults.retry = 1;

// create an axios instance
const service = axios.create({
    baseURL: BaseApi, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 100000, // request timeout
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain, */*'
    }
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = "Bearer " + getToken()
        }

        if (getXSRFToken()) {
            config.headers['XSRF-TOKEN'] = getXSRFToken()
        }

        if (config.config.showLoading) {
            startLoading();
        }

        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        endLoading();
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        let res = response.data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (res === undefined) {
            res = JSON.parse(response.request.responseText);
        }
        endLoading();
        return res
    },
    async error => {
        console.log('err' + error) // for debug
        endLoading();
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break;

                case 401:
                    error.message = '未授权，请登录'
                    break;

                case 403:
                    error.message = '拒绝访问'
                    break;

                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break;

                case 408:
                    error.message = '请求超时'
                    break;

                case 500:
                    if (error.response.data.error.message === "LoginFailed") {
                        error.message = "账号或者密码不正确！"
                        break;
                    }
                    error.message = '服务器内部错误'
                    break;

                case 501:
                    error.message = '服务未实现'
                    break;

                case 502:
                    error.message = '网关错误'
                    break;

                case 503:
                    error.message = '服务不可用'
                    break;

                case 504:
                    error.message = '网关超时'
                    break;

                case 505:
                    error.message = "HTTP版本不受支持"
                    break;

                default:
            }
        }
        // 400 错误 尝试请求 /AntiForgery/GetToken
        if (error.response.status === 400) {
            const { config } = error.response
            const { url, method, data, params } = config

            config.__retryCount = config.__retryCount || 0;

            // Check if we've maxed out the total number of retries
            if (config.__retryCount >= config.retry) {
                // Reject with the error
                return Promise.reject(error);
            }

            // Increase the retry count
            config.__retryCount += 1;

            const req = {
                url: url.replace(/^\/api/ig, ''),
                method,
                __retryCount: config.__retryCount
            }
            if (data) {
                req.data = data
            }
            if (params) {
                req.params = params
            }
            try {
                const antiForgeryToken = await getAntiForgeryToken()
                if (antiForgeryToken.success) {
                    setXSRFToken(antiForgeryToken.result)
                }
                const res = await service(req)
                return res
            } catch (error) {
                return Promise.reject(error)
            }
            return false
        }
        if (error.response.status === 401) {
            var path;
            if (store.getters.token) {
                path = router.currentRoute.path
                Message({
                    message: error.message,
                    type: "error",
                })
            }
            store.dispatch("user/logout");
            store.dispatch("permission/resetModuleList");
            router.replace(`/login?redirect=${path}`);
            return false
        }
        Message({
            message: error.message,
            type: "error",
        })
        return Promise.reject(error)
    }
)

const requestConfig = {
    showLoading: false
}

export const post = async (url, params, config = requestConfig) => service({
    url: url,
    method: 'post',
    data: params,
    config
})

export const get = (url, params, config = requestConfig) => service({
    url: url,
    method: 'get',
    params,
    config
})

export default service
