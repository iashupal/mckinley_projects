import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import {
  setReduxValues,
  setListFetchCustomer,
  setListFetchCompany,
  setDetailBindCompany,
  setListFetchIndividual,
  setListFetchCompanyMember,
} from './Action';
import {
  CUSTOMER_MNG_SET_LIST_FETCH_COMPANY,
  CUSTOMER_MNG_CHECK_INPUT_DATA_COMPANY,
  CUSTOMER_MNG_SAVE_DRAFT_COMPANY,
  CUSTOMER_MNG_SET_DETAIL_BIND_COMPANY,
  CUSTOMER_MNG_HANDLE_DATA_COMPANY_MEMBER,
  CUSTOMER_MNG_SET_LIST_FETCH_COMPANY_MEMBER,
  CUSTOMER_MNG_SET_LIST_FETCH_COMMON_COMPANY,
} from './ActionType';

const { mlMessage, getMsgStr } = RU;

function* ListFetch(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;

  const { searchValue } = action.payload;

  yield put(
    setReduxValues({
      isLoading: true,
    }),
  );

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardCorporationList', {
    LawFirmID: authUser.MyLFID,
    SearchValue: searchValue,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'company.list',
      list: result,
    }),
  );

  yield put(
    setReduxValues({
      isLoading: false,
    }),
  );
}

function* ListFetchCompanyMember(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;

  const { cardID, searchValue } = action.payload;

  // yield put(handleIsLoading(true));
  yield put(
    setReduxValues({
      isLoading: true,
    }),
  );

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardCorporationMemberList', {
    LawFirmID: authUser.MyLFID,
    CardID: cardID,
    SearchValue: searchValue,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'company.list',
      memberList: result,
    }),
  );

  // yield put(handleIsLoading(false));
  yield put(
    setReduxValues({
      isLoading: false,
    }),
  );
}

function* ListFetchCommonCompany(action) {
  const state = yield select(state => state);

  const { searchValue } = action.payload;

  yield put(handleIsLoading(true));

  const escapeSearchValue = searchValue.replace(/-/gi, '%');

  const data = yield call(PostCall, '/lawFirm/customer/searchCorporationList', {
    SearchValue: escapeSearchValue,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'company.list',
      commonList: result,
    }),
  );

  yield put(handleIsLoading(false));
}

function* detailBind(action) {
  const state = yield select(state => state);
  const { auth, customerMng } = state;
  const { authUser } = auth;
  const { company } = customerMng;
  const { payload } = action;

  const { cardID, searchValue } = payload;

  yield put(handleIsLoading(true));

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardCorporationDetail', {
    LawFirmID: authUser.MyLFID,
    CardID: cardID,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'company.detail',
      cardID,
      name: result[0].Name,
      photoURL: result[0].PhotoURL,
      representativeName: result[0].RepresentativeName,
      corRegNumber: result[0].CorRegNumber,
      email: result[0].Email,
      faxNumber: result[0].FaxNumber,
      phone: result[0].PhoneNumber,
      zipCode: result[0].ZipCode,
      address: result[0].Address,
      detailAddress: result[0].Address2,
    }),
  );

  yield put(
    setListFetchCompanyMember({
      cardID,
      searchValue,
    }),
  );

  yield put(handleIsLoading(false));
}

function* checkInputData(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { payload } = action;
  const { save, isKeep, dialogMode } = payload;
  const { name, representativeName, email, corRegNumber, phone, zipCode, address, detailAddress } = save;

  // 이메일 정규식
  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const alertEmailMsg = [];

  if (email && !regExpEmail.test(email)) {
    alertEmailMsg.push(mlMessage('pages.UserMng.emailCheck'));
  }

  const alertMsg2 = [];

  const alertMsg = getMsgStr([
    { msg: '회사명', cond: !name },
    { msg: '대표명', cond: !representativeName },
    { msg: '사업자 등록번호', cond: !corRegNumber },
    { msg: 'Email', cond: !email },
    { msg: '전화번호', cond: !phone },
    { msg: '주소', cond: !zipCode || !address || !detailAddress },
  ]);

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg, mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
  }

  // 이메일 Validation 체크
  if (alertEmailMsg.length > 0) {
    NotificationManager.info(alertEmailMsg.join(', '), mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
  }

  if (dialogMode === 'create') {
    const data = yield call(PostCall, '/lawFirm/customer/searchCustomerCorporation', {
      LawFirmID: authUser.MyLFID,
      Name: name,
    });

    const result = getAjaxData(data);

    const { CardID } = result[0];

    if (CardID !== null) {
      alertMsg2.push('중복된 이름의 단체/회사가 등록되어 있습니다.');
    }

    if (alertMsg2.length > 0) {
      NotificationManager.info(alertMsg2);
      yield put(
        setReduxValuesCommon({
          allErrorOn: true,
        }),
      );

      return;
    }
  }

  if (alertMsg.length === 0 && alertMsg2.length === 0 && alertEmailMsg.length === 0) {
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'company',
          value: { save, isKeep, dialogMode },
        },
      }),
    );
  }
}

