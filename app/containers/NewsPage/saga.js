import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from './api';
import * as a from './actions';
import * as c from './constants';
export function* index(action) {
  try {
    const { id } = action;
    const response = yield call(api.fectSavedPosts);
    yield put(a.setPosts(response.data));
  } catch (error) {}
}
// Individual exports for testing
export default function* newsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
}
