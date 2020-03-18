import * as ramda from 'ramda';
import AppLocale from 'lngProvider';
import moment from 'moment';
import xlsx from 'xlsx';
import { PostCall } from 'helpers/ajax';
import React from 'react';

export const R = ramda;

// Checkbox 처리용 데이터변환
const typeChangeToCB2 = defaultBool =>
  R.reduce((a, b) => R.append({ id: b.value, name: b.name, value: defaultBool }, a), []);
const typeChangeToCB = typeChangeToCB2(true);
// [{ name: "RadioTest1", value: 'rTest1' }, ...] --> [{ id: "rTest1", name: "RadioTest1", value: true }, ...]

// 날짜 표기 관련
const yearMonth = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM');
}; // "2018-09"
const yearMonthDay = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM-DD');
}; // "2018-09-04"
const yearMDHMS = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM-DD_h-mm-ss');
}; // "2018-09-14_05-56-44"
const yearMDHM = date => {
  if (!date) return null;
  const mOjb = moment.isMoment(date) ? date : new moment(date);
  return mOjb.format('YYYY-MM-DD h:mm');
}; // "2018-09-14 05:56"

// Checkbox 데이터에서 Check된 데이터만 Get
const checkedIDArr = R.pipe(
  R.filter(R.prop('value')),
  R.pluck('id'),
);
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> ["LTYPE_0020"]

const checkedNames = R.pipe(
  R.filter(R.prop('value')),
  R.pluck('name'),
);
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> ["계약해석"]

// Checkbox value 일괄변경
const checkedReset_One = onoff => R.merge(R.__, { value: onoff });
const checkedReset = onoff => R.map(checkedReset_One(onoff));
// [{ "id": "LTYPE_0010", "name": "개인정보", "value": false }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }]
// ==> [{ "id": "LTYPE_0010", "name": "개인정보", "value": true }, { "id": "LTYPE_0020", "name": "계약해석", "value": true }] // checkedReset(true) 일때

// 페이지 이동
const changeURL = url => {
  window.location = `#/app${url}`;
};

// query-string 또는 hash-string parsing
const cleanQStr = firstChar =>
  R.ifElse(
    R.pipe(
      R.head,
      R.equals(firstChar),
    ),
    R.tail,
    R.identity,
  );
const parseQStr = firstChar =>
  R.pipe(
    cleanQStr(firstChar),
    R.split('&'),
    R.map(R.split('=')),
    R.fromPairs,
  );
const parseQueryStr = parseQStr('?');
// '?test=1&test2=2&test3=3' 또는 '#test=1&test2=2&test3=3'
// ==> {"test":"1","test2":"2","test3":"3"}
// console.log(JSON.stringify(parseQueryStr('?test=1&test2=2&test3=3')));

// SAVE 정상 확인
const checkSave = result => result.status === 200;

// 기본 타입값 설정
const wEmpStr = a => a || '';
const wEmpNum = (a, v) => a || (v || -1);

// 말줄임 처리
const shortenStr = R.curry((wantLenth, str) => {
  if (str.length > wantLenth) {
    return `${str.substring(0, wantLenth)}...`;
  }
  return str;
});

// DB Select 형식의 File -> Redux 형태로 변환
const convertFilesToRedux = R.map(a => ({
  key: a.S3Key,
  size: a.FileSize,
  name: a.FileName,
}));

// 에디터 Detail시 Style 변경
const convertEditorText = a => (a ? a.replace('<p>', '<p style="margin-bottom: 0px;">') : '');

// English Language ?
const isEng = e => localStorage.getItem('language') === 'ENG';

// MultiLanguage 메세지
const mlMessage = a => AppLocale[isEng() ? 'en' : 'ko'].messages[a];

// CurrentUser 삭제 예정, 추가로 사용 금지 (?) (-> page unload 시, localstorage : user 를 지우는 방식 적용함.)
// (후순위) 로그인 사용자 정보 -> Redux Store 로 변경.
// 참고 : redux의 auth.authUser. 안에 기존 CurrentUser(인증 당시 : localstorage에 저장한 값) 정보들 모두 존재함.
export const CurrentUser = a => {
  try {
    return JSON.parse(localStorage.getItem('user'))[a];
  } catch (e) {
    return '';
  }
};

