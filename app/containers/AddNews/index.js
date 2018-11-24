/**
 *
 * AddNews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Form, Select, Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddNews from './selectors';
import reducer from './reducer';
import saga from './saga';
const FormItem = Form.Item;
const { Option } = Select;
/* eslint-disable react/prefer-stateless-function */
export class AddNews extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Helmet>
          <title>AddNews</title>
          <meta name="description" content="Description of AddNews" />
        </Helmet>
        <div className="container">
          <Row>
            <Col>
              <h3>Add new</h3>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="E-mail">
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
                <FormItem label="Password">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input type="password" />)}
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const NewForm = Form.create()(AddNews);
AddNews.propTypes = {};

const mapStateToProps = createStructuredSelector({
  addNews: makeSelectAddNews(),
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

const withReducer = injectReducer({ key: 'addNews', reducer });
const withSaga = injectSaga({ key: 'addNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewForm);
