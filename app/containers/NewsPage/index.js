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
/* eslint-disable react/prefer-stateless-function */
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
    this.props.fetchPost();
    let user = window.localStorage.getItem('user') || '{}';
    user = JSON.parse(user);
    this.props.fetchProfile({userID: user.id});
    console.log(this.props.newsPage);
    setTimeout(() => {
      console.log(this.props.newsPage.profile)
      this.setState({
        imageUrl: get(this.props,'newsPage.profile.image',''),
        bio: get(this.props,'newsPage.profile.bio','')
      });
      console.log(this.state);
    }, 1500);
    
  }

  componentWillMount() {
    this.props.unmount();
  }

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
      bio: this.state.bio
    });
  }
  handleFileUpload = (e,attribute) => {
    e.persist();
    this.getBase64(e.target.files[0], attribute);
  }
  getBase64 = (file, attribute) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const a = this;
    reader.onload = function() {
      a.setState({
        [attribute]: reader.result,
      });
      console.log(a.state);
    };
    reader.onerror = function(error) {};
  };

  renderPosts = () => {
    const posts = get(this, 'props.newsPage.posts', []);
    if (posts instanceof Array) {
      return posts.map((item, i) => (
        <Col span={6}>
          <Card
            style={{ width: 350 }}
            className="news-box"
            cover={<img alt="example" src={item.thumbnail_image} />}
          >
            <Meta title={item.title} description={item.main_sentence} />
            <button className="danger-btn">Delete</button>
          </Card>
        </Col>
      ));
    }
    return <Col>No posts found</Col>;
  };

  render() {
    console.log(this.props)
    let image = <span></span>
    if (this.state.imageUrl) {
      image = <img style={{
        'height': '119px',
        'width': '110px',
        'display': 'block',
        'margin': 'auto',
        'marginBottom': '20px',
        'borderRadius': '50%',
      }} src={this.state.imageUrl} />
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
                  onChange={e =>
                    this.handleFileUpload(e, 'imageUrl')
                  }
                  type="file"
                />
                <Button
                  onClick={() =>
                    document
                      .querySelector('.one-upload-thumbnail')
                      .click()
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
                  id="bio"
                  value={this.state.bio}
                  onChange={(e) => this.setState({bio: e.target.value}) }
                  style={{ width: '100%' }}
                  defaultValue={this.state.bio}
                  placeholder="Enter your bio"
                />
              </Card>
              <Button onClick={()=>this.saveProfile()} type="primary" style={{ marginTop: '20px' }}>
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
    fetchPost: () => dispatch(a.fetchPosts()),
    unmount: () => dispatch(a.unmountRedux()),
    updateProfile: (data) => dispatch(a.updateProfile(data)),
    fetchProfile: (data) => dispatch(a.fetchProfile(data))
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
