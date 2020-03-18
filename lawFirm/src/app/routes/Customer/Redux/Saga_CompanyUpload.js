import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import React, { Component } from 'react';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { R, RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { setReduxValues } from './Action';
import { COMPANY_UPLOAD_SAVE_DRAFT } from './ActionType';

function* saveDraft(action) {
  const state = yield select(state => state);
  const { auth, customerMng } = state;
  const { authUser } = auth;
  const { totalData, handleTableData, type } = action.payload;

  const data = yield call(PostCall, '/lawFirm/customer/companyUpload', {
    LawFirmID: authUser.MyLFID,
    totalData,
  });

  const result = getAjaxData(data);

  const failData = result.map(item => {
    return {
      Name: item.Name,
      RepresentativeName: item.RepresentativeName,
      Email: item.Email,
      CorRegNumber: item.CorRegNumber,
      PhoneNumber: item.PhoneNumber,
      FaxNumber: item.FaxNumber,
      ZipCode: item.ZipCode,
      Address: item.Address,
      Address2: item.Address2,
      resultMsg: item.resultMsg,
    };
  });

  // 한 개씩 업로드 시 성공 여부 체크
  const isSuccess = failData.length === 0;

  handleTableData(failData, type, isSuccess);

  yield put(
    handleCommonAlertConfirmSet({
      msgObj: {
        title: '업로드 결과',
        contents: (
          <div style={{ width: '200px' }}>
            <div className="h4">총 데이터 : {totalData.length}개</div>
            <div className="text-info h4 mt-1">
              성공 데이터 : {Number(totalData.length) - Number(failData.length)}개
            </div>
            <div className="text-danger h4 mt-1">실패 데이터 : {failData.length}개</div>
          </div>
        ),
        isConfirm: false,
      },
      waitDatas: {
        name: '',
        value: {},
      },
    }),
  );
}

export default function* rootSaga() {
  yield all([takeEvery(COMPANY_UPLOAD_SAVE_DRAFT, saveDraft)]);
}
