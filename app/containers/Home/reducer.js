/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  news: [],
  response: {},
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.FETCH_POSTS:
      return state.set('news', action.payload);
    case c.SET_RESPONSE:
      return state.set('response', action.payload);
    default:
      return state;
  }
}

export default homeReducer;
