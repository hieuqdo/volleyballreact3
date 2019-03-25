import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createReducer from './reducer';

export const history = createBrowserHistory();

export default createStore(
  createReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history), promiseMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : null
  )
);
