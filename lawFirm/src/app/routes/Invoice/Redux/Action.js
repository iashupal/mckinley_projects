import { createAction } from 'redux-actions';
import { INVOICE_SET_REDUX_VALUES } from './ActionType';

export const setReduxValues = createAction(INVOICE_SET_REDUX_VALUES);
