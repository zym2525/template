import { combineReducers } from 'redux';
import CommonReducers from './common';
import UserReducers from './user';

export default combineReducers({
    common: CommonReducers,
    user: UserReducers,
});