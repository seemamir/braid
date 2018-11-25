/*
 *
 * AddNews actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}
export function addPost(payload) {
  return {
    type: c.ADD_POST,
    payload,
  };
}
