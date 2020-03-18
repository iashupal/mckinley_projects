import * as momentTypes from '../actions/types/momentActionTypes';

const initialState = {
    location: {
        longitude: '',
        latitude: '',
        offset: 0
    },
    listMoments: {},
    listMyMoments: [],
    listMomentDetails: {}
};

const momentReducer = (state = initialState, action) => {
    switch (action.type) {
        case momentTypes.SET_MOMENT_LIST:
            return {
                ...state,
                listMoments: {
                    ...state.listMoments,
                    ...action.listMoments,
                }
            };
        case momentTypes.SET_MY_MOMENT_LIST:
            return {
                ...state,
                listMyMoments: {
                    ...state.listMyMoments,
                    ...action.listMyMoments,
                }
            };
        case momentTypes.SET_MOMENT_LIST_DETAILS:
            return {
                ...state,
                listMomentDetails: {
                    ...state.listMomentDetails,
                    ...action.listMomentDetails,
                }
            };
        default:
            return state;
    }
};

export default momentReducer;
