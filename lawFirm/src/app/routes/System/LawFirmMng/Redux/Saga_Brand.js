import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { handleIsLoading } from 'actions/Default/Common';
import { LAWFIRM_MNG_FETCH_BY_LAWFIRM_ID, LAWFIRM_MNG_UPDATE } from './ActionType';
import { setReduxValues } from './Action';

function* SetData(action) {
  const { lawFirmID } = action.payload;

  try {
    yield put(handleIsLoading(true));
    const res = yield call(PostCall, '/lawFirm/lawfirm/searchLawFirm', {
      LawFirmID: lawFirmID,
    });
    const data = getAjaxData(res)[0];

    yield put(
      setReduxValues({
        _path: 'LawFirmDetail',
        lawFirmID: data.LawFirmID,
        lawFirmBrand: data.LawFirmBrand,
        lawFirmLogoURL: data.LawFirmLogoURL,
        address: data.Address,
        address2: data.Address2,
        zipCode: data.Zipcode,
        phoneNumber: data.PhoneNumber,
        fax: data.FaxNumber,
        email: data.Email,
        webSiteURL: data.WebSiteURL,
      }),
    );

    yield put(setReduxValues({ dialogMode: 'modify' }));
    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* FetchLawFirmDataByLawFirmID(action) {
  const { lawFirmID } = action.payload;
  yield SetData({
    payload: {
      lawFirmID,
    },
  });
}

function* UpdateLawFirm(action) {
  const { lawFirmDetail } = action.payload;
  const {
    lawFirmID,
    lawFirmBrand,
    lawFirmLogoURL,
    address,
    address2,
    zipCode,
    phoneNumber,
    fax,
    email,
    webSiteURL,
  } = lawFirmDetail;
  try {
    yield put(handleIsLoading(true));
    const res = yield call(PostCall, '/lawFirm/lawfirm/updateLawFirm', {
      LawFirmID: lawFirmID,
      LawFirmBrand: lawFirmBrand,
      LawFirmLogoURL: lawFirmLogoURL || '',
      Address: address,
      Address2: address2,
      ZipCode: zipCode,
      PhoneNumber: phoneNumber,
      Fax: fax,
      Email: email,
      WebSiteURL: webSiteURL || '',
    });

    getAjaxData(res);
    yield SetData({
      payload: {
        lawFirmID,
      },
    });
    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(LAWFIRM_MNG_FETCH_BY_LAWFIRM_ID, FetchLawFirmDataByLawFirmID),
    takeEvery(LAWFIRM_MNG_UPDATE, UpdateLawFirm),
  ]);
}
