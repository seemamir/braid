import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';

export function* fetchUser() {
  try {
    const { email } = yield select(makeSelectNewsPage());
    const response = yield call(api.fetchUser(email));
    console.log(response);
    yield put(a.userInfo(response.data));
  } catch (error) {}
}


// Individual exports for testing
export default function* homeSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.FETCH_POSTS, index);
  yield takeLatest(c.FETCH_USER, fetchUser);
}
