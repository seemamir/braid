import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignup from './selectors';
import reducer from './reducer';
import saga from './saga';
const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
export class Signup extends React.Component {
  handleLogin = () => {
    this.props.history.push(`/`);
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Helmet>
          <title>Signup</title>
          <meta name="description" content="Description of Signup" />
        </Helmet>
        <Row justify="center">
          <Col span={8} offset={8}>
            <div className="wrapper">
              <Icon type="smile" className="logo" theme="outlined" />
              <h3>Setup your new account</h3>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ],
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Email"
                    />,
                  )}
                </FormItem>
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
                    Register <Icon type="arrow-right" />
                  </Button>

                  <div className="content-divider signup">
                    <span>Already have an account?</span>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="btn-success signup-btn"
                    onClick={this.handleLogin}
                  >
                    Login
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
const SignupForm = Form.create()(Signup);

Signup.propTypes = {};

const mapStateToProps = createStructuredSelector({
  signup: makeSelectSignup(),
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

const withReducer = injectReducer({ key: 'signup', reducer });
const withSaga = injectSaga({ key: 'signup', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SignupForm);
