import * as c from './constants';

export function loggedInAction(user) {
  return {
    type: c.LOGGED_IN_USER,
    payload: user,
  };
}