// Role Array 에서 각 boolean의 권한 Obj 리턴
const getRoleAuth = roleArr => ({
  authLawyerGroup: R.contains('Role.Legal.ExternalLawyer', roleArr) || R.contains('Role.Legal.InternalLawyer', roleArr),
  authAdmin: R.contains('Role.Legal.SuperAdmin', roleArr),
  authContractAdmin: R.contains('Role.Legal.ContractAdmin', roleArr),
});

// 참조 수신자 여부 리턴
const checkRelevant = (relevantUsers, userID) => R.contains(userID, R.pluck('UserID', relevantUsers));

// Index field 가 추가된 Array-Object 리턴
const mapIndexed = R.addIndex(R.map);
// const addIndexArrObj = indexName => mapIndexed((val, idx) => { val[indexName] = idx; return val; }); // version1
const addIndexArrObj = indexName => mapIndexed((val, idx) => ({ ...val, [indexName]: idx })); // version2
// console.log(addIndexArrObj('iiii')([{ name: 'a' }, { name: 'b' }])); // [{ name: 'a',  iiii: 0}, { name: 'b', iiii: 1}]

// 고정 자릿수 숫자 리턴
const getFixedLenNum = (len, number) => {
  if (len > `${number}`.length) {
    return getFixedLenNum(len, `0${number}`);
  }
  return `${number}`;
};
// console.log(getFixedLenNum(4, 23)); // "0023"

// Pluck 적용된 모든 값이 True 인지 체크.
const pluckAllTrue = R.curry((column, array) => R.all(R.identity, R.pluck(column, array)));
// pluckAllTrue('col1')([{ col1: '', test: 'aa'}, { col1: '123', test: 'bb'}]) // false
// pluckAllTrue('col1')([{ col1: '444', test: 'aa'}, { col1: '123', test: 'bb'}]) // true

// 업로드 대상 파일의 확장자 검사 (-> 모든 확장자 사용하는것으로 변경.)
const checkUploadFileExt = inputFileExt => true; // R.contains(R.toLower(inputFileExt), ['pdf', 'doc', 'docx']);
// console.log(checkUploadFileExt('pdf')); // true
// console.log(checkUploadFileExt('PDf')); // true
// console.log(checkUploadFileExt('ppt')); // false

const downloadFile = (file, fileName) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};

const fileReadFunc = (fileBuffer, mimetype, fileName) => {
  const arr = new Uint8Array(fileBuffer);
  const f = new File([arr], { type: mimetype });
  downloadFile(f, fileName);
};

const convertFileSize = fileSize => ({ value: Math.round((fileSize / 1024 / 1024) * 100) / 100, unit: 'MB' });

const readFile = async (Key, Name) => {
  const result = await PostCall('/ext/file_read', { Key });
  const url = result.data.result;
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', Name);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.href = null;
    link.remove();
  }, 15000);
};

const removeFileOnS3 = async key => {
  await PostCall('/ext/file_delete', { key });
};

// 개인 이미지 URL 관련
const imageURL_prefix = 'https://lawfirm-file.s3.ap-northeast-2.amazonaws.com/';

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// console.log(validateEmail('test@seof.com')); // true
// console.log(validateEmail('test@seof3com')); // false

const validatePhone = phone => {
  const re = /^\d+(\-\d+)+$/;
  return re.test(phone);
};

// 200 외 다른 응답코드 발생시, Error 객체 처리를 위한 함수
const getErrObj = (error, isRawValues) => {
  const eCode = error.response.status; // 200 - 정상, 404 - Not Found, 500 - 서버오류 및 의도된 정보 전달
  const {
    type, // type : 'error' | 'info'
    code, // code : 'sentry키' | '' | '서버용-관리-키(SYS_MSG_0001..)'
    message, // message : '상세정보'
    data,
  } = error.response.data;

  if (isRawValues) {
    return { eCode, type, code, message, data };
  }
  return {
    pageErrTitle: type === 'info' ? 'Info' : 'Error',
    pageErrMsg: type === 'info' ? message : `unexpected error occurred (${eCode})`,
  };
};

