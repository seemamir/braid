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
import {get} from "lodash"
import injectReducer from 'utils/injectReducer';
import { Row, Col, Icon, Button } from 'antd';
import styled from 'styled-components';
import makeSelectViewNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Navbar/Loadable';
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
  .main-sentence {
    margin: 50px auto;
  }
`;
const Sidebar = styled.div`
  border-left: 1px solid #eee;
  height: 500px;
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
    this.state = {
      commentField: ''
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.viewPost(id);
  }

  publishComment = () => {
    let {state: {commentField}} = this;
    if (commentField) {
      this.props.match.params['id']
      this.props.comment({
        comment: this.state.commentField,
        post: parseInt(get(this,'props.match.params.id',null)),
        user: 1
      })
    }
  }

  render() {
    const { post } = this.props.viewNews;
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
                <Row>
                  <Col span={12}>
                    <p>{post.sentence2}</p>
                  </Col>
                  <Col span={12}>
                    <p>{post.sentence3}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <div className="main-sentence">
                      <h2>Main Sentence</h2>
                      <p>{post.main_sentence}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12} offset={6}>
                    <p>{post.sentence4}</p>
                  </Col>
                </Row>
                <Row>
                  <Col span={20} offset={2}>
                    <h2>Comments</h2>
                    <Row>
                      <Col span={20}>
                        <textarea
                          name="comment"
                          rows="3"
                          onChange={(e) => this.setState({commentField: e.target.value}) }
                          placeholder="Write ur comment here"
                        />
                        { this.state.commentField }
                      </Col>
                      <Col span={4}>
                        <Button onClick={() => this.publishComment() } type="primary">Publish</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
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
