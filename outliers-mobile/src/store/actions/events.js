import * as eventsType from "./types/eventsActionTypes";

export const initiateEventUpload = event => {
    return {
        type: eventsType.INITIATE_EVENTS_UPLOAD,
        event
    };
};

export const initiateListEvents = params => {
    // console.log("action events", params);
    return {
        type: eventsType.INITIATE_EVENTS_LIST,
        params
    };
};

export const setListEvents = events => {
    // console.log("set event called", events);
    return {
        type: eventsType.SET_EVENTS_LIST,
        listEvents: events
    };
};
