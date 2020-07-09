import {
    ERROR_MESSAGE,
    LOADING
} from '@/constants/actionTypes';

const initialState = {
    loading: false,
    error: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ERROR_MESSAGE:
            return { ...state, error: action.payload, loading: false };
        case LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}