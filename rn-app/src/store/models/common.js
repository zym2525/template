import {
    ERROR_MESSAGE,
    LOADING
} from '@/constants/actionTypes';

const initialState = {
    loading: false,
    error: '',
};

export default {
    namespace: 'common',
    state: initialState,
    reducers: {
        error_message(state, action) {
            return { ...state, error: action.payload, loading: false }
        },
        loading(state, action) {
            return { ...state, loading: action.payload }
        },
    },
}