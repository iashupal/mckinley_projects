import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import 'styles/bootstrap.scss';
import 'styles/app.scss';
import MainApp from 'app/index';
import { setInitUrl, userSignInToken } from 'actions/Default/Auth';
import indigoTheme from './themes/indigoTheme';
import cyanTheme from './themes/cyanTheme';
import orangeTheme from './themes/orangeTheme';
import amberTheme from './themes/amberTheme';
import pinkTheme from './themes/pinkTheme';
import blueTheme from './themes/blueTheme';
import purpleTheme from './themes/purpleTheme';
import greenTheme from './themes/greenTheme';
import AppLocale from '../lngProvider';
import C from '../util/asyncComponent';

const getColorTheme = themeColor => {
  const mapObj = {
    INDIGO: indigoTheme,
    CYAN: cyanTheme,
    AMBER: amberTheme,
    'DEEP-ORANGE': orangeTheme,
    PINK: pinkTheme,
    BLUE: blueTheme,
    'DEEP-PURPLE': purpleTheme,
    GREEN: greenTheme,
    'DARK-INDIGO': indigoTheme,
    'DARK-CYAN': cyanTheme,
    'DARK-AMBER': amberTheme,
    'DARK-DEEP-ORANGE': orangeTheme,
    'DARK-PINK': pinkTheme,
    'DARK-BLUE': blueTheme,
    'DARK-DEEP-PURPLE': purpleTheme,
    'DARK-GREEN': greenTheme,
  };

  const colorName = themeColor.toUpperCase();
  const themeObj = mapObj[colorName];
  themeObj.typography.useNextVariants = true;

  return createMuiTheme(themeObj);
};

class App extends Component {
  render() {
    const {
      match,
      location,
      themeColor,
      locale,
      authUser,
      initURL,
      token,
      setInitUrl,
      history,
      userSignInToken,
    } = this.props;
    const { location: historyLocation } = history;
    const { url } = match;
    const { pathname } = location;
    const {
      pathname: historyPathname, // /signin
      search, // ?signupEmailAdmin=BA4583DDF83311E8BE2C0242AC150002 or ?signupUserID=xxx
    } = historyLocation;

    const checkSignPage = historyPathname === '/signin' && search.indexOf('?signup') === 0;
    if (!checkSignPage && !initURL) setInitUrl(historyPathname + search);
    if (!checkSignPage && !authUser && token) userSignInToken();

    if (pathname === '/') {
      const checkMain = !initURL || initURL === '/' || initURL === '/signin' || initURL === '/signin2';
      if (!authUser) return <Redirect to="/signin" />;
      if (checkMain) return <Redirect to="/app/main" />;
      return <Redirect to={initURL} />;
    }

    return (
      <MuiThemeProvider theme={getColorTheme(themeColor)}>
        <IntlProvider locale={locale.locale} messages={locale.messages}>
          <div className="app-main">
            <Switch>
              <Route
                path={`${url}app`}
                render={props => {
                  const { location } = props;

                  if (authUser) return <MainApp />;
                  if (token) return <div />;
                  return (
                    <Redirect
                      to={{
                        pathname: '/signin',
                        state: { from: location },
                      }}
                    />
                  );
                }}
              />
              <Route path={`${url}signin`} component={C(e => import('./SignIn'))} />
              <Route path={`${url}signin2`} component={C(e => import('./SignIn2'))} />
              <Route path={`${url}signup`} component={C(e => import('./SignUp'))} />
            </Switch>
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { themeColor, locale } = settings;
  const { authUser, initURL } = auth;

  return {
    themeColor,
    locale: AppLocale[locale.locale],
    authUser,
    initURL,
    token: localStorage.getItem('token'),
  };
};

export default connect(
  mapStateToProps,
  { setInitUrl, userSignInToken },
)(App);
