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
import Login from 'containers/Login/Loadable';
import Signup from 'containers/Signup/Loadable';
import Home from 'containers/Home/Loadable';
import Footer from 'components/Footer/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import ViewNews from 'containers/ViewNews/Loadable';
import AddNews from 'containers/AddNews/Loadable';
import ResetPassword from 'containers/ResetPassword/Loadable';
import SocialLoginDone from 'containers/SocialLoginDone/Loadable';
import ForgetPassword from 'containers/ForgetPassword/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
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
