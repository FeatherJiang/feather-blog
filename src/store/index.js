import { createStore, combineReducers } from 'redux';
import * as loading from './loading/reducer';
import * as snackbar from './snackbar/reducer';
import * as comment from './comment/reducer';

/* eslint-disable */
const store = createStore(combineReducers(
  {
    ...loading,
    ...snackbar,
    ...comment,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
));

export default store;
