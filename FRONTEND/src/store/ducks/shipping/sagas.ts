import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as shippingApi from '../../../api/shippingApi';
import {
  fetchAddressFailure,
  fetchAddressSuccess,
  fetchDeliveryDistanceFailure,
  fetchDeliveryDistanceRequest,
  fetchDeliveryDistanceSuccess,
  fetchDeliveryOptionPricesFailure,
  fetchDeliveryOptionPricesRequest,
  fetchDeliveryOptionPricesSuccess,
  setMotorcycleDeliveryValue,
  setScheduledDeliveryValue,
} from './actions';
import { calculateMotorcycleDelivery, calculateScheduledDelivery } from './helpers';
import {
  AddressActionTypes,
  DeliveryActionTypes,
  DistanceActionTypes,
  IAddress,
  IDeliveryOptionPrice,
  IFullAddress,
  IZipCode,
} from './types';

function* fetchAddressSaga(action: { type: AddressActionTypes; payload: IZipCode }) {
  try {
    const { zipCode } = action.payload;
    const address: IAddress = yield call(shippingApi.fetchAddress, zipCode);
    yield put(fetchDeliveryOptionPricesRequest({ zipCode }));

    const fullAddress = `${address.address}, ${address.city}, ${address.state}, ${zipCode}`;

    yield put(fetchDeliveryDistanceRequest({ fullAddress }));

    yield put(fetchAddressSuccess(address));
  } catch (error: Error | unknown) {
    yield put(fetchAddressFailure((error as Error).message));
  }
}

function* fetchDeliveryOptionPricesSaga(action: {
  type: DeliveryActionTypes.FETCH_DELIVERY_PRICES_REQUEST;
  payload: IZipCode;
}) {
  try {
    const { zipCode } = action.payload;
    const options: IDeliveryOptionPrice[] = yield call(
      shippingApi.fetchDeliveryOptions,
      zipCode,
    );
    yield put(fetchDeliveryOptionPricesSuccess(options));
  } catch (error: Error | unknown) {
    yield put(fetchDeliveryOptionPricesFailure((error as Error).message));
  }
}

function* fetchDeliveryDistanceSaga(action: {
  type: DistanceActionTypes.FETCH_DISTANCE_REQUEST;
  payload: IFullAddress;
}) {
  try {
    const { fullAddress } = action.payload;
    const response: { distance: number } = yield call(
      shippingApi.fetchDistance,
      fullAddress,
    );
    const distance = response.distance;
    yield put(fetchDeliveryDistanceSuccess({ distance }));

    const motorcycleValue = calculateMotorcycleDelivery(distance);
    const scheduledValue = calculateScheduledDelivery(distance);

    yield put(setMotorcycleDeliveryValue(motorcycleValue));
    yield put(setScheduledDeliveryValue(scheduledValue));
  } catch (error: Error | unknown) {
    yield put(fetchDeliveryDistanceFailure((error as Error).message));
  }
}

export default function* shippingSagas() {
  yield all([
    takeLatest(AddressActionTypes.FETCH_ADDRESS_REQUEST, fetchAddressSaga),
    takeLatest(
      DeliveryActionTypes.FETCH_DELIVERY_PRICES_REQUEST,
      fetchDeliveryOptionPricesSaga,
    ),
    takeLatest(DistanceActionTypes.FETCH_DISTANCE_REQUEST, fetchDeliveryDistanceSaga),
  ]);
}