const getLinkURL = (type, id) => {
  let preURL = '/#/app/';
  if (type === 'Contract') preURL += 'contract';
  if (type === 'SignedContract') preURL += 'signedContract';
  if (type === 'Law') preURL += 'law';
  if (type === 'Project') preURL += 'project';
  if (type === 'Litigation') preURL += 'litigation';
  return `${preURL}/save?id=${id}`;
};

const checkUserInfoData = (valueObj, isMustPW) => {
  const {
    detail_loginID,
    detail_name_kor,
    detail_name_eng,
    detail_phone,
    detail_pass,
    detail_pass2,
    detail_authList,
  } = valueObj;
  const alertMsg = [];

  if (!detail_loginID) {
    alertMsg.push('Login ID');
  }
  if (!detail_name_kor) {
    alertMsg.push('한글 이름');
  }
  if (!detail_name_eng) {
    alertMsg.push('영문 이름');
  }
  if (!detail_phone) {
    alertMsg.push('핸드폰 번호');
  }
  if (detail_authList) {
    // 권한 리스트가 있으면
    if (!detail_authList.length) {
      alertMsg.push('권한 등록(1개 이상)');
    }
  }
  if (detail_loginID && detail_loginID.length > 127) {
    alertMsg.push('Login ID 최대 127자');
  }
  if (detail_loginID && !validateEmail(detail_loginID)) {
    alertMsg.push('Login ID는 Email 형식');
  }
  if (detail_phone && detail_phone.length > 31) {
    alertMsg.push('핸드폰 번호는 최대 31자');
  }
  if (detail_phone && !validatePhone(detail_phone)) {
    alertMsg.push('핸드폰 번호 형식');
  }

  if (detail_pass || detail_pass2 || isMustPW) {
    if (detail_pass !== detail_pass2) {
      alertMsg.push('Password 같지 않음');
    }
    if (detail_pass.length < 8) {
      alertMsg.push('Password 자릿수');
    }
  }

  return alertMsg;
};

const checkUserInvitationInfoData = valueObj => {
  const { detail_authList } = valueObj;
  const alertMsg = [];

  if (!detail_authList.length) {
    alertMsg.push('권한 등록(1개 이상)');
  }

  return alertMsg;
};

const checkLawFirmData = valueObj => {
  const { lawFirmBrand, address, address2, zipCode, phoneNumber, fax, email } = valueObj;
  const alertMsg = [];

  if (!lawFirmBrand) {
    alertMsg.push('법무법인명');
  }
  if (!address) {
    alertMsg.push('주소');
  }
  if (!address2) {
    alertMsg.push('상세주소');
  }
  if (!zipCode) {
    alertMsg.push('우편번호');
  }
  if (!phoneNumber) {
    alertMsg.push('전화번호');
  }
  if (!fax) {
    alertMsg.push('팩스');
  }
  if (!email) {
    alertMsg.push('이메일');
  }

  return alertMsg;
};

const checkDocumentData = valueObj => {
  const { files, documentSave, isTotalDocMode, selectedItem } = valueObj;
  const alertMsg = [];

  if (isTotalDocMode) {
    if (!documentSave.fileInflux.key) {
      alertMsg.push('유입처');
    } else if (!selectedItem.title) {
      if (documentSave.fileInflux.key !== 'BIZCODE_B99-C00') alertMsg.push('선택');
    }
  } else if (files && files.length === 0) {
    alertMsg.push('파일');
  }

  if (files) {
    let flag = true;
    files.forEach(file => {
      if (!file.division) flag = false;
    });
    if (!flag) alertMsg.push('구분');
  }

  return alertMsg;
};

