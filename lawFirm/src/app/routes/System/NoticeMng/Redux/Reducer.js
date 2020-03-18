import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { NOTICEMNG_SET_REDUX_VALUES, NOTICEMNG_SET_SELECT } from './ActionType';

const initial = {
  formMode:'',
  isOpenDetail : false,
  noticeList: [],
  noticeDetail:{
    noticeID: 0,
    noticeTitle:'',
    noticeContents:'',
    noticeDate:'',
    isPopUp: 1,
    popUpEndDate:'',
    isMailing: 1,
  //  isActive: 1,
  },
  search:{
  //  searchIsActive: '1',
    searchIsPopUp: [],
    searchIsMailing: [],
    searchStartDate: null,
    searchEndDate: null,
    searchValue:'',
  },
}

const handlers = {
  [NOTICEMNG_SET_REDUX_VALUES]: prodSetReduxValues2,

  [NOTICEMNG_SET_SELECT] : (state, draft, payload) => {
        
    const {list, o} = payload
    const { key, text, selected } = o;
    
    if(selected){
        draft.search[list].push(key)
    }else{
        const removeIndex = draft.search[list].findIndex(a => a === key);
        if (removeIndex !== -1) draft.search[list].splice(removeIndex, 1)
    }
}
};

export default reducerSelector2(initial, handlers);