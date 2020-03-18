import Raven from 'raven-js';
import { CurrentUser } from './ramda';
// https://docs.sentry.io/clients/javascript/usage/

// Sentry 첫 세팅
const install = () => {
  if (__BUILD_VERSION__ && __BUILD_VERSION__ !== 'local') {
    const sentry_server = 'https://3c2916a56a114fcead7d8169c02f3201@sentry.law365ai.com/3'; // law365ai -> cloudlawai (?)
    const mode = __BUILD_VERSION__.split('@')[1].split('-')[0];
    Raven.config(sentry_server, {
      release: __BUILD_VERSION__,
      environment: mode,
      autoBreadcrumbs: {
        xhr: true, // XMLHttpRequest
        console: true, // console logging
        dom: true, // DOM interactions, i.e. clicks/typing
        location: true, // url changes, including pushState/popState
        sentry: true, // sentry events
      },
    }).install();
  }
};

const setUserInfo = () => {
  try {
    if (CurrentUser == null) Raven.setUserContext();
    else {
      Raven.setUserContext({
        userID: CurrentUser('userID'),
        email: CurrentUser('email'),
      });
    }
  } catch (e) {
    console.log(e);
  }
};

/*
발생한 오류를 업로드한다.

try {
  doSomething(a[0])
} catch(e) {
  Raven.captureException(e)
}
----------------
Raven.captureMessage('Broken!')
*/
const captureException = exception => {
  if (Raven.isSetup()) {
    setUserInfo();
    Raven.captureException(exception);
  } else {
    setUserInfo();
    console.log(`Sentry Exception Catch, but it is local \n\n  ${exception.message} \n ${exception.stack}`);
  }
};

/*
발생한 오류 메시지를 업로드한다.

Raven.captureMessage('Broken!')
*/
const captureMessage = msg => {
  if (Raven.isSetup()) {
    setUserInfo();
    Raven.captureMessage(msg);
  } else {
    console.log(`Sentry Message Catch, but it is local \n\n${msg}`);
  }
};

export { install, captureException, captureMessage };