function* saveDraft(action) {
  const state = yield select(state => state);
  const { auth, customerMng } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { individual, company } = customerMng;

  const { payload } = action;

  const { save, isKeep, dialogMode } = payload;

  const {
    photoURL,
    name,
    cardID,
    email,
    phone,
    faxNumber,
    zipCode,
    address,
    detailAddress,
    representativeName,
    corRegNumber,
    corporationMasterID,
  } = save;

  const escapeCorRegNumber = corRegNumber.replace(/-/gi, '');

  if (dialogMode === 'mod') {
    yield call(PostCall, '/lawFirm/customer/updateBizCardCorporation', {
      LawFirmID: MyLFID,
      Name: name,
      PhoneNumber: phone === '' ? null : phone,
      Email: email,
      FaxNumber: faxNumber === '' ? null : faxNumber,
      PhotoURL: photoURL === '' ? null : photoURL,
      Address: address,
      Address2: detailAddress,
      ZipCode: zipCode,
      RepresentativeName: representativeName,
      CorRegNumber: escapeCorRegNumber,
      CardID: cardID,
    });

    yield put(
      setDetailBindCompany({
        cardID,
        searchValue: '',
      }),
    );
  }

  if (dialogMode === 'create') {
    const data = yield call(PostCall, '/lawFirm/customer/searchCoporationExist', {
      CorRegNumber: escapeCorRegNumber,
    });

    const result = getAjaxData(data);

    if (result[0].isExist === 0) {
      yield call(PostCall, '/lawFirm/customer/createCorporation', {
        CorporationName: name,
        CorRegNumber: escapeCorRegNumber,
        RepresentativeName: representativeName,
        PhoneNumber: phone === '' ? null : phone,
        Email: email,
        Address: address,
        Address2: detailAddress,
        ZipCode: zipCode,
      });
    }

    yield call(PostCall, '/lawFirm/customer/createCustomerCorporation', {
      LawFirmID: MyLFID,
      CardType: 'C',
      Name: name,
      PhoneNumber: phone === '' ? null : phone,
      Email: email,
      FaxNumber: faxNumber === '' ? null : faxNumber,
      PhotoURL: photoURL === '' ? null : photoURL,
      Address: address,
      Address2: detailAddress,
      ZipCode: zipCode,
      RepresentativeName: representativeName,
      CorRegNumber: escapeCorRegNumber,
      CorporationMasterID: corporationMasterID,
    });
  }

  if (!isKeep) {
    yield put(setReduxValues({ _path: 'company.save', isOpen: false }));
  }

  yield put(
    setReduxValues({
      _path: 'company.save',
      photoURL: null,
      name: '',
      phone: '',
      email: '',
      faxNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      representativeName: '',
      corRegNumber: '',
      corporationMasterID: null,
    }),
  );

  // 단체/회사 목록 최신화
  yield put(
    setListFetchCompany({
      searchValue: '',
    }),
  );

  // 고객 목록 최신화
  yield put(
    setListFetchCustomer({
      searchValue: '',
    }),
  );

  // 개인 목록 최신화
  yield put(setListFetchIndividual({ searchValue: '' }));
}

function* handleData(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { payload } = action;
  const { cardID } = payload;

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardIndividualDetail', {
    LawFirmID: authUser.MyLFID,
    CardID: cardID,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'individual.save',
      cardID,
      photoURL: result[0].PhotoURL,
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
}

export default function* rootSaga() {
  yield all([
    takeEvery(CUSTOMER_MNG_SET_LIST_FETCH_COMPANY, ListFetch),
    takeEvery(CUSTOMER_MNG_SET_LIST_FETCH_COMPANY_MEMBER, ListFetchCompanyMember),
    takeEvery(CUSTOMER_MNG_SET_LIST_FETCH_COMMON_COMPANY, ListFetchCommonCompany),
    takeEvery(CUSTOMER_MNG_SET_DETAIL_BIND_COMPANY, detailBind),
    takeEvery(CUSTOMER_MNG_CHECK_INPUT_DATA_COMPANY, checkInputData),
    takeEvery(CUSTOMER_MNG_SAVE_DRAFT_COMPANY, saveDraft),
    takeEvery(CUSTOMER_MNG_HANDLE_DATA_COMPANY_MEMBER, handleData),
  ]);
}
