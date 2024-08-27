import { call, put, takeLatest } from 'redux-saga/effects';
import * as paymentsApi from '../../../api/paymentsApi';

import { createPreferenceResponse } from '../../../interfaces/payment';
import {
  createPreferenceFailure,
  createPreferenceSuccess,
  processPaymentFailure,
  processPaymentSuccess,
} from './actions';
import {
  createPreferenceData,
  formData,
  OrderActionTypes,
  processPaymentResponse,
} from './types';
function* createPreferenceSaga(action: {
  type: string;
  payload: { data: createPreferenceData };
}) {
  try {
    const response: createPreferenceResponse = yield call(
      paymentsApi.createPreference,
      action.payload.data,
    );

    if (response.status === 200) {
      yield put(createPreferenceSuccess(response.preferenceId!.toString()));
    } else if (response.status !== 200 && response.insufficientStockItems) {
      console.log('RESPONSE SAGA', response);
      yield put(
        createPreferenceFailure({
          message: response.message!,
          insufficientStockItems: response.insufficientStockItems!,
        }),
      );
    }
  } catch (error: any) {
    yield put(createPreferenceFailure(error.message || 'Erro desconhecido'));
  }
}

function* processPaymentSaga(action: { type: string; payload: formData }) {
  try {
    const response: processPaymentResponse = yield call(
      paymentsApi.processPayment,
      action.payload,
    );
    console.log('processPaymentSaga RESPONSE: ', response);

    yield put(processPaymentSuccess(response));
  } catch (error: Error | unknown) {
    yield put(processPaymentFailure((error as Error).message));
  }
}

export default function* ordersSagas() {
  yield takeLatest(OrderActionTypes.CREATE_PREFERENCE_REQUEST, createPreferenceSaga);
  yield takeLatest(OrderActionTypes.PROCESS_PAYMENT_REQUEST, processPaymentSaga);
}
