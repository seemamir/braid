import { takeLatest, call, cancel, take, put } from 'redux-saga/effects';
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
    const response = yield call(api.comment, action.payload);
  } catch (e) {
    console.log(e.response);
  }
}

export function* fetchComments(action) {
  try {
    const response = yield call(api.commentsApi, action.payload);
    yield put(a.setPostComments(response.data));
  } catch (e) {
    throw e;
    // yield put(a.setPostComments(e.response.data));
  }
}

export function* update(action) {
  try {
    const { payload, id } = action;
    const response = yield call(api.updatePostApi, id, payload);
  } catch (error) {}
}

// Individual exports for testing
export default function* viewNewsSaga() {
  // See example in containers/HomePage/saga.js
  const post = yield takeLatest(c.VIEW_POST, view);
  const post_comment = yield takeLatest(c.COMMENT_ON_POST, comment);
  const fetch_post = yield takeLatest(c.FETCH_POST_COMMENTS, fetchComments);
  yield takeLatest(c.UPDATE_POST, update);
  yield takeLatest(c.UPDATE_POST, update);

  yield take(c.UNMOUNT_REDUX);
  yield cancel(post);
  yield cancel(post_comment);
  yield cancel(fetch_post);
}
