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
export function setPost(payload) {
  return {
    type: c.SET_POST,
    payload,
  };
}
