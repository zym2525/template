import {
    LOADING
} from '@/constants/actionTypes';

export const startLoading = () => ({
    type: LOADING,
    payload: true,
})

export const endLoading = () => ({
    type: LOADING,
    payload: false,
})