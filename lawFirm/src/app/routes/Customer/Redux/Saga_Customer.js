import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { setReduxValues, setListFetchCompanyMember, setListFetchIndividual } from './Action';
import {
  CUSTOMER_MNG_SET_LIST_FETCH_CUSTOMER,
  CUSTOMER_MNG_SET_DETAIL_BIND_CUSTOMER,
  CUSTOMER_MNG_CHECK_INPUT_DATA_CUSTOMER,
  CUSTOMER_MNG_SAVE_DRAFT_CUSTOMER,
} from './ActionType';

const { mlMessage, getMsgStr } = RU;

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

  const data = yield call(PostCall, '/lawFirm/customer/searchBizCardCustomerList', {
    LawFirmID: authUser.MyLFID,
    SearchValue: searchValue,
  });

  const result = getAjaxData(data);

  yield put(
    setReduxValues({
      _path: 'customer.list',
      list: result,
    }),
  );

  yield put(
    setReduxValues({
      isLoading: false,
    }),
  );
}

function* detailBind(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { payload } = action;

  const { MemberID, CoporationID, CardType } = payload;

  yield put(handleIsLoading(true));

  if (CardType === 'I') {
    const memberData = yield call(PostCall, '/lawFirm/customer/searchBizCardIndividualDetail', {
      LawFirmID: authUser.MyLFID,
      CardID: MemberID,
    });

    const memberResult = getAjaxData(memberData);

    yield put(
      setReduxValues({
        _path: 'individual.detail',
        cardID: MemberID,
        name: memberResult[0].Name,
        photoURL: memberResult[0].PhotoURL,
        mobile: memberResult[0].MobilePhoneNumber,
        email: memberResult[0].Email,
        faxNumber: memberResult[0].FaxNumber,
        phone: memberResult[0].PhoneNumber,
        zipCode: memberResult[0].ZipCode,
        address: memberResult[0].Address,
        detailAddress: memberResult[0].Address2,
        remark: memberResult[0].Remark,
      }),
    );

    if (CoporationID !== 'null') {
      const corporationData = yield call(PostCall, '/lawFirm/customer/searchBizCardCorporationDetail', {
        LawFirmID: authUser.MyLFID,
        CardID: CoporationID,
      });

      const corporationResult = getAjaxData(corporationData);

      yield put(
        setReduxValues({
          _path: 'company.detail',
          cardID: CoporationID,
          email: corporationResult[0].Email,
          name: corporationResult[0].Name,
          photoURL: corporationResult[0].PhotoURL,
          representativeName: corporationResult[0].RepresentativeName,
          corRegNumber: corporationResult[0].CorRegNumber,
          phone: corporationResult[0].PhoneNumber,
          faxNumber: corporationResult[0].FaxNumber,
          zipCode: corporationResult[0].ZipCode,
          address: corporationResult[0].Address,
          detailAddress: corporationResult[0].Address2,
        }),
      );

      yield put(
        setReduxValues({
          _path: 'individual.detail',
          belong: '1',
        }),
      );
    } else {
      yield put(
        setReduxValues({
          _path: 'individual.detail',
          belong: '0',
        }),
      );

      yield put(
        setReduxValues({
          _path: 'company.detail',
          cardID: '',
          name: '',
          email: '',
          photoURL: null,
          representativeName: '',
          corRegNumber: '',
          phone: '',
          faxNumber: '',
          zipCode: '',
          address: '',
          detailAddress: '',
        }),
      );
    }
  }

  if (CardType === 'C') {
    const corporationData = yield call(PostCall, '/lawFirm/customer/searchBizCardCorporationDetail', {
      LawFirmID: authUser.MyLFID,
      CardID: MemberID,
    });

    const corporationResult = getAjaxData(corporationData);

    yield put(
      setReduxValues({
        _path: 'company.detail',
        cardID: MemberID,
        email: corporationResult[0].Email,
        name: corporationResult[0].Name,
        photoURL: corporationResult[0].PhotoURL,
        representativeName: corporationResult[0].RepresentativeName,
        corRegNumber: corporationResult[0].CorRegNumber,
        phone: corporationResult[0].PhoneNumber,
        faxNumber: corporationResult[0].FaxNumber,
        zipCode: corporationResult[0].ZipCode,
        address: corporationResult[0].Address,
        detailAddress: corporationResult[0].Address2,
      }),
    );

    yield put(
      setReduxValues({
        _path: 'individual.detail',
        cardID: '',
        name: '',
        photoURL: null,
        mobile: '',
        email: '',
        faxNumber: '',
        phone: '',
        zipCode: '',
        address: '',
        detailAddress: '',
        remark: '',
      }),
    );
  }

  yield put(handleIsLoading(false));
}

