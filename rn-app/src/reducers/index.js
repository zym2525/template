import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import userReducer from './user'
import commonReducer from './common'
import counterReducer from './counter'

export default combineReducers({
    common: commonReducer,
    counter: counterReducer,
    user: userReducer,
})