const checkFileSize = valueObj => {
  const { fileSize, fileName } = valueObj;
  const alertMsg = [];
  const GB_TO_BYTE = 1073741824;
  const FILE_SIZE_TO_GB = Math.floor((fileSize / 1024 / 1024 / 1024) * 100) / 100;
  if (fileSize > GB_TO_BYTE) {
    alertMsg.push(`파일명 : ${fileName}`);
    alertMsg.push(`파일 용량 : ${FILE_SIZE_TO_GB}GB`);
  }
  return alertMsg;
};

const checkContractData = valueObj => {
  const { files, billingTypeCode, contractDetail } = valueObj;
  const {
    common,
    litigation,
    litigationTimeCharge,
    litigationLumpSum,
    advice,
    adviceAdvisorContract,
    adviceSomethingUnusualContract,
    adviceSomethingUnusualContractTimeCharge,
    adviceSomethingUnusualContractLumpSum,
  } = contractDetail;
  const alertMsg = [];

  if (!common.case) alertMsg.push('송무/자문 선택');
  if (common.case === 'L') {
    if (!litigation.billingMethod) alertMsg.push('청구 방식');
  }
  if (common.case === 'A') {
    if (!advice.contractMethod) alertMsg.push('계약 방식');
    if (advice.contractMethod === 'somethingUnusualContract') {
      if (!adviceSomethingUnusualContract.billingMethod) alertMsg.push('청구 방식');
    }
  }

  if (!common.client || common.client.length === 0) alertMsg.push('의뢰인');
  if (!common.title) alertMsg.push('제목');
  if (!common.contents) alertMsg.push('특이사항');
  if (!common.termOfContract.start && !common.termOfContract.end) alertMsg.push('계약기간');

  const startDateArr = common.termOfContract.start.split('-');
  const endDateArr = common.termOfContract.end.split('-');
  const startDate = new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2]);
  const endDate = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);
  if (startDate > endDate) alertMsg.push('계약기간 설정');

  if (!common.dateOfContract) alertMsg.push('계약체결 일시');

  switch (billingTypeCode) {
    case 'LTC': {
      if (litigationTimeCharge.isAdvanceFee && !litigationTimeCharge.advanceFee) alertMsg.push('선급금');
      if (!litigationTimeCharge.rate) alertMsg.push('요율');
      if (litigationTimeCharge.rate > 100) alertMsg.push('요율(100미만)');
      if (!litigationTimeCharge.discountRate) alertMsg.push('할인율');
      if (litigationTimeCharge.discountRate > 100) alertMsg.push('할인율(100미만)');
      if (!litigationTimeCharge.maximumPrice) alertMsg.push('상한액');
      break;
    }
    case 'LLS': {
      if (litigationLumpSum.isRetainer && !litigationLumpSum.retainer) alertMsg.push('선급금');
      let successFlag = true;
      let rewardFlag = true;
      litigationLumpSum.arrayRelevantToSuccess.forEach(obj => {
        if (!obj.successCondition1Lv.key) successFlag = false;
        if (!obj.successCondition2Lv.key) successFlag = false;

        if (obj.successCondition1Lv.key === 'SUCL_A') {
          if (!obj.successCondition3Lv.key) successFlag = false;
          if (
            obj.successCondition3Lv.key === 'SUCLAA_Z' ||
            obj.successCondition3Lv.key === 'SUCLAB_Z' ||
            obj.successCondition3Lv.key === 'SUCLAB_C'
          ) {
            if (!obj.successConditionText) successFlag = false;
          }
        }

        if (obj.rewardType.key === 'SUCFTP_R' && obj.successFee > 100) rewardFlag = false;
        if (!obj.rewardType.key) rewardFlag = false;
        if (!obj.successFee) rewardFlag = false;
      });

      if (!successFlag) alertMsg.push('성공조건');
      if (!rewardFlag) alertMsg.push('성공보수 금액(정액, 정율-100미만)');

      break;
    }
    case 'AM': {
      if (!adviceAdvisorContract.basicMonthlyConsultingFee) alertMsg.push('월 기본 자문료');
      if (!adviceAdvisorContract.basicConsultingHour) alertMsg.push('기본자문시간');
      if (adviceAdvisorContract.basicConsultingHour > 255) alertMsg.push('기본자문시간(255미만)');
      if (!adviceAdvisorContract.orderOfConsultationTime.key) alertMsg.push('자문시간 공제순서');
      if (!adviceAdvisorContract.specialDiscountRate) alertMsg.push('특별할인율');
      if (adviceAdvisorContract.specialDiscountRate > 100) alertMsg.push('특별할인율(100미만)');
      if (!adviceAdvisorContract.additionalAdvisoryRate) alertMsg.push('추가자문요율');
      if (adviceAdvisorContract.additionalAdvisoryRate > 100) alertMsg.push('추가자문요율(100미만)');
      if (!adviceAdvisorContract.additionalAdvisoryDiscountRate) alertMsg.push('추가자문료에 대한 할인율');
      if (adviceAdvisorContract.additionalAdvisoryDiscountRate > 100)
        alertMsg.push('추가자문료에 대한 할인율(100미만)');
      if (!adviceAdvisorContract.calculationDate.key) alertMsg.push('정산기간');
      break;
    }
    case 'ATC': {
      if (
        adviceSomethingUnusualContractTimeCharge.isMoneyInAdvance &&
        !adviceSomethingUnusualContractTimeCharge.moneyInAdvance
      )
        alertMsg.push('선급금');
      if (!adviceSomethingUnusualContractTimeCharge.rate) alertMsg.push('요율');
      if (adviceSomethingUnusualContractTimeCharge.rate > 100) alertMsg.push('요율(100미만)');
      if (!adviceSomethingUnusualContractTimeCharge.discountRate) alertMsg.push('할인율');
      if (adviceSomethingUnusualContractTimeCharge.discountRate > 100) alertMsg.push('할인율(100미만)');
      if (!adviceSomethingUnusualContractTimeCharge.maximumPrice) alertMsg.push('상한액');

      break;
    }
    case 'ALS': {
      if (adviceSomethingUnusualContractLumpSum.isRetainer && !adviceSomethingUnusualContractLumpSum.retainer)
        alertMsg.push('착수금');
      if (!adviceSomethingUnusualContractLumpSum.dateOfMiddlePayment) alertMsg.push('중도금 지급시기');
      if (!adviceSomethingUnusualContractLumpSum.middlePayment) alertMsg.push('중도금');
      if (!adviceSomethingUnusualContractLumpSum.dateOfBalance) alertMsg.push('잔금 지급시기');
      if (!adviceSomethingUnusualContractLumpSum.balance) alertMsg.push('잔금');

      break;
    }
    default: {
      break;
    }
  }
  if (!common.currency.key) alertMsg.push('통화');

  if (files) {
    let flag = true;
    files.forEach(file => {
      if (!file.division) flag = false;
    });
    if (!flag) alertMsg.push('파일 구분');
  }

  return alertMsg;
};

