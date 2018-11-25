/*
 *
 * NewsPage actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function fetchPosts(payload) {
  return {
    type: c.FETCH_POSTS,
    payload,
  };
}
export function setPosts(payload) {
  return {
    type: c.SET_POSTS,
    payload,
  };
}
