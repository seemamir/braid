import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './api';
import * as c from './constants';
export function* index(action) {
  try {
    const { id } = action;
    const response = yield call(api.fectSavedPosts, id);
    console.log(response);
  } catch (error) {}
}
// Individual exports for testing
export default function* newsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
}
