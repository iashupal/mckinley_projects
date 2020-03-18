import { all } from 'redux-saga/effects';
import saga_brand from './Saga_Brand';
import saga_code from './Saga_Code';
import saga_case from './Saga_Case';

export default function* rootSaga(getState) {
  yield all([saga_brand(), saga_code(), saga_case()]);
}
