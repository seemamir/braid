/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { connect } from 'react-redux';
import Login from 'containers/Login/Loadable';
import Signup from 'containers/Signup/Loadable';
import Home from 'containers/Home/Loadable';
import Footer from 'components/Footer/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import ViewNews from 'containers/ViewNews/Loadable';
import AddNews from 'containers/AddNews/Loadable';
import ResetPassword from 'containers/ResetPassword/Loadable';
import SocialLoginDone from 'containers/SocialLoginDone/Loadable';
import { compose } from 'redux';
import ForgetPassword from 'containers/ForgetPassword/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import * as a from "./actions.js"

import GlobalStyle from '../../global-styles';

export class App extends React.Component {
  componentDidMount() {
    console.log(a);
    // this.props.fetchUser(window.localStorage.getItem('email'))
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/news-page" component={NewsPage} />
          <Route path="/view/:id" component={ViewNews} />
          <Route path="/add-news" component={AddNews} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/social-login-done" component={SocialLoginDone} />
          <Route exact path="/" component={Login} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </div>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  // login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchUser: payload => dispatch(a.fetchUser(payload)),
  };
}


const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
