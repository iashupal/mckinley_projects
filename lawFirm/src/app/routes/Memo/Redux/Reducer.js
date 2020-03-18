import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';

const initial = {
  save: {
    selectCase: 1,
    checkCase: true,
  },
};

const handlers = {
  [MEMOMNG_SET_REDUX_VALUES]: prodSetReduxValues2,
};

export default reducerSelector2(initial, handlers);
