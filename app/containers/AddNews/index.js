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
import { Row, Col, Form, Select, Input, Button, Upload } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Navbar';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
/* eslint-disable react/prefer-stateless-function */
export class AddNews extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <div>
        <Helmet>
          <title>AddNews</title>
          <meta name="description" content="Description of AddNews" />
        </Helmet>
        <Header />
        <div className="container">
          <div className="bg-white">
            <Row>
              <Col span={18} offset={3}>
                <Form onSubmit={this.handleSubmit} hideRequiredMark={false}>
                  <FormItem label="Title" {...formItemLayout}>
                    {getFieldDecorator('title', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          required: true,
                          message: 'Please input your title',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter your title"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Thumbnail image" {...formItemLayout}>
                    {getFieldDecorator('upload', {})(
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture"
                      >
                        <Button>Upload a file</Button>
                      </Upload>,
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Category" hasFeedback>
                    {getFieldDecorator('category', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your country!',
                        },
                      ],
                    })(
                      <Select placeholder="Select category">
                        <Option value="Economy">Economy</Option>
                        <Option value="Politics">Politics</Option>
                        <Option value="Tech">Tech</Option>
                        <Option value="Life">Life</Option>
                        <Option value="Entertainment">Entertainment</Option>
                        <Option value="Opinion">Opinion</Option>
                      </Select>,
                    )}
                  </FormItem>
                  <FormItem label="Author" {...formItemLayout}>
                    {getFieldDecorator('author', {
                      rules: [
                        {
                          type: 'text',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter author name"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Author description" {...formItemLayout}>
                    {getFieldDecorator('author-desc', {
                      rules: [
                        {
                          type: 'text',
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please enter author description"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Source" {...formItemLayout}>
                    {getFieldDecorator('source', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          required: true,
                          message: 'Please input source',
                        },
                      ],
                    })(<Input type="text" placeholder="Please enter source" />)}
                  </FormItem>
                  <FormItem label="Main Sentence" {...formItemLayout}>
                    {getFieldDecorator('main-sentence', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          required: true,
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence2', {
                      rules: [
                        {
                          type: 'text',
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence3', {
                      rules: [
                        {
                          type: 'text',
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Sentence" {...formItemLayout}>
                    {getFieldDecorator('sentence4', {
                      rules: [
                        {
                          type: 'text',
                        },
                      ],
                    })(
                      <TextArea
                        type="text"
                        placeholder="Please write something here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people1', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          required: true,
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people2', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people3', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="People" {...formItemLayout}>
                    {getFieldDecorator('people4', {
                      rules: [
                        {
                          type: 'text',
                        },
                        {
                          message: 'Please enter name here',
                        },
                      ],
                    })(
                      <Input
                        type="text"
                        placeholder="Please enter name here"
                      />,
                    )}
                  </FormItem>
                  <FormItem label="Embedded image" {...formItemLayout}>
                    {getFieldDecorator('upload', {})(
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture"
                      >
                        <Button>Upload a file</Button>
                      </Upload>,
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary">Publish</Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
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
