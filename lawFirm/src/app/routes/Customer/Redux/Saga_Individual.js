import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { setReduxValues } from './Action';
import { CUSTOMER_MNG_SET_LIST_FETCH_INDIVIDUAL, CUSTOMER_MNG_HANDLE_DATA_INDIVIDUAL } from './ActionType';

const { mlMessage } = RU;

function* ListFetch(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { payload } = action;
  const { searchValue } = payload;

  yield put(
    setReduxValues({
      isLoading: true,
    }),
  );

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardIndividualList', {
    LawFirmID: authUser.MyLFID,
    SearchValue: searchValue,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'individual.list',
      list: result,
    }),
  );

  yield put(
    setReduxValues({
      isLoading: false,
    }),
  );
}

function* handleData(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { payload } = action;
  const { memberidID, corporationID } = payload;

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardIndividualDetail', {
    LawFirmID: authUser.MyLFID,
    CardID: memberidID,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'individual.save',
      cardID: memberidID,
      belong: result[0].CorporationID === '0' ? '0' : '1',
      photoURL: result[0].PhotoURL,
      company: result[0].Company,
      name: result[0].Name,
      mobile: result[0].MobilePhoneNumber,
      phone: result[0].PhoneNumber === '-' ? '' : result[0].PhoneNumber,
      email: result[0].Email,
      faxNumber: result[0].FaxNumber === '-' ? '' : result[0].FaxNumber,
      zipCode: result[0].ZipCode,
      address: result[0].Address,
      detailAddress: result[0].Address2,
      remark: result[0].Remark === '-' ? '' : result[0].Remark,
      isRepresentative: result[0].IsRepresentative === 1,
    }),
  );

  yield put(setReduxValues({ dialogMode: 'mod' }));

  yield put(setReduxValues({ _path: 'individual.save', isOpen: true }));

  yield put(setReduxValues({ _path: 'company.detail', cardID: corporationID }));
}

export default function* rootSaga() {
  yield all([
    takeEvery(CUSTOMER_MNG_SET_LIST_FETCH_INDIVIDUAL, ListFetch),
    takeEvery(CUSTOMER_MNG_HANDLE_DATA_INDIVIDUAL, handleData),
  ]);
}
