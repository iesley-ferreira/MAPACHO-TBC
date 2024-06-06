import { call, put, takeLatest } from 'redux-saga/effects'
import * as addressApi from '../../../api/addressApi'
import { fetchAddressFailure, fetchAddressSuccess } from './actions'
import { AddressActionTypes, IAddress, IZipCode } from './types'

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

export default function* addressSagas() {
  yield takeLatest(AddressActionTypes.FETCH_ADDRESS_REQUEST, fetchAddressSaga)
}
