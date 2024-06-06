import { createAction } from 'typesafe-actions'
import { AddressActionTypes, IAddress, IZipCode } from './types'

export const fetchAddressRequest = createAction(
  AddressActionTypes.FETCH_ADDRESS_REQUEST
)<IZipCode>()

export const fetchAddressSuccess = createAction(
  AddressActionTypes.FETCH_ADDRESS_SUCCESS
)<IAddress>()

export const fetchAddressFailure = createAction(
  AddressActionTypes.FETCH_ADDRESS_FAILURE
)<string>()
