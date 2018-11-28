import * as c from './constants';

export function loggedInAction(payload) {
  return {
    type: c.LOGGED_IN_USER,
    payload,
  };
}

export function fetchUser(payload) {
  return {
    type: c.FETCH_PROFILE,
    payload,
  };
}

export function fetchProfile(payload) {
  return {
    type: c.FETCH_PROFILE,
    payload,
  };
}
export function createProfile(payload) {
  return {
    type: c.CREATE_PROFILE,
    payload,
  };
}
export function updateProfile(payload) {
  return {
    type: c.UPDATE_PROFILE,
    payload,
  };
}

export function setUserId(id) {
  return {
    type: c.SET_USER_ID,
    id,
  };
}
