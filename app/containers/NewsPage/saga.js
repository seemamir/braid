import { takeLatest, call, put, cancel, take } from 'redux-saga/effects';
import { get } from 'lodash';
import * as api from './api';
import * as a from './actions';
import * as c from './constants';
export function* index(action) {
  try {
    const { id } = action;
    const response = yield call(api.fectSavedPosts, id);
    yield put(a.setPosts(response.data));
  } catch (error) {}
}

export function* updateProfile(action) {
  try {
    const res = yield call(api.updateProfile, action.payload);
    console.log(res);
  } catch (e) {
    console.log(e.message);
  }
}
// Individual exports for testing
export function* fetchProfile(action) {
  try {
    console.log(action);
    const response = yield call(api.fetchProfile, action.payload);
    console.log(response.data);
    yield put(a.setProfile(get(response, 'data[0]', {})));
  } catch (e) {
    console.log(e.message);
  }
}
// Individual exports for testing
export default function* newsPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.UPDATE_PROFILE, updateProfile);
  yield takeLatest(c.FETCH_PROFILE, fetchProfile);
}
