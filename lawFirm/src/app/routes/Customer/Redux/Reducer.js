import { prod, reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { R, RU } from 'helpers/ramda';
import { CUSTOMER_MNG_SET_REDUX_VALUES } from './ActionType';

const initial = {
  dialogMode: 'create',
  isLoading: false,
  customer: {
    nowMode: 'list',
    list: {
      search: {
        searchValue: '',
      },
      list: [],
    },
  },
  individual: {
    nowMode: 'list',
    list: {
      search: {
        searchValue: '',
      },
      list: [],
    },
    save: {
      isOpen: false,
      cardID: null,
      belong: '0',
      photoURL: null,
      isRepresentative: false,
      company: '',
      name: '',
      cardTypeCode: '',
      mobile: '',
      faxNumber: '',
      email: '',
      phone: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      remark: '',
    },
    detail: {
      cardID: '',
      belong: '0',
      name: '',
      company: '',
      photoURL: null,
      mobile: '',
      email: '',
      phone: '',
      faxNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      remark: '',
    },
  },
  company: {
    nowMode: 'list',
    list: {
      search: {
        searchValue: '',
      },
      list: [],
      memberSearch: {
        searchValue: '',
      },
      memberList: [],
      commonSearch: {
        searchValue: '',
      },
      commonList: [],
    },
    save: {
      isOpen: false,
      cardID: null,
      photoURL: null,
      name: '',
      phone: '',
      email: '',
      faxNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      representativeName: '',
      corRegNumber: '',
      corporationMasterID: null,
    },
    detail: {
      cardID: '',
      name: '',
      email: '',
      photoURL: null,
      representativeName: '',
      corRegNumber: '',
      phone: '',
      faxNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
    },
  },

  upLoad: {
    companyList: [],
  },
};

const handlers = {
  [CUSTOMER_MNG_SET_REDUX_VALUES]: prodSetReduxValues2,
};

export default reducerSelector2(initial, handlers);
