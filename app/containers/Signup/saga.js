import { takeLatest, call, put } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';

export function* create(action) {
  console.log("hi");
  try {
    const { payload } = action;
    const data = {
      username: payload.email,
      ...payload,
    };
    const response = yield call(api.createAccountApi, data);
    console.log(response);
    yield put(a.setResponse(response.data));
  } catch (error) {
    yield put(a.setResponse(error.response.data));
  }
}
// Individual exports for testing
export default function* signupSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.CREATE_ACCOUNT, create);
}
