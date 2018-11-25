/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());
/**
 * Is login returns whether the user is logged in or not.
 * @return {boolean}
 */
const isLogin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loggedInInfo') !== null,
  );

/**
 * @return {Object} currently logged in user info.
 */
const loggedInInfo = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState.get('loggedInInfo') !== null) {
      return globalState.get('loggedInInfo').toJS();
    }
    return null;
  });

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectRepos,
  makeSelectLocation,
  isLogin,
  // loggedInInfo,
};
