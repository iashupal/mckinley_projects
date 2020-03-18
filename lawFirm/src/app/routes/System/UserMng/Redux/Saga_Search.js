import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { handleIsLoading } from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { setReduxValues } from './Action';
import { USERMNG_SET_LIST_FETCH, USERMNG_SET_REDUX_VALUES, USERMNG_SET_DETAIL_BIND } from './ActionType';

function* ListFetch(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;

  const { workingStatus, roleCode, employeeType, keyword } = action.payload;

  // yield put(handleIsLoading(true));

  yield put(
    setReduxValues({
      loading: true,
    }),
  );

  const res = yield call(PostCall, '/lawFirm/user/searchList', {
    MyLFID: authUser.MyLFID,
    SearchWorkingStatus: workingStatus,
    SearchRole: roleCode,
    SearchEmployeeType: employeeType,
    SearchValue: keyword,
  });

  const searchList = getAjaxData(res);

  yield put(
    setReduxValues({
      list: searchList,
    }),
  );

  yield put(
    setReduxValues({
      loading: false,
    }),
  );

  // yield put(handleIsLoading(false));
}

function* setDetailBind(action) {
  const state = yield select(state => state);
  const { auth, userMng } = state;
  const { authUser } = auth;
  const { nowMode } = userMng;

  yield put(handleIsLoading(true));

  if (nowMode === 'create') {
    yield put(
      setReduxValues({
        _path: 'save',
        UserID: '',
        Email: '',
        LastName: '',
        FirstName: '',
        PhotoURL: '',
        Profile: '',
        OfficeMobilePhoneNumber: '',
        TimeCharge: 0,
        CreateDate: '',
        OfficePhoneNumber: '',
        Address: '',
        Address2: '',
        ZipCode: '',
        WorkingStatusCode: 'WORKST_WORK',
        EmployeeTypeCode: 'EMPTYPE_ETC',
        TCShareLevelCode: 'TCSRLVL_ALLSR',
        RoleCodeList: [],
        GroupCodeList: [],
      }),
    );
    yield put(
      setReduxValues({
        emailCheck: false,
      }),
    );
  }

  if (nowMode === 'mod') {
    const { EmployeeUserID } = action.payload;

    const res = yield call(PostCall, '/lawFirm/user/searchDetail', {
      MyLFID: authUser.MyLFID,
      EmployeeUserID,
    });

    const result = getAjaxData(res);

    yield put(
      setReduxValues({
        _path: 'save',
        UserID: result.UserID,
        Email: result.Email,
        LastName: result.LastName,
        FirstName: result.FirstName,
        Profile: result.Profile,
        PhotoURL: result.PhotoURL,
        OfficeMobilePhoneNumber: result.OfficeMobilePhoneNumber,
        TimeCharge: result.TimeCharge,
        CreateDate: result.CreateDate,
        OfficePhoneNumber: result.OfficePhoneNumber,
        Address: result.Address,
        Address2: result.Address2,
        ZipCode: result.ZipCode,
        WorkingStatusCode: result.WorkingStatusCode,
        EmployeeTypeCode: result.EmployeeTypeCode,
        TCShareLevelCode: result.TCShareLevelCode,
        RoleCodeList: result.RoleCodeList,
        GroupCodeList: result.GroupCodeList,
      }),
    );
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([takeEvery(USERMNG_SET_LIST_FETCH, ListFetch), takeEvery(USERMNG_SET_DETAIL_BIND, setDetailBind)]);
}
