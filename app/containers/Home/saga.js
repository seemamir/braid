import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';
import makeSelectNewsPage from '../Login/selectors';

export function* index(action) {
  try {
    console.log(action.payload);
    const response = yield call(api.fetchPosts(action.payload));
    console.log(response);
    yield put(a.setPosts(response.data));
  } catch (error) {
    yield put(a.setResponse(error.response));
  }
}

export function* fetchUser() {
  try {
    const { email } = yield select(makeSelectNewsPage());
    const response = yield call(api.fetchUser(email));
    console.log(response); // here is the user is get now please use response to save the user.
  } catch (error) {}
}
// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.FETCH_USER, fetchUser);
}
