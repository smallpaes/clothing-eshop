import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware()

// middleware: a tunnel that intercept actions before entering reducer
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
};

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// notes for saga: when an action is dispatched to the store, the middleware first forwards the action to the reducers and then notifies the Sagas
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
