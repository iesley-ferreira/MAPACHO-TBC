import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { OrderActions, OrderState } from './types';

const initialState: OrderState = {
  preferenceId: undefined,
  paymentId: null,
  paymentStatus: null,
  paymentStatusDetails: null,
  ticketUrl: null,
  paymentDateOfExpiration: null,
  loading: false,
  error: false,
  message: '',
  insufficientStockItems: null,
};

const orderReducer = createReducer<OrderState, OrderActions>(initialState)
  .handleAction(actions.createPreferenceRequest, (state) => ({
    ...state,
    error: false,
    loading: true,
    message: '',
  }))
  .handleAction(actions.createPreferenceSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    message: '',
    preferenceId: action.payload,
  }))
  .handleAction(actions.createPreferenceFailure, (state, action) => ({
    ...state,
    loading: false,
    error: true,
    message: action.payload.message,
    insufficientStockItems: action.payload.insufficientStockItems!,
  }))
  .handleAction(actions.processPaymentRequest, (state) => ({
    ...state,
    error: false,
    loading: true,
    message: '',
  }))
  .handleAction(actions.processPaymentSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    message: '',
    paymentId: action.payload.payment_id.toString(),
    paymentStatus: action.payload.payment_status,
    paymentStatusDetails: action.payload.payment_status_detail,
    ticketUrl: action.payload.ticket_url,
    paymentDateOfExpiration: action.payload.date_of_expiration,
  }))
  .handleAction(actions.processPaymentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: true,
    message: action.payload,
  }));

export default orderReducer;
