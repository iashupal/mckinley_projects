import React, { Component } from "react";
import { Layout, Icon } from "antd";

import SideNav from "./components/SideNav/SideNav";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import "./App.css";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, collapsed: false };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentDidMount() {
    if (!!localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: true });
    }
  }

  toggleCollapse(collapsed) {
    this.setState({ collapsed });
  }

  render() {
    const { loggedIn, collapsed } = this.state;
    return loggedIn ? (
      <Layout className="app__layout">
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} onCollapse={e => this.toggleCollapse(e)}>
          <div className="app__logo" />
          <SideNav />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0
            }}
          >
            <Icon
              className="app__navTrigger"
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={() => this.toggleCollapse(!collapsed)}
            />
            <span className="app__logout">
              <Icon type="poweroff" />
              &nbsp; 안전 로그아웃
            </span>
          </Header>
          <Content className="app__content">
            <AppRoutes />
            {/* <AuthRoutes /> */}
          </Content>
          <Footer className="app__footer">(주)투어컴 © 2019</Footer>
        </Layout>
      </Layout>
    ) : (
      <AppRoutes />
    );
  }
}

export default App;
