/*
 *
 * ViewNews actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function viewPost(id) {
  return {
    type: c.VIEW_POST,
    id,
  };
}

export function comment(payload) {
  return {
    type: c.COMMENT_ON_POST,
    payload,
  };
}

export function fetchPostComments(payload) {
  console.log(payload);
  return {
    type: c.FETCH_POST_COMMENTS,
    payload,
  };
}

export function setPost(payload) {
  return {
    type: c.SET_POST,
    payload,
  };
}

export function updatePost(payload) {
  return {
    type: c.UPDATE_POST,
    payload,
  };
}
