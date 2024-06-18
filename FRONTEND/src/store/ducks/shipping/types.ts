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

export enum MotorcycleDeliveryActionTypes {
  SET_MOTORCYCLE_DELIVERY_VALUE = 'SET_MOTORCYCLE_DELIVERY_VALUE',
}

export enum ScheduledDeliveryActionTypes {
  SET_SCHEDULED_DELIVERY_VALUE = 'SET_SCHEDULED_DELIVERY_VALUE',
}

export enum ShippingActionTypes {
  SET_SHIPPING_OPTION = 'SET_SHIPPING_OPTION',
}

export interface ShippingState {
  completeAddress: IAddress;
  deliveryOptions: IDeliveryOptionPrice[];
  shippingOption: IShippingOption;
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

export interface IShippingOption {
  selected: string;
  value: number;
}

export type ShippingActions = ActionType<typeof actions>;
