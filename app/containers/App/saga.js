import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* fetchUser() {
  try {
    console.log('seemair13@gmail');
    // const { email } = yield select(makeSelectNewsPage());
    const response = yield call(api.fetchUser, 'seema@gmail');
    console.log(response);
    yield put(a.loggedInAction(response.data));
  } catch (error) {}
}

// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.FETCH_USER, fetchUser);
}
