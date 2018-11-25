/*
 *
 * AddNews reducer
 *
 */

import { fromJS } from 'immutable';
import * as c from './constants';

export const initialState = fromJS({});

function addNewsReducer(state = initialState, action) {
  switch (action.type) {
    case c.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default addNewsReducer;
