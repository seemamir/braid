import React from 'react';
import { Layout, Avatar } from 'antd';
const { Header } = Layout;
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Navbar() {
  return (
    <Header
      style={{ background: '#fff', padding: '0 20px', textAlign: 'right' }}
    >
      <div>
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          size="large"
        />
        <strong>John Doe</strong>
      </div>
    </Header>
  );
}

Navbar.propTypes = {};

export default Navbar;
