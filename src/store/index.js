import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

import thunk from 'redux-thunk';
import logger from 'redux-logger';


const middleware = applyMiddleware(thunk, logger);

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    reduxDevTools(
        middleware
    )
);

export default store;