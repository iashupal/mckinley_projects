import { all } from 'redux-saga/effects';
import saga_save from './Saga_Save';
import saga_search from './Saga_Search';
import saga_group from './Saga_Group';

export default function* rootSaga(getState) {
  yield all([saga_save(), saga_search(), saga_group(),]);
}
