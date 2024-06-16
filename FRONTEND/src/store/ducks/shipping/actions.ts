import { createAction } from 'typesafe-actions';
import {
  AddressActionTypes,
  DeliveryActionTypes,
  DistanceActionTypes,
  IAddress,
  IDeliveryDistance,
  IDeliveryOptionPrice,
  IFullAddress,
  IZipCode,
} from './types';

// address actions

export const fetchAddressRequest = createAction(
  AddressActionTypes.FETCH_ADDRESS_REQUEST,
)<IZipCode>();

export const fetchAddressSuccess = createAction(
  AddressActionTypes.FETCH_ADDRESS_SUCCESS,
)<IAddress>();

export const fetchAddressFailure = createAction(
  AddressActionTypes.FETCH_ADDRESS_FAILURE,
)<string>();

export const addHouseNumber = createAction(AddressActionTypes.ADD_HOUSE_NUMBER)<string>();

// delivery actions

export const fetchDeliveryOptionPricesRequest = createAction(
  DeliveryActionTypes.FETCH_DELIVERY_PRICES_REQUEST,
)<IZipCode>();

export const fetchDeliveryOptionPricesSuccess = createAction(
  DeliveryActionTypes.FETCH_DELIVERY_PRICES_SUCCESS,
)<IDeliveryOptionPrice[]>();

export const fetchDeliveryOptionPricesFailure = createAction(
  DeliveryActionTypes.FETCH_DELIVERY_PRICES_FAILURE,
)<string>();

// distance actions

export const fetchDeliveryDistanceRequest = createAction(
  DistanceActionTypes.FETCH_DISTANCE_REQUEST,
)<IFullAddress>();

export const fetchDeliveryDistanceSuccess = createAction(
  DistanceActionTypes.FETCH_DISTANCE_SUCCESS,
)<IDeliveryDistance>();

export const fetchDeliveryDistanceFailure = createAction(
  DistanceActionTypes.FETCH_DISTANCE_FAILURE,
)<string>();

export const setMotorcycleDeliveryValue = createAction(
  'SET_MOTORCYCLE_DELIVERY_VALUE',
)<number>();

export const setScheduledDeliveryValue = createAction(
  'SET_SCHEDULED_DELIVERY_VALUE',
)<number>();
