import {
    LOADING
} from '@/constants/actionTypes';

export const startLoading = () => ({
    type: 'common/loading',
    payload: true,
})

export const endLoading = () => ({
    type: 'common/loading',
    payload: false,
})