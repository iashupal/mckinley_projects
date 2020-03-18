import { all } from 'redux-saga/effects';
import userMng from 'app/routes/System/UserMng/Redux/Saga';
import notice from 'app/routes/System/NoticeMng/Redux/Saga';
import lawfirm from 'app/routes/System/LawFirmMng/Redux/Saga';
import case_ from 'app/routes/Case/Redux/Saga';
import customer from 'app/routes/Customer/Redux/Saga';
import documentMng from 'app/routes/Document/Redux/Saga';
import consultationMng from 'app/routes/Consultation/Redux/Saga';
import contractMng from 'app/routes/Contract/Redux/Saga';
import timesheetMng from 'app/routes/TimeSheet/Redux/Saga';
import authSagas from './Default/Auth';
import common from './Default/Common';
import settings from './Default/Setting';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    common(),
    settings(),
    notice(),
    lawfirm(),
    userMng(),
    documentMng(),
    case_(),
    customer(),
    consultationMng(),
    contractMng(),
    timesheetMng(),
  ]);
}
