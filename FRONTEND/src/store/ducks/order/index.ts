import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { OrderActions, OrderState } from './types';

const initialState: OrderState = {
  order: {
    transaction_amount: 0,
    description: '',
    paymentMethodId: '',
    email: '',
    identificationType: '',
    number: '',
  },
  ticketUrl: '',
  loading: false,
  error: false,
  message: '',
};

const orderReducer = createReducer<OrderState, OrderActions>(initialState)
  .handleAction(actions.generateOrderByPixRequest, (state, action) => ({
    ...state,
    error: false,
    loading: true,
    message: '',
    order: {
      transaction_amount: action.payload.transaction_amount,
      description: action.payload.description,
      paymentMethodId: action.payload.paymentMethodId,
      email: action.payload.email,
      identificationType: action.payload.identificationType,
      number: action.payload.number,
    },
  }))
  .handleAction(actions.generateOrderByPixSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    message: '',
    ticketUrl: action.payload.ticketUrl,
  }))
  .handleAction(actions.generateOrderByPixFailure, (state, action) => ({
    ...state,
    loading: false,
    error: true,
    message: action.payload,
  }));

export default orderReducer;
