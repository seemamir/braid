/*
 *
 * ViewNews reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  post: {},
});

function viewNewsReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.SET_POST:
      return state.set('post', action.payload);
    default:
      return state;
  }
}

export default viewNewsReducer;
