import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas/index';
import reducers from '../reducers/index';
import { captureException } from '../helpers/sentry';

const history = createHashHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware({
  onError: error => {
    // Error catch to Sentry
    captureException(error);
  },
});

const middlewares = [sagaMiddleware, routeMiddleware];

export default function configureStore(initialState) {
  const store = createStore(
    reducers(history),
    initialState,
    compose(composeWithDevTools(applyMiddleware(...middlewares))),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export { history };
