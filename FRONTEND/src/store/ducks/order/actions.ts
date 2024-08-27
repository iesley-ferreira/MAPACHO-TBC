import { createAction } from 'typesafe-actions';
import {
  createPreferenceData,
  createPreferenceFailureType,
  OrderActionTypes,
  processPaymentResponse,
} from './types';

export const createPreferenceRequest = createAction(
  OrderActionTypes.CREATE_PREFERENCE_REQUEST,
)<{ data: createPreferenceData }>();

export const createPreferenceSuccess = createAction(
  OrderActionTypes.CREATE_PREFERENCE_SUCCESS,
)<string>();

export const createPreferenceFailure = createAction(
  OrderActionTypes.CREATE_PREFERENCE_FAILURE,
)<createPreferenceFailureType>();

export const processPaymentRequest = createAction(
  OrderActionTypes.PROCESS_PAYMENT_REQUEST,
)<string>();

export const processPaymentSuccess = createAction(
  OrderActionTypes.PROCESS_PAYMENT_SUCCESS,
)<processPaymentResponse>();

export const processPaymentFailure = createAction(
  OrderActionTypes.PROCESS_PAYMENT_FAILURE,
)<string>();
