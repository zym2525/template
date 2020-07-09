'use strict';

import {
    LOGIN,
    LOGIN_OUT,
} from '../constants/actionTypes';

let initialState = {
    user: null,
    isLogin: false,
};

export default function (state = initialState, action) {
    const { meta = {}, error } = action;
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload, isLogin: true };
        case LOGIN_OUT:
            return { ...state, user: null, isLogin: false };
        default:
            return state;
    }
}
