'use strict';
import { createStore, applyMiddleware } from 'redux';
import reducers from '@/reducers';
import { rootSaga } from '../sagas'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// import { handeSagaError } from '@/sagas/help'
import { create } from '@zero-d/dva-core';
import models, { initStore } from './models'

// const targetStore = initStore(models);

const logger = createLogger({
    diff: true,
    predicate: (getState, action) => {
        let { meta = {} } = action;
        let { recordLog = true } = meta;
        return recordLog
    },
    collapsed: (getState, action, logEntry) => !logEntry.error
});

const middlewares = [];

if (__DEV__) {
    middlewares.push(logger)
}

let app = create({
    onAction: middlewares
});

models.forEach((o) => {
    // 装载models对象
    app.model(o);
});

app.start(); // 实例初始化

export const dvaStore = app._store;

const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;

//如果热更新 自动替换store
if (module.hot) {
    module.hot.accept(() => {
        // store.replaceReducer(targetStore.reducers);
        const newModels = require('./models').default
        newModels.forEach((o) => {
            app.replaceModel(o);
        });
    });
}

if (isDebuggingInBrowser) {
    window.store = dvaStore;
}

export const Store = dvaStore;
