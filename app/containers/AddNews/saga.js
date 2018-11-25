import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* create(action) {
  try {
    const { payload } = action;
    const response = yield call(api.addPost, payload);
    console.log(response);
  } catch (error) {}
}
// Individual exports for testing
export default function* addNewsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.ADD_POST, create);
}
