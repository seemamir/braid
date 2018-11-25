import { take, takeLatest, call, put, cancel } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';
export function* login(action) {
  try {
    const { payload } = action;
    const data = {
      username: payload.email,
      ...payload,
    };
    const response = yield call(api.loginApi, data);
    yield put(
      a.setResponse({ message: response.data, status: response.status }),
    );
  } catch (error) {
    yield put(
      a.setResponse({
        message: error.response.data,
        status: error.response.status,
      }),
    );
  }
}
// Individual exports for testing
export default function* loginSaga() {
  // See example in containers/HomePage/saga.js

  const loginAcc = yield takeLatest(c.LOGIN_ACTION, login);
  // yield take(c.UNMOUNT_REDUX);
  // yield cancel(loginAcc);
}
