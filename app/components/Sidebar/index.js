import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Logo from '../../images/logo.png';
// import PropTypes from 'prop-types';
const { Sider } = Layout;
function Sidebar() {
  return (
    <Sider
      className="sidebar"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ height: '100vh', paddingTop: '30px', position: 'fixed' }}
    >
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
        <Menu.Item key="0">
          <Icon type="bars" />
          <span className="nav-text">All</span>
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="stock" />
          <span className="nav-text">Economy</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="team" />
          <span className="nav-text">Politics</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="mobile" />
          <span className="nav-text">Tech</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text">Life</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="customer-service" />
          <span className="nav-text">Entertainment</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="solution" />
          <span className="nav-text">Opinion</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
