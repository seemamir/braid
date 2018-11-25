/**
 *
 * Headerr
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Layout, Avatar } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHeaderr from './selectors';
import reducer from './reducer';
import saga from './saga';
const { Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class Headerr extends React.Component {
  handleRedirect = () => {
    return <Redirect to="/news-page" />;
    // this.props.history.push('/add-news');
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Headerr</title>
          <meta name="description" content="Description of Headerr" />
        </Helmet>
        <Header
          style={{ background: '#fff', padding: '0 20px', textAlign: 'right' }}
        >
          <div onClick={this.handleRedirect}>
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size="large"
            />
            <strong>John Doe</strong>
          </div>
        </Header>
      </div>
    );
  }
}

Headerr.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  headerr: makeSelectHeaderr(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'headerr', reducer });
const withSaga = injectSaga({ key: 'headerr', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Headerr);
