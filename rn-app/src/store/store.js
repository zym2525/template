'use strict';
// import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// import models, { initStore } from './models'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "../reducers";
import { rootSaga } from '../sagas'

const logger = createLogger({
    diff: true,
    predicate: (getState, action) => {
        let { meta = {} } = action;
        let { recordLog = true } = meta;
        return recordLog
    },
    collapsed: (getState, action, logEntry) => !logEntry.error
});

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware];

if (__DEV__) {
    middlewares.push(logger)
}

const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;

export let store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), ...middlewares]
})

sagaMiddleware.run(rootSaga)

if (module.hot) {
    module.hot.accept(() => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
    });
}

if (isDebuggingInBrowser) {
    window.store = store;
}