import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* index() {
  try {
    const response = yield call(api.fetchPosts);
    yield put(a.setPosts(response.data));
  } catch (error) {
    yield put(a.setResponse(error.response));
  }
}

export function* fetchUser(email) {
  try {
    const response = yield call(api.fetchUser(email.payload));
    console.log(response); // here is the user is get now please use response to save the user.
  } catch (error) {
    console.log(error);
  }
}
// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.FETCH_USER, fetchUser);
}
