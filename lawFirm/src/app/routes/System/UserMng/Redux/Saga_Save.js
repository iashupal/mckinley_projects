import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import numeral from 'numeral';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { setReduxValues, setDetailBind } from './Action';
import {
  USERMNG_SET_LIST_FETCH,
  USERMNG_SET_REDUX_VALUES,
  USERMNG_SET_DETAIL_BIND,
  USERMNG_SAVE_DRAFT,
  USERMNG_CHECK_EMAIL,
  USERMNG_CHECK_INPUT_DATA,
  USERMNG_UPDATE_PHOTOURL,
} from './ActionType';

const { mlMessage, changeURL } = RU;

function* CheckInputData(action) {
  const state = yield select(state => state);
  const { userMng } = state;
  const { payload } = action;
  const { userMngDetail } = payload;
  const {
    Email,
    FirstName,
    LastName,
    EmployeeTypeCode,
    OfficeMobilePhoneNumber,
    TimeCharge,
    TCShareLevelCode,
    WorkingStatusCode,
    Password,
  } = userMngDetail;

  // 핸드폰 번호 정규식
  const regExpOfficeMobilePhoneNumber = /^\d{3}-\d{3,4}-\d{4}$/;

  const alertMsg = [];

  const alertMsg2 = [];

  if (!regExpOfficeMobilePhoneNumber.test(OfficeMobilePhoneNumber)) {
    alertMsg2.push(mlMessage('pages.UserMng.phoneCheck'));
  }

  if (!FirstName) alertMsg.push(mlMessage('pages.common.firstName'));
  if (!LastName) alertMsg.push(mlMessage('pages.common.lastName'));

  if (!Email) alertMsg.push(mlMessage('pages.common.email'));
  if (userMng.nowMode === 'create') {
    if (!Password) alertMsg.push(mlMessage('pages.common.password'));
  }

  if (!EmployeeTypeCode) alertMsg.push(mlMessage('pages.common.employeeType'));
  if (!OfficeMobilePhoneNumber) alertMsg.push(mlMessage('user.profile.name.phone'));

  if (!WorkingStatusCode) alertMsg.push(mlMessage('pages.common.workingStatus'));

  if (!TimeCharge) alertMsg.push(mlMessage('pages.common.timeCharge'));
  if (!TCShareLevelCode) alertMsg.push(mlMessage('pages.UserMng.TCShareLevel'));

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg.join(', '), mlMessage('notification.required'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  }
  if (alertMsg2.length > 0) {
    NotificationManager.info(alertMsg2.join(', '), mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  }
  if (alertMsg.length === 0 && alertMsg2.length === 0) {
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'userMng',
          value: { userMngDetail },
        },
      }),
    );
  }
}

function* CheckEmail(action) {
  const state = yield select(state => state);
  const { userMng } = state;
  const { Email } = userMng.save;

  const res = yield call(PostCall, '/lawFirm/user/searchEmailIsCreate', {
    Email,
  });

  const data = getAjaxData(res);

  // 이메일 정규식
  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const alertMsg = [];

  if (!regExpEmail.test(Email)) {
    alertMsg.push(mlMessage('pages.UserMng.emailCheck'));
  } else {
    if (data[0].isCreate === 'create') {
      NotificationManager.info(mlMessage('pages.UserMng.emailOk'));
      yield put(
        setReduxValues({
          emailCheck: true,
        }),
      );
    }

    if (data[0].isCreate === 'reject') {
      NotificationManager.info(mlMessage('pages.UserMng.emailNo'));

      yield put(
        setReduxValues({
          emailCheck: false,
        }),
      );

      yield put(
        setReduxValues({
          _path: 'save',
          Email: '',
        }),
      );
    }
  }

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg.join(', '), mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  }
}

function* SaveDraft(action) {
  const state = yield select(state => state);
  const { userMng, auth } = state;

  const {
    UserID,
    Email,
    Password,
    PhotoURL,
    FirstName,
    LastName,
    OfficeMobilePhoneNumber,
    OfficePhoneNumber,
    TimeCharge,
    Address,
    Address2,
    ZipCode,
    WorkingStatusCode,
    EmployeeTypeCode,
    TCShareLevelCode,
    RoleCodeList,
    Profile,
    GroupCodeList,
  } = userMng.save;

  const { nowMode, emailCheck } = userMng;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const numberTimeCharge = numeral(TimeCharge);

  yield put(handleIsLoading(true));

  let data;
  let res;

  if (nowMode === 'create') {
    if (!emailCheck) {
      NotificationManager.info('이메일 중복 확인을 해주시기 바랍니다.');
    } else {
      try {
        res = yield call(PostCall, '/lawFirm/user/createLawFirmEmployee', {
          MyLFID,
          Email,
          Password,
          FirstName,
          LastName,
          PhotoURL,
          Profile,
          EmployeeTypeCode,
          TCShareLevelCode,
          WorkingStatusCode,
          OfficeMobilePhoneNumber,
          OfficePhoneNumber,
          TimeCharge: numberTimeCharge._value,
          Address,
          Address2,
          ZipCode,
          RoleCodeList,
          GroupCodeList,
        });

        data = getAjaxData(res);

        yield put(
          setReduxValues({
            nowMode: 'list',
          }),
        );

        yield put(
          setDetailBind({
            EmployeeUserID: data.newUserID,
          }),
        );
        changeURL('/UserMng');
      } catch (e) {
        getAjaxData(e);
      }
    }
  }

  if (nowMode === 'mod') {
    try {
      yield put(
        setReduxValues({
          emailCheck: true,
        }),
      );

      res = yield call(PostCall, '/lawFirm/user/updateLawFirmEmployee', {
        MyLFID,
        EmployeeUserID: UserID,
        FirstName,
        LastName,
        PhotoURL,
        Profile,
        EmployeeTypeCode,
        TCShareLevelCode,
        WorkingStatusCode,
        OfficeMobilePhoneNumber,
        OfficePhoneNumber,
        TimeCharge: numberTimeCharge._value,
        Address,
        Address2,
        ZipCode,
        RoleCodeList,
        GroupCodeList,
      });

      data = getAjaxData(res);

      yield put(
        setReduxValues({
          nowMode: 'list',
        }),
      );

      changeURL('/UserMng');
    } catch (e) {
      getAjaxData(e);
    }
  }

  yield put(handleIsLoading(false));
}

function* updatePhotoURL(action) {
  const state = yield select(state => state);
  const { auth, userMng } = state;
  const { authUser } = auth;

  const { MyLFIDInfo } = authUser;

  yield put(handleIsLoading(true));

  try {
    const res = yield call(PostCall, '/lawFirm/user/updateLawFirmEmployeePhotoURL', {
      MyLFID: MyLFIDInfo.LFID,
      EmployeeUserID: userMng.save.UserID,
      PhotoURL: userMng.save.PhotoURL,
    });

    const data = getAjaxData(res);
  } catch (e) {
    getAjaxData(e);
  }

  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(USERMNG_SAVE_DRAFT, SaveDraft),
    takeEvery(USERMNG_CHECK_EMAIL, CheckEmail),
    takeEvery(USERMNG_CHECK_INPUT_DATA, CheckInputData),
    takeEvery(USERMNG_UPDATE_PHOTOURL, updatePhotoURL),
  ]);
}
