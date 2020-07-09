import _ from 'lodash';
import { toast } from '@/utils/common';
import * as UserActions from '@/actions/user';
import axios from 'axios';
import qs from 'qs';
import { SERVER_URL } from '@/constants/api'

const timeout = 10000;


const instance = axios.create({
	baseURL: SERVER_URL,
	timeout: timeout,
	headers: {
		"Content-Type": 'application/json; charset=utf-8',
		// 'Accept': "application/json, text/plain, */*"
	}
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(async config => {
	console.log('config: ', config);
	let token = await UserActions.getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token.access_token}`
	}
	return config;
}, function (error) {
	console.log('error: ', error);
	// 对请求错误做些什么
	return Promise.reject(error);
})

/**
 * 响应拦截器
 */
instance.interceptors.response.use(function (response) {
	console.log('response: ', response);
	// 对响应数据做点什么

	return response;
}, function (error) {
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

export function get(uri, params = {}, resolve, reject) {
	return instance.get(uri, { params })
		.then(res => {
			return resolve ? resolve(res.data) : res.data
		}).catch(reject)
}

export function post(uri, params = {}, resolve, reject) {
	return instance.post(uri, qs.stringify(params))
		.then(res => {
			return resolve ? resolve(res.data) : res.data
		})
		.catch(reject)
}

export function fetchGet(uri, params, successCallback, failCallback) {
	return get(uri, params, successCallback, failCallback);
}

export function fetchPost(uri, params, successCallback, failCallback) {
	return post(uri, params, successCallback, failCallback);
}
