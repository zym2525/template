import {
    HOME_INIT,
} from '@/constants/actionTypes';

export const homeInit = (allParams, resolved, rejected) => ({
    type: HOME_INIT,
    payload: { allParams },
    meta: { resolved, rejected }
})
