import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Card, Upload, Icon, message, Button } from 'antd';
import { get } from 'lodash';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNewsPage from './selectors';
import makeSelectGlobalState from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../Headerr/Loadable';
import * as a from './actions';
const { Meta } = Card;
import {fetchSinglePost,deleteSavedPost} from "./api.js"

/* eslint-disable react/prefer-stateless-function */


class SavedPostView extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPost(this.props.item.post);
    this.state = {
      post: {},
      loaded: false,
    }
  }
  fetchPost = async (id) => {
    try {
      let response = await fetchSinglePost(id);
      this.setState({
        loaded: true,
        post: response.data
      })
    } catch (e) {
      console.log(e.message)
    }
  }
  deleteSavedPost = async (id) => {
    await deleteSavedPost(id);
    this.props.reload()
  }
  render() {
    let item = this.props.item;
    let title = get(this,'state.post.title','');
    return (
      
        <Card
          style={{ width: 350 }}
          className="news-box"
          cover={<img alt="example" src={item.thumbnail_image} />}
        >
          <h3>{title}</h3>
        <button onClick={() => this.deleteSavedPost(item.id) } className="danger-btn">Delete</button>
      </Card>
    )
  }
}
export class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
      bio: '',
    };
  }

  componentDidMount() {
    let userID = get(this,'props.global.user.id',null);
    // const { user } = this.props.global;
    this.props.fetchPost(userID);
    this.props.fetchProfile(userID);
    setTimeout(() => {
      this.setState({
        imageUrl: get(this.props, 'global.profile.image', ''),
        bio: get(this.props, 'global.profile.bio', ''),
      });
    }, 1500);
  }

  // componentWillMount() {
  //   this.props.unmount();
  // }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  saveProfile = () => {
    let profileID;
    let profile = localStorage.getItem('profile') || '{}';
    profile = JSON.parse(profile);
    this.props.updateProfile({
      id: profile.id,
      image: this.state.imageUrl,
      bio: this.state.bio,
    });
  };

  handleFileUpload = (e, attribute) => {
    e.persist();
    this.getBase64(e.target.files[0], attribute);
  };

  getBase64 = (file, attribute) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const a = this;
    reader.onload = function() {
      a.setState({
        [attribute]: reader.result,
      });
    };
    reader.onerror = function(error) {};
  };

  renderPosts = () => {
    const posts = get(this, 'props.newsPage.posts', []);
    if (posts instanceof Array) {
      return posts.map((item, i) => (
        <Col span={6}>
          <SavedPostView reload={() => {
            let userID = get(this,'props.global.user.id',null);
            // const { user } = this.props.global;
            this.props.fetchPost(userID);
          }} item={item} />
        </Col>
      ));
    }
    return <Col>No posts found</Col>;
  };

  render() {
    let image = <span />;
    if (this.state.imageUrl) {
      image = (
        <img
          style={{
            height: '119px',
            width: '110px',
            display: 'block',
            margin: 'auto',
            marginBottom: '20px',
            borderRadius: '50%',
          }}
          src={this.state.imageUrl}
        />
      );
    }
    return (
      <div>
        <Helmet>
          <title>NewsPage</title>
          <meta name="description" content="Description of NewsPage" />
        </Helmet>
        <Header />
        <div className="container">
          <Row>
            <Col span={6}>
              <Card style={{ marginRight: '20px', textAlign: 'center' }}>
                <div>
                  {image}
                  <input
                    style={{ display: 'none' }}
                    className="one-upload-thumbnail"
                    onChange={e => this.handleFileUpload(e, 'imageUrl')}
                    type="file"
                  />
                  <Button
                    onClick={() =>
                      document.querySelector('.one-upload-thumbnail').click()
                    }
                  >
                    Upload Photo
                  </Button>
                </div>
              </Card>
            </Col>
            <Col span={14}>
              <Card>
                <textarea
                  name="bio"
                  rows="5"
                  value={this.state.bio}
                  id="bio"
                  onChange={e => this.setState({ bio: e.target.value })}
                  style={{ width: '100%' }}
                  defaultValue={this.state.bio}
                  placeholder="Enter your bio"
                />
              </Card>
              <Button
                onClick={() => this.saveProfile()}
                type="primary"
                style={{ marginTop: '20px' }}
              >
                Save
              </Button>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>{this.renderPosts()}</Row>
        </div>
      </div>
    );
  }
}

NewsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  newsPage: makeSelectNewsPage(),
  global: makeSelectGlobalState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchPost: id => dispatch(a.fetchPosts(id)),
    unmount: () => dispatch(a.unmountRedux()),
    updateProfile: data => dispatch(a.updateProfile(data)),
    fetchProfile: data => dispatch(a.fetchProfile(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newsPage', reducer });
const withSaga = injectSaga({ key: 'newsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsPage);