const checkTimeSheetData = valueObj => {
  const { timeSheetDetail } = valueObj;
  const {
    bizCategoryCode,
    contents,
    manager,
    excutionDate,
    runningTime,
    billableTime,
    isBillable,
    contract,
    consult,
  } = timeSheetDetail;
  const alertMsg = [];

  if (!bizCategoryCode) alertMsg.push('항목');
  if (!contents) alertMsg.push('내용');
  if (!manager.value) alertMsg.push('실행인');
  if (!excutionDate) alertMsg.push('실행일');
  if (runningTime < billableTime) alertMsg.push('청구/소요시간 (청구시간<소요시간)');
  if (bizCategoryCode === 'BIZCT_B01') {
    if (!consult.value) alertMsg.push('상담');
  }
  if (bizCategoryCode === 'BIZCT_B02') {
    if (!contract.value) alertMsg.push('계약');
  }
  if (bizCategoryCode === 'BIZCT_B03') {
    if (!timeSheetDetail.case.value) alertMsg.push('송무');
  }
  if (bizCategoryCode === 'BIZCT_B04') {
    if (!timeSheetDetail.case.value) alertMsg.push('자문');
  }
  return alertMsg;
};

const checkTCData = valueObj => {
  const { TCDetail } = valueObj;
  const { timeCharge } = TCDetail;
  const alertMsg = [];

  if (!timeCharge) alertMsg.push('단가');
  return alertMsg;
};

