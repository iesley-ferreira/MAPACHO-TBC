import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as addressApi from '../../../api/addressApi'
import * as deliveryApi from '../../../api/deliveryApi'
import * as distanceApi from '../../../api/distanceApi'
import {
  fetchAddressFailure,
  fetchAddressSuccess,
  fetchDeliveryDistanceFailure,
  fetchDeliveryDistanceSuccess,
  fetchDeliveryOptionPricesFailure,
  fetchDeliveryOptionPricesSuccess,
} from './actions'
import {
  AddressActionTypes,
  DeliveryActionTypes,
  DistanceActionTypes,
  IAddress,
  IDeliveryOptionPrice,
  IFullAddress,
  IZipCode,
} from './types'

function* fetchAddressSaga(action: {
  type: AddressActionTypes
  payload: IZipCode
}) {
  try {
    const { zipCode } = action.payload
    const address: IAddress = yield call(addressApi.fetchAddress, zipCode)

    yield put(fetchAddressSuccess(address))
  } catch (error: Error | unknown) {
    yield put(fetchAddressFailure((error as Error).message))
  }
}

function* fetchDeliveryOptionPricesSaga(action: {
  type: DeliveryActionTypes.FETCH_DELIVERY_PRICES_REQUEST
  payload: IZipCode
}) {
  try {
    const { zipCode } = action.payload
    const options: IDeliveryOptionPrice[] = yield call(
      deliveryApi.fetchDeliveryOptions,
      zipCode
    )
    yield put(fetchDeliveryOptionPricesSuccess(options))
  } catch (error: Error | unknown) {
    yield put(fetchDeliveryOptionPricesFailure((error as Error).message))
  }
}

function* fetchDeliveryDistanceSaga(action: {
  type: DistanceActionTypes.FETCH_DISTANCE_REQUEST
  payload: IFullAddress
}) {
  try {
    const { fullAddress } = action.payload
    const response: { distance: number } = yield call(
      distanceApi.fetchDistance,
      fullAddress
    )
    const distance = response.distance
    yield put(fetchDeliveryDistanceSuccess({ distance }))
  } catch (error: Error | unknown) {
    yield put(fetchDeliveryDistanceFailure((error as Error).message))
  }
}

export default function* shippingSagas() {
  yield all([
    takeLatest(AddressActionTypes.FETCH_ADDRESS_REQUEST, fetchAddressSaga),
    takeLatest(
      DeliveryActionTypes.FETCH_DELIVERY_PRICES_REQUEST,
      fetchDeliveryOptionPricesSaga
    ),
    takeLatest(
      DistanceActionTypes.FETCH_DISTANCE_REQUEST,
      fetchDeliveryDistanceSaga
    ),
  ])
}
