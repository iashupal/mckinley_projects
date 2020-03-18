import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { RU, R } from 'helpers/ramda';
import {
  CONTRACT_SET_REDUX_VALUES,
  CONTRACT_CLEAR_DATA,
  CONTRACT_DETAIL_BIND,
  CONTRACT_ADD_SUCCESS_DATA_FORM,
  CONTRACT_REMOVE_SUCCESS_DATA_FORM,
  CONTRACT_CHANGE_SUCCESS_DATA,
  CONTRACT_BILLING_TYPE_FILTER,
} from './ActionType';

const { yearMonthDay } = RU;

const initial = {
  fetchContracts: [],
  fetchConsultations: [],
  contractDetail: {
    billingTypeCode: '', // TC, LLS, AM, ALS
    common: {
      // 자문, 송무 공통
      choiceOfConsultation: true,
      contractUUID: '',
      case: '',
      client: [],
      manager: [],
      managerRefID: '',
      title: '',
      contents: '',
      termOfContract: { start: yearMonthDay(new Date()), end: yearMonthDay(new Date()) },
      dateOfContract: yearMonthDay(new Date()),
      isTerminationAlarmSetting: false,
      currency: { key: 'CURR_KRW', value: '' },
      isActive: true,
      files: [],
      fileRefID: '',
      relatedConsultation: [],
    },

    litigation: {
      // 송무 공통
      billingMethod: '',
      otherCondition: '',
      installmentCondition: '',
    },

    litigationTimeCharge: {
      // 송무, Time Charge
      isAdvanceFee: false,
      advanceFee: '',
      rate: '',
      discountRate: '',
      maximumPrice: '',
    },

    litigationLumpSum: {
      // 송무, Lump Sum
      isRetainer: false,
      retainer: '',
      arrayRelevantToSuccess: [
        {
          successCondition1Lv: { key: '', value: '' },
          successCondition2Lv: { key: '', value: '' },
          successCondition3Lv: { key: '', value: '' },
          rewardType: { key: 'SUCFTP_A', value: '' },
          successFee: '',
          successConditionText: '',
        },
      ],
    },

    // 자문 공통
    advice: {
      contractMethod: '',
    },

    adviceAdvisorContract: {
      // 자문, 고문 계약
      basicMonthlyConsultingFee: '',
      basicConsultingHour: '',
      orderOfConsultationTime: { key: 'AMDTP_PA', value: '' },
      specialDiscountRate: '',
      additionalAdvisoryRate: '',
      additionalAdvisoryDiscountRate: '',
      calculationDate: { key: 'AMTERM_M', value: '' },
    },

    adviceSomethingUnusualContract: {
      // 자문, 별건 계약
      billingMethod: '',
    },

    adviceSomethingUnusualContractTimeCharge: {
      // 자문, 별건 계약, TimeCharge,
      isMoneyInAdvance: false,
      moneyInAdvance: '',
      rate: '',
      discountRate: '',
      maximumPrice: '',
      condition: '',
    },

    adviceSomethingUnusualContractLumpSum: {
      // 자문, 별건 계약, Lump Sum, 코드 ALS
      isRetainer: false,
      retainer: '',
      dateOfMiddlePayment: yearMonthDay(new Date()),
      middlePayment: '',
      dateOfBalance: yearMonthDay(new Date()),
      balance: '',
    },
  },

  contractSearch: {
    startDate: '',
    endDate: '',
    searchText: '',
  },
  isLoading: false,
};