const getEnv = e => {
  const { host } = window.location;

  let result = '';
  if (host === 'live.cloudlawai.com') result = 'prod';
  if (host === 'dev.cloudlawai.com') result = 'dev';
  if (host === 'qa.cloudlawai.com') result = 'master';
  if (host === 'localhost:3002') result = 'localhost';

  return result; // prod dev master localhost
};

const payBaseInfo = {
  oneUserAmount: getEnv() === 'prod' ? 330 : 10, // 1인당 기본 금액 (/1일)
  oneUserAmount_Month: getEnv() === 'prod' ? 9900 : 300, // 1인당 기본 금액 (/1달)
  discountUserCount: [[100, 50, 1], [10, 5, 0]], // [100명 이상, 50명 이상, 1명 이상] -> [10% 할인, 5% 할인, 0% 할인]
  discountPayMonth: [[12, 1], [5, 0]], // [12개월 결재, 1개월 결재] -> [5% 할인, 0% 할인]
  discountEvent: { name: '', value: 0 }, // Event : 0% 할인
  trialDays: 15, // trial 제공 기간(일수)
  trialUsers: 5, // trial 제공 유저 수
  vatPercent: 10, // VAT 추가 % (최종 금액에 추가)
};

const getMainURL = e => window.location.origin;

const licenseCalc = ({ compCreateDate, payStartDate, payEndDate, isTrial, userMax, userNum }) => {
  const { trialDays, trialUsers } = payBaseInfo;

  const trialStartDate = compCreateDate;
  const trialEndDate = moment(compCreateDate)
    .add(trialDays, 'days')
    .format('YYYY-MM-DD');

  const startDate = isTrial ? trialStartDate : payStartDate;
  const endDate = isTrial ? trialEndDate : payEndDate;

  const maxCount = isTrial ? trialUsers : userMax;
  const usePercent = Math.round((userNum / maxCount) * 100 * 100) / 100;
  const addAvailableCount = maxCount - userNum;
  const systemDisable = !isTrial && addAvailableCount <= 0; // Trial 기간 종료 && 구입한 유저수도 없을 때,

  return {
    trialDays,
    trialUsers,
    trialStartDate,
    trialEndDate,
    startDate,
    endDate,
    maxCount,
    systemDisable,
    usePercent,
    addAvailableCount,
  };
};

