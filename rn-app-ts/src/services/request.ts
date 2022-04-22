import _ from 'lodash';
import { toast } from '@/utils/common';
import { getUserToken } from '@/utils/storage'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SERVER_URL } from '@/constants/api'
import Config from '@config/config'

const timeout = 10000;


const instance = axios.create({
	baseURL: Config.SERVER_URL,
	timeout: timeout,
	headers: {
		"Content-Type": 'application/json; charset=utf-8',
		'Accept': "application/json, text/plain, */*"
	}
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(async (config) => {
	// console.log('config: ', config);
	let token = await getUserToken();
	if (token) {
		config.headers!.Authorization = `Bearer ${token.access_token}`
	}
	return config;
}, function (error) {
	console.log('error: ', error);
	// 对请求错误做些什么
	return Promise.reject(error);
})

type Response<T = any> = {
	message: string,
	status: number,
	errors: string
	__HJ: boolean
	error: string
	loginUrl: string
	needLogIn: boolean
	result: T
	success: boolean
	targetUrl: string
	unAuthorizedRequest: boolean
}

type ResponseError = {
	response?: AxiosResponse<Response>
	message: string
}

/**
 * 响应拦截器
 */
instance.interceptors.response.use(function (response: AxiosResponse<Response>) {
	// console.log('response: ', response);
	// 对响应数据做点什么
	return response;
}, function (error: ResponseError) {
	console.log('error: ', error);
	// 对响应错误做点什么
	if (!error.response) {
		toast('网络出错了！');
	} else if (error.message.includes('timeout')) {
		toast('网络不给力！')
	} else {
		toast(error.response.data.message);
	}
	return Promise.reject(error);
})

function handleError(error: ResponseError) {
	console.log('error: ', error);
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

			/**
			 * 接口上有返回errors 因此进入default处理
			 */
			case 500:
				error.message = error?.response?.data?.errors ?? '服务器内部错误';
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
				error.message = error?.response?.data?.errors;
				break;
		}
	} else {
		if (error.message.includes('timeout')) {
			error.message = '请求超时';
		} else if (error.message.includes('Network Error')) {
			error.message = '网络错误';
		}
	}
	if (error?.response?.status === 401) {
		// handle401(error.message)
	}
	toast(error.message.replace(/\[.*\]/, '').trim());
}

type noop = (...args: any[]) => void;

export function get<T>(uri: string, params = {}, resolve: noop, reject: noop) {
	return instance.get<Response<T>>(uri, { params })
		.then((res) => {
			return resolve ? resolve(res.data.result) : res.data.result
		}).catch(reject)
}

export function post<T>(uri: string, params = {}, resolve: noop, reject: noop) {
	return instance.post<Response<T>>(uri, params)
		.then((res) => {
			return resolve ? resolve(res.data.result) : res.data.result
		})
		.catch(reject)
}

export function fetchGet<T>(uri: string, params = {}, successCallback: noop, failCallback: noop) {
	return get<T>(uri, params, successCallback, failCallback);
}

export function fetchPost<T>(uri: string, params = {}, successCallback: noop, failCallback: noop) {
	return post<T>(uri, params, successCallback, failCallback);
}

export default instance;
