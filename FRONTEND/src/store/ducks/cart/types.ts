import { ActionType } from 'typesafe-actions';
import { ICartItem } from '../../../interfaces/Cart';
import * as actions from './actions';

export enum CartActionTypes {
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY',
  DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY',
  REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
  UPDATE_CART_PRODUCTS = 'UPDATE_CART_PRODUCTS',
  FETCH_CART_PRODUCTS_REQUEST = 'FETCH_CART_PRODUCTS_REQUEST',
  FETCH_CART_PRODUCTS_SUCCESS = 'FETCH_CART_PRODUCTS_SUCCESS',
  FETCH_CART_PRODUCTS_FAILURE = 'FETCH_CART_PRODUCTS_FAILURE',
}
export type CartActions = ActionType<typeof actions>;

export interface CartState {
  readonly items: ICartItem[];
  readonly loading: boolean;
  readonly error: boolean;
}
