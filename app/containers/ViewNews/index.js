/**
 *
 * ViewNews
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import { get } from 'lodash';
import injectReducer from 'utils/injectReducer';
import { Row, Col, Icon, Button, Form } from 'antd';
import styled from 'styled-components';
import makeSelectViewNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
const Wrapper = styled.div`
  margin: 20px auto;
  text-align: center;
  .main-heading {
    margin-bottom: 30px;
  }
  h3 {
    color: #555;
  }
  p {
    margin: auto 20px;
  }
  .main-sentence {
    margin: 50px auto;
  }
  .save-btn {
    margin-top: 50px;
    margin-right: 10px;
  }
  .comment {
    margin-top: 50px;
  }
`;
const Sidebar = styled.div`
  border-left: 1px solid #eee;
  height: 600px;
  margin-left: 50px;
  i {
    margin-bottom: 5px;
  }
  img {
    margin-top: 50px;
  }
`;
/* eslint-disable react/prefer-stateless-function */
export class ViewNews extends React.Component {
  constructor(props) {
    super(props);
    const { post } = props.viewNews;
    this.state = {
      commentField: '',
      sentence2: post.sentence2,
      sentence3: post.sentence3 ? post.sentence3 : '',
      sentence4: post.sentence4 ? post.sentence4 : '',
      main_sentence: post.main_sentence ? post.main_sentence : '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.viewPost(id);
    this.props.fetchPostComments(id);
  }
  componentWillUnmount(){
    this.props.unmount()
  }
  handleRedirect = () => {
    this.props.history.push('/news-page');
  };

  publishComment = () => {
    const {
      state: { commentField },
    } = this;
    if (commentField) {
      this.props.match.params.id;
      this.props.comment({
        comment: this.state.commentField,
        post: parseInt(get(this, 'props.match.params.id', null)),
        user: 1,
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = () => {
    const { id } = this.props.match.params;
    this.props.update(id, ...this.state);
  };

  render() {
    const { post, comments } = this.props.viewNews;
    return (
      <div>
        <Helmet>
          <title>View Post</title>
          <meta name="description" content="Description of ViewNews" />
        </Helmet>
        <Header />
        <Wrapper>
          <div className="bg-white">
            <Row>
              <Col span={24}>
                <h1>{post.title}</h1>
                <h3>Category: {post.category}</h3>
                <p>
                  Author: {post.author} <span>Source: {post.source}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <h2 className="main-heading">Summary</h2>
                <Form onChange={this.handleChange}>
                  <Row>
                    <Col span={1} />
                    <Col span={10}>
                      <textarea
                        name="sentence2"
                        rows="4"
                        defaultValue={this.state.sentence2}
                      />
                    </Col>
                    <Col span={2} />
                    <Col span={10}>
                      <textarea
                        name="sentence3"
                        rows="4"
                        defaultValue={this.state.sentence3}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} offset={6}>
                      <div className="main-sentence">
                        <h2>Main Sentence</h2>
                        <textarea
                          name="main_sentence"
                          rows="4"
                          defaultValue={this.state.main_sentence}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} offset={6}>
                      <textarea
                        name="sentence4"
                        rows="4"
                        defaultValue={this.state.sentence4}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        className="save-btn"
                        onClick={this.handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        className="save-btn"
                        onClick={this.handleRedirect}
                      >
                        Go to saved Page
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={8}>
                <Sidebar>
                  <h2>People</h2>
                  <Row>
                    <Col span={4} />
                    <Col span={4}>
                      <p>{post.people1}</p>
                      <Icon
                        type="heart"
                        theme="filled"
                        style={{ fontSize: '50px', color: 'red' }}
                      />
                      <h4>Like</h4>
                      <span>11</span>
                    </Col>
                    <Col span={4}>
                      <p>{post.people2}</p>
                      <Icon
                        type="smile"
                        theme="filled"
                        style={{ fontSize: '50px', color: '#faad14' }}
                      />
                      <h4>Funny</h4>
                      <span>1</span>
                    </Col>
                    <Col span={4}>
                      <p>{post.people3}</p>
                      <Icon
                        type="frown"
                        theme="filled"
                        style={{ fontSize: '50px', color: '#faad14' }}
                      />
                      <h4>Sad</h4>
                      <span>17</span>
                    </Col>
                    <Col span={4}>
                      <p>{post.people4}</p>
                      <Icon
                        type="meh"
                        theme="filled"
                        style={{ fontSize: '50px', color: '#faad14' }}
                      />
                      <h4>Angry</h4>
                      <span>19</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={20} offset={2}>
                      <img
                        width="200"
                        height="200"
                        src={post.embedded_image}
                        alt="Embedded image"
                      />
                    </Col>
                  </Row>
                </Sidebar>
              </Col>
            </Row>
            <Row>
              <Col span={16} offset={2}>
                <h2 className="comment">Comments</h2>

                <Row>
                  <Col span={24}>
                    {/* {console.log(comments)} */}
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <textarea
                      name="comment"
                      rows="3"
                      onChange={e =>
                        this.setState({ commentField: e.target.value })
                      }
                      placeholder="Write ur comment here"
                    />
                    {this.state.commentField}
                  </Col>
                  <Col span={4}>
                    <Button
                      onClick={() => this.publishComment()}
                      type="primary"
                    >
                      Publish
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    {/* {console.log(comments)} */}
                    {/* <ul>{comments && comments.map((item) => {
                      return <li>{item.comment}</li>})}</ul> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Wrapper>
      </div>
    );
  }
}

ViewNews.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  viewNews: makeSelectViewNews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    viewPost: id => dispatch(a.viewPost(id)),
    comment: data => dispatch(a.comment(data)),
    update: (id, payload) => dispatch(a.updatePost(id, payload)),
    fetchPostComments: id => dispatch(a.fetchPostComments(id)),
    unmount: () => dispatch(a.unmountRedux()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'viewNews', reducer });
const withSaga = injectSaga({ key: 'viewNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ViewNews);
