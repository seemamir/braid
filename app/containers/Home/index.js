import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Layout, List, Avatar, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import Sidebar from '../../components/Sidebar/Loadable';
import * as a from './actions';
const { Content } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchUser()
  }

  viewPost = id => {
    this.props.history.push(`/view/${id}`);
  };

  handleRedirect = () => {
    this.props.history.push('/add-news');
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <Layout>
          <Sidebar />
          <Layout style={{ marginLeft: '200px' }}>
            <Header />
            <Content className="content">
              <Button onClick={this.handleRedirect} type="primary">
                Add new post
              </Button>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  pageSize: 3,
                }}
                dataSource={this.props.home.news}
                renderItem={item => (
                  <List.Item
                    onClick={() => this.viewPost(item.id)}
                    key={item.title}
                    extra={
                      <img
                        width={272}
                        alt="No image logo"
                        src={item.thumbnail_image}
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.main_sentence}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchPosts: () => dispatch(a.fetchPosts()),
    fetchUser: () => dispatch(a.fetchUser(localStorage.getItem('email'))),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
