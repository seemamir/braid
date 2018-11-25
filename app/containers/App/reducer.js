import { fromJS } from 'immutable';
import { loadState, clearState } from '../../utils/persistState';

import * as c from './constants';

const user = loadState();

// The initial state of the App
export const initialState = fromJS({
  loggedInInfo: user,
  currentUser: {},
});



function appReducer(state = initialState, action) {
  switch (action.type) {
    case c.LOGGED_IN_USER:
      return state.set('loggedInInfo', action.payload);
    case c.LOGOUT_USER:
      clearState();
      return state.set('loggedInInfo', null);

    default:
      return state;
  }
}

export default appReducer;
