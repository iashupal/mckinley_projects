import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { NOTICEMNG_SAVE_DRAFT, NOTICEMNG_LIST_FETCH, NOTICEMNG_CHECK_INPUT_DATA, NOTICEMNG_DETAIL_BIND, NOTICEMNG_DELETE_DATA } from './ActionType';
import { setReduxValues } from './Action';

const { mlMessage, yearMonthDay } = RU;

function* CheckInputData(action){
  const { payload } = action;
  const { noticeDetail } = payload;
  const { noticeTitle, noticeContents, noticeDate, isPopUp, popUpEndDate, isMailing } = noticeDetail;

  const noticeTitleCheck = noticeTitle.replace(/(\s*)/g,'');
  const noticeContentCheck = noticeContents.replace(/(\s*)/g,'');

  const alertMsg = [];
  if(!noticeTitleCheck) alertMsg.push(mlMessage('pages.noticeMng.noticeTitle'));
  if(!noticeContentCheck) alertMsg.push(mlMessage('pages.noticeMng.noticeContents'));
  if(!noticeDate) alertMsg.push(mlMessage('pages.noticeMng.noticeDate'));
  if(isPopUp === '') alertMsg.push(mlMessage('pages.noticeMng.noticeIsPopUp'));
  if(isPopUp && !popUpEndDate) alertMsg.push(mlMessage('pages.noticeMng.noticePopUpEndDate'));
  if(isMailing === '') alertMsg.push(mlMessage('pages.noticeMng.isMailing'));

  if(alertMsg.length>0){
    NotificationManager.info(alertMsg.join(', '), mlMessage('notification.required'));
      yield put(
        setReduxValuesCommon({
          allErrorOn: true,
        }),
      );
  }
  if(alertMsg.length===0){
    if(isPopUp===1 && yearMonthDay(popUpEndDate) < yearMonthDay(noticeDate)){
      NotificationManager.info('팝업공지 종료일이 공지 시작일보다 빠릅니다.');
    }
    else{
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'notice',
          value: { noticeDetail },
        },
      }),
    );
  }
  }
}

function* ListFetch(action){
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { payload } = action;
  // yield put(handleIsLoading(true));
  const { searchIsPopUp, searchIsMailing, searchStartDate, searchEndDate, searchValue } = payload;
  const SearchStartDate = searchStartDate!==null?yearMonthDay(searchStartDate):'';
  const SearchEndDate = searchEndDate!==null?yearMonthDay(searchEndDate):'';
  try{
    const res = yield call(PostCall, '/lawFirm/notice/searchList', { 
      SearchIsPopup: searchIsPopUp, 
      SearchIsMailing: searchIsMailing,
      SearchStartDate,
      SearchEndDate,
      SearchValue: searchValue,
      LawFirmID: MyLFID });
    const data = getAjaxData(res);
    yield put(setReduxValues({noticeList: data}));
  }
  catch(e){
    getAjaxData(e);
  }
  // yield put(handleIsLoading(false));
}

function* SaveDraft(action){
  const state = yield select(state => state);
  const { noticeMng, auth } = state;

  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { formMode, search } = noticeMng;
  const { searchIsPopUp, searchIsMailing, searchStartDate, searchEndDate, searchValue } = search;

  const { payload } = action;
  const { noticeDetail } = payload;
  const { noticeID, noticeTitle, noticeContents, noticeDate, isPopUp, popUpEndDate, isMailing } = noticeDetail;


  yield put(handleIsLoading(true));

  try{
    let res;
    let data;
    if(formMode==="create"){
      res = yield call(PostCall, '/lawFirm/notice/createNotice', { 
        Title: noticeTitle, 
        Contents: noticeContents, 
        NoticeDate: noticeDate, 
        IsPopup: isPopUp, 
        PopupEndDate: isPopUp ? popUpEndDate : null, 
        IsMailing: isMailing,
        LawFirmID: MyLFID
      });
      data = getAjaxData(res);
      yield put(setReduxValues({_path: 'noticeDetail', noticeID: data.NoticeID}));
    }
    if(formMode==="mod"){
      res = yield call(PostCall, '/lawFirm/notice/updateNotice', {
        NoticeID: noticeID,
        Title: noticeTitle, 
        Contents: noticeContents, 
        NoticeDate: noticeDate, 
        IsPopup: isPopUp, 
        PopupEndDate: isPopUp ? popUpEndDate : null, 
        IsMailing: isMailing,
        LawFirmID: MyLFID
      });
      data = getAjaxData(res);
    }
    if(data){
      NotificationManager.info('',formMode==='create'?mlMessage('notification.save'):mlMessage('notification.modify'),);
       yield put(setReduxValues({formMode:''}));
       yield ListFetch({
         payload:{
            searchIsPopUp,
            searchIsMailing,
            searchStartDate,
            searchEndDate,
            searchValue,
      }
    });
    }
  }catch(e){
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DetailBind(action){
  const state = yield select(state => state);
  const { noticeMng, auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { payload } = action;
  const { noticeID, formMode } = payload;

  yield put(handleIsLoading(true));

  if(formMode==='create'){
    yield put(
      setReduxValues({
        _path: 'noticeDetail',
        noticeID: '',
        noticeTitle: '',
        noticeContents: '',
        noticeDate: yearMonthDay(new Date()),
        isPopUp: 1,
        popUpEndDate: yearMonthDay(new Date()),
        isMailing: 1,
      }),
    );
  }
  else{
  try{
  const res = yield call(PostCall, '/lawFirm/notice/searchDetail', { NoticeID: noticeID, LawFirmID: MyLFID});
  const data = getAjaxData(res);
  yield put(setReduxValues({_path:'noticeDetail',
                            noticeID: data.NoticeID,
                            noticeTitle: data.Title, 
                            noticeContents: data.Contents, 
                            noticeDate: data.NoticeDate, 
                            isPopUp: data.IsPopup, 
                            popUpEndDate: data.PopupEndDate, 
                            isMailing: data.IsMailing
                          }))
  yield put(setReduxValues({formMode:'mod'}))
  }
  catch(e){
    getAjaxData(e);
  }
}
  yield put(handleIsLoading(false));
}

function* DeleteData(action){
  const state = yield select(state => state);
  const { noticeMng, auth } = state;

  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { search } = noticeMng;
  const { searchIsPopUp, searchIsMailing, searchStartDate, searchEndDate, searchValue } = search;
  const { payload } = action;
  const { noticeID } = payload;

  yield put(handleIsLoading(true));

  try{
    const res = yield call(PostCall, '/lawFirm/notice/deleteNotice', { NoticeID: noticeID, LawFirmID: MyLFID });
    const data = getAjaxData(res);
    if(data){
      NotificationManager.info('',mlMessage('notification.delete'));
      yield put(setReduxValues({formMode:''}));
      yield ListFetch({payload: {
        searchIsPopUp,
        searchIsMailing,
        searchStartDate,
        searchEndDate,
        searchValue,
      }})
      }

  }catch(e){
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga(){
  yield all([
    takeEvery(NOTICEMNG_SAVE_DRAFT, SaveDraft), 
    takeEvery(NOTICEMNG_LIST_FETCH, ListFetch),
    takeEvery(NOTICEMNG_CHECK_INPUT_DATA, CheckInputData), 
    takeEvery(NOTICEMNG_DETAIL_BIND, DetailBind),
    takeEvery(NOTICEMNG_DELETE_DATA, DeleteData),
  ]);
}
