import { all } from 'redux-saga/effects';
import saga_memo from './Saga_Memo';
import saga_list from './Saga_List';
import saga_dueDate from './Saga_DueDate';
import saga_create from './Saga_Create';
import saga_TC from './Saga_TC';

export default function* rootSaga(getState) {
  yield all([saga_memo(), saga_list(), saga_dueDate(), saga_create(), saga_TC()]);
}