function* checkInputData(action) {
  const state = yield select(state => state);
  const { customerMng, auth } = state;
  const { authUser } = auth;
  const { payload } = action;
  const { save, isKeep, dialogMode } = payload;
  const { company, belong, name, mobile, email, zipCode, address, detailAddress } = save;

  // 이메일 정규식
  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const alertEmailMsg = [];

  if (email && !regExpEmail.test(email)) {
    alertEmailMsg.push(mlMessage('pages.UserMng.emailCheck'));
  }

  // const alertMsg = [];

  const alertMsg = getMsgStr([
    { msg: 'Email', cond: !email },
    { msg: '소속 여부', cond: !belong },
    { msg: '이름', cond: !name },
    { msg: '핸드폰 번호', cond: !mobile },
    { msg: '소속 회사', cond: belong === '1' && dialogMode === 'create' && !company },
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

  // 소속원 으로 등록
  if (company) {
    const data = yield call(PostCall, '/lawFirm/customer/searchCustomerCorporation', {
      LawFirmID: authUser.MyLFID,
      Name: company,
    });

    const result = getAjaxData(data);

    const { isPossible, CardID } = result[0];

    if (isPossible) {
      // 회사 소속으로 등록
      yield put(
        handleCommonAlertConfirmSet({
          msgObj: {
            title: mlMessage('alertDialog.save'),
            contents: '',
            isConfirm: true,
          },
          waitDatas: {
            name: 'customer',
            value: { save, isKeep, dialogMode, CardID },
          },
        }),
      );

      return;
    }
    if (!isPossible) {
      NotificationManager.info('등록된 회사가 아닙니다. 회사를 등록해주세요.');
      return;
    }
  }

  // 회사 미소속으로 등록
  if (alertMsg.length === 0 && alertEmailMsg.length === 0) {
    // 회사 미소속으로 등록
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'customer',
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

  const { save, isKeep, dialogMode, CardID } = payload;

  const {
    belong,
    photoURL,
    isRepresentative,
    name,
    mobile,
    email,
    faxNumber,
    phone,
    zipCode,
    address,
    detailAddress,
    remark,
  } = save;

  if (dialogMode === 'mod') {
    yield call(PostCall, '/lawFirm/customer/updateBizCardIndividual', {
      LawFirmID: MyLFID,
      Name: name,
      PhoneNumber: phone === '' ? null : phone,
      Email: email,
      FaxNumber: faxNumber === '' ? null : faxNumber,
      PhotoURL: photoURL === '' ? null : photoURL,
      Address: address,
      Address2: detailAddress,
      ZipCode: zipCode,
      MobilePhoneNumber: mobile,
      CardID: individual.save.cardID,
    });

    if (belong === '1') {
      // 대표자 지정시 기존 대표자는 일반 , 새로운 등록자는 대표자
      if (isRepresentative === true) {
        yield call(PostCall, '/lawFirm/customer/updateBizCardCorporationMemberCancelRepresentative', {
          LawFirmID: MyLFID,
          CorporationID: CardID,
        });
      }

      yield call(PostCall, '/lawFirm/customer/updateBizCardCorporationMember', {
        LawFirmID: MyLFID,
        CorporationID: company.detail.cardID,
        MemberID: individual.save.cardID,
        IsRepresentative: isRepresentative,
        Remark: remark,
      });
    }

    yield put(setReduxValues({ _path: 'individual.save', isOpen: false }));
  }
  if (dialogMode === 'create') {
    if (belong === '0') {
      yield call(PostCall, '/lawFirm/customer/createCustomerIndividual', {
        LawFirmID: MyLFID,
        CardType: 'I',
        Name: name,
        PhoneNumber: phone === '' ? null : phone,
        MobilePhoneNumber: mobile,
        Email: email,
        FaxNumber: faxNumber === '' ? null : faxNumber,
        PhotoURL: photoURL === '' ? null : photoURL,
        Address: address,
        Address2: detailAddress,
        ZipCode: zipCode,
      });
    } else if (belong === '1') {
      // 대표자 지정시 기존 대표자는 일반 , 새로운 등록자는 대표자
      if (isRepresentative === true) {
        yield call(PostCall, '/lawFirm/customer/updateBizCardCorporationMemberCancelRepresentative', {
          LawFirmID: MyLFID,
          CorporationID: CardID,
        });
      }

      yield call(PostCall, '/lawFirm/customer/createCustomerCorporationMember', {
        LawFirmID: MyLFID,
        CardType: 'I',
        Name: name,
        PhoneNumber: phone === '' ? null : phone,
        MobilePhoneNumber: mobile,
        Email: email,
        FaxNumber: faxNumber === '' ? null : faxNumber,
        PhotoURL: photoURL === '' ? null : photoURL,
        Address: address,
        Address2: detailAddress,
        ZipCode: zipCode,
        CorporationID: CardID,
        IsRepresentative: isRepresentative,
        Remark: remark === '' ? null : remark,
      });
    }

    if (!isKeep) {
      yield put(setReduxValues({ _path: 'individual.save', isOpen: false }));
    }
    yield put(
      setReduxValues({
        _path: 'individual.save',
        photoURL: null,
        isRepresentative: false,
        company: '',
        name: '',
        mobile: '',
        email: '',
        phone: '',
        faxNumber: '',
        corRegNumber: '',
        zipCode: '',
        address: '',
        detailAddress: '',
        remark: '',
      }),
    );
  }

  // 개인 목록 최신화
  yield put(
    setListFetchIndividual({
      searchValue: '',
    }),
  );

  // 단체/회사 소속인원 목록 최신화
  yield put(
    setListFetchCompanyMember({
      cardID: company.detail.cardID,
      searchValue: '',
    }),
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery(CUSTOMER_MNG_SET_LIST_FETCH_CUSTOMER, ListFetch),
    takeEvery(CUSTOMER_MNG_SET_DETAIL_BIND_CUSTOMER, detailBind),
    takeEvery(CUSTOMER_MNG_CHECK_INPUT_DATA_CUSTOMER, checkInputData),
    takeEvery(CUSTOMER_MNG_SAVE_DRAFT_CUSTOMER, saveDraft),
  ]);
}
