import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import SocialIcon from '../../components/SocialIcon/Loadable';
import * as a from './actions';
const FormItem = Form.Item;
/* eslint-disable react/prefer-stateless-function */
export class Login extends React.Component {
  componentDidMount() {
    this.props.reset();
  }

  componentWillMount() {
    this.props.unmount();
  }

  handleSignup = () => {
    this.props.history.push('/signup');
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        this.props.loginAction(values);
      }
    });
    setTimeout(() => {
      const { response } = this.props.login;
      console.log(response);
      if (response && response.status && response.status === 200) {
        this.props.history.push('/home');
      }
    }, 1000);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { response } = this.props.login;
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Description of Login" />
        </Helmet>
        <Row justify="center">
          <Col span={8} offset={8}>
            <div className="wrapper">
              <Icon type="smile" className="logo" theme="outlined" />
              <h3>Login to your account</h3>
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
                {response &&
                  response.status &&
                  response.status !== 200 && (
                    <Alert
                      message="Invalid credentials"
                      type="error"
                      showIcon
                    />
                  )}
                <FormItem>
                  <Button
                    type="primary"
                    className="login-form-button"
                    htmlType="submit"
                  >
                    Login <Icon type="login" />
                  </Button>
                  <div className="login-form-forgot">
                    <Link to="/forget-password">Forgot password</Link>
                  </div>
                  <div className="content-divider">
                    <span>Sign in with</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <SocialIcon icon="facebook" color="#3F51B5" />
                    <SocialIcon icon="google-plus" color="#F06292" />
                    <SocialIcon icon="linkedin" color="#546E7A" />
                  </div>
                  <div className="content-divider ">
                    <span>Don't have account?</span>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="btn-success signup-btn"
                    onClick={this.handleSignup}
                  >
                    Signup
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
const LoginForm = Form.create()(Login);
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loginAction: payload => dispatch(a.loginAction(payload)),
    unmount: payload => dispatch(a.unmountRedux(payload)),
    reset: () => dispatch(a.resetResponse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginForm);