const payOutputCalc = ({
  baseInfo,
  input,
  plusUser,
  checkOneYear,
  startDate,
  thisMonth_LastDayUsers,
  nextMonth_LastDayUsers,
  payEndDate,
  lastPayCheckOneYear,
}) => {
  const {
    oneUserAmount,
    oneUserAmount_Month,
    discountUserCount: oldDiscountUserCount,
    discountPayMonth: oldDiscountPayMonth,
    discountEvent: oldDiscountEvent,
    vatPercent,
  } = baseInfo;

  const { payRuleApply } = input;
  const { userCount, payMonth } = payRuleApply;
  const isNextMonthPayExists = nextMonth_LastDayUsers > 0; // 다음달 말일 기준으로, 활성화된 유저가 있는지.

  // 사용자가 직접 1개월 또는 12개월 단위를 선택하며, 이 기준으로 종료일이 "다음달 말일" 또는 "1년 후 말일"로 고정됨.
  const endDateNew = checkOneYear
    ? moment()
        .add(1, 'years')
        .endOf('month')
    : moment()
        .endOf('month')
        .add(1, 'day')
        .endOf('month');

  // "전결재 종료일" 과 동일하게 고정함. (만일 그 결재가 12개월 할인을 받았다면, 신규 기간과 무관하게 적용 혜택)
  const endDateExist = moment(payEndDate);

  const endDate = isNextMonthPayExists ? endDateExist : endDateNew;
  const fullMonthNum = Math.floor(moment.duration(endDate.diff(startDate)).asMonths());

  const thisMonthLeftDays = checkOneYear
    ? 0
    : Math.ceil(
        moment
          .duration(
            moment(startDate)
              .endOf('month')
              .diff(moment(startDate)),
          )
          .asDays(),
      ); // 이번달 잔여일 (일할계산 대상 기간)

  const nextMonthDays = moment(endDate)
    .add(1, 'day')
    .endOf('month')
    .date(); // 다다음달 기준 일수 산정 (다음달 자동결제 사용예정 -> 월기준으로 바뀌어서 불필요해 보임..)

  const isDecreaseUser = plusUser < thisMonth_LastDayUsers;

  const baseAmount_1 = oneUserAmount * (isDecreaseUser ? 0 : plusUser - thisMonth_LastDayUsers) * thisMonthLeftDays;
  const baseAmount_2 = oneUserAmount_Month * (plusUser - nextMonth_LastDayUsers) * fullMonthNum;
  const baseTotalAmount = baseAmount_1 + baseAmount_2;

  const discountUserCount_Rule_Index = R.findIndex(a => R.gte(plusUser, a))(oldDiscountUserCount[0]);
  const discountUserCount_Rule = oldDiscountUserCount[0][discountUserCount_Rule_Index];

  // 단체 : 할인 적용률
  const discountUserCount_Org = oldDiscountUserCount[1][discountUserCount_Rule_Index];
  const discountUserCount = userCount ? discountUserCount_Org : 0; // 할인 불가

  // 단체 : 할인 금액
  const discountUserCount_Amount_Org = Math.round((baseTotalAmount / 100) * discountUserCount);
  const discountUserCount_Amount = userCount ? discountUserCount_Amount_Org : 0; // 할인 불가

  const isUseOld_CheckOneYear = nextMonth_LastDayUsers > 0;
  const newCheckOneYear = isUseOld_CheckOneYear ? lastPayCheckOneYear : checkOneYear;

  const discountPayMonth_Rule_Index = R.findIndex(a => R.gte(newCheckOneYear ? 12 : 1, a))(oldDiscountPayMonth[0]);
  const discountPayMonth_Rule = oldDiscountPayMonth[0][discountPayMonth_Rule_Index];

  // 결재기간 : 할인 적용률
  const discountPayMonth_Org = oldDiscountPayMonth[1][discountPayMonth_Rule_Index];
  const discountPayMonth = payMonth ? discountPayMonth_Org : 0; // 할인 불가

  // 결재기간 : 할인 금액
  const discountPayMonth_Amount_Org = Math.round((baseTotalAmount / 100) * discountPayMonth);
  const discountPayMonth_Amount = payMonth ? discountPayMonth_Amount_Org : 0; // 할인 불가

  const discountEvent_Name = oldDiscountEvent.name;
  const discountEvent = oldDiscountEvent.value;
  const discountEvent_Amount = Math.round((baseTotalAmount / 100) * discountEvent);

  const totalAmount_beforeVAT =
    baseTotalAmount - discountUserCount_Amount - discountPayMonth_Amount - discountEvent_Amount;
  const vatAmount = Math.round((totalAmount_beforeVAT * vatPercent) / 100);
  const totalAmount = totalAmount_beforeVAT + vatAmount;

  return {
    baseTotalAmount,
    discountUserCount_Rule,
    discountUserCount,
    discountUserCount_Amount,
    discountPayMonth_Rule,
    discountPayMonth,
    discountPayMonth_Amount,
    discountEvent_Name,
    discountEvent,
    discountEvent_Amount,
    totalAmount_beforeVAT, // VAT 적용 전
    vatAmount, // VAT 금액
    totalAmount, // VAT 적용 후 최종금액
    nextMonthDays,
    endDate,
    thisMonthLeftDays,
    baseAmount_1,
    baseAmount_2,
    fullMonthNum,
    newCheckOneYear,
  };
};

// Excel Cell 번호에서 뒷부분 숫자 GET.
const getLastNumber = value => {
  const regex = /[0-9]+/gm;
  let m;
  let lastNumber;

  while ((m = regex.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      lastNumber = match;
    });
  }

  return lastNumber;
};

