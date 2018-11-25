import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Card, Upload, Icon, message, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNewsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
const { Meta } = Card;
/* eslint-disable react/prefer-stateless-function */
export class NewsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
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
      console.log(this.state);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'camera'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Helmet>
          <title>NewsPage</title>
          <meta name="description" content="Description of NewsPage" />
        </Helmet>
        <div className="container">
          <Row>
            <Col span={6}>
              <Card style={{ marginRight: '20px', textAlign: 'center' }}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? (
                    <img src={this.state.imageUrl} alt="avatar" />
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <span>Username</span>
              </Card>
            </Col>
            <Col span={14}>
              <Card>
                <textarea
                  name="bio"
                  rows="5"
                  id="bio"
                  style={{ width: '100%' }}
                  value=" Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolorem, ullam molestiae quod consequuntur nam, in cumque
                  debitis alias fugit, incidunt fuga quos excepturi. Non, nisi
                  ullam omnis labore vel praesentium. Lorem ipsum dolor sit,
                  amet consectetur adipisicing elit. Architecto commodi nisi
                  odio magnam velit reiciendis aperiam natus, fugiat ratione
                  illo sapiente esse ducimus odit. Quibusdam magnam aut unde
                  laboriosam facere?"
                  placeholder="Enter your bio"
                />
              </Card>
              <Button type="primary" style={{ marginTop: '20px' }}>
                Save
              </Button>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ width: 350 }}
                className="news-box"
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

NewsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  newsPage: makeSelectNewsPage(),
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

const withReducer = injectReducer({ key: 'newsPage', reducer });
const withSaga = injectSaga({ key: 'newsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsPage);
