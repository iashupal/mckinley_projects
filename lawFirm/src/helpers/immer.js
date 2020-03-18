import produce from 'immer';

export const reducerSelector2 = (initial, handlers) => (state = initial, action) => {
  const { type, payload } = action;
  const handler = handlers[type];
  if (!handler) return state;
  return produce(state, draft => handler(state, draft, payload));
};

// Sample 코드
// {type: 'COMMON_SET_REDUX_VALUES',payload: {_path:'alertMsg', title: 'ggggggggg', contents: '1122334455'}}
// {type: 'COMMON_SET_REDUX_VALUES',payload: {_path:'companyPayInfo.base', userCount: 123, isTrial: true}}
export const prodSetReduxValues2 = (state, draft, payload) => {
  if (!payload) return;
  const keyList = Object.keys(payload);
  if (!keyList) return;
  const { _path } = payload;
  // delete payload._path;
  if (keyList.length === 0) return;
  let currPath = draft;
  if (_path) {
    const pathArr = _path.split('.');
    pathArr.forEach(a => {
      currPath = currPath[a];
    });
  }

  keyList.forEach(item => {
    if (item !== '_path') {
      currPath[item] = payload[item];
    }
  });
};
