import userModel from './user'
import commonModel from './common'
import { combineReducers } from 'redux';
import { all, take, takeEvery, takeLatest, put, fork, cancel } from 'redux-saga/effects'

export default [
    commonModel,
    userModel
]

function* oneSaga() {
    yield takeLatest('login', function* () {
        console.log(2222333455);
    });
}

export function initStore(models) {
    let allReducers = {};
    let sagas = [];
    for (model of models) {
        let { namespace = '', state: initialState, reducers, effects } = model
        allReducers[namespace] = createReducer(reducers, initialState);
        sagas.push(createModelSaga(effects)())
    }
    return {
        reducers: combineReducers(allReducers),
        rootSaga: function* () {
            yield all(sagas)
        }
    }
}

function createReducer(reducers, initialState) {
    return function (state = initialState, action) {
        return reducers[action.type]?.(state, action) ?? state;
    }
}

function createModelSaga(effects) {
    return function* () {
        let watchers = [oneSaga()];
        for (let key in effects) {
            if (Object.prototype.hasOwnProperty.call(effects, key)) {
                let _effect = [];
                let effect = effects[key];
                if (!Array.isArray(effect)) {
                    _effect.push(_effect)
                } else {
                    _effect = effect;
                }
                let [sagaWithOnEffect, { type } = { type: 'take' }] = _effect;
                console.log('type: ', type);
                let watcher = getWatcher(type, sagaWithOnEffect, key);
                console.log('watcher: ', typeof watcher, typeof sagaWithOnEffect);
                watchers.push(watcher())
                // const task = yield fork(watcher);
                // yield fork(function* () {
                //     yield take(`CANCEL_EFFECTS`);
                //     yield cancel(task);
                // });
            }

        }
        console.log('watchers:', watchers);
        yield all(watchers);
    }
}

function getWatcher(type, sagaWithOnEffect, key) {
    console.log('key: ', key);
    switch (type) {
        case 'takeLatest':
            return function* () {
                yield takeLatest(key, sagaWithOnEffect);
            };
        default:
            return function* () {
                yield takeEvery(key, sagaWithOnEffect);
            }
    }
}