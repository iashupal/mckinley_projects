import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Case from 'app/routes/Case/Redux/Reducer';
import UserMng from 'app/routes/System/UserMng/Redux/Reducer';
import NoticeMng from 'app/routes/System/NoticeMng/Redux/Reducer';
import LawFirmMng from 'app/routes/System/LawFirmMng/Redux/Reducer';
import DocumentMng from 'app/routes/Document/Redux/Reducer';
import CustomerMng from 'app/routes/Customer/Redux/Reducer';
import ConsultationMng from 'app/routes/Consultation/Redux/Reducer';
import Contract from 'app/routes/Contract/Redux/Reducer';
import TimeSheet from 'app/routes/TimeSheet/Redux/Reducer';
import Invoice from 'app/routes/Invoice/Redux/Reducer';
import Settings from './Default/Settings';
import Auth from './Default/Auth';
import Common from './Default/Common';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    case_: Case,
    noticeMng: NoticeMng,
    lawfirmMng: LawFirmMng,
    documentMng: DocumentMng,
    userMng: UserMng,
    customerMng: CustomerMng,
    consultationMng: ConsultationMng,
    contract: Contract,
    timeSheet: TimeSheet,
    invoice: Invoice,
  });

export default createRootReducer;
