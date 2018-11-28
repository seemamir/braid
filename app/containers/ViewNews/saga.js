import { takeLatest, call, cancel, take, put } from 'redux-saga/effects';
import {get} from 'lodash';
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
    yield put(a.setPostComments(e.response.data));
  }
}

export function* update(action) {
  try {
    const { payload, id } = action;
    const response = yield call(api.updatePostApi, id, payload);
  } catch (error) {}
}

export function* setPostReaction(action) {
  try {
    const response = yield call(api.setPostReaction, action.payload);
  } catch (error) {
    console.log(error.message)
  }
}

export function* getPostReactions(action) {
  try {
    const response = yield call(api.getPostReactions, action.payload);
    // run filterPostReactions to filter at the same time! 
    let postReactions = get(response,'data',[]);
    if (postReactions instanceof Array) {
      yield put(a.savePostReactions(postReactions));
    }
  } catch (error) {
    console.log(error.message)
  }
}

// Individual exports for testing
export default function* viewNewsSaga() {
  // See example in containers/HomePage/saga.js
  const post = yield takeLatest(c.VIEW_POST, view);
  yield takeLatest(c.COMMENT_ON_POST, comment);
  yield takeLatest(c.FETCH_POST_COMMENTS, fetchComments);
  yield takeLatest(c.UPDATE_POST, update);
  yield takeLatest(c.UPDATE_POST, update);
  yield takeLatest(c.SET_POST_REACTION, setPostReaction);
  yield takeLatest(c.GET_POST_REACTIONS, getPostReactions);

  yield take(c.UNMOUNT_REDUX);
  yield cancel(post);
}
