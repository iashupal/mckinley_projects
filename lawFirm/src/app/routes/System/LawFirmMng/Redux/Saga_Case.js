import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import {
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
  handleIsLoading,
} from 'actions/Default/Common';
import { LAWFIRM_MNG_CASE_FETCH_VALUES, LAWFIRM_MNG_CASE_SAVE_DRAFT } from './ActionType';
import { setReduxValues } from './Action';

const { getMsgStr, mlMessage } = RU;

function* FetchValues(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  try {
    yield put(handleIsLoading(true));

    const res = yield call(PostCall, '/lawFirm/case/searchManagementNoFormat', {
      LFID: MyLFID,
    });
    const data = getAjaxData(res);

    yield put(setReduxValues({ _path: 'CaseMng', managementNoFormat: data[0].ManagementNoFormat }));

    yield put(handleIsLoading(false));
  } catch (err) {
    getAjaxData(err);
    yield put(handleIsLoading(false));
  }
}

function* SaveDraft(action) {
  const { save, MyLFID } = action.payload;
  const { managementNoFormat } = save;

  try {
    yield put(handleIsLoading(true));

    const res = yield call(PostCall, '/lawFirm/casemng/updateManagementNoFormat', {
      LawFirmID: MyLFID,
      ManagementNoFormat: managementNoFormat,
    });
    const data = getAjaxData(res);

    yield put(handleIsLoading(false));
  } catch (err) {
    getAjaxData(err);
    yield put(handleIsLoading(false));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(LAWFIRM_MNG_CASE_FETCH_VALUES, FetchValues), takeEvery(LAWFIRM_MNG_CASE_SAVE_DRAFT, SaveDraft)]);
}
