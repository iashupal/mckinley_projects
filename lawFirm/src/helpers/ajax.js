import axios from 'axios';
import { NotificationManager } from 'react-notifications';

// 서버 실행이 불가능한 상황에서 변경. (Only Client)
const isUseFakeAPI = true;

const getEnv = () => {
  const { host } = window.location;

  let result = '';
  if (host === 'live.cloudlawai.com') result = 'prod';
  if (host === 'dev.cloudlawai.com') result = 'dev';
  if (host === 'qa.cloudlawai.com') result = 'master';
  if (host === 'localhost:3002') result = 'localhost';

  return result; // prod dev master localhost
};

export const checkFakeAPI = () => {
  const envStr = getEnv();
  if (envStr === 'prod' || envStr === 'dev' || envStr === 'master') return false;
  return isUseFakeAPI;
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const urlMaster = isDev ? 'http://localhost:3001/api' : '/api';
const iamport_code = getEnv() === 'prod' ? 'imp86481778' : 'imp69434445'; // 아임포트 가맹점 식별코드
const isEng = () => localStorage.getItem('language') === 'ENG'; // 영어 표기상황

// 공통 post ajax call (Saga, Component 통합)
//   Component 사용 예 :
//     const fetchedData = await PostCall('/user/selectList', { CCID:123 });
//   Saga 사용 예 :
//     const fetchedData = yield call(PostCall, '/code/select');
//     const fetchedData = yield call(PostCall, '/code/select', { CCID:123 });
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
export const PostCall = (restUrl, params) => {
  const __language = isEng() ? 'ENG' : 'KOR';
  const __site = 'LawFirm'; // General || LawFirm // 추후 변경되도록 (로그인 또는 설정값?)
  return axios.post(urlMaster + restUrl, { ...params, __language, __site });
};

// 법인카드 결제 (아임포트)
export const cardPayIMP = (req, res) => {
  const { IMP } = window;
  IMP.init(iamport_code);
  IMP.request_pay(req, res);
};

// PostCall 결과에서 실데이터 얻는 Func
// SAMPLE :
// try {
//   const res = await PostCall('/sample/selectLanguageDetail', { LanguageCode: 'KOR' });
//   const data = getAjaxData(res);
// } catch (err) {
//   getAjaxData(err);
// }
export const getAjaxData = AjaxResult => {
  try {
    const { response } = AjaxResult;
    const resultObj = response || AjaxResult;
    const {
      status, // 200, 404, 500
      data,
    } = resultObj;
    const {
      status: status2, // "SUCCESS", "ERROR", "FAIL"
      data: data2, // null ?
      code, // 에러용 임의 코드
      message, // 상세정보
    } = data;

    const isError = status === 500;
    const isWarning = status === 200 && (status2 === 'FAIL' || status2 === 'ERROR');
    if (isError) {
      NotificationManager.error(message, code);
    }
    if (isWarning) {
      NotificationManager.warning(message, code);
    }
    return data2;
  } catch (err) {
    // console.log(err);
    return null;
  }
};
