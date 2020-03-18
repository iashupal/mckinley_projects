import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import '../css/sidenav.css';

const { SubMenu } = Menu;

function SideNav({ location }) {
  return (
    <Menu
      theme="dark"
      className="side_menu"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['users']}
      mode="inline"
    >
      {/* Dashboard */}
      <Menu.Item key="/">
        <Link to="/">
          <span>홈</span>
        </Link>
      </Menu.Item>
      {/* Users */}
      <Menu.Item key="/users">
        <Link to="/users">
          <span>회원관리</span>
        </Link>
      </Menu.Item>
      {/* Manage Cast */}
      <SubMenu
        title={
          <span>
            <span>캐스트 관리</span>
          </span>
        }
        key="casts"
      >
        {/* Manage Cast */}
        <Menu.Item key="/cast">
          <Link to="/cast">
            <span>리스트 뷰</span>
          </Link>
        </Menu.Item>
        {/* View As Cards */}
        <Menu.Item key="/cast-card">
          <Link to="/cast-card">
            <span>카드 뷰</span>
          </Link>
        </Menu.Item>
        {/* Register a new cast */}
        <Menu.Item key="/cast/add">
          <Link to="/cast/add">
            <span>새로운 캐스트 추가</span>
          </Link>
        </Menu.Item>
      </SubMenu>

      {/* comments */}
      <Menu.Item key="/comment">
        <Link to="/comment">
          <span>댓글관리</span>
        </Link>
      </Menu.Item>
      {/* banner images */}
      <Menu.Item key="/banner">
        <Link to="/banner">
          <span>배너/광고관리</span>
        </Link>
      </Menu.Item>
      {/* Announcement */}
      <Menu.Item key="/announcements">
        <Link to="/announcements">
          <span>공지사항</span>
        </Link>
      </Menu.Item>
      {/* FAQ */}
      <Menu.Item key="/faq">
        <Link to="/faq">
          <span>FAQ</span>
        </Link>
      </Menu.Item>
      {/* Reward */}
      <Menu.Item key="/reward">
        <Link to="/reward">
          <span>리워드관리</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(SideNav);
