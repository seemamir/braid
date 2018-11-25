/*
 *
 * Signup actions
 *
 */

import * as c from './constants';

export function defaultAction() {
  return {
    type: c.DEFAULT_ACTION,
  };
}

export function createAccount(payload) {
  return {
    type: c.CREATE_ACCOUNT,
    payload,
  };
}

export function setResponse(payload) {
  console.log(payload)
  return {
    type: c.SET_RESPONSE,
    payload,
  };
}
