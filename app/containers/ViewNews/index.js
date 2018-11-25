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
import injectReducer from 'utils/injectReducer';
import { Row, Col, Icon } from 'antd';
import makeSelectViewNews from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from "../../components/Navbar/Loadable"
import styled from "styled-components"
const Wrapper = styled.div`
  margin: 20px auto;
  text-align: center;
  h3{
    color: #555;
  }
`
const Sidebar = styled.div`
  border-left: 1px solid #eee;
  i{
    margin-right:5px;
  }

`
/* eslint-disable react/prefer-stateless-function */
export class ViewNews extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>ViewNews</title>
          <meta name="description" content="Description of ViewNews" />
        </Helmet>
        <Header/>
        <Wrapper>
          <div className="bg-white">
            <Row >
              <Col span={24}>
                <h1 >Hello world</h1>
                <h3>Category: Politics</h3>
                <p>Author: John <span>Source: CBN</span></p> 

              </Col>
              
            </Row>
            <Row>
              <Col span={16}>
                <h2>Summary</h2>
                <Row>
                  <Col span={12}> 
                    <p>lorem djhasdvasd asdasgdjasbdnasda  dasjhdasvdasd</p>
                  </Col>
                  <Col span={12}> 
                    <p>lorem djhasdvasd asdasgdjasbdnasda  dasjhdasvdasd</p>
                  </Col>
                </Row>
               
              </Col>
              <Col span={8}>
                <Sidebar>

                  <h2>People</h2>
                  <Icon type="heart" theme="filled" style={{ fontSize: '50px', color: "red" }}/>
                  <Icon type="smile" theme="filled" style={{ fontSize: '50px', color: "#faad14" }}/>
                  <Icon type="frown" theme="filled" style={{ fontSize: '50px', color: "#faad14" }}/>
                  <Icon type="meh" theme="filled" style={{ fontSize: '50px', color: "#faad14" }}/>
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