const handlers = {
  [CONTRACT_SET_REDUX_VALUES]: prodSetReduxValues2,
  [CONTRACT_DETAIL_BIND]: (state, draft, payload) => {
    const { contract } = payload;
    const data = contract[0];
    // 자문, 송무 공통
    draft.contractDetail.billingTypeCode = data.billingTypeCode;
    draft.contractDetail.common = {
      choiceOfConsultation: !(data.relatedConsultation && data.relatedConsultation.length > 0),
      contractUUID: data.contractID,
      case: data.caseType,
      client:
        data.clientName &&
        data.clientName.map(obj => ({ value: obj.value, label: obj.label, isMain: obj.isMain === 1 })),
      manager: data.managerName[0].value !== null ? data.managerName : [],
      managerRefID: data.managerRefID,
      title: data.title ? data.title : '',
      contents: data.contents ? data.contents : '',
      termOfContract: { start: data.startDate, end: data.endDate },
      dateOfContract: data.contractDate,
      isTerminationAlarmSetting: data.isAlertContractEnd === 1,
      currency: { key: data.currencyCode, value: '' },
      isActive: data.isActive === 1,
      files: data.files ? data.files : [],
      fileRefID: data.fileRefID,
      relatedConsultation: data.relatedConsultation,
    };

    let billingMethod = null;
    if (data.billingTypeCode === 'LTC' || data.billingTypeCode === 'ATC') billingMethod = 'timeCharge';
    if (data.billingTypeCode === 'LLS' || data.billingTypeCode === 'ALS') billingMethod = 'lumpSum';
    draft.contractDetail.litigation = {
      billingMethod,
      otherCondition: data.etcOption ? data.etcOption : '',
      installmentCondition: data.partialChargeOption ? data.partialChargeOption : '',
    };

    if (data.billingTypeCode === 'LTC') {
      draft.contractDetail.litigationTimeCharge = {
        isAdvanceFee: data.tcIsAdvanceFee === 1,
        advanceFee: data.tcAdvanceFee,
        rate: data.tcFeeRate,
        discountRate: data.tcDiscountRate,
        maximumPrice: data.tcMaxFee,
      };
    }

    let llsSuccessConditionList = null;
    if (data.llsSuccessConditionList && data.llsSuccessConditionList.length > 0) {
      llsSuccessConditionList = data.llsSuccessConditionList.map(successCondition => ({
        successCondition1Lv: { key: successCondition.llsSuccessCondition1Lv },
        successCondition2Lv: { key: successCondition.llsSuccessCondition2Lv },
        successCondition3Lv: { key: successCondition.llsSuccessCondition3Lv },
        rewardType: { key: successCondition.llsSuccessFeeType },
        successFee: successCondition.llsSuccessFee,
        successConditionText: successCondition.llsSuccessConditionText,
      }));
    } else {
      llsSuccessConditionList = [
        {
          successCondition1Lv: { key: '', value: '' },
          successCondition2Lv: { key: '', value: '' },
          successCondition3Lv: { key: '', value: '' },
          rewardType: { key: 'SUCFTP_A', value: '' },
          successFee: '',
          successConditionText: '',
        },
      ];
    }

    draft.contractDetail.litigationLumpSum = {
      isRetainer: data.llsIsRetainer === 1,
      retainer: data.llsRetainer,
      arrayRelevantToSuccess: llsSuccessConditionList,
    };

    let contractMethod = null;
    if (data.billingTypeCode === 'AM') contractMethod = 'advisorContract';
    if (data.billingTypeCode === 'ATC' || data.billingTypeCode === 'ALS') contractMethod = 'somethingUnusualContract';
    draft.contractDetail.advice = {
      contractMethod,
    };

    draft.contractDetail.adviceAdvisorContract = {
      basicMonthlyConsultingFee: data.amBasicMonthlyFee,
      basicConsultingHour: data.amBasicMonthlyTime,
      orderOfConsultationTime: { key: data.amDeductionTypeCode, value: '' },
      specialDiscountRate: data.amSpecialDiscountRate,
      additionalAdvisoryRate: data.amOverTimeFeeRate,
      additionalAdvisoryDiscountRate: data.amOverTimeDiscountRate,
      calculationDate: { key: data.amTermCode, value: '' },
    };

    draft.contractDetail.adviceSomethingUnusualContract = {
      billingMethod,
    };

    if (data.billingTypeCode === 'ATC') {
      draft.contractDetail.adviceSomethingUnusualContractTimeCharge = {
        isMoneyInAdvance: data.tcIsAdvanceFee === 1,
        moneyInAdvance: data.tcAdvanceFee,
        rate: data.tcFeeRate,
        discountRate: data.tcDiscountRate,
        maximumPrice: data.tcMaxFee,
        condition: data.etcOption ? data.etcOption : '',
      };
    }
    draft.contractDetail.adviceSomethingUnusualContractLumpSum = {
      isRetainer: data.alsIsRetainer === 1,
      retainer: data.alsRetainer,
      dateOfMiddlePayment: data.alsMiddlePaymentDate ? data.alsMiddlePaymentDate : yearMonthDay(new Date()),
      middlePayment: data.alsMiddlePayment,
      dateOfBalance: data.alsBalancePaymentDate ? data.alsBalancePaymentDate : yearMonthDay(new Date()),
      balance: data.alsBalancePayment,
    };
  },

  [CONTRACT_CLEAR_DATA]: (state, draft, payload) => {
    draft.contractDetail = {
      billingTypeCode: '', // TC, LLS, AM, ALS
      common: {
        // 자문, 송무 공통
        choiceOfConsultation: true,
        contractUUID: '',
        case: '',
        client: [],
        manager: [],
        managerRefID: '',
        title: '',
        contents: '',
        termOfContract: { start: yearMonthDay(new Date()), end: yearMonthDay(new Date()) },
        dateOfContract: yearMonthDay(new Date()),
        isTerminationAlarmSetting: false,
        currency: { key: 'CURR_KRW', value: '' },
        isActive: true,
        files: [],
        fileRefID: '',
        relatedConsultation: [],
      },

      litigation: {
        // 송무 공통
        billingMethod: '',
        otherCondition: '',
        installmentCondition: '',
      },

      litigationTimeCharge: {
        // 송무, Time Charge, 코드 : TC
        isAdvanceFee: false,
        advanceFee: '',
        rate: '',
        discountRate: '',
        maximumPrice: '',
      },

      litigationLumpSum: {
        // 송무, Lump Sum, 코드 : LLS
        isRetainer: false,
        retainer: '',
        arrayRelevantToSuccess: [
          {
            successCondition1Lv: { key: '', value: '' },
            successCondition2Lv: { key: '', value: '' },
            successCondition3Lv: { key: '', value: '' },
            rewardType: { key: 'SUCFTP_A', value: '' },
            successFee: '',
            successConditionText: '',
          },
        ],
      },

      // 자문 공통
      advice: {
        contractMethod: '',
      },

      adviceAdvisorContract: {
        // 자문, 고문 계약, 코드 AM
        basicMonthlyConsultingFee: '',
        basicConsultingHour: '',
        orderOfConsultationTime: { key: 'AMDTP_PA', value: '' },
        specialDiscountRate: '',
        additionalAdvisoryRate: '',
        additionalAdvisoryDiscountRate: '',
        calculationDate: { key: 'AMTERM_M', value: '' },
      },

      adviceSomethingUnusualContract: {
        // 자문, 별건 계약
        billingMethod: '',
      },

      adviceSomethingUnusualContractTimeCharge: {
        // 자문, 별건 계약, TimeCharge,
        isMoneyInAdvance: false,
        moneyInAdvance: '',
        rate: '',
        discountRate: '',
        maximumPrice: '',
        condition: '',
      },

      adviceSomethingUnusualContractLumpSum: {
        // 자문, 별건 계약, Lump Sum, 코드 ALS
        isRetainer: false,
        retainer: '',
        dateOfMiddlePayment: yearMonthDay(new Date()),
        middlePayment: '',
        dateOfBalance: yearMonthDay(new Date()),
        balance: '',
      },
    };
  },
  [CONTRACT_ADD_SUCCESS_DATA_FORM]: (state, draft, payload) => {
    draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess = state.contractDetail.litigationLumpSum.arrayRelevantToSuccess.concat(
      {
        successCondition1Lv: { key: '', value: '' },
        successCondition2Lv: { key: '', value: '' },
        successCondition3Lv: { key: '', value: '' },
        rewardType: { key: 'SUCFTP_A', value: '' },
        successFee: '',
        successConditionText: '',
      },
    );
  },
  [CONTRACT_REMOVE_SUCCESS_DATA_FORM]: (state, draft, payload) => {
    const { index } = payload;
    draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess = state.contractDetail.litigationLumpSum.arrayRelevantToSuccess.filter(
      (item, idx) => {
        if (idx === index) return false;
        return true;
      },
    );
  },
  [CONTRACT_CHANGE_SUCCESS_DATA]: (state, draft, payload) => {
    const { index, path, data } = payload;
    draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index][path] = data;

    if (path === 'successCondition1Lv') {
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successCondition2Lv = {
        key: '',
        value: '',
      };
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successCondition3Lv = {
        key: '',
        value: '',
      };
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successConditionText = '';
    } else if (path === 'successCondition2Lv') {
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successCondition3Lv = {
        key: '',
        value: '',
      };
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successConditionText = '';
    } else if (path === 'successCondition3Lv') {
      draft.contractDetail.litigationLumpSum.arrayRelevantToSuccess[index].successConditionText = '';
    }
  },
  [CONTRACT_BILLING_TYPE_FILTER]: (state, draft, payload) => {
    const { caseType, billingType1Lv, billingType2Lv } = payload;
    let billingTypeCode = null;
    if (caseType === 'L') {
      if (billingType1Lv === 'TC') billingTypeCode = 'LTC';
      if (billingType1Lv === 'LS') billingTypeCode = 'LLS';
    } else if (caseType === 'A') {
      if (billingType1Lv === 'M') billingTypeCode = 'AM';
      if (billingType1Lv === 'U') {
        billingTypeCode = null;
        if (billingType2Lv === 'TC') billingTypeCode = 'ATC';
        if (billingType2Lv === 'LS') billingTypeCode = 'ALS';
      }
    }
    draft.contractDetail.billingTypeCode = billingTypeCode;
  },
};

export default reducerSelector2(initial, handlers);
