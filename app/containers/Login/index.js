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

  prepareLogin(a) {
    a.username = a.email;
    a.password1 = 'socialpassword/12345';
    a.password2 = 'socialpassword/12345';
    a.password = 'socialpassword/12345';
    this.props.createAccount(a);
    setTimeout(() => {
      const { response } = this.props.login;

      if (response && response.status && response.status === 200) {
        localStorage.setItem('email', a.email);
        this.props.history.push('/');
      }
    }, 1000);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginAction({ username: values.email, ...values });
      }
    });
    setTimeout(() => {
      const { response } = this.props.login;
      if (response && response.status && response.status === 200) {
        this.props.form.validateFields((err, values) => {
          localStorage.setItem('email', values.email);
          this.props.history.push('/');
        });
      }
    }, 1000);
  };

  googleLogin = () => {
    try {
      window.gapi.auth2.getAuthInstance().then(auth2 => {
        auth2.signIn().then(googleUser => {
          const profile = googleUser.getBasicProfile();
          // const payload = {
          //   auth_data: {
          //     credentials: {
          //       expires_at: googleUser.Zi.expires_at,
          //       token: googleUser.Zi.access_token
          //     },
          //     info: {
          //       id: profile.getId(),
          //       name: profile.getName(),
          //       image_url: profile.getImageUrl(),
          //       email: profile.getEmail()
          //     },
          //     provider: 'google_oauth2',
          //     uid: profile.getId()
          //   }
          // }
          // this.socialLogin({
          //   platform: 'google_oauth2',
          //   payload
          // }).then(() => {
          //   this.handleLoginRedirect()
          // })
          this.prepareLogin({
            email: profile.getEmail(),
            image: profile.getImageUrl(),
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  linkedInLogin = () => {
    window.IN.User.authorize(() => {
      window.IN.API.Profile('me')
        .fields('id', 'first-name', 'last-name', 'email-address', 'picture-url')
        .result(res => {
          this.prepareLogin({
            email: res.values[0].emailAddress,
            image: res.values[0].pictureUrl,
          });
          // const payload = {
          //   auth_data: {
          //     credentials: {
          //       expires_at:
          //         Date.now() + window.IN.ENV.auth.oauth_expires_in * 1000,
          //       token: window.IN.ENV.auth.oauth_token,
          //     },
          //     info: {
          //       id: res.values[0].id,
          //       name: `${res.values[0].firstName} ${res.values[0].lastName}`,
          //       image_url: res.values[0].pictureUrl,
          //       email: res.values[0].emailAddress,
          //     },
          //     provider: 'linkedin',
          //     uid: res.values[0].id,
          //   },
          // };
          // console.log(payload);
          const payload = {
            auth_data: {
              credentials: {
                expires_at:
                  Date.now() + window.IN.ENV.auth.oauth_expires_in * 1000,
                token: window.IN.ENV.auth.oauth_token,
              },
              info: {
                id: res.values[0].id,
                name: `${res.values[0].firstName} ${res.values[0].lastName}`,
                image_url: res.values[0].pictureUrl,
                email: res.values[0].emailAddress,
              },
              provider: 'linkedin',
              uid: res.values[0].id,
            },
          };
          console.log(payload);
        });
    });
  };

  facebookLogin = () => {
    try {
      window.FB.login(
        response => {
          // Handle the response object, like in statusChangeCallback() in our demo
          // code.
          window.FB.api('/me?fields=id,name,picture,email', res => {
            this.prepareLogin({
              email: res.email,
              image: res.picture.data.url,
            });
            console.log(res);
            // const payload = {
            //   auth_data: {
            //     credentials: {
            //       expires_at: Date.now() + response.authResponse.expiresIn * 1000,
            //       token: response.authResponse.accessToken
            //     },
            //     info: {
            //       id: res.id,
            //       name: res.name,
            //       image_url: res.picture.data.url,
            //       email: res.email
            //     },
            //     provider: 'facebook',
            //     uid: res.id
            //   }
            // }
            // this.socialLogin({
            //   platform: 'facebook',
            //   payload
            // }).then(() => {
            //   this.handleLoginRedirect()
            // })
          });
        },
        { scope: 'public_profile,email' },
      );
    } catch (error) {
      console.log(error);
    }
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
                    <SocialIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.facebookLogin()}
                      icon="facebook"
                      color="#3F51B5"
                    />
                    <SocialIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.googleLogin()}
                      icon="google-plus"
                      color="#F06292"
                    />
                    <SocialIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.linkedInLogin()}
                      icon="linkedin"
                      color="#546E7A"
                    />
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
    createAccount: payload => dispatch(a.createAccount(payload)),
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
