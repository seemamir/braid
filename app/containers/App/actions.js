import * as c from './constants';

export function loggedInAction(payload) {
  return {
    type: c.LOGGED_IN_USER,
    payload,
  };
}
export function setEmail(payload) {
  return {
    type: c.SET_EMAIL,
    payload,
  };
}
