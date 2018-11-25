import { takeLatest, call, put } from 'redux-saga/effects';
import * as c from './constants';
import * as a from './actions';
import * as api from './api';
export function* view(action) {
  try {
    const { id } = action;
    const response = yield call(api.viewPostApi, id);
    yield put(a.setPost(response.data));
  } catch (error) {
    yield put(a.setPost(error.response.data));
  }
}

export function* comment(action) {
  try {
    const response = yield call(api.comment(action.data));
    console.log(response);
  } catch (e) {
    console.log(e.response);
  }
}
// Individual exports for testing
export default function* viewNewsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(c.VIEW_POST, view);
  yield takeLatest(c.COMMENT_ON_POST, comment);
}