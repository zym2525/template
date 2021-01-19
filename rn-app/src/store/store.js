'use strict';
import { createStore, applyMiddleware } from 'redux';
import reducers from '@/reducers';
import { rootSaga } from '../sagas'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
// import { handeSagaError } from '@/sagas/help'

const logger = createLogger({
    diff: true,
    predicate: (getState, action) => {
        let { meta = {} } = action;
        let { recordLog = true } = meta;
        return recordLog
    },
    collapsed: (getState, action, logEntry) => !logEntry.error
});

const sagaMiddleware = createSagaMiddleware({
    onError: function (...args) {
        //handeSagaError(store, args)
    }
})
const middlewares = [sagaMiddleware];

// if (__DEV__) {
//     middlewares.push(logger)
// }

const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;

const store = applyMiddleware(
    ...middlewares
)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

sagaMiddleware.run(rootSaga)

//如果热更新 自动替换store
if (module.hot) {
    module.hot.accept(() => {
        store.replaceReducer(reducers);
    });
}

if (isDebuggingInBrowser) {
    window.store = store;
}

export const Store = store;
