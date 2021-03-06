/**
 *
 * ResetPassword
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectResetPassword from './selectors';
import reducer from './reducer';
import saga from './saga';
const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
export class ResetPassword extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Helmet>
          <title>ResetPassword</title>
          <meta name="description" content="Description of ResetPassword" />
        </Helmet>
        <Row justify="center">
          <Col span={8} offset={8}>
            <div className="wrapper">
              <Icon type="smile" className="logo" theme="outlined" />
              <h3>Setup your new account</h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('confirm-password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm password!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Confirm Password"
                    />,
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" className="login-form-button">
                    Reset password <Icon type="arrow-right" />
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
const ResetForm = Form.create()(ResetPassword);

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resetPassword: makeSelectResetPassword(),
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

const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ResetForm);
