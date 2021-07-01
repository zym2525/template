import dataApi from '@/constants/api';
import * as requestService from './request';

export function login(userdata, success, failed) {
    let fetchApi = dataApi.user.auth;
    let data = {
        // RememberMe: true,
        // Validcode: `test`,
        // tenancyName: `Default`,
        // IsPrivateSchool: true,
        ...userdata
    }
    let headers = {
    };
    return requestService.fetchPost(fetchApi, data, success, failed);
}

export function testGet(params, resolved, failed) {
    let fetchApi = '/api/Account/ApiGetPhaseGrades';
    return requestService.fetchGet(fetchApi, params, resolved, failed);
}

// export function activeMemberCode(code, resolved, failed) {
//     let params = `code=${code}`.replace(/\+/g, "%2B");
//     let fetchApi = `${dataApi.user.activeMemberCode}?${params}`;
//     return requestService.fetchPost(fetchApi, {}, {}, resolved, failed);
// }

// export function getProductInfo(category, resolved, failed) {
//     let fetchApi = `${dataApi.user.getProductInfo}?category=${category}`.replace(/\+/g, "%2B");
//     return requestService.fetchGet(fetchApi, {}, resolved, failed);
// }
