import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export enum AddressActionTypes {
  FETCH_ADDRESS_REQUEST = 'FETCH_ADDRESS_REQUEST',
  FETCH_ADDRESS_SUCCESS = 'FETCH_ADDRESS_SUCCESS',
  FETCH_ADDRESS_FAILURE = 'FETCH_ADDRESS_FAILURE',
  ADD_HOUSE_NUMBER = 'ADD_HOUSE_NUMBER',
}

export enum DeliveryActionTypes {
  FETCH_DELIVERY_PRICES_REQUEST = 'FETCH_DELIVERY_PRICES_REQUEST',
  FETCH_DELIVERY_PRICES_SUCCESS = 'FETCH_DELIVERY_PRICES_SUCCESS',
  FETCH_DELIVERY_PRICES_FAILURE = 'FETCH_DELIVERY_PRICES_FAILURE',
}

export enum DistanceActionTypes {
  FETCH_DISTANCE_REQUEST = 'FETCH_DISTANCE_REQUEST',
  FETCH_DISTANCE_SUCCESS = 'FETCH_DISTANCE_SUCCESS',
  FETCH_DISTANCE_FAILURE = 'FETCH_DISTANCE_FAILURE',
}

export interface ShippingState {
  completeAddress: IAddress;
  deliveryOptions: IDeliveryOptionPrice[];
  scheduledValue: number;
  motorcycleValue: number;
  distance: number;
  loading: boolean;
  error: boolean;
}

export interface IZipCode {
  zipCode: string;
}

export interface IAddress {
  postalCode: string;
  address: string;
  houseNumber?: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface IDeliveryOptionPrice {
  id: number;
  optionName: string;
  customPrice: number;
  deliveryTime: number;
}

export interface IDeliveryDistance {
  distance: number;
}

export interface IFullAddress {
  fullAddress: string;
}

export type ShippingActions = ActionType<typeof actions>;
