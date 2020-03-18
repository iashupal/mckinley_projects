import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { RU, R } from 'helpers/ramda';
import { INVOICE_SET_REDUX_VALUES } from './ActionType';

const { yearMonthDay } = RU;

const initial = {
  fetchInvoice: [],
  invoiceDetail: {
    invoiceType: { key: '1', text: '' },
    selectedLitigationList: [],
    selectedAdviceList: [],
    selectedConsultationList: [],
    selectedTCList: [],
    performer: { value: '', label: '' },
    expectedInvoiceDate: yearMonthDay(new Date()),
    title: '',
    status: { key: '', text: '' },
    contents: '',
    isInvoiced: false,
    format: { ket: '', text: '' },
  },
  invoiceSearch: {
    startDate: '',
    endDate: '',
    searchText: '',
  },
  isLoading: false,
};

const handlers = {
  [INVOICE_SET_REDUX_VALUES]: prodSetReduxValues2,
};

export default reducerSelector2(initial, handlers);
