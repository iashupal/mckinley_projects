import React, { Component } from 'react';
import { Layout, Icon } from 'antd';

import SideNav from './components/SideNav';
import AppRouter from './routers/AppRouter';
import './App.css';
import { signOut } from './utils/auth';
import AuthRouter from './routers/AuthRouter';
import { withRouter } from 'react-router-dom';
import profile from './images/profile.png';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    loggedIn: false,
  };
  checkIfLoggenIn = () => !!localStorage.getItem('token');

  componentDidMount() {
    if (this.checkIfLoggenIn()) {
      console.log('token');
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
            theme="dark"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={e => this.toggleCollapse(e)}
          >
            <div className="app__logo">
              <img src={profile} alt="Profile" />
              <p>ADMIN ID</p>
            </div>
            <SideNav />
          </Sider>
          <Layout>
            <Header
              style={{
                background: '#fff',
                padding: 0,
              }}
            >
              <span className="app__logout" onClick={signOut}>
                <Icon type="poweroff" />
                &nbsp; 로그아웃
              </span>
            </Header>
            <Content className="app__content">
              <AppRouter />
            </Content>
            {this.props.location.pathname !== '/' && (
              <Footer className="app__footer">Caster, Inc © 2019</Footer>
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
