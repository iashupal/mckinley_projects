import React from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

function SideNav({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} defaultOpenKeys={["users"]} mode="inline">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="snippets" />
          <span>여행 후기 목록</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/add">
        <Link to="/add">
          <Icon type="edit" />
          <span>여행 후기 추가</span>
        </Link>
      </Menu.Item>
      <SubMenu
        title={
          <span>
            <Icon type="user" />
            <span>사용자 관리</span>
          </span>
        }
        key="users"
      >
        <Menu.Item key="/users/userlist">
          <Link to="/users/userlist">
            <Icon type="user-add" />
            <span>1레벨 사용자</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/users/accepted">
          <Icon type="check-circle" />
          <span>2레벨 사용자</span>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/profile">
        <Link to="/profile">
          <Icon type="setting" />
          <span>설정</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="/setting">
        <Icon type="setting" />
        <span>설정</span>
      </Menu.Item> */}
    </Menu>
  );
}

export default withRouter(SideNav);