// dropdown 데이터에서 '--All--' 0번째 추가.
const addAllItem = (o, name) => {
  return o ? [{ name: name || '--All--', value: '' }, ...o] : o;
};

const makeCompanyList = ccList => R.map(a => ({ name: isEng() ? a.ccEngName : a.ccKorName, value: a.CCID }), ccList);

const excelExport = (header, data, ws_name, file_name) => {
  // const header = ['Header-1', 'Header-2', 'Header-3', 'Header-4'];
  // const data = [[1, 2, 3, 4], [5, 6, 7, 8]];
  // const ws_name = 'SheetJS';
  // const file_name = 'abc.xlsx';

  const { utils, writeFile } = xlsx;
  const { book_new, aoa_to_sheet, book_append_sheet } = utils;

  const wb = book_new();
  const ws = aoa_to_sheet([header, ...data]);
  book_append_sheet(wb, ws, ws_name);
  writeFile(wb, file_name);
};

// 여러 조건으로 Validation 처리를 할때, 조건에 따라 모든 Msg 를 합치는 Func (아래 예제 참고)
const getMsgStr = data =>
  data
    .filter(a => a.cond)
    .map(a => a.msg)
    .join(', ');

/*
getMsgStr([
  { msg: '소속 여부', cond: false },
  { msg: '이름', cond: false },
  { msg: '핸드폰 번호', cond: false },
  { msg: '소속 회사', cond: false },
]); // -> ""

getMsgStr([
  { msg: '소속 여부', cond: false },
  { msg: '이름', cond: true },
  { msg: '핸드폰 번호', cond: false },
  { msg: '소속 회사', cond: true },
]); // -> "이름, 소속 회사"
*/

const addCategoryInFileList = obj => {
  const { files, fileKey, fileDivision } = obj;
  const result = files.map(file => {
    if (fileKey === file.key && (file.flag === 1 || file.flag === '1')) {
      return { ...file, division: fileDivision, isModified: 1 };
    }
    if (fileKey === file.key) {
      return { ...file, division: fileDivision };
    }
    return { ...file };
  });

  return result;
};

const clearFilesFromS3 = files => {
  if (files && files.length > 0) {
    for (const file of files) {
      if (!file.flag || file.flag === 0) removeFileOnS3(file.key);
    }
  }
};

const handleTextOverFlow = obj => {
  const { str, width } = obj;
  if (str && str.includes('\n')) {
    return (
      <div
        style={{
          textAlign: 'left',
          display: '-webkit-box',
          whiteSpace: 'pre',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          width: width || '250px',
        }}
      >
        {str}
      </div>
    );
  }
  return (
    <div
      style={{
        textAlign: 'left',
        whiteSpace: 'pre',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '250px',
      }}
    >
      {str}
    </div>
  );
};

export const RU = {
  typeChangeToCB,
  typeChangeToCB2,
  yearMonth,
  yearMonthDay,
  checkedIDArr,
  changeURL,
  parseQueryStr,
  checkSave,
  checkedReset,
  checkedReset_One,
  wEmpStr,
  wEmpNum,
  shortenStr,
  convertFilesToRedux,
  convertEditorText,
  mlMessage,
  getRoleAuth,
  yearMDHMS,
  yearMDHM,
  addIndexArrObj,
  getFixedLenNum,
  pluckAllTrue,
  checkRelevant,
  checkedNames,
  checkUploadFileExt,
  fileReadFunc,
  imageURL_prefix,
  validateEmail,
  validatePhone,
  getErrObj,
  getLinkURL,
  isEng,
  checkUserInfoData,
  payBaseInfo,
  getMainURL,
  getEnv,
  licenseCalc,
  payOutputCalc,
  getLastNumber,
  readFile,
  removeFileOnS3,
  addAllItem,
  makeCompanyList,
  checkUserInvitationInfoData,
  checkLawFirmData,
  excelExport,
  checkDocumentData,
  checkFileSize,
  checkContractData,
  checkTimeSheetData,
  checkTCData,
  convertFileSize,
  getMsgStr,
  addCategoryInFileList,
  clearFilesFromS3,
  handleTextOverFlow,
};
