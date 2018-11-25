/*
 *
 * Home actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}

export function fetchPosts() {
  return {
    type: c.FETCH_POSTS,
  };
}
export function setPosts(payload) {
  return {
    type: c.SET_POSTS,
    payload,
  };
}

export function setResponse(payload) {
  return {
    type: c.SET_RESPONSE,
    payload,
  };
}
