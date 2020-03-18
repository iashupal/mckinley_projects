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
import {
  USERGROUPMNG_SAVE_DRAFT,
  USERGROUPMNG_CHECK_INPUT,
  USERGROUPMNG_LIST_FETCH,
  USERGROUPMNG_DETAIL_BIND,
} from './ActionType';

const { mlMessage, changeURL } = RU;

function* ListFetch(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { payload } = action;
  const { searchIsActive, searchValue } = payload;

  // yield put(handleIsLoading(true));
  const res = yield call(PostCall, '/lawFirm/user/searchLawFirmEmpGroupList', {
    LawFirmID: MyLFID,
    searchIsActive,
    searchValue,
  });
  const data = getAjaxData(res);
  yield put(
    setReduxValues({
      _path: 'group',
      groupList: data,
    }),
  );
  // yield put(handleIsLoading(false));
}

function* SaveDraft(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { payload } = action;
  const { formMode, save } = payload;
  const { groupName, isActive, groupMember } = save;
  yield put(handleIsLoading(true));

  let res;
  let data;

  if (formMode === 'create') {
    try {
      res = yield call(PostCall, '/lawFirm/user/createLawFirmEmpGroup', {
        LawFirmID: MyLFID,
        GroupName: groupName,
        IsActive: 1,
        groupMember,
      });
      data = getAjaxData(res);
    } catch (e) {
      getAjaxData(e);
    }
  }
  if (formMode === 'mod') {
    try {
      res = yield call(PostCall, '/lawFirm/user/createLawFirmEmpGroup', {
        GroupName: groupName,
        IsActive: isActive,
        groupMember,
      });
      data = getAjaxData(res);
    } catch (e) {
      getAjaxData(e);
    }
  }
  yield put(handleIsLoading(false));
}

function* CheckInput(action) {
  const { payload } = action;
  const { formMode, save } = payload;
  const { groupName, isActive, groupMember } = save;
  const groupNameCheck = groupName.replace(/(\s*)/g, '');

  const alertMsg = [];
  if (!groupNameCheck) alertMsg.push('그룹명');
  if (formMode === 'mod' && isActive === '') alertMsg.push('사용여부');
  if (!groupMember) alertMsg.push('인원');

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg.join(', '), mlMessage('notification.required'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  } else {
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'userMngGroup',
          value: {
            formMode,
            save,
          },
        },
      }),
    );
  }
}

function* DetailBind(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { payload } = action;
  const { GroupID, formMode } = payload;
  yield put(handleIsLoading(true));
  if (formMode === 'create') {
    yield put(
      setReduxValues({
        _path: 'group.save',
        groupID: '',
        groupName: '',
        isActive: '',
        groupMember: '',
      }),
    );
    yield put(setReduxValues({_path:'group', isOpenDetail: true, formMode:'create'}));
  }
  if (formMode === 'mod') {
    const res = yield call(PostCall, '/lawFirm/user/searchLawFirmEmpGroup', { GroupID, LawFirmID: MyLFID });
    const data = getAjaxData(res);
    yield put(
      setReduxValues({
        _path: 'group.save',
        groupID: data.GroupID,
        groupName: data.GroupName,
        isActive: data.IsActive,
        groupMember: data.GroupMember,
      }),
    );
  yield put(setReduxValues({_path:'group', isOpenDetail: true, formMode:'mod'}));
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(USERGROUPMNG_SAVE_DRAFT, SaveDraft),
    takeEvery(USERGROUPMNG_CHECK_INPUT, CheckInput),
    takeEvery(USERGROUPMNG_LIST_FETCH, ListFetch),
    takeEvery(USERGROUPMNG_DETAIL_BIND, DetailBind),
  ]);
}
