import * as momentVibeCommentsTypes from '../actions/types/momentVibeCommentsActionTypes';

const initialState = {
    currentComments: [],
    status: {
        status: 1
    },
    momentVibeFollowStatus: {
        status: 1
    },
    momentVibeUnFollowStatus: {
        status: 1
    }
};

const momentVibeCommentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case momentVibeCommentsTypes.SET_MOMENT_VIBE_COMMENTS_LIST:
            return {
                ...state,
                currentComments: action.comments
            };
        case momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_COMMENTS_STATUS:
            return {
                ...state,
                status: action.status
            };
        case momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_FOLLOW_STATUS:
            return {
                ...state,
                momentVibeFollowStatus: action.momentVibeFollowStatus
            };
        case momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_UN_FOLLOW_STATUS:
            return {
                ...state,
                momentVibeUnFollowStatus: action.momentVibeFollowStatus
            };
        default:
            return state;
    }
};

export default momentVibeCommentsReducer;
