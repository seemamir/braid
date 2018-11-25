/*
 *
 * NewsPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({
  posts: {},
});

function newsPageReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    case c.FETCH_POSTS:
      return state.set('posts', action.payload);
    default:
      return state;
  }
}

export default newsPageReducer;
