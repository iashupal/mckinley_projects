import React from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

function SideNav({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      defaultOpenKeys={["users"]}
      mode="inline"
    >
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="pie-chart" />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/patients">
        <Link to="/patients">
          <Icon type="team" />
          <span>Patients</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/doctors">
        <Link to="/doctors">
          <Icon type="monitor" />
          <span>Doctors</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/appointments">
        <Link to="/appointments">
          <Icon type="calendar" />
          <span>Appointments</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(SideNav);
