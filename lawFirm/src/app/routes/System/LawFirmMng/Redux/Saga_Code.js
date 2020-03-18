import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import {
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
  handleIsLoading,
} from 'actions/Default/Common';
import {
  LAWFIRM_MNG_CODE_MNG_FETCH_GROUPLIST,
  LAWFIRM_MNG_CODE_MNG_FETCH_CODELIST,
  LAWFIRM_MNG_CODE_MNG_SET_SELECT,
  LAWFIRM_MNG_CODE_MNG_SAVE_DRAFT,
  LAWFIRM_MNG_CODE_MNG_CHECK_INPUT,
} from './ActionType';
import { setReduxValues } from './Action';

const { getMsgStr, mlMessage } = RU;

function* FetchCodeList(action) {
  const { payload } = action;
  const { groupCode, isActive } = payload;
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  yield put(setReduxValues({ _path: 'CodeMng', isLoading: true }));
  try {
    const res = yield call(PostCall, '/lawFirm/code/searchCodeList', {
      LFID: MyLFID,
      GroupCode: groupCode.key,
      IsActive: isActive,
    });
    const data = getAjaxData(res);
    if (res.status === 200) {
      yield put(
        setReduxValues({
          _path: 'CodeMng',
          codeList: data,
          isCustomizedGroupCode: data.length ? data[0].IsCustomizing : 0,
          formMode: '',
        }),
      );
    }
  } catch (err) {
    getAjaxData(err);
  }
  yield put(setReduxValues({ _path: 'CodeMng', isLoading: false }));
}

function* FetchGroupCodeList() {
  const state = yield select(state => state);
  const { lawfirmMng } = state;
  const { CodeMng } = lawfirmMng;
  const { search } = CodeMng;
  const { searchIsActive } = search;
  try {
    const res = yield call(PostCall, '/lawFirm/code/searchGroupCodeList', {});
    const data = getAjaxData(res);
    if (data) {
      yield put(setReduxValues({ _path: 'CodeMng', groupCodeList: data, groupCode: data[0] }));
      yield FetchCodeList({
        payload: {
          groupCode: data[0],
          isActive: searchIsActive,
        },
      });
    }
  } catch (err) {
    getAjaxData(err);
  }
}

function* SetSelect(action) {
  const state = yield select(state => state);
  const { lawfirmMng } = state;
  const { CodeMng } = lawfirmMng;
  const { search, groupCode } = CodeMng;
  const { searchIsActive } = search;
  yield FetchCodeList({
    payload: {
      groupCode,
      isActive: searchIsActive,
    },
  });
}

function* CheckInput(action) {
  const state = yield select(state => state);
  const { lawfirmMng, auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { CodeMng } = lawfirmMng;
  const { isCustomizedGroupCode, groupCode, formMode } = CodeMng;
  const { payload } = action;
  const { detail } = payload;
  const { code, codeNameKOR, codeNameENG, remark, sortOrder, isActive } = detail;
  const checkCode = code.replace(/(\s*)/g, '');
  const checkcodeNameKOR = codeNameKOR.replace(/(\s*)/g, '');
  const checkcodeNameENG = codeNameENG.replace(/(\s*)/g, '');
  const checkremark = remark.replace(/(\s*)/g, '');

  yield put(handleIsLoading(true));

  const alertMsg = getMsgStr([
    { msg: '코드', cond: !checkCode },
    { msg: '코드명(KOR)', cond: !checkcodeNameKOR },
    { msg: '코드명(ENG)', cond: !checkcodeNameENG },
    { msg: '비고', cond: !checkremark },
    { msg: '정렬 순서', cond: sortOrder === '' },
  ]);
  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg, mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  }
  let res;
  let data = [];
  if (alertMsg.length === 0) {
    if (formMode === 'create') {
      try {
        if (!isCustomizedGroupCode) {
          res = yield call(PostCall, '/lawfirm/code/checkDuplicateSystemCode', {
            GroupCode: groupCode.key,
            Code: code,
          });
          data = getAjaxData(res);
        } else {
          res = yield call(PostCall, '/lawfirm/code/checkDuplicateLawfirmCode', {
            LFID: MyLFID,
            GroupCode: groupCode.key,
            Code: code,
          });
          data = getAjaxData(res);
        }
      } catch (error) {
        getAjaxData(error);
      }
    }
    if (data.length) {
      NotificationManager.info('중복된 코드 값입니다.');
    } else {
      yield put(
        handleCommonAlertConfirmSet({
          msgObj: {
            title: mlMessage('alertDialog.save'),
            contents: '',
            isConfirm: true,
          },
          waitDatas: {
            name: 'lawfirmCodeMng',
            value: { detail },
          },
        }),
      );
    }
  }
  yield put(handleIsLoading(false));
}

function* SaveDraft(action) {
  const { payload } = action;
  const { detail } = payload;
  const { code, codeNameKOR, codeNameENG, remark, sortOrder, isActive, parentFullCode } = detail;
  const state = yield select(state => state);
  const { lawfirmMng, auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { CodeMng } = lawfirmMng;
  const { formMode, groupCode, isCustomizedGroupCode, search } = CodeMng;
  const { searchIsActive } = search;
  const fullCode = groupCode.key.concat('_', code);
  let res;
  let data;
  yield put(handleIsLoading(true));
  try {
    res = yield call(PostCall, '/lawfirm/code/createUpdateCode', {
      isCustomizedGroupCode,
      LFID: MyLFID,
      FullCode: fullCode,
      GroupCode: groupCode.key,
      Code: code,
      NameList: [{ language: 'KOR', CodeName: codeNameKOR }, { language: 'ENG', CodeName: codeNameENG }],
      Remark: remark,
      SortOrder: sortOrder,
      IsActive: formMode === 'Create' ? 1 : isActive,
      ParentFullCode: parentFullCode,
    });
    data = getAjaxData(res);
    if (res.status === 200) {
      yield put(setReduxValues({ _path: 'CodeMng', formMode: '' }));
      yield FetchCodeList({
        payload: {
          groupCode,
          isActive: searchIsActive,
        },
      });
    }
  } catch (error) {
    getAjaxData(error);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(LAWFIRM_MNG_CODE_MNG_FETCH_GROUPLIST, FetchGroupCodeList),
    takeEvery(LAWFIRM_MNG_CODE_MNG_FETCH_CODELIST, FetchCodeList),
    takeEvery(LAWFIRM_MNG_CODE_MNG_SET_SELECT, SetSelect),
    takeEvery(LAWFIRM_MNG_CODE_MNG_SAVE_DRAFT, SaveDraft),
    takeEvery(LAWFIRM_MNG_CODE_MNG_CHECK_INPUT, CheckInput),
  ]);
}
