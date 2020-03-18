import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { isChrome, isSafari } from 'react-device-detect';
import { RU } from 'helpers/ramda';
import configureStore, { history } from './store';
import App from './containers/App';
import NoBrowserSupport from './NoBrowserSupport';

const { getEnv } = RU;
const envStr = getEnv(); // prod dev master localhost
export const store = configureStore();
const Xenv = envStr === 'prod' || envStr === 'dev'; // 브라우저 제한, 배포 환경
const Xbrowser = !(isChrome || isSafari); // 브라우저 제한, 대상 브라우저

const MainApp = () => {
  if (Xenv && Xbrowser) return <NoBrowserSupport />;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default MainApp;
