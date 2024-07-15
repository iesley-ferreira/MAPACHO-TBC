import { call, put, takeLatest } from 'redux-saga/effects';
import * as mercadoPagoApi from '../../../api/mercadoPagoApi';
import {
  IMercadoPagoCreatePixRequest,
  IMercadoPagoCreatePixResponse,
} from '../../../interfaces/mercadoPago';
import { generateOrderByPixFailure, generateOrderByPixSuccess } from './actions';
import { OrderActionTypes } from './types';
function* generateOrderByPixSaga(action: {
  type: string;
  payload: IMercadoPagoCreatePixRequest;
}) {
  try {
    console.log('Generating Order By Pix SAGA');

    const response: IMercadoPagoCreatePixResponse = yield call(
      mercadoPagoApi.createPixOrder,
      action.payload,
    );
    const ticketUrl = response.ticketUrl;

    yield put(generateOrderByPixSuccess({ ticketUrl }));
  } catch (error: Error | unknown) {
    yield put(generateOrderByPixFailure((error as Error).message));
  }
}

export default function* ordersSagas() {
  yield takeLatest(
    OrderActionTypes.GENERATE_ORDER_BY_PIX_REQUEST,
    generateOrderByPixSaga,
  );
}
