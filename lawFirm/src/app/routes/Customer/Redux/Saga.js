import { all } from 'redux-saga/effects';
import saga_customer from './Saga_Customer';
import saga_company from './Saga_Company';
import saga_individual from './Saga_Individual';
import saga_CustomerUpload from './Saga_CustomerUpload';
import saga_CompanyUpload from './Saga_CompanyUpload';

export default function* rootSaga(getState) {
  yield all([saga_customer(), saga_company(), saga_individual(), saga_CustomerUpload(), saga_CompanyUpload()]);
}
