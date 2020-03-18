import React, { Component } from "react";
import { Layout, Icon } from "antd";

import SideNav from "./components/SideNav";
import AppRouter from "./routers/AppRouter";
import "./App.css";
import { signOut } from "./utils/auth";
import AuthRouter from "./routers/AuthRouter";
import { withRouter } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    loggedIn: false
  };

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed });
  checkIfLoggenIn = () => !!localStorage.getItem("token");

  componentDidMount() {
    if (this.checkIfLoggenIn()) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    const { collapsed, loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Layout className="app__layout">
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={e => this.toggleCollapse(e)}
          >
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
              <span className="app__logout" onClick={signOut}>
                <Icon type="poweroff" />
                &nbsp; Secure Sign-Out
              </span>
            </Header>
            <Content className="app__content">
              <AppRouter />
            </Content>
            {this.props.location.pathname !== "/" && (
              <Footer className="app__footer">
                Seers Technology, Inc © 2019
              </Footer>
            )}
          </Layout>
        </Layout>
      );
    } else {
      return <AuthRouter />;
    }
  }
}

export default withRouter(App);
