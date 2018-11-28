/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectEmail = () => {
  const email = globalState => globalState.get('email');
  return email;
};

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

export {
  selectGlobal,
  makeSelectEmail,
  makeSelectRepos,
  // makeSelectLocation,
  isLogin,
  // loggedInInfo,
};
